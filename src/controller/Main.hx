package controller;

class Main extends sugoi.BaseController {

	@tpl("home.mtt")
	function doDefault() {
		view.category = 'home';
		view.chapitres = Question.chapitres;
		view.getAnswers = Question.getAnswers;

		if(app.user!=null){
			var r = db.Result.getOrCreate(App.current.user);
			view.ferme = r.Nom;
		}
		

		var percent = 0;
		for( c in Question.chapitres ) percent += Question.getAnswers(c).percent;
		view.percent = Math.round(percent/Question.chapitres.length);
	}
	
	@admin
	function doDb(d:haxe.web.Dispatch) {
		d.parts = []; //disable haxe.web.Dispatch
		sys.db.Admin.handler();
	}

	function doUser(d:haxe.web.Dispatch){
		d.dispatch(new controller.User());
	}

	/**
	Display a question
	**/
	@tpl("q.mtt")
	function doQ(chapitre:Int,index:Int){

		if(app.user==null) throw Redirect("/init");

		//get the questions ids
		var group  = Question.chapitres[chapitre].ordre[index];
		var qids = group.qs;
		view.titre = group.titre;
		view.desc = group.desc;

		view.chapitre = Question.chapitres[chapitre].nom;
		view.num = index+1;
		view.total = Question.chapitres[chapitre].ordre.length;
 		/*switch( Type.getClassName(Type.getClass(q)) ){
			 case "String" : qids = [q];
			 case "Array" : qids = q;
		}*/
		
		//questions list
		var qs = new Array<Question>();
		for( qid in qids) qs.push(Question.get(qid) );

		//build form
		var f = Question.getForm(qs);
		view.form = f;
		//view.q = q;

		if( f.isValid() ){
			
			//trace(f.getData() );

			//save data
			Question.save(f);

			var next = Question.next(chapitre,index);


			if(next==null){
				throw Ok( "/" , "Ce chapitre est terminé." );
			}else{
				throw Redirect( "/q/"+next.chapitre+"/"+next.index );
			}
			

		}
	}

	/**
	create a user
	**/
	@tpl("form.mtt")
	function doInit(){

		var f = new sugoi.form.Form("user");
		f.addElement(new sugoi.form.elements.Html("Avant de remplir le questionnaire, merci de saisir vos coordonnées :"));
		f.addElement(new sugoi.form.elements.StringInput("name","Nom",null,true));
		f.addElement(new sugoi.form.elements.StringInput("email","Email",null,true));
		//f.addElement(new sugoi.form.elements.StringInput("phone","Téléphone",null,true));
		if(f.isValid()){
			var u = new db.User();
			u.name = f.getValueOf("name");
			u.email = f.getValueOf("email");
			u.insert();
			App.current.session.setUser(u);
			throw Redirect("/");
		}

		view.form = f;


	}

	@admin
	function doShema(){
		Sys.print("<pre>");
		for( chap in Question.chapitres){
			for(o in chap.ordre){
				for(qid in o.qs){
					var q = Question.get(qid);
					if(q==null || q.data==null) continue;
					Sys.print("public var "+q.data.label);
					switch(q.data.type){
						case QText,QString : 
						if(q.data.label.indexOf("_cmt")>-1){
							Sys.println(":SNull<SText>;");
						}else{
							Sys.println(":SNull<SString<128>>;");
						}						
						case QInt : Sys.println(":SNull<SInt>;");
						case QAddress : Sys.println(":SNull<SString<256>>;");
						case QCheckbox(_) : Sys.println(":SNull<SString<128>>;");
						case QRadio(_) : Sys.println(":SNull<SString<32>>;");
						case QYesNo : Sys.println(":SNull<SString<3>>;");
					}
				}
				
			}
		}		
		Sys.print("</pre>");
	}

	@admin @tpl('reponses.mtt')
	function doReponses(){
		var reponses = db.Result.manager.all();
		view.reponses = reponses;

		var k = [];

		for ( c in Question.chapitres){
			for( qs in c.ordre){
				for( q in qs.qs ) k.push( Question.get(q).data.label );
			}
		}
		
		view.keys = k;
		view.Reflect = Reflect;


		if(App.current.params.get("csv")=="1"){

			//var data = [];

			/*for( r in reponses ){
				var row = [];
				for( x in k ) row.push(Reflect.getProperty(r,x));
				data.push(row);
			}*/
			
			printCsvData(Lambda.array(reponses),k,"Reponses.csv");

		}

	}


	public function printCsvData(data:Array<Dynamic>,headers:Array<String>,fileName:String) {
		
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
