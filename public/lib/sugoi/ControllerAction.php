<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace sugoi;

use \php\Boot;
use \php\_Boot\HxEnum;

class ControllerAction extends HxEnum {
	/**
	 * @param string $url
	 * @param string $text
	 * 
	 * @return ControllerAction
	 */
	static public function ErrorAction ($url, $text = null) {
		return new ControllerAction('ErrorAction', 1, [$url, $text]);
	}

	/**
	 * @param string $url
	 * @param string $text
	 * 
	 * @return ControllerAction
	 */
	static public function OkAction ($url, $text = null) {
		return new ControllerAction('OkAction', 2, [$url, $text]);
	}

	/**
	 * @param string $url
	 * 
	 * @return ControllerAction
	 */
	static public function RedirectAction ($url) {
		return new ControllerAction('RedirectAction', 0, [$url]);
	}

	/**
	 * Returns array of (constructorIndex => constructorName)
	 *
	 * @return string[]
	 */
	static public function __hx__list () {
		return [
			1 => 'ErrorAction',
			2 => 'OkAction',
			0 => 'RedirectAction',
		];
	}

	/**
	 * Returns array of (constructorName => parametersCount)
	 *
	 * @return int[]
	 */
	static public function __hx__paramsCount () {
		return [
			'ErrorAction' => 2,
			'OkAction' => 2,
			'RedirectAction' => 1,
		];
	}
}

Boot::registerClass(ControllerAction::class, 'sugoi.ControllerAction');
