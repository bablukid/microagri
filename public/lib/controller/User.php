<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace controller;

use \sugoi\form\elements\IntInput;
use \php\_Boot\HxDynamicStr;
use \php\_Boot\HxAnon;
use \db\User as DbUser;
use \php\Boot;
use \sugoi\form\elements\StringInput;
use \sys\db\Manager;
use \sugoi\db\Cache;
use \sugoi\BaseController;
use \php\_Boot\HxException;
use \sugoi\mail\Mail;
use \sugoi\form\Form;
use \sugoi\form\elements\InputType;

class User extends BaseController {

	/**
	 * @return void
	 */
	public function __construct () {
		#src/controller/User.hx:10: characters 3-10
		parent::__construct();
	}

	/**
	 *  Admin : Edit users
	 * 
	 * @return void
	 */
	public function doDefault () {
		#src/controller/User.hx:18: characters 3-37
		$this->view->users = DbUser::$manager->all();
	}

	/**
	 * @param DbUser $user
	 * 
	 * @return void
	 */
	public function doEdit ($user) {
		#src/controller/User.hx:24: characters 3-45
		$form = Form::fromSpod($user);
		#src/controller/User.hx:25: characters 3-37
		$form->getElement("pass")->value = "";
		#src/controller/User.hx:26: characters 9-41
		$form->removeElementByName("lang");
		#src/controller/User.hx:27: characters 9-42
		$form->removeElementByName("cdate");
		#src/controller/User.hx:28: characters 9-42
		$form->removeElementByName("ldate");
		#src/controller/User.hx:29: characters 9-41
		$form->removeElementByName("pass");
		#src/controller/User.hx:31: lines 31-37
		if ($form->isValid()) {
			#src/controller/User.hx:32: characters 4-15
			$user->lock();
			#src/controller/User.hx:33: characters 4-21
			$form->toSpod($user);
			#src/controller/User.hx:35: characters 4-17
			$user->update();
			#src/controller/User.hx:36: characters 4-9
			throw new HxException($this->Ok("/user", "Utilisateur mis à jour"));
		}
		#src/controller/User.hx:39: characters 3-19
		$this->view->form = $form;
		#src/controller/User.hx:40: characters 3-39
		$this->view->title = "Modifier " . ($user->name??'null');
	}

