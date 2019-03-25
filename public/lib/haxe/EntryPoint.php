<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace haxe;

use \php\Boot;

/**
 * If haxe.MainLoop is kept from DCE, then we will insert an haxe.EntryPoint.run() call just at then end of main().
 * This class can be redefined by custom frameworks so they can handle their own main loop logic.
 */
class EntryPoint {
	/**
	 * @var \Array_hx
	 */
	static public $pending;
	/**
	 * @var int
	 */
	static public $threadCount = 0;

	/**
	 * @return float
	 */
	static public function processEvents () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:93: lines 93-103
		while (true) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:96: characters 12-27
			$_this = EntryPoint::$pending;
			if ($_this->length > 0) {
				$_this->length--;
			}
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:96: characters 4-28
			$f = array_shift($_this->arr);
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:101: characters 4-25
			if ($f === null) {
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:101: characters 20-25
				break;
			}
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:102: characters 4-7
			$f();
		}
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:104: characters 3-46
		$time = MainLoop::tick();
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:105: lines 105-106
		if (!MainLoop::hasEvents() && (EntryPoint::$threadCount === 0)) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:106: characters 4-13
			return -1;
		}
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:107: characters 3-14
		return $time;
	}

	/**
	 * Start the main loop. Depending on the platform, this can return immediately or will only return when the application exits.
	 * 
	 * @return void
	 */
	static public function run () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:135: lines 135-141
		while (true) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:136: characters 4-35
			$nextTick = EntryPoint::processEvents();
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:137: lines 137-138
			if ($nextTick < 0) {
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:138: characters 5-10
				break;
			}
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/EntryPoint.hx:139: characters 8-20
			$tmp = $nextTick > 0;
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


		self::$pending = new \Array_hx();
	}
}

Boot::registerClass(EntryPoint::class, 'haxe.EntryPoint');
EntryPoint::__hx__init();
