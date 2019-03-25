<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace tink\core\_Promise;

use \php\_Boot\HxAnon;
use \tink\core\_Lazy\LazyObject;
use \tink\core\_Future\SyncFuture;
use \php\Boot;
use \tink\core\Noise;
use \tink\core\_Callback\LinkObject;
use \tink\core\TypedError;
use \tink\core\Outcome;
use \tink\core\FutureTrigger;
use \tink\core\_Lazy\LazyConst;
use \tink\core\OutcomeTools;
use \tink\core\_Future\Future_Impl_;
use \tink\core\MPair;
use \tink\core\_Callback\CallbackLink_Impl_;
use \tink\core\_Future\FutureObject;

final class Promise_Impl_ {
	/**
	 * @var FutureObject
	 */
	static public $NEVER;
	/**
	 * @var FutureObject
	 */
	static public $NOISE;
	/**
	 * @var FutureObject
	 */
	static public $NULL;

	/**
	 * @param \Closure $f
	 * @param bool $lazy
	 * 
	 * @return FutureObject
	 */
	static public function _new ($f, $lazy = false) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:11: character 3
		if ($lazy === null) {
			$lazy = false;
		}
		$this1 = Future_Impl_::async(function ($cb)  use (&$f) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:13: characters 7-64
			$f(function ($v)  use (&$cb) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:13: characters 21-35
				$cb(Outcome::Success($v));
			}, function ($e)  use (&$cb) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:13: characters 49-63
				$cb(Outcome::Failure($e));
			});
		}, $lazy);
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:11: character 3
		return $this1;
	}

	/**
	 * @param FutureObject $a
	 * @param FutureObject $b
	 * 
	 * @return FutureObject
	 */
	static public function and ($a, $b) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:69: characters 5-61
		return Promise_Impl_::merge($a, $b, function ($a1, $b1) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:69: characters 46-60
			$this1 = new MPair($a1, $b1);
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:69: characters 39-60
			return new SyncFuture(new LazyConst(Outcome::Success($this1)));
		});
	}

	/**
	 * @param \Closure $gen
	 * 
	 * @return \Closure
	 */
	static public function cache ($gen) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:258: characters 5-18
		$p = null;
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:259: lines 259-276
		return function ()  use (&$gen, &$p) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:260: characters 7-19
			$ret = $p;
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:261: lines 261-271
			if ($ret === null) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:262: characters 9-26
				$sync = false;
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:263: lines 263-269
				$ret = Promise_Impl_::next($gen(), function ($o)  use (&$sync, &$p) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:264: lines 264-267
					$o->b->handle(function ($_)  use (&$sync, &$p) {
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:265: characters 13-24
						$sync = true;
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:266: characters 13-21
						$p = null;
					});
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:268: characters 11-21
					return new SyncFuture(new LazyConst(Outcome::Success($o->a)));
				});
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:270: characters 9-26
				if (!$sync) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:270: characters 19-26
					$p = $ret;
				}
			}
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:272: lines 272-275
			$ret1 = $ret->map(function ($o1)  use (&$p) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:273: characters 9-36
				if (!OutcomeTools::isSuccess($o1)) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:273: characters 28-36
					$p = null;
				}
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:274: characters 9-17
				return $o1;
			});
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:272: lines 272-275
			return $ret1->gather();
		};
	}

	/**
	 * @param FutureObject $this
	 * 
	 * @return FutureObject
	 */
	static public function eager ($this1) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:18: characters 5-24
		return $this1->eager();
	}

	/**
	 * @param FutureObject $this
	 * @param \Closure $f
	 * 
	 * @return FutureObject
	 */
	static public function flatMap ($this1, $f) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:24: characters 12-27
		$ret = $this1->flatMap($f);
		return $ret->gather();
	}

	/**
	 * @param FutureObject $this
	 * @param \Closure $cb
	 * 
	 * @return LinkObject
	 */
	static public function handle ($this1, $cb) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:45: characters 5-27
		return $this1->handle($cb);
	}

	/**
	 * @param \Array_hx $a
	 * @param int $concurrency
	 * @param bool $lazy
	 * 
	 * @return FutureObject
	 */
	static public function inParallel ($a, $concurrency = null, $lazy = null) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:188: lines 188-238
		if ($a->length === 0) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:188: characters 25-49
			return new SyncFuture(new LazyConst(Outcome::Success(new \Array_hx())));
		} else {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:189: lines 189-238
			return Future_Impl_::async(function ($cb)  use (&$concurrency, &$a) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:190: lines 190-197
				$result = new \Array_hx();
				$pending = $a->length;
				$links = null;
				$linkArray = new \Array_hx();
				$sync = false;
				$i = 0;
				$iter = $a->iterator();
				$next = null;
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:199: lines 199-203
				$done = function ($o)  use (&$sync, &$links, &$cb) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:200: lines 200-201
					if ($links === null) {
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:200: characters 30-41
						$sync = true;
					} else if ($links !== null) {
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:201: characters 16-30
						$links->cancel();
					}
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:202: characters 11-16
					$cb($o);
				};
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:205: lines 205-208
				$fail = function ($e)  use (&$pending, &$done) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:206: characters 11-22
					$pending = 0;
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:207: characters 11-27
					$done(Outcome::Failure($e));
				};
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:214: lines 214-220
				$set = function ($index, $value)  use (&$next, &$pending, &$iter, &$result, &$done) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:215: characters 11-32
					$result[$index] = $value;
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:216: lines 216-219
					if (($pending -= 1) === 0) {
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:217: characters 13-34
						$done(Outcome::Success($result));
					} else if ($iter->hasNext() && ($pending > 0)) {
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:219: characters 13-19
						$next();
					}
				};
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:222: lines 222-228
				$next = function ()  use (&$set, &$fail, &$iter, &$i, &$linkArray) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:223: characters 23-26
					$i += 1;
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:223: characters 11-27
					$index1 = $i - 1;
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:224: lines 224-227
					$x = $iter->next()->handle(function ($o1)  use (&$set, &$fail, &$index1) {
						$__hx__switch = ($o1->index);
						if ($__hx__switch === 0) {
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:225: characters 26-27
							$v = $o1->params[0];
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:225: characters 30-43
							$set($index1, $v);
						} else if ($__hx__switch === 1) {
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:226: characters 26-27
							$e1 = $o1->params[0];
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:226: characters 30-37
							$fail($e1);
						}
					});
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:224: lines 224-227
					$linkArray->arr[$linkArray->length] = $x;
					++$linkArray->length;

				};
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:230: lines 230-232
				while (true) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:230: characters 15-70
					$tmp = null;
					if ($iter->hasNext() && ($pending > 0)) {
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:230: characters 28-70
						if ($concurrency !== null) {
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:230: characters 52-65
							$concurrency -= 1;
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:230: characters 15-70
							$tmp = ($concurrency + 1) > 0;
						} else {
							$tmp = true;
						}
					} else {
						$tmp = false;
					}
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:230: lines 230-232
					if (!$tmp) {
						break;
					}
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:231: characters 11-17
					$next();
				}
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:234: characters 9-26
				$links = CallbackLink_Impl_::fromMany($linkArray);
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:236: lines 236-237
				if ($sync) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:237: characters 11-25
					if ($links !== null) {
						$links->cancel();
					}
				}
			}, $lazy);
		}
	}

	/**
	 * @param \Array_hx $a
	 * 
	 * @return FutureObject
	 */
	static public function inSequence ($a) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:242: lines 242-250
		$loop = null;
		$loop = function ($index)  use (&$loop, &$a) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:244: lines 244-250
			if ($index === $a->length) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:244: characters 32-34
				return new SyncFuture(new LazyConst(Outcome::Success(new \Array_hx())));
			} else {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:246: lines 246-250
				return Promise_Impl_::next(($a->arr[$index] ?? null), function ($head)  use (&$index, &$loop) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:247: lines 247-249
					return Promise_Impl_::next($loop($index + 1), function ($tail)  use (&$head) {
						#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:248: characters 31-57
						return new SyncFuture(new LazyConst(Outcome::Success((\Array_hx::wrap([$head]))->concat($tail))));
					});
				});
			}
		};
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:253: characters 5-19
		return $loop(0);
	}

	/**
	 * @param FutureObject $this
	 * 
	 * @return FutureObject
	 */
	static public function isSuccess ($this1) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:51: characters 12-55
		$ret = $this1->map(function ($o) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:51: characters 34-54
			return OutcomeTools::isSuccess($o);
		});
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:51: characters 12-55
		return $ret->gather();
	}

	/**
	 * Given an Iterable (e.g. Array) of Promises, handle them one by one with the `yield` function until one of them yields `Some` value
	 * and the returned promise will resolve that value. If all of them yields `None`, the returned promise will resolve to the `finally` promise.
	 * In a nutshell, it is the async version of the following code:
	 * ```haxe
	 * for(promise in promises) {
	 *   switch yield(promise) {
	 *     case Some(v): return v;
	 *     case None:
	 *   }
	 * }
	 * return finally;
	 * ```
	 * @param promises An Iterable (e.g. Array) of Promises
	 * @param yield A function used to handle the promises and should return an Option
	 * @param finally A value to be used when all yields `None`
	 * @return Promise<T>
	 * 
	 * @param object $promises
	 * @param \Closure $yield
	 * @param FutureObject $finally
	 * @param bool $lazy
	 * 
	 * @return FutureObject
	 */
	static public function iterate ($promises, $yield, $finally, $lazy = null) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:90: lines 90-108
		return Future_Impl_::async(function ($cb)  use (&$yield, &$finally, &$promises) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:91: characters 7-38
			$iter = $promises->iterator();
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:92: lines 92-106
			$next = null;
			$next = function ()  use (&$yield, &$next, &$iter, &$finally, &$cb) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:93: lines 93-105
				if ($iter->hasNext()) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:94: lines 94-103
					$iter->next()->handle(function ($o)  use (&$yield, &$next, &$cb) {
						$__hx__switch = ($o->index);
						if ($__hx__switch === 0) {
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:95: characters 26-27
							$v = $o->params[0];
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:96: lines 96-100
							$yield($v)->handle(function ($o1)  use (&$next, &$cb) {
								$__hx__switch = ($o1->index);
								if ($__hx__switch === 0) {
									#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:96: characters 50-51
									$__hx__switch = ($o1->params[0]->index);
									if ($__hx__switch === 0) {
										#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:97: characters 35-38
										$ret = $o1->params[0]->params[0];
										#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:97: characters 42-58
										$cb(Outcome::Success($ret));
									} else if ($__hx__switch === 1) {
										#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:98: characters 37-43
										$next();
									}
								} else if ($__hx__switch === 1) {
									#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:99: characters 30-31
									$e = $o1->params[0];
									#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:99: characters 34-48
									$cb(Outcome::Failure($e));
								}
							});
						} else if ($__hx__switch === 1) {
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:101: characters 26-27
							$e1 = $o->params[0];
							#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:102: characters 15-29
							$cb(Outcome::Failure($e1));
						}
					});
				} else {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:105: characters 11-29
					$finally->handle($cb);
				}
			};
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:107: characters 7-13
			$next();
		}, $lazy);
	}

	/**
	 * @param LazyObject $p
	 * 
	 * @return FutureObject
	 */
	static public function lazy ($p) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:184: characters 5-63
		return Future_Impl_::async(function ($cb)  use (&$p) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:184: characters 38-56
			$p->get()->handle($cb);
		}, true);
	}

	/**
	 * @param FutureObject $p
	 * 
	 * @return FutureObject
	 */
	static public function lift ($p) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:282: characters 5-13
		return $p;
	}

	/**
	 * @param FutureObject $this
	 * @param \Closure $f
	 * 
	 * @return FutureObject
	 */
	static public function map ($this1, $f) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:21: characters 12-23
		$ret = $this1->map($f);
		return $ret->gather();
	}

	/**
	 * @param FutureObject $this
	 * @param \Closure $f
	 * 
	 * @return FutureObject
	 */
	static public function mapError ($this1, $f) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:39: lines 39-42
		$ret = $this1->map(function ($o)  use (&$f) {
			$__hx__switch = ($o->index);
			if ($__hx__switch === 0) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:40: characters 24-25
				return $o;
			} else if ($__hx__switch === 1) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:41: characters 20-21
				$e = $o->params[0];
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:41: characters 24-37
				return Outcome::Failure($f($e));
			}
		});
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:39: lines 39-42
		return $ret->gather();
	}

	/**
	 * @param FutureObject $this
	 * @param FutureObject $other
	 * @param \Closure $merger
	 * @param bool $gather
	 * 
	 * @return FutureObject
	 */
	static public function merge ($this1, $other, $merger, $gather = true) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:66: characters 5-97
		if ($gather === null) {
			$gather = true;
		}
		return Promise_Impl_::next($this1, function ($t)  use (&$other, &$merger) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:66: characters 30-88
			return Promise_Impl_::next($other, function ($a)  use (&$t, &$merger) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:66: characters 61-80
				return $merger($t, $a);
			}, false);
		}, $gather);
	}

	/**
	 * @param FutureObject $this
	 * @param \Closure $f
	 * @param bool $gather
	 * 
	 * @return FutureObject
	 */
	static public function next ($this1, $f, $gather = true) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:54: lines 54-57
		if ($gather === null) {
			$gather = true;
		}
		$ret = $this1->flatMap(function ($o)  use (&$f) {
			$__hx__switch = ($o->index);
			if ($__hx__switch === 0) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:55: characters 22-23
				$d = $o->params[0];
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:55: characters 26-30
				return $f($d);
			} else if ($__hx__switch === 1) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:56: characters 22-23
				$f1 = $o->params[0];
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:56: characters 26-49
				return new SyncFuture(new LazyConst(Outcome::Failure($f1)));
			}
		});
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:54: lines 54-57
		if ($gather) {
			return $ret->gather();
		} else {
			return $ret;
		}
	}

	/**
	 * @param FutureObject $this
	 * 
	 * @return FutureObject
	 */
	static public function noise ($this1) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:48: characters 5-61
		return Promise_Impl_::next($this1, function ($v) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:48: characters 48-60
			return new SyncFuture(new LazyConst(Outcome::Success(Noise::Noise())));
		});
	}

	/**
	 * @param mixed $d
	 * 
	 * @return FutureObject
	 */
	static public function ofData ($d) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:181: characters 12-33
		return new SyncFuture(new LazyConst(Outcome::Success($d)));
	}

	/**
	 * @param TypedError $e
	 * 
	 * @return FutureObject
	 */
	static public function ofError ($e) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:178: characters 12-33
		return new SyncFuture(new LazyConst(Outcome::Failure($e)));
	}

	/**
	 * @param FutureObject $f
	 * 
	 * @return FutureObject
	 */
	static public function ofFuture ($f) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:172: characters 12-26
		$ret = $f->map(Boot::getStaticClosure(Outcome::class, 'Success'));
		return $ret->gather();
	}

	/**
	 * @param Outcome $o
	 * 
	 * @return FutureObject
	 */
	static public function ofOutcome ($o) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:175: characters 5-26
		return new SyncFuture(new LazyConst($o));
	}

	/**
	 * @param FutureObject $s
	 * 
	 * @return FutureObject
	 */
	static public function ofSpecific ($s) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:169: characters 5-36
		return $s;
	}

	/**
	 * @param FutureObject $this
	 * @param \Closure $f
	 * 
	 * @return FutureObject
	 */
	static public function recover ($this1, $f) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:33: lines 33-36
		$ret = $this1->flatMap(function ($o)  use (&$f) {
			$__hx__switch = ($o->index);
			if ($__hx__switch === 0) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:34: characters 20-21
				$d = $o->params[0];
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:34: characters 24-38
				return new SyncFuture(new LazyConst($d));
			} else if ($__hx__switch === 1) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:35: characters 20-21
				$e = $o->params[0];
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:35: characters 24-28
				return $f($e);
			}
		});
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:33: lines 33-36
		return $ret->gather();
	}

	/**
	 * Retry a promise generator repeatedly
	 *
	 * @param gen A function that returns a `Promise`, this function will be called multiple times during the retry process
	 * @param next A callback to be called when an attempt failed. An object will be received containing the info of the last attempt:
	 *   `attempt` is the number of attempts tried, starting from `1`
	 *   `error` is the error produced from the last attempt
	 *   `elasped` is the amount of time (in ms) elapsed since the beginning of the `retry` call
	 *
	 *   If this function's returned promised resolves to an `Error`, this retry will abort with such error. Otherwise if it resolves to a `Success(Noise)`, the retry will continue.
	 *
	 *   Some usage examples:
	 *     - wait longer for later attempts and stop after a limit:
	 *     ```haxe
	 *     function (info) return switch info.attempt {
	 *         case 10: info.error;
	 *         case v: Future.delay(v * 1000, Noise);
	 *     }
	 *     ```
	 *
	 *     - bail out on error codes that are fatal:
	 *     ```haxe
	 *     function (info) return switch info.error.code {
	 *       case Forbidden : info.error; // in this case new attempts probably make no sense
	 *       default: Future.delay(1000, Noise);
	 *     }
	 *     ```
	 *
	 *     - and also actually timeout:
	 *     ```haxe
	 *     // with using DateTools
	 *     function (info) return
	 *       if (info.elapsed > 2.minutes()) info.error
	 *       else Future.delay(1000, Noise);
	 *     ```
	 *
	 * @return Promise<T>
	 * 
	 * @param \Closure $gen
	 * @param \Closure $next
	 * 
	 * @return FutureObject
	 */
	static public function retry ($gen, $next) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:150: characters 5-54
		$stamp = function () {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:150: characters 22-54
			return microtime(true) * 1000;
		};
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:151: characters 5-25
		$start = $stamp();
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:152: lines 152-159
		$attempt = null;
		$attempt = function ($count)  use (&$next, &$stamp, &$start, &$gen, &$attempt) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:153: lines 153-158
			$f = function ($error)  use (&$count, &$next, &$stamp, &$start, &$attempt) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:155: characters 64-79
				$f1 = $stamp() - $start;
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:155: lines 155-156
				return Promise_Impl_::next($next(new HxAnon([
					"attempt" => $count,
					"error" => $error,
					"elapsed" => $f1,
				])), function ($_)  use (&$count, &$attempt) {
					#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:156: characters 32-57
					return $attempt($count + 1);
				});
			};
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:153: lines 153-158
			$ret = $gen()->flatMap(function ($o)  use (&$f) {
				$__hx__switch = ($o->index);
				if ($__hx__switch === 0) {
					$d = $o->params[0];
					return new SyncFuture(new LazyConst($o));
				} else if ($__hx__switch === 1) {
					$e = $o->params[0];
					return $f($e);
				}
			});
			return $ret->gather();
		};
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:152: lines 152-159
		return $attempt(1);
	}

	/**
	 * @param FutureObject $this
	 * @param mixed $v
	 * 
	 * @return FutureObject
	 */
	static public function swap ($this1, $v) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:60: characters 5-40
		return Future_Impl_::_tryMap($this1, function ($_)  use (&$v) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:60: characters 32-40
			return $v;
		});
	}

	/**
	 * @param FutureObject $this
	 * @param TypedError $e
	 * 
	 * @return FutureObject
	 */
	static public function swapError ($this1, $e) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:63: characters 5-42
		return Promise_Impl_::mapError($this1, function ($_)  use (&$e) {
			#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:63: characters 33-41
			return $e;
		});
	}

	/**
	 *  Creates a new `PromiseTrigger`
	 * 
	 * @return FutureTrigger
	 */
	static public function trigger () {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:289: characters 12-32
		$this1 = new FutureTrigger();
		return $this1;
	}

	/**
	 * @param FutureObject $this
	 * @param \Closure $f
	 * 
	 * @return FutureObject
	 */
	static public function tryRecover ($this1, $f) {
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:27: lines 27-30
		$ret = $this1->flatMap(function ($o)  use (&$f) {
			$__hx__switch = ($o->index);
			if ($__hx__switch === 0) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:28: characters 20-21
				$d = $o->params[0];
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:28: characters 24-38
				return new SyncFuture(new LazyConst($o));
			} else if ($__hx__switch === 1) {
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:29: characters 20-21
				$e = $o->params[0];
				#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:29: characters 24-28
				return $f($e);
			}
		});
		#/home/bubar/haxe/haxe_libraries/tink_core/1.21.0/haxelib/src/tink/core/Promise.hx:27: lines 27-30
		return $ret->gather();
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


		self::$NULL = new SyncFuture(new LazyConst(Outcome::Success(null)));
		self::$NOISE = new SyncFuture(new LazyConst(Outcome::Success(Noise::Noise())));
		$ret = Future_Impl_::$NEVER->map(Boot::getStaticClosure(Outcome::class, 'Success'));
		self::$NEVER = $ret->gather();
	}
}

Boot::registerClass(Promise_Impl_::class, 'tink.core._Promise.Promise_Impl_');
Promise_Impl_::__hx__init();