	/**
	 * Ask for password renewal by mail when password is forgotten
	 * 
	 * @param string $key
	 * @param DbUser $u
	 * 
	 * @return void
	 */
	public function doForgottenPassword ($key = null, $u = null) {
		#src/controller/User.hx:108: characters 3-16
		$step = 1;
		#src/controller/User.hx:109: characters 3-39
		$url = "/user/forgottenPassword";
		#src/controller/User.hx:112: characters 3-42
		$askmailform = new Form("askemail");
		#src/controller/User.hx:113: characters 3-75
		$askmailform->addElement(new StringInput("email", "Saisissez votre email"));
		#src/controller/User.hx:116: characters 3-39
		$chpassform = new Form("chpass");
		#src/controller/User.hx:117: characters 3-79
		$chpassform->addElement(new StringInput("pass1", "Votre nouveau mot de passe"));
		#src/controller/User.hx:118: characters 3-98
		$chpassform->addElement(new StringInput("pass2", "Retapez votre mot de passe pour vérification"));
		#src/controller/User.hx:119: characters 3-60
		$inp = new IntInput("uid", "uid", ($u === null ? null : $u->id));
		#src/controller/User.hx:120: characters 3-27
		$inp->inputType = InputType::ITHidden();
		#src/controller/User.hx:121: characters 3-29
		$chpassform->addElement($inp);
		#src/controller/User.hx:123: lines 123-145
		if ($askmailform->isValid()) {
			#src/controller/User.hx:125: characters 4-12
			$step = 2;
			#src/controller/User.hx:127: characters 4-57
			$email = $askmailform->getValueOf("email");
			#src/controller/User.hx:128: characters 4-62
			$user = DbUser::$manager->unsafeObjects("SELECT * FROM User WHERE " . (Manager::quoteAny($email)??'null') . " = email", false)->first();
			#src/controller/User.hx:129: characters 4-27
			if ($user === null) {
				#src/controller/User.hx:129: characters 22-27
				throw new HxException($this->Error($url, "Cet email n'est lié à aucun compte connu"));
			}
			#src/controller/User.hx:131: characters 4-80
			$token = md5(\Std::string(mt_rand(0, 999998)));
			#src/controller/User.hx:132: characters 4-46
			Cache::set($token, $email, 259200);
			#src/controller/User.hx:134: characters 13-42
			$mailer = \App::getMailer();
			#src/controller/User.hx:135: characters 4-34
			$m = new Mail();
			#src/controller/User.hx:136: characters 4-84
			$m->setSender(\App::$config->get("webmaster_email"), \App::$config->get("webmaster_name"));
			#src/controller/User.hx:137: characters 4-41
			$m->addRecipient($user->email, $user->name);
			#src/controller/User.hx:138: characters 4-61
			$m->title = (\App::$config->NAME??'null') . " : Changement de mot de passe";
			#src/controller/User.hx:139: characters 4-156
			$m->setHtmlBodyWithTemplate("mail/forgottenPassword.mtt", new HxAnon([
				"user" => $user,
				"link" => "http://" . (\App::$config->HOST??'null') . "/user/forgottenPassword/" . ($token??'null') . "/" . ($user->id??'null'),
			]));
			#src/controller/User.hx:140: lines 140-142
			$mailer->send($m, function ($mailerRes) {
				#src/controller/User.hx:141: characters 5-65
				\App::$current->logError("MailerResult : " . (HxDynamicStr::wrap($mailerRes)->toString()??'null'));
			});
			#src/controller/User.hx:144: characters 4-9
			throw new HxException($this->Ok("/user/login", "Un lien pour changer votre mot de passe vous a été envoyé sur <b>" . ($user->email??'null') . "</b>"));
		}
		#src/controller/User.hx:147: lines 147-157
		if (($key !== null) && ($u !== null)) {
			#src/controller/User.hx:149: characters 4-12
			$step = 3;
			#src/controller/User.hx:151: characters 4-40
			$email1 = Cache::get($key);
			#src/controller/User.hx:152: lines 152-156
			if ($email1 === $u->email) {
				#src/controller/User.hx:153: characters 5-27
				$this->view->form = $chpassform;
			} else {
				#src/controller/User.hx:155: characters 5-10
				throw new HxException($this->Error("/user/login", "Requête invalide"));
			}
		}
		#src/controller/User.hx:160: lines 160-176
		if ($chpassform->isValid()) {
			#src/controller/User.hx:162: characters 4-12
			$step = 4;
			#src/controller/User.hx:164: lines 164-175
			if (Boot::equal($chpassform->getValueOf("pass1"), $chpassform->getValueOf("pass2"))) {
				#src/controller/User.hx:166: characters 5-60
				$uid = \Std::parseInt($chpassform->getValueOf("uid"));
				#src/controller/User.hx:167: characters 5-47
				$user1 = DbUser::$manager->unsafeGet($uid, true);
				#src/controller/User.hx:168: characters 5-100
				$pass = md5((\App::$config->KEY??'null') . (\Std::string($chpassform->getValueOf("pass1"))??'null'));
				#src/controller/User.hx:169: characters 5-21
				$user1->pass = $pass;
				#src/controller/User.hx:170: characters 5-18
				$user1->update();
				#src/controller/User.hx:171: characters 5-10
				throw new HxException($this->Ok("/user/login", "Votre mot de passe a été modifié, vous pouvez maintenant vous connecter avec."));
			} else {
				#src/controller/User.hx:174: characters 5-10
				throw new HxException($this->Error("/user/login", "Vous devez saisir deux fois le même mot-de-passe"));
			}
		}
		#src/controller/User.hx:178: lines 178-180
		if ($step === 1) {
			#src/controller/User.hx:179: characters 4-27
			$this->view->form = $askmailform;
		}
		#src/controller/User.hx:182: characters 3-19
		$this->view->step = $step;
	}

	/**
	 * @return void
	 */
	public function doInsert () {
		#src/controller/User.hx:45: characters 3-28
		$user = new DbUser();
		#src/controller/User.hx:46: characters 3-45
		$form = Form::fromSpod($user);
		#src/controller/User.hx:48: characters 9-41
		$form->removeElementByName("lang");
		#src/controller/User.hx:49: characters 9-42
		$form->removeElementByName("cdate");
		#src/controller/User.hx:50: characters 9-42
		$form->removeElementByName("ldate");
		#src/controller/User.hx:52: lines 52-59
		if ($form->isValid()) {
			#src/controller/User.hx:53: characters 4-21
			$form->toSpod($user);
			#src/controller/User.hx:54: characters 13-29
			$user->lang = "fr";
			#src/controller/User.hx:55: characters 4-66
			$user->pass = md5((\App::$config->KEY??'null') . ($user->pass??'null'));
			#src/controller/User.hx:56: characters 13-36
			$user->cdate = \Date::now();
			#src/controller/User.hx:57: characters 4-17
			$user->insert();
			#src/controller/User.hx:58: characters 4-9
			throw new HxException($this->Ok("/user", "Utilisateur créé"));
		}
		#src/controller/User.hx:61: characters 3-19
		$this->view->form = $form;
		#src/controller/User.hx:62: characters 3-38
		$this->view->title = "Créer un utilisateur";
	}

