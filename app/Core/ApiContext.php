<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/11
 * Time: 0:07
 */

namespace App\Core;


class ApiContext
{
    public $status;
    public $msg;
    public $data;

    public function __construct($status = false, $msg = 'error', $data = [])
    {
        $this->status = $status;
        $this->msg = $msg;
        $this->data = $data;
    }
}