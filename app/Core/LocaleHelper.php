<?php
/**
 * Created by PhpStorm.
 * User: longjq
 * Date: 2016/7/20
 * Time: 10:57
 */

namespace App\Core;

class LocaleHelper
{
    public static function getSupportLang($lang)
    {
        $support = [
            'zh_cn'=>'zh_cn',
            'zh_HANS_CN'=>'zh_cn',
            'en_US' => 'en',
        ];
        
        if (isset($support[$lang])) {
            return $support[$lang];
        }
        return 'en';
    }
}