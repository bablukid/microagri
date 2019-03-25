<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace haxe\rtti;

use \php\_Boot\HxAnon;
use \php\Boot;

/**
 * An API to access classes and enums metadata at runtime.
 * @see <https://haxe.org/manual/cr-rtti.html>
 */
class Meta {
	/**
	 * Returns the metadata that were declared for the given class fields or enum constructors
	 * 
	 * @param mixed $t
	 * 
	 * @return mixed
	 */
	static public function getFields ($t) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:94: characters 3-25
		$meta = Meta::getMeta($t);
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:95: characters 10-66
		if (($meta === null) || ($meta->fields === null)) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:95: characters 50-52
			return new HxAnon();
		} else {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:95: characters 55-66
			return $meta->fields;
		}
	}

	/**
	 * @param mixed $t
	 * 
	 * @return object
	 */
	static public function getMeta ($t) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:60: characters 4-43
		return Boot::getMeta(Boot::dynamicField($t, 'phpClassName'));
	}

	/**
	 * Returns the metadata that were declared for the given type (class or enum)
	 * 
	 * @param mixed $t
	 * 
	 * @return mixed
	 */
	static public function getType ($t) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:41: characters 3-25
		$meta = Meta::getMeta($t);
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:42: characters 10-60
		if (($meta === null) || ($meta->obj === null)) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:42: characters 47-49
			return new HxAnon();
		} else {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/rtti/Meta.hx:42: characters 52-60
			return $meta->obj;
		}
	}
}

Boot::registerClass(Meta::class, 'haxe.rtti.Meta');
