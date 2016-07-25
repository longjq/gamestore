<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
class GoogleToken extends Model
{
    protected $table = 'google_tokens';
    protected $guarded = ['id'];
    
    // 更新token
    public static function saveToken($uid, $token)
    {
        return DB::insert("INSERT INTO google_tokens(uid,google_token,created_at,updated_at) VALUES(?,?,?,?) 
ON DUPLICATE KEY UPDATE google_token=VALUES(google_token),updated_at=VALUES(updated_at)",
            [$uid,
            $token,
            date('Y-m-d H:i:s'),
            date('Y-m-d H:i:s')]
            );
    }
}
