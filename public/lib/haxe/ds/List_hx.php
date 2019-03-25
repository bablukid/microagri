<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace haxe\ds;

use \php\Boot;
use \haxe\ds\_List\ListIterator;
use \haxe\ds\_List\ListNode;

/**
 * A linked-list of elements. The list is composed of element container objects
 * that are chained together. It is optimized so that adding or removing an
 * element does not imply copying the whole list content every time.
 * @see https://haxe.org/manual/std-List.html
 */
class List_hx {
	/**
	 * @var ListNode
	 */
	public $h;
	/**
	 * @var int
	 * The length of `this` List.
	 */
	public $length;
	/**
	 * @var ListNode
	 */
	public $q;

	/**
	 * Creates a new empty list.
	 * 
	 * @return void
	 */
	public function __construct () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:45: characters 3-13
		$this->length = 0;
	}

	/**
	 * Adds element `item` at the end of `this` List.
	 * `this.length` increases by 1.
	 * 
	 * @param mixed $item
	 * 
	 * @return void
	 */
	public function add ($item) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:54: characters 3-39
		$x = new ListNode($item, null);
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:55: lines 55-58
		if ($this->h === null) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:56: characters 4-9
			$this->h = $x;
		} else {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:58: characters 4-14
			$this->q->next = $x;
		}
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:59: characters 3-8
		$this->q = $x;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:60: characters 3-11
		$this->length++;
	}

	/**
	 * Empties `this` List.
	 * This function does not traverse the elements, but simply sets the
	 * internal references to null and `this.length` to 0.
	 * 
	 * @return void
	 */
	public function clear () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:125: characters 3-11
		$this->h = null;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:126: characters 3-11
		$this->q = null;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:127: characters 3-13
		$this->length = 0;
	}

	/**
	 * Returns the first element of `this` List, or null if no elements exist.
	 * This function does not modify `this` List.
	 * 
	 * @return mixed
	 */
	public function first () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:82: characters 10-42
		if ($this->h === null) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:82: characters 26-30
			return null;
		} else {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:82: characters 36-42
			return $this->h->item;
		}
	}

	/**
	 * Tells if `this` List is empty.
	 * 
	 * @return bool
	 */
	public function isEmpty () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:115: characters 3-21
		return $this->h === null;
	}

	/**
	 * Returns an iterator on the elements of the list.
	 * 
	 * @return ListIterator
	 */
	public function iterator () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:162: characters 3-32
		return new ListIterator($this->h);
	}

	/**
	 * Returns a string representation of `this` List, with `sep` separating
	 * each element.
	 * 
	 * @param string $sep
	 * 
	 * @return string
	 */
	public function join ($sep) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:200: characters 3-27
		$s = new \StringBuf();
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:201: characters 3-20
		$first = true;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:202: characters 3-13
		$l = $this->h;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:203: lines 203-210
		while ($l !== null) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:204: lines 204-207
			if ($first) {
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:205: characters 5-18
				$first = false;
			} else {
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:207: characters 5-15
				$s->add($sep);
			}
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:208: characters 4-17
			$s->add($l->item);
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:209: characters 4-14
			$l = $l->next;
		}
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:211: characters 3-22
		return $s->b;
	}

	/**
	 * Returns the last element of `this` List, or null if no elements exist.
	 * This function does not modify `this` List.
	 * 
	 * @return mixed
	 */
	public function last () {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:91: characters 10-42
		if ($this->q === null) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:91: characters 26-30
			return null;
		} else {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:91: characters 36-42
			return $this->q->item;
		}
	}

	/**
	 * Returns a new list where all elements have been converted by the
	 * function `f`.
	 * 
	 * @param \Closure $f
	 * 
	 * @return List_hx
	 */
	public function map ($f) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:235: characters 3-22
		$b = new List_hx();
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:236: characters 3-13
		$l = $this->h;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:237: lines 237-241
		while ($l !== null) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:238: characters 4-19
			$v = $l->item;
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:239: characters 4-14
			$l = $l->next;
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:240: characters 4-15
			$b->add($f($v));
		}
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:242: characters 3-11
		return $b;
	}

	/**
	 * Adds element `item` at the beginning of `this` List.
	 * `this.length` increases by 1.
	 * 
	 * @param mixed $item
	 * 
	 * @return void
	 */
	public function push ($item) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:69: characters 3-36
		$x = new ListNode($item, $this->h);
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:70: characters 3-8
		$this->h = $x;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:71: lines 71-72
		if ($this->q === null) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:72: characters 4-9
			$this->q = $x;
		}
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:73: characters 3-11
		$this->length++;
	}

	/**
	 * Removes the first occurrence of `v` in `this` List.
	 * If `v` is found by checking standard equality, it is removed from `this`
	 * List and the function returns true.
	 * Otherwise, false is returned.
	 * 
	 * @param mixed $v
	 * 
	 * @return bool
	 */
	public function remove ($v) {
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:139: characters 3-31
		$prev = null;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:140: characters 3-13
		$l = $this->h;
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:141: lines 141-154
		while ($l !== null) {
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:142: lines 142-151
			if (Boot::equal($l->item, $v)) {
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:143: lines 143-146
				if ($prev === null) {
					#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:144: characters 6-16
					$this->h = $l->next;
				} else {
					#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:146: characters 6-24
					$prev->next = $l->next;
				}
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:147: lines 147-148
				if ($this->q === $l) {
					#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:148: characters 6-14
					$this->q = $prev;
				}
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:149: characters 5-13
				$this->length--;
				#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:150: characters 5-16
				return true;
			}
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:152: characters 4-12
			$prev = $l;
			#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:153: characters 4-14
			$l = $l->next;
		}
		#/home/bubar/haxe/versions/4.0.0-rc.1/std/haxe/ds/List.hx:155: characters 3-15
		return false;
	}
}

Boot::registerClass(List_hx::class, 'haxe.ds.List');
