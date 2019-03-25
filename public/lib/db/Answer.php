<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace db;

use \php\_Boot\HxAnon;
use \php\Boot;
use \sys\db\Object_hx;
use \sys\db\Manager;
use \php\_Boot\HxException;

/**
 * one answer per user-dataset-question
 */
class Answer extends Object_hx {
	/**
	 * @var Manager
	 */
	static public $manager;

	/**
	 * @var string
	 */
	public $answer;
	/**
	 * @var \Date
	 */
	public $cdate;
	/**
	 * @var int
	 */
	public $dataset;
	/**
	 * @var \Date
	 */
	public $ldate;
	/**
	 * @var Question
	 */
	public $question;
	/**
	 * @var mixed
	 */
	public $questionId;
	/**
	 * @var User
	 */
	public $user;
	/**
	 * @var mixed
	 */
	public $userId;

	/**
	 * @param User $user
	 * @param Question $question
	 * @param int $_dataset
	 * @param bool $allowUserIdForce
	 * 
	 * @return Answer
	 */
	static public function get ($user, $question, $_dataset = null, $allowUserIdForce = true) {
		#src/db/Answer.hx:25: lines 25-34
		if ($allowUserIdForce === null) {
			$allowUserIdForce = true;
		}
		#src/db/Answer.hx:26: characters 9-90
		$dataset = ($_dataset === null ? Boot::dynamicField(\App::$current->session->data, 'dataset') : $_dataset);
		#src/db/Answer.hx:28: lines 28-31
		if ($allowUserIdForce) {
			#src/db/Answer.hx:30: characters 12-129
			if (Boot::dynamicField(\App::$current->session->data, 'forceUserId') !== null) {
				#src/db/Answer.hx:30: characters 59-129
				$user = User::$manager->unsafeGet(Boot::dynamicField(\App::$current->session->data, 'forceUserId'), false);
			}
		}
		#src/db/Answer.hx:33: characters 9-93
		return Answer::$manager->unsafeObjects("SELECT * FROM Answer WHERE userId = " . (Manager::quoteAny(User::$manager->unsafeGetId($user))??'null') . ((" AND dataset = " . (Manager::quoteAny($dataset)??'null'))??'null') . ((" AND questionId = " . (Manager::quoteAny(Question::$manager->unsafeGetId($question))??'null'))??'null'), false)->first();
	}

	/**
	 * @param string $ref
	 * @param User $user
	 * 
	 * @return string
	 */
	static public function getAnswerOf ($ref, $user) {
		#src/db/Answer.hx:63: characters 9-126
		if (Boot::dynamicField(\App::$current->session->data, 'forceUserId') !== null) {
			#src/db/Answer.hx:63: characters 56-126
			$user = User::$manager->unsafeGet(Boot::dynamicField(\App::$current->session->data, 'forceUserId'), false);
		}
		#src/db/Answer.hx:65: characters 9-43
		$q = Question::getByRef($ref);
		#src/db/Answer.hx:66: characters 9-26
		if ($q === null) {
			#src/db/Answer.hx:66: characters 21-26
			throw new HxException("no question with ref " . ($ref??'null'));
		}
		#src/db/Answer.hx:67: characters 9-39
		$a = Answer::get($user, $q);
		#src/db/Answer.hx:68: characters 9-26
		if ($a === null) {
			#src/db/Answer.hx:68: characters 21-26
			throw new HxException("no answer for question " . ($ref??'null') . " and user " . ($user->id??'null'));
		}
		#src/db/Answer.hx:69: characters 9-24
		return $a->answer;
	}

