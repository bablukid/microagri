package controller;

class Main extends sugoi.BaseController {

	@tpl("home.mtt")
	function doDefault() {
		view.category = 'home';
		view.chapitres = Question.chapitres;
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
	function doQ(qid:String){
		var q = Question.get(qid);		
		var f = q.getForm();
		view.form = f;
		view.q = q;

		if( f.isValid() ){
			
			//trace(f.getData() );

			//save data
			q.save(f);


			//get next
			var next = q.getNext();
			if(next==null){
				throw Ok("/","Ce chapitre est terminé.");
			}else{
				throw Ok("/q/"+next.qid,"Réponse enregistrée.");
			}
			

		}
	}

	@admin
	function doShema(){
		Sys.print("<pre>");
		for( chap in Question.chapitres){
			for(qid in chap.ordre){
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
