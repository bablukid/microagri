<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace twig;

use \php\Boot;
use \twig\loader\ILoader;
use \php\_Boot\HxClosure;
use \haxe\ds\StringMap;
use \haxe\ds\List_hx;

/**
 * Twig Environment adapter
 */
class TwigEnvironment {
	/**
	 * @var \Twig_Environment
	 */
	public $env;

	/**
	 * @param ILoader $loader
	 * @param object $options
	 * 
	 * @return void
	 */
	public function __construct ($loader, $options) {
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:15: characters 9-86
		$this->env = new \Twig_Environment($loader, (array)($options));
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:18: characters 9-49
		$this->env->addFilter(new \Twig_Filter("debug", Boot::getInstanceClosure($this, 'debug')));
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:19: characters 9-57
		$this->env->addFilter(new \Twig_Filter("tophparray", Boot::getInstanceClosure($this, 'phpArray')));
	}

	/**
	 * @param \Twig_Extension $ext
	 * 
	 * @return void
	 */
	public function addExtension ($ext) {
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:61: characters 9-30
		$this->env->addExtension($ext);
	}

	/**
	 * @param \Twig_Filter $filter
	 * 
	 * @return void
	 */
	public function addFilter ($filter) {
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:57: characters 9-30
		$this->env->addFilter($filter);
	}

	/**
	 * @param \Twig_Function $func
	 * 
	 * @return void
	 */
	public function addFunction ($func) {
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:53: characters 9-30
		$this->env->addFunction($func);
	}

	/**
	 * Try to print usual haxe types as string
	 * 
	 * @param mixed $p
	 * 
	 * @return string
	 */
	public function debug ($p) {
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:68: characters 9-34
		if ($p === null) {
			#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:68: characters 21-34
			return "null";
		}
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:69: characters 9-29
		return \Std::string($p);
	}

	/**
	 * @param \Array_hx $arr
	 * 
	 * @return mixed
	 */
	public function phpArray ($arr) {
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:73: characters 9-39
		return $arr->arr;
	}

	/**
	 * @param string $tpl
	 * @param mixed $params
	 * 
	 * @return string
	 */
	public function render ($tpl, $params) {
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:24: characters 29-54
		$this1 = [];
		$cleanedParams_data = $this1;
		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:27: lines 27-47
		$_g = 0;
		$_g1 = \Reflect::fields($params);
		while ($_g < $_g1->length) {
			#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:27: characters 8-13
			$fname = ($_g1->arr[$_g] ?? null);
			#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:27: lines 27-47
			++$_g;
			#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:28: characters 4-54
			$field = \Reflect::field($params, $fname);
			#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:30: lines 30-46
			if (($field instanceof \Closure) || ($field instanceof HxClosure)) {
				#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:32: characters 5-54
				$this->env->addFunction(new \Twig_Function($fname, $field));
			} else if (($field instanceof \Array_hx)) {
				#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:35: characters 17-65
				$v = $field->arr;
				$cleanedParams_data[$fname] = $v;
			} else if (($field instanceof List_hx)) {
				#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:37: characters 17-79
				$v1 = \Lambda::array($field)->arr;
				$cleanedParams_data[$fname] = $v1;
			} else if (($field instanceof StringMap)) {
				#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:39: characters 17-77
				$v2 = $field->data;
				$cleanedParams_data[$fname] = $v2;
			} else {
				#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:45: characters 17-45
				$v3 = $field;
				$cleanedParams_data[$fname] = $v3;
			}
		}

		#/home/bubar/projects/hxtwig/src/twig/TwigEnvironment.hx:49: characters 9-77
		return $this->env->render($tpl, $cleanedParams_data);
	}
}

Boot::registerClass(TwigEnvironment::class, 'twig.TwigEnvironment');