	/**
	 * @param User $user
	 * @param Question $question
	 * 
	 * @return Answer
	 */
	static public function getOrCreate ($user, $question) {
		#src/db/Answer.hx:37: characters 9-34
		$a = null;
		#src/db/Answer.hx:38: characters 9-107
		$dataset = (Boot::dynamicField(\App::$current->session->data, 'dataset') === null ? 1 : Boot::dynamicField(\App::$current->session->data, 'dataset'));
		#src/db/Answer.hx:41: characters 9-126
		if (Boot::dynamicField(\App::$current->session->data, 'forceUserId') !== null) {
			#src/db/Answer.hx:41: characters 56-126
			$user = User::$manager->unsafeGet(Boot::dynamicField(\App::$current->session->data, 'forceUserId'), false);
		}
		#src/db/Answer.hx:43: characters 9-89
		$a = Answer::$manager->unsafeObjects("SELECT * FROM Answer WHERE userId = " . (Manager::quoteAny(User::$manager->unsafeGetId($user))??'null') . ((" AND dataset = " . (Manager::quoteAny($dataset)??'null'))??'null') . ((" AND questionId = " . (Manager::quoteAny(Question::$manager->unsafeGetId($question))??'null'))??'null'), true)->first();
		#src/db/Answer.hx:45: lines 45-47
		if ((\App::$current->user->id !== $user->id) && !\App::$current->user->isAdmin()) {
			#src/db/Answer.hx:46: characters 13-18
			throw new HxException("accès interdit");
		}
		#src/db/Answer.hx:49: lines 49-56
		if ($a === null) {
			#src/db/Answer.hx:50: characters 13-29
			$a = new Answer();
			#src/db/Answer.hx:51: characters 13-34
			$a->set_question($question);
			#src/db/Answer.hx:52: characters 13-32
			$a->dataset = $dataset;
			#src/db/Answer.hx:53: characters 13-26
			$a->set_user($user);
			#src/db/Answer.hx:55: characters 13-23
			$a->insert();
		}
		#src/db/Answer.hx:57: characters 9-17
		return $a;
	}

	/**
	 * @return void
	 */
	public function __construct () {
		#src/db/Answer.hx:20: characters 9-16
		parent::__construct();
		#src/db/Answer.hx:21: characters 9-27
		$this->cdate = \Date::now();
		#src/db/Answer.hx:22: characters 9-27
		$this->ldate = \Date::now();
	}

	/**
	 * @return Manager
	 */
	public function __getManager () {
		#/home/bubar/projects/spod/src/sys/db/RecordMacros.hx:1432: characters 19-40
		return Answer::$manager;
	}

	/**
	 * @return Question
	 */
	public function get_question () {
		#src/db/Answer.hx:13: characters 28-62
		return Question::$manager->__hx__renamed__get($this, "question", "questionId", false);
	}

	/**
	 * @return User
	 */
	public function get_user () {
		#src/db/Answer.hx:12: characters 24-50
		return User::$manager->__hx__renamed__get($this, "user", "userId", false);
	}

	/**
	 * @param Question $_v
	 * 
	 * @return Question
	 */
	public function set_question ($_v) {
		#src/db/Answer.hx:13: characters 28-62
		return Question::$manager->__hx__renamed__set($this, "question", "questionId", $_v);
	}

	/**
	 * @param User $_v
	 * 
	 * @return User
	 */
	public function set_user ($_v) {
		#src/db/Answer.hx:12: characters 24-50
		return User::$manager->__hx__renamed__set($this, "user", "userId", $_v);
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


		self::$manager = new Manager(Boot::getClass(Answer::class));
	}
}

Boot::registerClass(Answer::class, 'db.Answer');
Boot::registerMeta(Answer::class, new HxAnon(["obj" => new HxAnon(["rtti" => \Array_hx::wrap(["oy7:hfieldsby6:userIdoy4:nameR1y1:tjy17:sys.db.RecordType:1:0y6:isNullfgy10:questionIdoR2R6R3r3R5fgy5:ldateoR2R7R3jR4:11:0R5fgy7:datasetoR2R8R3r3R5fgy5:cdateoR2R9R3r6R5fgy6:answeroR2R10R3jR4:9:1i128R5tghR2y6:Answery9:relationsaoy6:moduley7:db.Usery7:cascadefy4:lockfy4:propy4:userR5fy4:typeR14y3:keyR1goR13y11:db.QuestionR15fR16fR17y8:questionR5fR19R21R20R6ghy7:indexesahy6:fieldsar7r9r8r5r2r4hR20aR8R6R1hg"])])]));
Boot::registerGetters('db\\Answer', [
	'question' => true,
	'user' => true
]);
Boot::registerSetters('db\\Answer', [
	'question' => true,
	'user' => true
]);
Answer::__hx__init();
