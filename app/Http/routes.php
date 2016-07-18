<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

// 设置语言
Route::get('/{locale}', function ($locale) {
    App::setLocale($locale);
    return view('index');
});

// 更新
Route::get('/m/up', function () {
    return [
        "ver" => "4.1.3",
        "url"=> "http://qqapp.qq.com/app/100653345.html#via=APPCENTER.XX.HOME-HOT",
    ];
});

// 激活
Route::post('/u/create', function () {
    return [
        "rs" => 1,
        "msg"=> "success",
        "uid"=> 13
    ];
});
