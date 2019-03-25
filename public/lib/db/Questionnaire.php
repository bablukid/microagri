<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace db;

use \php\_Boot\HxAnon;
use \php\Boot;
use \sys\db\Object_hx;
use \sys\db\Manager;
use \haxe\ds\StringMap;

class Questionnaire extends Object_hx {
	/**
	 * @var Manager
	 */
	static public $manager;

	/**
	 * @var string
	 */
	public $endScreen;
	/**
	 * @var int
	 */
	public $id;
	/**
	 * @var string
	 */
	public $name;
	/**
	 * @var string
	 */
	public $startScreen;

	/**
	 * @return StringMap
	 */
	static public function getLabels () {
		#src/db/Questionnaire.hx:36: lines 36-38
		$_g = new StringMap();
		$_g->data["name"] = "Titre";
		return $_g;
	}

	/**
	 * @return void
	 */
	public function __construct () {
		#src/db/Questionnaire.hx:13: characters 9-16
		parent::__construct();
		#src/db/Questionnaire.hx:14: characters 9-33
		$this->startScreen = "/answers";
		#src/db/Questionnaire.hx:15: characters 9-31
		$this->endScreen = "/answers";
	}

	/**
	 * @return Manager
	 */
	public function __getManager () {
		#/home/bubar/projects/spod/src/sys/db/RecordMacros.hx:1432: characters 19-40
		return Questionnaire::$manager;
	}

	/**
	 * @return \Array_hx
	 */
	public function getAllQuestions () {
		#src/db/Questionnaire.hx:23: characters 9-28
		$questions = new \Array_hx();
		#src/db/Questionnaire.hx:24: lines 24-30
		$_g = 0;
		$_g1 = $this->getChapitres();
		while ($_g < $_g1->length) {
			#src/db/Questionnaire.hx:24: characters 13-15
			$ch = ($_g1->arr[$_g] ?? null);
			#src/db/Questionnaire.hx:24: lines 24-30
			++$_g;
			#src/db/Questionnaire.hx:25: lines 25-29
			$_g2 = 0;
			$_g11 = $ch->getPages();
			while ($_g2 < $_g11->length) {
				#src/db/Questionnaire.hx:25: characters 18-19
				$p = ($_g11->arr[$_g2] ?? null);
				#src/db/Questionnaire.hx:25: lines 25-29
				++$_g2;
				#src/db/Questionnaire.hx:26: lines 26-28
				$_g3 = 0;
				$_g12 = $p->getQuestions();
				while ($_g3 < $_g12->length) {
					#src/db/Questionnaire.hx:26: characters 21-22
					$q = ($_g12->arr[$_g3] ?? null);
					#src/db/Questionnaire.hx:26: lines 26-28
					++$_g3;
					#src/db/Questionnaire.hx:27: characters 21-38
					$questions->arr[$questions->length] = $q;
					++$questions->length;

				}

			}

		}

		#src/db/Questionnaire.hx:31: characters 9-25
		return $questions;
	}

	/**
	 * @return \Array_hx
	 */
	public function getChapitres () {
		#src/db/Questionnaire.hx:19: characters 9-87
		return \Lambda::array(Chapitre::$manager->unsafeObjects("SELECT * FROM Chapitre WHERE questionnaireId = " . (Manager::quoteAny(Questionnaire::$manager->unsafeGetId($this))??'null'), false));
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


		self::$manager = new Manager(Boot::getClass(Questionnaire::class));
	}
}

Boot::registerClass(Questionnaire::class, 'db.Questionnaire');
Boot::registerMeta(Questionnaire::class, new HxAnon(["obj" => new HxAnon(["rtti" => \Array_hx::wrap(["oy7:hfieldsby11:startScreenoy4:nameR1y1:tjy17:sys.db.RecordType:9:1i256y6:isNullfgR2oR2R2R3jR4:9:1i256R5fgy2:idoR2R6R3jR4:0:0R5fgy9:endScreenoR2R7R3jR4:9:1i256R5fghR2y13:Questionnairey9:relationsahy7:indexesahy6:fieldsar6r4r2r8hy3:keyaR6hg"])])]));
Questionnaire::__hx__init();
