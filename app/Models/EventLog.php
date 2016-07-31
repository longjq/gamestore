<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
use Mockery\CountValidator\Exception;

class EventLog extends Model
{
    protected $table = 'event_logs';
    protected $guarded = ['id'];

    // 批量事务创建数据
    public function createByTransaction($datas, $uid)
    {
        try{
            DB::beginTransaction();
            foreach ($datas as $data){
                if (!empty($data['event_id'] && !empty($data['net'])){
                    $datetime = !empty($data['end']) ? $data['end'] : $data['start'];
                    $this->where('id', $data['event_id'])->update([
                        'end_time' => date('Y-m-d H:i:s', $datetime)
                    ]);
                }
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
        $mapType = ['open_app'=>1,'close_app'=>2,'open_game'=>3,'close_game'=>4,'app'=>5,'game'=>6];
        $event['event_type'] = $mapType[$data['type']];
        $event['net'] = $data['net'];
        if (!empty($data['game_id'])) $event['game_id'] = $data['game_id'];
        if (!empty($data['start'])) $event['start_time'] = date('Y-m-d H:i:s', intval($data['start']));
        if (!empty($data['end'])) $event['end_time'] = date('Y-m-d H:i:s', intval($data['end']));
        if (!empty($data['start']) && !empty($data['end'])) $event['play_time'] = intval($data['end']) - intval($data['start']);
        if (!empty($data['event_id'])) $event['event_id'] = $data['event_id'];
        return $event;
    }
}
