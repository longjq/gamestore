<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/10
 * Time: 14:42
 */

namespace App\Core;

use Redis;
class Throttles
{
    private $cache;
    public function __construct()
    {
        $this->cache = Redis::connection();
    }

    public function incr($request)
    {

    }
}