<?php

namespace App\Http\Controllers;

use App\Core\ApiRequest;
use App\Core\HttpHelper;
use App\Core\LoggerHelper;
use App\Models\GameUser;
use App\Models\GoogleToken;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class GameUserController extends Controller
{
    // 激活
    public function active(Request $request)
    {
        $request->setTrustedProxies(['192.168.100.254']);
        $log = new LoggerHelper('create_user');
        $log->info('create_user_source:',$request->all());
        $datas = HttpHelper::isVals($request->all(), [
            'v','os','lang','area','device','brand','net','imei','imsi','mo','root','tz','oper','mac','ua','ov','sw','sh','mem','cpu','sdcard','channel'
        ]);
        $log->info('create_user_filter:', $datas);
        if ($user = GameUser::create(array_merge($datas, ['ip'=> $request->getClientIp()]))){
            return json_encode(['rs'=> 1,'msg'=>'success','uid'=>$user->id]);
        }
        return json_encode(['rs'=> 0,'msg'=>'error','uid'=>0]);
    }


}
