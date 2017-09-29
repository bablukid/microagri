class App extends sugoi.BaseApp {

	public static var current : App = null;
	public static var config = sugoi.BaseApp.config;
	
	
	
	public static function main() {

		sugoi.BaseApp.main();
	}
	
	
	public static function log(t:Dynamic) {
		if(App.config.DEBUG) {
			sugoi.Web.logMessage(Std.string(t)); //write in Apache error log
			#if weblog
			Weblog.log(t); //write en Weblog console (https://lib.haxe.org/p/weblog/)
			#end
		}
	}
	
	
	public static function getMailer():sugoi.mail.IMailer {
		
		if (App.config.DEBUG){	
			return new sugoi.mail.DebugMailer();
		}
			
		var conf = {
			smtp_host:App.config.get("smtp_host"),
			smtp_port:App.config.get("smtp_port"),
			smtp_user:App.config.get("smtp_user"),
			smtp_pass:App.config.get("smtp_pass")			
		};
		
		return new sugoi.mail.SmtpMailer().init(conf);
	}
	
	
	/*
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
