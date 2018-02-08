package controller;
using Lambda;
using Std;

class Main extends sugoi.BaseController {
	/**
	 *  Home questionnaire complet
	 */
	@tpl("qhome.mtt")
	function doQhome() {
		view.category = 'home';
		view.chapitres = QData.formulaire3;
		view.getAnswers = Question.getAnswers;

		if(app.user!=null){
			var r = db.Result.getOrCreate(App.current.user);
			view.ferme = r.Nom;

			/*var percent = 0;
			for( c in Question.chapitres ) percent += Question.getAnswers(c).percent;
			view.percent = Math.round(percent/Question.chapitres.length);  */
			var compl = Question.getCompletion(r);
			//trace(compl);
			view.percent = compl.percent;
		}	
	}
	
	@tpl("home.mtt")
	function doDefault(){
        throw Redirect("/answers");
    }

	/**
	 *  Ancien formulaire de signalement
	 */
	/*@tpl("form.mtt")
	function doIdentifier(){
		if(app.user==null) throw Redirect("/init");
		
		var f = new sugoi.form.Form("identif");
		view.title ="Identifier une micro-ferme";
		//f.addElement(new sugoi.form.elements.Html("Avant de remplir le formulaire, merci de saisir vos coordonnées :"));
		f.addElement(new sugoi.form.elements.StringInput("nom","Nom de la ferme",null,true));
		f.addElement(new sugoi.form.elements.StringInput("responsables","Nom du ou des responsable(s)",null,false));
		f.addElement(new sugoi.form.elements.StringInput("email","Email du responsable",null,true));
		f.addElement(new sugoi.form.elements.StringInput("phone","Téléphone du responsable",null,false));
		f.addElement(new sugoi.form.elements.StringInput("localisation","Adresse postale",null,true));
		
		var data = [
			{label:"Production",value:"production"},
			{label:"Transformation",value:"transformation"},
			{label:"Commercialisation",value:"commercialisation"},
			{label:"Accueil du public",value:"accueil"},                
		];
		f.addElement(new form.Checkboxes("activite","Activités de la ferme",data,null,true) );
		
		var data = [
			{label:"Viticulture",value:"viticulture"},
			{label:"Maraîchage",value:"maraichage"},
			{label:"Arboriculture",value:"arboriculture"},
			{label:"Céréaliculture",value:"cerealiculture"},
			{label:"Plantes à Parfum, Aromatiques et Médicinales",value:"aromatiques"},
			{label:"Bovins",value:"bovins"},
			{label:"Caprins",value:"caprins"},
			{label:"Ovins",value:"ovins"},
			{label:"Équidés",value:"equides"},
			{label:"Porcins",value:"porcins"},
			{label:"Elevages mixtes",value:"elevage_mixte"},
			{label:"Elevages spécialisés (apiculture, animaux domestiques ou exotiques…)",value:"elevage_spec"},
			{label:"Petit élevage",value:"elevage_petit"},
			{label:"Pisciculture",value:"pisciculture"},
			{label:"Conchyliculture",value:"conchyliculture"},
			{label:"Activités de pêche maritime à pied",value:"peche_a_pied"},
		];
		f.addElement(new form.Checkboxes("activite_agricole","Activités agricoles",data,null,true) );
		
		f.addElement(new sugoi.form.elements.Html("Donner ici les caractéristiques (surface, taille du cheptel, mode(s) de commercialisation, certification(s), etc.) de la ferme que vous souhaitez identifier comme étant susceptible d’être une micro-ferme."));
		f.addElement(new sugoi.form.elements.TextArea("elements","Caractéristiques",null,true));

		if(f.isValid()){
			var u = new db.Identifier();
			u.nom = f.getValueOf("nom");
			u.localisation = f.getValueOf("localisation");
			u.responsables = f.getValueOf("responsables");
			u.email = f.getValueOf("email");
			u.phone = f.getValueOf("phone");
			u.elements = f.getValueOf("elements");
			u.activite = f.getValueOf("activite").join(",");
			u.activite_agricole = f.getValueOf("activite_agricole").join(",");
			u.user = app.user;
			u.insert();
			
			throw Ok("/","Merci de nous avoir aidé à identifier des micro-fermes !");
		}

		view.form = f;
	}*/


