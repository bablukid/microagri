<?php
/**
 * Generated by Haxe 4.0.0-rc.1+1fdd3d5
 */

namespace sugoi\form\filters;

use \php\Boot;

interface IFilter {
	/**
	 * @param mixed $data
	 * 
	 * @return mixed
	 */
	public function filter ($data) ;

	/**
	 * @param string $data
	 * 
	 * @return mixed
	 */
	public function filterString ($data) ;
}

Boot::registerClass(IFilter::class, 'sugoi.form.filters.IFilter');
