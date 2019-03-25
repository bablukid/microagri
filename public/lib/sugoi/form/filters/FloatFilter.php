<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace sugoi\form\filters;

use \php\Boot;

/**
 * Converts a String to a Float
 */
class FloatFilter extends Filter implements IFilter {
	/**
	 * @return void
	 */
	public function __construct () {
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:11: characters 3-10
		parent::__construct();
	}

	/**
	 * @param float $f
	 * 
	 * @return float
	 */
	public function filter ($f) {
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:15: characters 3-11
		return $f;
	}

	/**
	 * @param string $n
	 * 
	 * @return float
	 */
	public function filterString ($n) {
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:20: characters 3-38
		if (($n === null) || ($n === "")) {
			#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:20: characters 27-38
			return null;
		}
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:21: characters 3-26
		$n = trim($n);
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:22: characters 3-39
		$n = \StringTools::replace($n, ",", ".");
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:23: characters 3-29
		$f = \Std::parseFloat($n);
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:24: characters 3-31
		if (is_nan($f)) {
			#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:24: characters 23-31
			$f = null;
		}
		#/home/bubar/projects/sugoi/src/sugoi/form/filters/FloatFilter.hx:25: characters 3-11
		return $f;
	}
}

Boot::registerClass(FloatFilter::class, 'sugoi.form.filters.FloatFilter');
