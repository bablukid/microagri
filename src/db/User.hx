package db;
import sys.db.Object;
import sys.db.Types;

enum UserFlags{
	Admin;
}


class User extends Object {

	public var id : SId;
	public var email : SString<128>;
	public var lang : SString<2>;

	public var name : SNull<SString<32>>;
	public var pass : SNull<SString<128>>;
	public var phone:SNull<SString<19>>;	
	public var address1:SNull<SString<64>>;
	public var address2:SNull<SString<64>>;
	public var zipCode:SNull<SString<32>>;
	public var city:SNull<SString<25>>;
	
	public var cdate : SDate; 				//creation
	public var ldate : SNull<SDateTime>;	//derniere connexion
	public var rights : SFlags<UserFlags>;
	
	override public function new(){
		super();
		this.cdate = Date.now();
		this.rights = cast 0;	
		lang = "fr";
	}


	public function isAdmin() {
		return rights.has(Admin) || id==1;
	}
	
	public function create(){
		var u = new User();
		u.name = u.email = "user"+Std.random(99999);
		return u;
	}
	
	
	
	
}
