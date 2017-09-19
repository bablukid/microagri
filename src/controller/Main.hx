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
	
}
