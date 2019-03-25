<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace haxe\ds;

use \php\Boot;
use \php\_Boot\HxEnum;

/**
 * An Option is a wrapper type which can either have a value (Some) or not a
 * value (None).
 * @see https://haxe.org/manual/std-Option.html
 */
class Option extends HxEnum {
	/**
	 * @return Option
	 */
	static public function None () {
		static $inst = null;
		if (!$inst) $inst = new Option('None', 1, []);
		return $inst;
	}

	/**
	 * @param mixed $v
	 * 
	 * @return Option
	 */
	static public function Some ($v) {
		return new Option('Some', 0, [$v]);
	}

	/**
	 * Returns array of (constructorIndex => constructorName)
	 *
	 * @return string[]
	 */
	static public function __hx__list () {
		return [
			1 => 'None',
			0 => 'Some',
		];
	}

	/**
	 * Returns array of (constructorName => parametersCount)
	 *
	 * @return int[]
	 */
	static public function __hx__paramsCount () {
		return [
			'None' => 0,
			'Some' => 1,
		];
	}
}

Boot::registerClass(Option::class, 'haxe.ds.Option');
