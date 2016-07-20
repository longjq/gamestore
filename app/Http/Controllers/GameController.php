<?php

namespace App\Http\Controllers;

use App\Core\LocaleHelper;
use App\Models\EventLog;
use App\Models\Game;
use App\Models\GameUser;
use App\Models\ShareLog;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App;
class GameController extends Controller
{
    public function index(Request $request)
    {
        $langs = $request->getLanguages();
        $lang = 'en';
        if (count($langs)>0) {
            App::setLocale($langs[0]);
            $lang = LocaleHelper::getSupportLang($langs[0]);
        }else{
            App::setLocale($lang);
        }
        $list = Game::where('lang',$lang)->paginate(15);
        return view('index',compact('list'));
    }
    // 应用状态上报
    public function status(Request $request)
    {
        $uid = $request->input('uid');
        $eventJson = json_decode($request->input('events'), true);

        $event = new EventLog();
        if ($event->createByTransaction($eventJson, $uid)){
            return json_encode(['rs'=>1,'msg'=>'success','uid'=>intval($uid)]);
        }
        return json_encode(['rs'=>0,'msg'=>'insert db error','uid'=>0]);
        
    }

    // 游戏分享
    public function share(Request $request)
    {
        $uid = $request->input('uid');
        $shareJson = json_decode($request->input('shares'), true);

        $share = new ShareLog();
        if ($share->createByTransaction($shareJson, $uid)){
            return json_encode(['rs'=>1,'msg'=>'success','uid'=>intval($uid)]);
        }
        return json_encode(['rs'=>0,'msg'=>'insert db error','uid'=>0]);
    }
    
    // 应用分享
    public function shareApp()
    {
        
    }
}
