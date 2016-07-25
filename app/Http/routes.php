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
Route::group(['prefix' => 'admin'], function(){

    Route::get('index', 'Admin\DashController@index');
});
Route::get('/go', function(){
    return view('login');
});

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
// Route::get('/{locale}', function ($local,\Illuminate\Http\Request $request) {
//     $lang = $request->getLanguages();
//     // $local = $request->getLocale();
//     \App::setLocale($local);
//     return view('index', compact('lang','local'));
// });

// 刷新游戏数据
Route::get('/refresh/games', function(\Illuminate\Http\Request $request){
    $dir = 'E:\\www\\gamestore\\public\\g\\';
    $exFiles = ['js','.DS_Store'];
    $maps = [
        "ljsp" => "Hex Puzzle",
        "tingche" => "Parking",
        "wxdz" => "Infinite Straight",
        "3dqcybs" => "Doodle History 3D",
        "Bubblefish"=>"Bubble Fish Shooter",
        "NinjaFlips"=>"Ninja Flips",
        "ai"=>"Candy LoveMatch",
        "ajkyq"=>"Let Lover Together",
        "bdx"=>"Baccarat",
        "bzylls"=>"Octopus Hold Hands",
        "chengzhang"=>"让我成长",
        "dzt"=>"Pinball",
        "gldsys"=>"Gru's Lab",
        "gwlm"=>"Monster Connect",
        "gyzs"=>"光线直射",
        "jiangshiganran"=>"Zombie Infect",
        "jiedong"=>"Freeze Thaw",
        "maya"=>"Marble legend",
        "mfllk"=>"魔法消除",
        "mmsz"=>"Aqua Thief ",
        "tangguo"=>"Candy Puzzle",
        "tf"=>"抵御海盗",
        "xingxingxianglian"=>"Constell Ations",
        "xybp"=>"Follow Tuto",
        "yansetongxing"=>"Color Valley",
        "yblc"=>"One Touch Drawing",
        "yd"=>"圆点",
        "yibihua"=>"一笔画",
        "tkdz" => "Battle City",
        "dqcs" => "Perfect Kick",
        "kickups" => "KICK UPS",
        "xjmt" => "Star Motor",
        "byu" => "捕鱼达人",
        "djqgk" => "Chainsaw Slicer",
        "hypk" => "Naruto Cool Running",
        "guodongrenwu"=> "Jelly Quest",
        "jinhuashi2048"=>"进化史2048",
        "dapopinata"=>"Pinata Muncher",
        "gulaodekuangshi"=>"Ancient Ore",
        "luomazhiyue"=>"Dating In Rome",
        "ktfx" => "Cartoon Flight",
        "msts" => "Succeed In Escaping",
        "gqds" => "Piano Master",
        "ssq" => "双色球",
        "pmdtw" => "Escape The Haze",
        "snrjjc60m" => "坚持60秒",
        "hxsdlr" => "Wake The Santa",
        "htsys" => "Biological Evolution",
        "sudoku" => "Sudoku",
        "mml" => "Memory Challenge",
        "bdfm" => "Crazy Cat",
        "blackjack" => "Black Jack",
        "freekick" => "Free Kick Master",
        "hgy" => "Draw A Circle",
        "xiadaoluobinhan" => "侠盗罗宾汉",
        "bingdongeluosifangkuai" => "冰冻俄罗斯方块",
        "chengshilianjie"=>"City Counnect",
        "shuijingduidie"=>"水晶堆叠",
        "shizijunfangyuzhan2"=>"十字军防御战2",
        "nipenlidexiaozhu3"=>"Piggy In The Puddle",
        "paopaolixianji"=>"Bubble Adventures",
        "shiluodedaoyu3"=>"Lost Island",
        "djz"=>"Striker 1945",
        "bunengsi"=>"No One Die",
        "hmk"=>"Slide The Block",
        "jidan"=>"Egg Toss",
        "jjb"=>"捡金币",
        "jtlq"=>"Street Basketball",
        "mlss"=>"Across The Road",
        "mspt"=>"Beauty Puzzle",
        "ppl"=>"Puzzle Bobble",
        "snooker"=>"斯诺克",
        "ssrz"=>"Ninja Up",
        "wuziqi"=>"Gobang",
        "xmxx" => "Popstar",
        "zuiqiangyanli" => "最强眼力",
        "ttt" => "Harry Down",
    ];
    if (is_dir($dir)){
        if ($db = opendir($dir)){
            while ( ($file = readdir($db)) !== false){
                // echo "filename: $file : filetype: " . filetype($dir . $file) . "<br/>";
                if ($file != '.' && $file != '..'){
                    // echo "<hr/>".$file."<br/>";
                    if (in_array($file, $exFiles)) continue;
                    $sonDir = $dir.$file.'\\';
                    if ($sonDB = opendir($sonDir)){
                        while ( ($sonFile = readdir($sonDB)) !== false ){
                            if ($sonFile != '.' && $sonFile != '..'){
                                if (in_array($sonFile, $exFiles)) continue;
                                $gamePath = '\\g\\'.$file.'\\'.$sonFile.'\\index.html';
                                $arrPathSize = \App\Core\FileHelper::getDirectorySize($dir.$file.'\\'.$sonFile);
                                echo $gamePath.'========'.\App\Core\FileHelper::getRealSize($arrPathSize['size']);

                                if ( file_exists( $dir.$file.'\\'.$sonFile.'\\icon.jpg' )  ){
                                    $icon = $file.'\\'.$sonFile.'\\icon.jpg';
                                    echo "========";
                                    echo $icon;
                                }else{
                                    $icon = $file.'\\'.$sonFile.'\\icon.png';
                                    echo "=========";
                                    echo $icon;
                                }
                                echo "<hr/>";

                                \App\Models\Game::create([
                                    'lang'=>'en',
                                    'title'=> isset( $maps[$sonFile] ) ? $maps[$sonFile] : $gamePath,
                                    'hot_base'=>1000,
                                    'hot'=>0,
                                    'icon_url'=> 'http://ga.wgchao.com/g/'.$icon,
                                    'stars'=> rand(1,5),
                                    'screen_display' => 0,
                                    'open' => 1,
                                    'recommend' => 0,
                                    'desc' => isset( $maps[$sonFile] ) ? $maps[$sonFile] : $gamePath,
                                    'path' => 'http://ga.wgchao.com/g/'.$file.'/'.$sonFile.'/index.html',
                                    'size' => $arrPathSize['size']

                                ]);

                            }
                        }
                        closedir($sonDB);
                    }
                }
            }
            closedir($db);
        }
    }
});

// 更新
Route::get('/v/up', 'GameController@upgrade');

// 热点
Route::get('/v/hot', 'GameController@hot');

// 推送
Route::get('/v/push', function () {
    return [
        "title" => "this is title",
        "content"=> "this is content",
        "apk_url"=>"http://qqapp.qq.com/app/100653345.html#via=APPCENTER.XX.HOME-HOT"
    ];
});

// 激活 ok
Route::post('/u/create', "GameUserController@active");

// 上报状态
Route::post('/u/status', "GameController@status");

// 分享上报
Route::post('/u/share', "GameController@share");
