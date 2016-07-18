<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/7/18
 * Time: 23:20
 */

namespace App\Core;


class HttpHelper
{
    public static function isVals($datas, $fields)
    {
        $vals = [];
        foreach ($fields as $field){
             $vals[$field] = isset($datas[$field]) ? $datas[$field] : '';
        }
        return $vals;
    }

}