	/**
	 *  Admin BDD
	 */
	@admin
	function doDb(d:haxe.web.Dispatch) {
		d.parts = []; //disable haxe.web.Dispatch
		sys.db.Admin.handler();
	}

	function doUser(d:haxe.web.Dispatch){
		d.dispatch(new controller.User());
	}

	/**
	    Question Formulaire complet
	**/
	@tpl("q.mtt")
	function doQ(formId:Int,chapitre:Int,index:Int){

		if(app.user==null) throw Redirect("/init");

		var res = db.Result.getOrCreate(app.user);
        var formulaire = QData.formulaires[formId];

		//get the questions ids
		var group  = formulaire.chapitres[chapitre].ordre[index];
		var qids = group.qs;
		view.titre = group.titre;
		view.desc = group.desc;
		view.chindex = chapitre;
        view.formulaire = formulaire;
        view.formId = formId;
		view.chapitre =  formulaire.chapitres[chapitre].nom;
		view.num = index+1;
		view.total =  formulaire.chapitres[chapitre].ordre.length;
		
		var subAnswerIndex = null;
		if(chapitre==1){
			//nbre de responsables		
			var numResponsables = 1;
			if(res!=null && res.nbre_responsables!=null ) numResponsables = res.nbre_responsables.parseInt();
			if(app.session.data.respIndex==null) app.session.data.respIndex = 0;

			if(res.nom_responsable!=null && res.prenom_responsable!=null && res.prenom_responsable.split("|")[app.session.data.respIndex]!=null ){
				view.resp = "Responsable n°"+(app.session.data.respIndex+1)+" : "+res.prenom_responsable.split("|")[app.session.data.respIndex]+" "+res.nom_responsable.split("|")[app.session.data.respIndex];
			}else{
				view.resp = "Responsable n°"+(app.session.data.respIndex+1);
			}	
			subAnswerIndex = app.session.data.respIndex;
		}		

		//questions list
		var qs = new Array<Question>();
		for( qid in qids) qs.push(Question.get(qid) );

		//build form
		var f = Question.getForm(qs,subAnswerIndex);
		view.form = f;

		if( f.isValid() ){

			//hook on questions
			for( q in qs){
				switch(q.qid){
					case "A2" : 
						//check 33
						var str :String = f.getValueOf(q.data.label);
						if ( str!=null && str.indexOf("33") == -1 ) 
							throw Error("/q/"+formId+"/"+chapitre+"/"+index,"Ce recensement concerne uniquement les fermes de Gironde, le code postal doit commencer par 33.") ;
					case "A5-1"	:
						//nbre de responsables
						var num :Int = f.getValueOf(q.data.label);				
						if(num>6) throw Error(formulaire.startScreen,"Vous ne pouvez pas définir plus de 6 responsables");
					default:
				}
			}

            // téléphone ou email obligatoire
            if(formId==1 && chapitre==0 && index==0){
                var email = f.getValueOf("email");
                var telephone = f.getValueOf("telephone");
               if(telephone==null && email==null) throw Error("/q/1/0/0","Merci de nous communiquer au moins un email ou un numéro de téléphone.");
            }

			//nbre de responsables	
			if(formId==3 && chapitre==1 ){
				var numResponsables = 1;				
				if(res!=null && res.nbre_responsables!=null ) numResponsables = res.nbre_responsables.parseInt();
				if(app.session.data.respIndex==null) app.session.data.respIndex = 0;
				for( q in qs){
					var value = f.getValueOf(q.data.label);
					var original = Std.string(Reflect.getProperty(res,q.data.label));
					var arr = original==null ? [] : original.split("|");
					arr[app.session.data.respIndex] = Question.serialize(value,q.data.type);
					Reflect.setProperty(res,q.data.label,arr.join("|"));
					//trace(q.data.label+" = "+arr.join("|")+"<br>");
				}
				
			}else{
				//save data
	        	f.toSpod(res);

                //serialize depending on field type
                for(q in qs){
                    var v = Reflect.getProperty(res,q.data.label);
                    var v2 = Question.serialize(v,q.data.type);
                    Reflect.setProperty(res,q.data.label,v2);           
                }
			}	

            res.update();

			var next = Question.next(formId,chapitre,index);
			
			if(chapitre==1 && next==null){
				var numResponsables = 1;				
				if(res!=null && res.nbre_responsables!=null ) numResponsables = res.nbre_responsables.parseInt();
				if(app.session.data.respIndex==null) app.session.data.respIndex = 0;
				if(app.session.data.respIndex+1 < numResponsables){
					next = Question.next(formId,chapitre,-1);
					app.session.data.respIndex++;
				}else{
					app.session.data.respIndex = 0;
				}				
			}

			if(next==null){
				throw Ok( formulaire.endScreen , "Ce formulaire est terminé." );
			}else{
				throw Redirect( "/q/"+next.formulaire+"/"+next.chapitre+"/"+next.index );
			}
		}
	}

