<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace tink\core\_Promise;

use \tink\core\_Future\SyncFuture;
use \php\Boot;
use \tink\core\_Lazy\LazyConst;

final class Recover_Impl_ {
	/**
	 * @param \Closure $f
	 * 
	 * @return \Closure
	 */
	static public function ofSync ($f) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:312: characters 5-49
		return function ($e)  use (&$f) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:312: characters 32-49
			return new SyncFuture(new LazyConst($f($e)));
		};
	}
}

Boot::registerClass(Recover_Impl_::class, 'tink.core._Promise.Recover_Impl_');
