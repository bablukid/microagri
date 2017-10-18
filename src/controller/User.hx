package controller ;
import sugoi.form.Form;
import sugoi.form.elements.*;

class User extends sugoi.BaseController
{

	public function new() 
	{
		super();
	}

	function doDefault() {}
	
    /**
    Login form
    **/
	@tpl("form.mtt")
	function doLogin() {
        var f = new Form("login");
        f.addElement(new StringInput("email","Email",null,true));
        var e = new StringInput("pass","Mot de passe",null,true);
        e.inputType = ITPassword;
        f.addElement(e);
		
		
		if (f.isValid()) {
            var p = haxe.crypto.Md5.encode(App.config.KEY + Std.string(f.getValueOf("pass")) );
			var user = db.User.manager.select($email == Std.string(f.getValueOf("email")) && $pass == p, true);
			if (user == null) {
				throw Error("/user/login", "Mauvais identifiant ou mot de passe");
			}else {
				App.current.session.setUser(user);				
				throw Ok("/", "Bonjour " + user.name);
			}
		}

        view.title = "Connexion";
		view.text = "<a href='/user/forgottenPassword'>Mot de passe oublié ?</a>";
        view.form = f;
	}
	
    /**
    Log out
    **/
	function doLogout() {
		if (app.user != null) {
			App.current.session.delete();
			throw Redirect('/');
		}
	}
	
	/**
	 * Ask for password renewal by mail when password is forgotten
	 */
	@tpl("form.mtt")
	function doForgottenPassword(?key:String,?u:db.User){
		var step = 1;
		var url = "/user/forgottenPassword";
		
		//ask for mail
		var askmailform = new Form("askemail");
		askmailform.addElement(new StringInput("email","Saisissez votre email"));
	
		//change pass form
		var chpassform = new Form("chpass");
		chpassform.addElement(new StringInput("pass1","Votre nouveau mot de passe"));
		chpassform.addElement(new StringInput("pass2", "Retapez votre mot de passe pour vérification"));
		var inp = new IntInput("uid","uid", u == null?null:u.id);
		inp.inputType = ITHidden;
		chpassform.addElement(inp);
		
		if (askmailform.isValid()) {
			//send password renewal email
			step = 2;
			
			var email : String = askmailform.getValueOf("email");
			var user = db.User.manager.select(email == $email, false);			
			if (user == null) throw Error(url, "Cet email n'est lié à aucun compte connu");

			var token :String  = haxe.crypto.Md5.encode(Std.string(Std.random(999999)));
			sugoi.db.Cache.set(token,email,60*60*24*3);
			
            var mailer = App.getMailer();
			var m = new sugoi.mail.Mail();
			m.setSender(App.config.get("webmaster_email"), App.config.get("webmaster_name"));
			m.addRecipient(user.email, user.name);
			m.title = App.config.NAME+" : Changement de mot de passe";
			m.setHtmlBodyWithTemplate('mail/forgottenPassword.mtt', { user:user, link:'http://' + App.config.HOST + '/user/forgottenPassword/'+token+"/"+user.id } );
			mailer.send(m,function(mailerRes){
				App.current.logError("MailerResult : "+mailerRes.toString());
			});
			//Sys.sleep(10);
			throw Ok("/user/login","Un lien pour changer votre mot de passe vous a été envoyé sur <b>"+user.email+"</b>");
		}
		
		if (key != null && u!=null) {
			//check key and propose to change pass
			step = 3;
			
			var email = sugoi.db.Cache.get(key);
			if (email == u.email) {
				view.form = chpassform;
			}else {
				throw Error("/user/login","Requête invalide");
			}
		}
		
		
		if (chpassform.isValid()) {
			//change pass
			step = 4;
			
			if ( chpassform.getValueOf("pass1") == chpassform.getValueOf("pass2")) {
				
				var uid = Std.parseInt( chpassform.getValueOf("uid") );
				var user = db.User.manager.get(uid, true);
				var pass = haxe.crypto.Md5.encode(App.config.KEY + Std.string(chpassform.getValueOf("pass1"))); 
				user.pass = pass;
				user.update();
				throw Ok("/user/login","Votre mot de passe a été modifié, vous pouvez maintenant vous connecter avec.");
				
			}else {
				throw Error("/user/login","Vous devez saisir deux fois le même mot-de-passe");
			}
		}
			
		if (step == 1) {
			view.form = askmailform;
		}
		
		view.step = step;
		
	}
	
}