	/**
	create a user
	**/
	@tpl("form.mtt")
	function doInit(){
		var f = new sugoi.form.Form("user");
		f.addElement(new sugoi.form.elements.Html("Avant de remplir le formulaire, merci de saisir vos coordonnées :"));
		f.addElement(new sugoi.form.elements.StringInput("name","Nom",null,true));
		f.addElement(new sugoi.form.elements.StringInput("email","Email",null,true));
		f.addElement(new sugoi.form.elements.StringInput("phone","Téléphone",null,false));
		f.addElement(new sugoi.form.elements.Checkbox("newsletter","Tenez-moi au courant des avancées du projet",null,false));
		if(f.isValid()){
			var u = new db.User();
			u.name = f.getValueOf("name");
			u.email = f.getValueOf("email");

			if(!sugoi.form.validators.EmailValidator.check(u.email)) throw Error("/init","Merci de saisir un email valide.");

			u.phone = f.getValueOf("phone");
			u.newsletter = f.getValueOf("newsletter");
			u.insert();
			App.current.session.setUser(u);
            
            //questionnaire court
			throw Redirect("/q/1/0/0");
		}

		view.form = f;
	}

    @tpl('title.mtt')
    function doTitle(){
        var r = db.Result.getOrCreate(app.user);
        view.responsable = r.recenseur_responsable=="OUI";

    }

    /**
     *  Liste les fermes référencées par le user en cours
     */
    @tpl('answers.mtt')
    function doAnswers(){

        if(app.params.exists("new")){

            if(app.user==null) throw Redirect("/init");

            var x = new db.Result();
            x.user = app.user;
            x.Nom = "Nouvelle ferme";
            x.insert();
            app.session.data.resultId = x.id;
            var formulaire = Std.parseInt(app.params.get("new"));

            throw Ok("/q/"+formulaire+"/0/0","Vous pouvez maintenant référencer une nouvelle ferme.");
        }

        if(app.params.exists("choose")){
            
            
            var rid = Std.parseInt(app.params.get("choose"));
            var r = db.Result.manager.get(rid,false);
            if(r==null) throw Error("/","db.Result not found");
            if(app.user.id!=r.user.id && !app.user.isAdmin()) throw "Access forbidden";

            app.session.data.resultId = r.id;

            throw Ok("/q/1/0/0","Vous modifiez maintenant le référencement de la ferme \""+r.Nom+"\".");
        }

        view.results = db.Result.manager.search($user == app.user,false);

    }

	@admin
	function doShema(){
		Sys.print("<pre>");		
        for(qid in QData.questions.keys()){
            var q = Question.get(qid);
            if(q==null || q.data==null) continue;
            Sys.print("public var "+q.data.label);
            /*switch(q.data.type){
                case QText,QString : 
                if(q.data.label.indexOf("_cmt")>-1){
                    Sys.println(":SNull<SText>;");
                }else{
                    Sys.println(":SNull<SString<128>>;");
                }						
                case QInt : Sys.println(":SNull<SInt>;");
                case QFloat : Sys.println(":SNull<SFloat>;");
                case QAddress : Sys.println(":SNull<SString<256>>;");
                case QCheckbox(_) : Sys.println(":SNull<SString<128>>;");
                case QRadio(_) : Sys.println(":SNull<SString<32>>;");
                case QYesNo : Sys.println(":SNull<SString<3>>;");
            }*/
            Sys.println(":SNull<SText>;");
        }
		Sys.print("</pre>");
	}