	/**
	 * Login form
	 * 
	 * @return void
	 */
	public function doLogin () {
		#src/controller/User.hx:70: characters 9-35
		$f = new Form("login");
		#src/controller/User.hx:71: characters 9-65
		$f->addElement(new StringInput("email", "Email", null, true));
		#src/controller/User.hx:72: characters 9-66
		$e = new StringInput("pass", "Mot de passe", null, true);
		#src/controller/User.hx:73: characters 9-33
		$e->inputType = InputType::ITPassword();
		#src/controller/User.hx:74: characters 9-24
		$f->addElement($e);
		#src/controller/User.hx:77: lines 77-86
		if ($f->isValid()) {
			#src/controller/User.hx:78: characters 13-96
			$p = md5((\App::$config->KEY??'null') . (\Std::string($f->getValueOf("pass"))??'null'));
			#src/controller/User.hx:79: characters 4-103
			$user = DbUser::$manager->unsafeObjects("SELECT * FROM User WHERE email = " . (Manager::quoteAny(\Std::string($f->getValueOf("email")))??'null') . ((" AND " . (Manager::nullCompare("pass", Manager::quoteAny($p), true)??'null'))??'null'), true)->first();
			#src/controller/User.hx:80: lines 80-85
			if ($user === null) {
				#src/controller/User.hx:81: characters 5-10
				throw new HxException($this->Error("/user/login", "Mauvais identifiant ou mot de passe"));
			} else {
				#src/controller/User.hx:83: characters 5-38
				\App::$current->session->setUser($user);
				#src/controller/User.hx:84: characters 5-10
				throw new HxException($this->Ok("/", "Bonjour " . ($user->name??'null')));
			}
		}
		#src/controller/User.hx:88: characters 9-33
		$this->view->title = "Connexion";
		#src/controller/User.hx:89: characters 3-76
		$this->view->text = "<a href='/user/forgottenPassword'>Mot de passe oublié ?</a>";
		#src/controller/User.hx:90: characters 9-22
		$this->view->form = $f;
	}

	/**
	 * Log out
	 * 
	 * @return void
	 */
	public function doLogout () {
		#src/controller/User.hx:97: lines 97-100
		if ($this->app->user !== null) {
			#src/controller/User.hx:98: characters 4-32
			\App::$current->session->delete();
			#src/controller/User.hx:99: characters 4-9
			throw new HxException($this->Redirect("/"));
		}
	}

	/**
	 * @internal
	 * @access private
	 */
	static public function __hx__init ()
	{
		static $called = false;
		if ($called) return;
		$called = true;


	}
}

Boot::registerClass(User::class, 'controller.User');
Boot::registerMeta(User::class, new HxAnon([
	"obj" => new HxAnon(["dispatchConfig" => \Array_hx::wrap(["oy6:logoutjy21:haxe.web.DispatchRule:1:1ahy17:forgottenPasswordjR1:3:1jR1:1:1ajy18:haxe.web.MatchRule:8:1jR3:3:0jR3:8:1jR3:7:2y7:db.Userfhy4:editjR1:3:1jR1:0:1jR3:7:2R4fy6:insertjR1:3:1jR1:1:1ahy4:filejR1:0:1jR3:3:0y5:loginjR1:3:1jR1:1:1ahy7:defaultjR1:3:1jR1:1:1ahg"])]),
	"fields" => new HxAnon([
		"doDefault" => new HxAnon([
			"admin" => null,
			"tpl" => \Array_hx::wrap(["user/default.mtt"]),
		]),
		"doEdit" => new HxAnon([
			"admin" => null,
			"tpl" => \Array_hx::wrap(["form.twig"]),
		]),
		"doInsert" => new HxAnon([
			"admin" => null,
			"tpl" => \Array_hx::wrap(["form.twig"]),
		]),
		"doLogin" => new HxAnon(["tpl" => \Array_hx::wrap(["form.twig"])]),
		"doForgottenPassword" => new HxAnon(["tpl" => \Array_hx::wrap(["form.twig"])]),
	]),
]));
User::__hx__init();
