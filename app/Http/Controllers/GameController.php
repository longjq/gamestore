<?php

namespace App\Http\Controllers;

use App\Core\LocaleHelper;
use App\Models\EventLog;
use App\Models\Game;
use App\Models\GameUser;
use App\Models\GoogleToken;
use App\Models\ShareLog;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App;

class GameController extends Controller
{
    private $googleToken;
    public function __construct()
    {
        $this->googleToken = new GoogleToken();
    }

    // 首页
    public function index(Request $request)
    {
        $langs = $request->getLanguages();
        $lang = 'en';
        if (count($langs) > 0) {
            $lang = LocaleHelper::getSupportLang($langs[0]);
            App::setLocale($lang);
            $con = '|go custome';
        } else {
            App::setLocale($lang);
            $con = '|go en';
        }
        $lang = 'en';
        App::setLocale($lang);
        $list = Game::where('lang', $lang)->where('open',1)->orderBy('hot_base','desc')->paginate(100);
        $lang = $lang . $con;
        return view('index', compact('list', 'langs', 'lang'));
    }

    // 获取应用id，记录打开应用事件
    public function open(Request $request)
    {
        $uid = $request->input('uid');
        $start = $request->input('start');

        $open = EventLog::create([
            'uid' => $uid,
            'event_type' => 1,
            'start_time' => date('Y-m-d H:i:s', $start),
            'net' => 1
        ]);
        return json_encode([
            'rs'=>1,
            'msg'=>'success:'.date('Y-m-d H:i:s', $start),
            'event_id'=>$open->id
        ]);
    }

    // 应用状态上报
    public function status(Request $request)
    {
        $uid = $request->input('uid');
        $token = $request->input('google_token');
        if ($uid) {
            if ($token){
                $this->googleToken->saveToken($uid, $token);
            }

            $eventJson = json_decode($request->input('events'), true);
            $event = new EventLog();
            if ($event->createByTransaction($eventJson, $uid)) {
                return json_encode(['rs' => 1, 'msg' => 'success', 'uid' => intval($uid)]);
            }
        }
        return json_encode(['rs' => 0, 'msg' => 'insert db error', 'uid' => 0]);

    }

    // 分享
    public function share(Request $request)
    {
        $uid = $request->input('uid');
        $shareJson = json_decode($request->input('shares'), true);

        $share = new ShareLog();
        if ($share->createByTransaction($shareJson, $uid)) {
            return json_encode(['rs' => 1, 'msg' => 'success', 'uid' => intval($uid)]);
        }
        return json_encode(['rs' => 0, 'msg' => 'insert db error', 'uid' => 0]);
    }

    // 更新
    public function upgrade(Request $request)
    {
        $map = [
            'v1' => [
                'ver'     => '1.2',
                'upgrade' => 'upgrade 1.2 ... ... ...',
                'url'     => 'http://ga.wgchao.com/upgrade/1.2.apk',
                'ad_is_banner'=>1,
                'ad_screen'=>50            ],
            'v2' => [
                'ver'     => '1.3',
                'upgrade' => 'upgrade 1.3 ... ... ...',
                'url'     => 'http://ga.wgchao.com/upgrade/1.3.apk',
                'ad_is_banner'=>1,
                'ad_screen'=>30
            ],
        ];

        $uid = $request->input('uid');
        $ver = $request->input('ver');

        if (isset($map[$ver])) {
            return json_encode([
                'rs'      => 1,
                'msg'     => 'success',
                'ver'     => $map[$ver]['ver'],
                'upgrade' => $map[$ver]['upgrade'],
                'url'     => $map[$ver]['url'],
                "ad_is_banner"=>1,
                "ad_screen"=>65,
            ]);
        }
        return json_encode([
            'rs'  => 1,
            'msg' => 'success',
            "ad_is_banner"=>1,
            "ad_screen"=>65,
        ]);
    }

    // 热点+n
    public function hot(Request $request)
    {
        if ($request->ajax()){
            $gameId = $request->input('game_id');
            if ($gameId){
                $incr = rand(1,5);
                $rows = Game::where('id',$gameId)->increment('hot', $incr);
                if ($rows){
                    return json_encode([
                        'rs'=>1,
                        'msg'=>'success',
                        'i'=>$incr,
                        'r'=>$rows
                    ]);
                }
            }
        }
        return json_encode([
            'rs'=>0,
            'msg'=>'error'
        ]);
    }
}
