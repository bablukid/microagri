<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace tink\core\_Error;

use \php\Boot;

final class Stack_Impl_ {
	/**
	 * @param \Array_hx $this
	 * 
	 * @return string
	 */
	static public function toString ($this1) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Error.hx:170: lines 170-174
		return "Error stack not available. Compile with -D error_stack.";
	}
}

Boot::registerClass(Stack_Impl_::class, 'tink.core._Error.Stack_Impl_');
