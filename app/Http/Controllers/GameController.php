<?php

namespace App\Http\Controllers;

use App\Core\LocaleHelper;
use App\Models\EventLog;
use App\Models\Game;
use App\Models\GameUser;
use App\Models\GoogleToken;
use App\Models\ShareLog;
use App\Models\WebConfig;
use Illuminate\Http\Request;
use App\Core\HttpHelper;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App;
use DB;
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
        $configs = WebConfig::lists('value','key');
        return view('index', compact('list', 'langs', 'lang', 'configs'));
    }

    // 获取应用id，记录打开应用事件
    public function open(Request $request)
    {
        $request->setTrustedProxies(['192.168.100.254']);
        $uid = $request->input('uid');
        $start = $request->input('start');
        $datas = HttpHelper::isVals($request->all(), [
            'v','area','lang','device','imei',
            'mo','tz','ua','ov','sw','sh','channel'
        ]);
        $user = GameUser::find($uid);
        if ($user->v != $datas['v'] || $user->channel != $datas['channel']){
            $user->area = $datas['area'];
            $user->lang = $datas['lang'];
            $user->device = $datas['device'];
            $user->imei = $datas['imei'];
            $user->mo = $datas['mo'];
            $user->tz = $datas['tz'];
            $user->ua = $datas['ua'];
            $user->ov = $datas['ov'];
            $user->channel = $datas['channel'];
            $user->v = $datas['v'];
            $user->save();
        }

        $datas = array_merge($datas, [
            'ip'=> $request->getClientIp(),
            'event_type'=>1,
            'net'=>1,
            'start_time' => date('Y-m-d H:i:s', $start)
        ]);

        $open = EventLog::create([
            'uid' => $uid,
            'event_type' => 1,
            'channel' => $datas['channel'],
            'net' => 1,
            'start_time' => date('Y-m-d H:i:s', $start)
        ]);
        return json_encode([
            'rs'=>1,
            'msg'=>'success:'.date('Y-m-d H:i:s', $start),
            'event_id'=>$open->id
        ]);
    }

    // 获取游戏id，记录打开应用事件
    public function openGame(Request $request)
    {
        $uid = $request->input('uid');
        $start = $request->input('start');
        $event_id = $request->input('event_id');
        $game_id = $request->input('game_id');
        $channel = $request->input('channel');

        $openGame = EventLog::create([
            'uid' => $uid,
            'event_type' => 3,
            'start_time' => date('Y-m-d H:i:s', $start),
            'net' => 1,
            'event_id'=> $event_id,
            'game_id'=> $game_id,
            'channel' => $channel
        ]);
        // 更新应用关闭时间
        EventLog::where('id', $event_id)->update([
             'end_time' => date('Y-m-d H:i:s', $start),
             'event_type'=> 3,
             'play_time'=> DB::raw("{$start} - UNIX_TIMESTAMP(start_time)")
        ]);
        return json_encode([
            'rs'=>1,
            'msg'=>'success:'.date('Y-m-d H:i:s', $start),
            'event_game_id'=>$openGame->id
        ]);
    }

    // 应用状态上报
    public function status(Request $request)
    {
        $uid = $request->input('uid');
        $channel = $request->input('channel');
        $token = $request->input('google_token');
        if ($uid) {
            if ($token){
                $this->googleToken->saveToken($uid, $token);
            }

            $eventJson = json_decode($request->input('events'), true);
            $event = new EventLog();
            
            if ($event->createByTransaction($eventJson, $uid, $channel)) {
                return json_encode(['rs' => 1, 'msg' => 'success:'.$channel, 'uid' => intval($uid)]);
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
        $webConfigs = App\Models\WebConfig::lists('value','key');
        if (isset($map[$ver])) {
            return json_encode([
                'rs'      => 1,
                'msg'     => 'success',
                'ver'     => $map[$ver]['ver'],
                'upgrade' => $map[$ver]['upgrade'],
                'url'     => $map[$ver]['url'],
                "ad_is_banner"=>$webConfigs['ad_is_banner'],
                "ad_screen"=>$webConfigs['ad_screen'],
            ]);
        }
        return json_encode([
            'rs'  => 1,
            'msg' => 'success',
            "ad_is_banner"=>intval($webConfigs['ad_is_banner']),
            "ad_screen"=>intval($webConfigs['ad_screen']),
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
