<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
class ShareLog extends Model
{
    protected $table = 'share_logs';
    protected $guarded = ['id'];

    // 批量事务创建数据
    public function createByTransaction($datas, $uid)
    {
        try{
            DB::beginTransaction();
            foreach ($datas as $data){
                $this->create(array_merge($this->transField($data),['uid'=>$uid]));
            }
            DB::commit();
        }catch (\Exception $e){
            DB::rollback();
            return false;
        }
        return true;
    }

    // 实体类
    private function transField($data)
    {
        $share = [];
        $share['target'] = $data['target'];
        $share['share_time'] = date('Y-m-d H:i:s', intval($data['time']));
        $share['share_type'] = $data['type'];
        if (!empty(['game_id'])) $share['game_id'] = $data['game_id'];
        if (!empty(['title'])) $share['title'] = $data['title'];
        return $share;
    }
}
