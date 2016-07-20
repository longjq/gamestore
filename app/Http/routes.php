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
Route::get('/', 'GameController@index');
//Route::get('/', function (\Illuminate\Http\Request $request) {
//    $lang = $request->getLanguages();
//    $local = $request->getLocale();
//    \App::setLocale(strtolower($lang[0]));
//    return view('index', compact('lang', 'local'));
//});

//Route::get('/l', function (\Illuminate\Http\Request $request) {
//    header('<meta name="viewport" content="width=device-width, initial-scale=1">');
//    print_r($request->getLanguages());
//    echo '====';
//    print_r($request->getLocale());
//    dd();
//});

// 设置语言
Route::get('/{locale}', function ($local,\Illuminate\Http\Request $request) {
    $lang = $request->getLanguages();
    // $local = $request->getLocale();
    \App::setLocale($local);
    return view('index', compact('lang','local'));
});

// 更新
Route::get('/m/up', function () {
    return [
        "ver" => "4.1.3",
        "url"=> "http://qqapp.qq.com/app/100653345.html#via=APPCENTER.XX.HOME-HOT",
    ];
});

// 激活 ok
Route::post('/u/create', "GameUserController@active");

// 上报状态
Route::post('/u/status', "GameController@status");

// 分享游戏上报
Route::post('/u/shares', "GameController@share");
