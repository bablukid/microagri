<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace sugoi\helper;

use \php\Boot;
use \haxe\CallStack;
use \php\_Boot\HxClosure;
use \php\_Boot\HxException;

/**
 * Simple class to print a HTML table
 *
 * @author fbarbut
 *
 * It should be able to print a lot of structures :
 * - a spod request result
 * - arrays, lists
 * - anonymous objects
 *
 * usage :
 * var t = new Table();
 * t.title = "the table";
 * t.setContent( [{toto:1,tata:2},{toto:4,tata:7}] );
 * neko.Lib.print( t.toString(); );
 */
class Table {
	/**
	 * @var \Array_hx
	 */
	public $content;
	/**
	 * @var \Array_hx
	 */
	public $head;
	/**
	 * @var string
	 */
	public $tableCSSClass;
	/**
	 * @var string
	 */
	public $title;

	/**
	 * @param string $defaultCss
	 * 
	 * @return void
	 */
	public function __construct ($defaultCss = null) {
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:32: characters 3-52
		if ($defaultCss !== null) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:32: characters 26-52
			$this->tableCSSClass = $defaultCss;
		}
	}

	/**
	 * Iterable -> Array
	 * 
	 * @param mixed $iterable
	 * 
	 * @return \Array_hx
	 */
	public function fromIterableToArray ($iterable) {
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:90: characters 3-16
		$out = new \Array_hx();
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:91: characters 3-46
		$iterable1 = $iterable;
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:92: characters 14-22
		$el = $iterable1->iterator();
		while ($el->hasNext()) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:92: lines 92-94
			$el1 = $el->next();
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:93: characters 4-16
			$out->arr[$out->length] = $el1;
			++$out->length;
		}

		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:95: characters 3-13
		return $out;
	}

	/**
	 * Reflectable -> Array
	 * 
	 * @param mixed $reflectable
	 * 
	 * @return \Array_hx
	 */
	public function fromReflectableToArray ($reflectable) {
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:102: characters 3-16
		$out = new \Array_hx();
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:104: lines 104-107
		$_g = 0;
		$_g1 = \Reflect::fields($reflectable);
		while ($_g < $_g1->length) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:104: characters 8-13
			$field = ($_g1->arr[$_g] ?? null);
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:104: lines 104-107
			++$_g;
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:105: characters 8-60
			$f = \Reflect::field($reflectable, $field);
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:105: lines 105-106
			if (!(($f instanceof \Closure) || ($f instanceof HxClosure)) && ($field !== "__cache__") && ($field !== "__lock")) {
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:106: characters 5-47
				$x = \Reflect::field($reflectable, $field);
				$out->arr[$out->length] = $x;
				++$out->length;
			}
		}

		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:108: characters 3-13
		return $out;
	}

	/**
	 * @return string
	 */
	public function go () {
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:48: characters 3-19
		$output = "";
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:49: characters 3-90
		$output = ($output??'null') . "<table " . ((($this->tableCSSClass !== null ? "class=\"" . ($this->tableCSSClass??'null') . "\"" : ""))??'null') . ">";
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:51: lines 51-63
		if ($this->title !== null) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:52: characters 4-19
			$length = 0;
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:53: lines 53-58
			$_g = 0;
			$_g1 = $this->content;
			while ($_g < $_g1->length) {
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:53: characters 8-11
				$row = ($_g1->arr[$_g] ?? null);
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:53: lines 53-58
				++$_g;
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:54: lines 54-56
				$_g2 = 0;
				while ($_g2 < $row->length) {
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:54: characters 9-13
					$cell = ($row->arr[$_g2] ?? null);
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:54: lines 54-56
					++$_g2;
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:55: characters 6-14
					++$length;
				}

				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:57: characters 5-10
				break;
			}

			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:62: characters 4-68
			$output = ($output??'null') . "<tr><th colspan='" . ($length??'null') . "'>" . ($this->title??'null') . "</th></tr>";
		}
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:66: lines 66-72
		if ($this->head !== null) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:67: characters 4-20
			$output = ($output??'null') . "<tr>";
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:68: lines 68-70
			$_g3 = 0;
			$_g11 = $this->head;
			while ($_g3 < $_g11->length) {
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:68: characters 10-14
				$cell1 = ($_g11->arr[$_g3] ?? null);
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:68: lines 68-70
				++$_g3;
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:69: characters 5-38
				$output = ($output??'null') . "<th>" . ($cell1??'null') . "</th>";
			}

			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:71: characters 4-21
			$output = ($output??'null') . "</tr>";
		}
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:74: lines 74-80
		$_g4 = 0;
		$_g12 = $this->content;
		while ($_g4 < $_g12->length) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:74: characters 8-11
			$row1 = ($_g12->arr[$_g4] ?? null);
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:74: lines 74-80
			++$_g4;
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:75: characters 4-20
			$output = ($output??'null') . "<tr>";
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:76: lines 76-78
			$_g5 = 0;
			while ($_g5 < $row1->length) {
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:76: characters 9-13
				$cell2 = ($row1->arr[$_g5] ?? null);
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:76: lines 76-78
				++$_g5;
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:77: characters 5-34
				$output = ($output??'null') . "<td>" . (\Std::string($cell2)??'null') . "</td>";
			}

			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:79: characters 4-21
			$output = ($output??'null') . "</tr>";
		}

		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:81: characters 3-23
		$output = ($output??'null') . "</table>";
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:82: characters 3-16
		return $output;
	}

	/**
	 * @param mixed $c
	 * 
	 * @return \Array_hx
	 */
	public function setContent ($c) {
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:124: characters 3-12
		$this->head = new \Array_hx();
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:127: characters 3-15
		$this->content = new \Array_hx();
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:128: characters 3-16
		$row = new \Array_hx();
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:131: lines 131-160
		try {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:132: lines 132-146
			$_g = 0;
			$_g1 = $this->toArray($c);
			while ($_g < $_g1->length) {
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:132: characters 9-12
				$obj = ($_g1->arr[$_g] ?? null);
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:132: lines 132-146
				++$_g;
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:133: characters 5-13
				$row = new \Array_hx();
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:134: lines 134-144
				$_g2 = 0;
				$_g11 = $this->toArray($obj);
				while ($_g2 < $_g11->length) {
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:134: characters 11-15
					$prop = ($_g11->arr[$_g2] ?? null);
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:134: lines 134-144
					++$_g2;
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:136: lines 136-142
					if ($this->head->length === 0) {
						#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:137: lines 137-141
						$_g3 = 0;
						$_g12 = \Reflect::fields($obj);
						while ($_g3 < $_g12->length) {
							#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:137: characters 13-17
							$prop1 = ($_g12->arr[$_g3] ?? null);
							#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:137: lines 137-141
							++$_g3;
							#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:139: characters 13-56
							$f = \Reflect::field($obj, $prop1);
							#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:139: lines 139-140
							if (!(($f instanceof \Closure) || ($f instanceof HxClosure)) && ($prop1 !== "__cache__")) {
								#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:140: characters 10-25
								$_this = $this->head;
								$_this->arr[$_this->length] = $prop1;
								++$_this->length;
							}
						}
					}
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:143: characters 7-21
					$row->arr[$row->length] = $prop;
					++$row->length;

				}

				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:145: characters 5-22
				$_this1 = $this->content;
				$_this1->arr[$_this1->length] = $row;
				++$_this1->length;

			}
		} catch (\Throwable $__hx__caught_e) {
			CallStack::saveExceptionTrace($__hx__caught_e);
			$__hx__real_e = ($__hx__caught_e instanceof HxException ? $__hx__caught_e->e : $__hx__caught_e);
			$e = $__hx__real_e;
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:148: characters 4-16
			$this->content = new \Array_hx();
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:149: characters 4-28
			$this->head = \Array_hx::wrap([
				"field",
				"value",
			]);
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:151: lines 151-158
			$_g4 = 0;
			$_g13 = \Reflect::fields($c);
			while ($_g4 < $_g13->length) {
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:151: characters 9-14
				$field = ($_g13->arr[$_g4] ?? null);
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:151: lines 151-158
				++$_g4;
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:152: characters 5-18
				$row1 = new \Array_hx();
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:153: characters 9-52
				$f1 = \Reflect::field($c, $field);
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:153: lines 153-156
				if (!(($f1 instanceof \Closure) || ($f1 instanceof HxClosure)) && ($field !== "__cache__") && ($field !== "__lock")) {
					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:154: characters 6-21
					$row1->arr[$row1->length] = $field;
					++$row1->length;

					#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:155: characters 6-39
					$x = \Reflect::field($c, $field);
					$row1->arr[$row1->length] = $x;
					++$row1->length;

				}
				#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:157: characters 5-22
				$_this2 = $this->content;
				$_this2->arr[$_this2->length] = $row1;
				++$_this2->length;

			}

		}
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:161: characters 3-17
		return $this->content;
	}

	/**
	 * @param mixed $c
	 * 
	 * @return \Array_hx
	 */
	public function toArray ($c) {
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:113: lines 113-119
		if (Boot::dynamicField($c, 'iterator') !== null) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:115: characters 4-33
			return $this->fromIterableToArray($c);
		} else {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:118: characters 4-36
			return $this->fromReflectableToArray($c);
		}
	}

	/**
	 * @param mixed $param
	 * 
	 * @return string
	 */
	public function toString ($param = null) {
		#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:37: lines 37-42
		if ($param !== null) {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:38: characters 4-21
			$this->setContent($param);
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:39: characters 4-15
			return $this->go();
		} else {
			#/home/bubar/projects/sugoi/src/sugoi/helper/Table.hx:41: characters 4-17
			return "null";
		}
	}

	public function __toString() {
		return $this->toString();
	}
}

Boot::registerClass(Table::class, 'sugoi.helper.Table');
