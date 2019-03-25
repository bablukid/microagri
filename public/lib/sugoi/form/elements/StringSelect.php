<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace sugoi\form\elements;

use \php\Boot;

/**
 * ...
 * @author fbarbut
 */
class StringSelect extends Selectbox {
	/**
	 * @param string $name
	 * @param string $label
	 * @param \Array_hx $data
	 * @param string $selected
	 * @param bool $required
	 * @param string $nullMessage
	 * @param string $attributes
	 * 
	 * @return void
	 */
	public function __construct ($name, $label, $data = null, $selected = null, $required = null, $nullMessage = null, $attributes = null) {
		#/home/bubar/projects/sugoi/src/sugoi/form/elements/StringSelect.hx:7: lines 7-19
		parent::__construct($name, $label, $data, $selected, $required, $nullMessage, $attributes);
	}

	/**
	 * @param string $str
	 * 
	 * @return string
	 */
	public function getTypedValue ($str) {
		#/home/bubar/projects/sugoi/src/sugoi/form/elements/StringSelect.hx:11: characters 3-30
		$str = trim($str);
		#/home/bubar/projects/sugoi/src/sugoi/form/elements/StringSelect.hx:12: lines 12-16
		if (($str === "") || ($str === null)) {
			#/home/bubar/projects/sugoi/src/sugoi/form/elements/StringSelect.hx:13: characters 4-15
			return null;
		} else {
			#/home/bubar/projects/sugoi/src/sugoi/form/elements/StringSelect.hx:15: characters 4-14
			return $str;
		}
	}
}

Boot::registerClass(StringSelect::class, 'sugoi.form.elements.StringSelect');
