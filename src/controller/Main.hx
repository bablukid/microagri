package controller;

class Main extends sugoi.BaseController {

	@tpl("home.mtt")
	function doDefault() {
		view.category = 'home';
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

			//get next
			var next = q.getNext();
			if(next==null){
				throw Ok("/","Ce chapitre est terminé.");
			}else{
				throw Ok("/q/"+next.qid,"Réponse enregistrée.");
			}
			

		}
	}
	
}
