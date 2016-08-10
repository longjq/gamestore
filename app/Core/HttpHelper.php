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
    public static function isVals($datas, $fields, $need = true)
    {
        $vals = [];
        foreach ($fields as $field){
            if ($need) {
                $vals[$field] = isset($datas[$field]) ? $datas[$field] : '';
            } else{;
                if (isset($datas[$field]))
                    $vals[$field] = $datas[$field];
            }
                
        }
        return $vals;
    }

}