<?php

namespace App\Http\Controllers;

use App\Models\EventLog;
use App\Models\GameUser;
use App\Models\ShareLog;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class GameController extends Controller
{
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
