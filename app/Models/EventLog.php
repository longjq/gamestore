<?php

namespace App\Models;

use App\Core\LoggerHelper;
use Illuminate\Database\Eloquent\Model;
use DB;
use Mockery\CountValidator\Exception;
class EventLog extends Model
{
    protected $table = 'event_logs';
    protected $guarded = ['id'];
    private $mapTypes = ['open_app'=>1,'close_app'=>2,'open_game'=>3,'close_game'=>4];

    // 批量事务创建数据
    public function createByTransaction($datas, $uid, $channel)
    {
        try{
            DB::beginTransaction();
            foreach ($datas as $data){
                $opType = $this->mapTypes[$data['type']];

                // 断网情况直接保存数据
                if ($data['net'] === '0') {
                    $this->create(array_merge($this->transField($data),['uid'=>$uid,'channel'=>$channel]));
                    continue;
                }

                // 更新打开应用最后时间
                if (!empty($data['event_id']) && !empty($data['net'])){
                    $datetime = !empty($data['end']) ? $data['end'] : $data['start'];
                    $endDatetime = date('Y-m-d H:i:s', $datetime);
                    // 关闭游戏时更新应用的关闭时间
                    if ($opType == 4 && !empty($data['event_game_id'])) {
                        $this->where('id', $data['event_game_id'])->update([
                            'end_time' => $endDatetime,
                            'event_type'=> $opType,
                            'play_time'=> DB::raw("{$datetime} - UNIX_TIMESTAMP(start_time)")
                        ]);
                    }
                    // 关闭应用时更新应用的关闭时间
                    $this->where('id', $data['event_id'])->update([
                        'end_time' => $endDatetime,
                        'event_type'=> $opType,
                        'play_time'=> DB::raw("{$datetime} - UNIX_TIMESTAMP(start_time)")
                    ]);
                }

                // 关闭app或者关闭游戏
                if ($opType != 2 && $opType != 4){
                    $this->create(array_merge($this->transField($data),['uid'=>$uid]));
                }
                
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
        $event['event_type'] = $this->mapTypes[$data['type']];
        $event['net'] = $data['net'];
        if (!empty($data['game_id'])) $event['game_id'] = $data['game_id'];
        if (!empty($data['start'])) $event['start_time'] = date('Y-m-d H:i:s', intval($data['start']));
        if (!empty($data['end'])) $event['end_time'] = date('Y-m-d H:i:s', intval($data['end']));
        if (!empty($data['start']) && !empty($data['end'])) $event['play_time'] = intval($data['end']) - intval($data['start']);
        if (!empty($data['event_id'])) $event['event_id'] = $data['event_id'];
        return $event;
    }

    public function updateEndDateTime($id, $endDatetime, $opType, $datetime){
        $this->where('id', $id)->update([
                            'end_time' => $endDatetime,
                            'event_type'=> $opType,
                            'play_time'=> DB::raw("{$datetime} - UNIX_TIMESTAMP(start_time)")
                        ]);
    }
}