	@admin @tpl('reponses.mtt')
	function doReponses(){

        if(checkToken()){
            var rid = Std.parseInt(app.params.get("delete"));
            var r = db.Result.manager.get(rid,true);
            r.delete();
            throw Ok("/reponses","Réponse effacée");

        }

		var reponses = db.Result.manager.all();

        

		view.reponses = reponses;

		var k = [];
        var keys =[];
        for( k in QData.questions.keys()) keys.push(k);

        keys.sort(function(x,y){
            if(x==y) return 0;
            if(x>y){
                return 1;
            }else return -1;
        });

		for ( key in keys ){
			k.push( Question.get(key).data.label );

		}

		//completion des questions
		for( r in reponses){
			Reflect.setProperty(r,"completion",Question.getCompletion(r).percent );
		}
		
		view.keys = k;
		view.keys2 = keys;
		view.Reflect = Reflect;

		if(App.current.params.get("csv")=="1"){
			printCsvData(Lambda.array(reponses),k,"Reponses.csv");
		}
	}

	@admin @tpl('signalements.mtt')
	function doSignalements(){
		var reponses = db.Identifier.manager.all();
		view.reponses = reponses;

		var h = ["nom","localisation","responsables","email","phone","elements","activite","activite_agricole"];
		view.keys = h;
		view.Reflect = Reflect;
		if(App.current.params.get("csv")=="1"){
			printCsvDataFromObjects(Lambda.array(reponses),h,"Signalements.csv");
		}
	}

	@admin @tpl('form.mtt')
	function doLink(i:db.Identifier){

		var f = new sugoi.form.Form("link");
		var data = [];
		for( r in db.Result.manager.all(false)){

			if(db.Identifier.manager.select($result==r,false)==null){
				data.push({label:"#"+r.id+"-"+r.Nom,value:r.id});
			}
		}

		f.addElement(new sugoi.form.elements.IntSelect("r","Recensement",data,null,true));

		if(f.isValid()){
			var rid = f.getValueOf("r");
			var r = db.Result.manager.get(rid,false);
			i.lock();
			i.result = r;
			i.update();

			throw Ok("/signalements","Le signalement a été relié à un recensement");
		}
		view.title = i.nom;
		view.text = "Relier le signalement <b>#"+i.id+"-"+i.nom+"</b> à un recensement";
		view.form = f;

	}


	private function printCsvDataFromObjects(data:Array<Dynamic>,headers:Array<String>,fileName:String) {
		
		App.current.setTemplate(null);
		sugoi.Web.setHeader("Content-type", "text/csv");
		sugoi.Web.setHeader('Content-disposition', 'attachment;filename="$fileName.csv"');
		
		Sys.println(headers.join(","));
		
		for (d in data) {
			var row = [];
			for ( f in headers){
				var v = Reflect.getProperty(d, f);
				row.push( "\""+(v==null?"":v)+"\"");	
			}
			Sys.println(row.join(","));
		}
		return true;		
	}

	private function printCsvData(data:Array<Dynamic>,headers:Array<String>,fileName:String) {
		
		App.current.setTemplate(null);
		sugoi.Web.setHeader("Content-type", "text/csv");
		sugoi.Web.setHeader('Content-disposition', 'attachment;filename="$fileName.csv"');
		
		Sys.println(headers.join(","));
		
		for (d in data) {
			var row = [];
			for ( f in headers){
				var v = Reflect.getProperty(d, f);
				row.push( "\""+(v==null?"":v)+"\"");	
			}
			Sys.println(row.join(","));
		}
		return true;		
	}
	

	function doInstall() {
		
		if (db.User.manager.get(1) == null) {
			var user = new db.User();
			user.id = 1;
			user.lang = "fr";
			user.email = "admin@localhost";
			user.name = "admin";
			user.pass = haxe.crypto.Md5.encode(App.config.KEY + "admin");
			user.insert();
			app.session.setUser(user);
			throw Ok("/","Admin user created sucessfully");
		}else {
			throw Error("/", "Admin user already exists");
		}
	}
	
}
