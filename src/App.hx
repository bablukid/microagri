import db.User;
 
class App extends sugoi.BaseApp {

	public static var current : App = null;
	public static var config = sugoi.BaseApp.config;
	
	
	
	public static function main() {

		sugoi.BaseApp.main();
	}
	
	
	public static function log(t:Dynamic) {
		if(App.config.DEBUG) {
			neko.Web.logMessage(Std.string(t)); //write in Apache error log
			#if weblog
			Weblog.log(t); //write en Weblog console (https://lib.haxe.org/p/weblog/)
			#end
		}
	}
	
	
	/*public static function getMailer():sugoi.mail.IMailer {
		
		if (App.config.DEBUG){	
			return new sugoi.mail.DebugMailer();
		}
		
		if (sugoi.db.Variable.get("mailer") == null){
			throw sugoi.BaseController.ControllerAction.ErrorAction("/","L'envoi des emails n'est pas configuré. Si vous êtes administrateur, <a href='/admin/emails'>vous pouvez le configurer ici</a>");
		}
		
		var conf = {
			smtp_host:sugoi.db.Variable.get("smtp_host"),
			smtp_port:sugoi.db.Variable.get("smtp_port"),
			smtp_user:sugoi.db.Variable.get("smtp_user"),
			smtp_pass:sugoi.db.Variable.get("smtp_pass")			
		}
		
		if (sugoi.db.Variable.get("mailer") == "mandrill"){
			return new sugoi.mail.MandrillMailer().init(conf);
		}else{
			return new sugoi.mail.SmtpMailer().init(conf);
		}

	}
	
	
	
	public static function quickMail(to:String, subject:String, html:String){
		var e = new sugoi.mail.Mail();		
		e.setSubject(subject);
		e.setRecipient(to);			
		e.setSender(App.config.get("default_email"),App.config.NAME);		
		
		var html = App.current.processTemplate("mail/message.mtt", {text:html});		
		e.setHtmlBody(html);
		try{
			App.sendMail(e);
		}catch(e:Dynamic){
			App.current.logError(e);
		}
	}*/
	
	/**
	 * process a template and returns the generated string
	 * @param	tpl
	 * @param	ctx
	 */
	public function processTemplate(tpl:String, ctx:Dynamic):String {
		Reflect.setField(ctx, 'HOST', App.config.HOST);
		
		var tpl = loadTemplate(tpl);
		var html = tpl.execute(ctx);	
		#if php
		if ( html.substr(0, 4) == "null") html = html.substr(4);
		#end
		return html;
	}
	
	
	
}
