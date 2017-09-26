package controller;

class Main extends sugoi.BaseController {

	@tpl("home.mtt")
	function doDefault() {
		view.category = 'home';
		view.chapitres = Question.chapitres;
		view.getChapitre = function(k:String) return Question.chapitres.get(k);
	}
	
	@admin
	function doDb(d:haxe.web.Dispatch) {
		d.parts = []; //disable haxe.web.Dispatch
		sys.db.Admin.handler();
	}

	/**
	Display a question
	**/
	@tpl("q.mtt")
	function doQ(chapitre:String,index:Int){

		//get the questions ids
		var group  = Question.chapitres[chapitre].ordre[index];
		var qids = group.qs;
		view.titre = group.titre;
		view.desc = group.desc;
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
				throw Ok( "/q/"+next.chapitre+"/"+next.index,"Réponse enregistrée." );
			}
			

		}
	}

	@admin
	function doShema(){
		Sys.print("<pre>");
		for( chap in Question.chapitres){
			for(o in chap.ordre){
				for(qid in o.qs){
					var q = Question.get(qid);
					Sys.print("var "+q.data.label);
					switch(q.data.type){
						case QText : Sys.println(":SNull<SString<512>>;");
						case QInt : Sys.println(":SNull<SInt>;");
						case QAddress : Sys.println(":SNull<SString<512>>;");
						case QCheckbox(_) : Sys.println(":SNull<SString<512>>;");
						case QRadio(_) : Sys.println(":SNull<SString<32>>;");
					}
				}
				
			}
		}		
		Sys.print("</pre>");
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
