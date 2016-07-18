<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InitTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('v',10)->nullable();
            $table->string('os',10)->nullable();
            $table->string('lang',10)->nullable();
            $table->string('device',10)->nullable();
            $table->string('brand',30)->nullable();
            $table->string('net',30)->nullable();
            $table->string('imei',30)->nullable();
            $table->string('imsi',30)->nullable();
            $table->string('mo',20)->nullable();
            $table->tinyInteger('root')->default(0)->comment('1=已root，0=未root,默认为0');
            $table->string('tz',10)->nullable();
            $table->string('oper',10)->nullable();
            $table->string('mac',30)->nullable();
            $table->string('ua',100)->nullable();
            $table->string('ov',10)->nullable();
            $table->integer('sw')->nullable();
            $table->integer('sh')->nullable();
            $table->string('mem',20)->nullable();
            $table->string('cpu',20)->nullable();
            $table->string('sdcard',20)->nullable();
            $table->string('ip',20)->nullable();
            $table->timestamps();
        });

        Schema::create('google_tokens', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uid',10);
            $table->string('google_token');
            $table->timestamps();
        });

        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('lang')->default(0)->comment('1=英文，0=中文');
            $table->string('title',50);
            $table->integer('hot_base')->default(0);
            $table->integer('hot')->default(0);
            $table->string('icon_url');
            $table->tinyInteger('stars')->default(3);
            $table->tinyInteger('screen_display')->default('0')->comment('游戏显示方式，1=水平显示，0=垂直显示');
            $table->tinyInteger('open')->default(1)->comment('是否上架，1=上架，0=下架');
            $table->tinyInteger('recommend')->default(0)->comment('是否推荐，1=推荐，0=不推荐');
            $table->string('desc')->nullable();
            $table->string('path');
            $table->timestamps();
        });

        Schema::create('banners', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('game_id');
            $table->string('game_url');
            $table->string('pic_path');
            $table->tinyInteger('pic_postion')->comment('位置，big=1、small-left=2，small-right=3');
            $table->timestamps();
        });

        Schema::create('share_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('uid');
            $table->tinyInteger('share_type')->comment('分享类型，1=应用分享，0=游戏分享');
            $table->integer('game_id')->comment('游戏ID，share_type=0时才填写');
            $table->string('title',50)->comment('游戏名称，share_type=0时才填写');
            $table->string('target',30);
            $table->string('url');
            $table->timestamps();
        });

        Schema::create('event_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('uid');
            $table->tinyInteger('event_type')->comment('事件类型，1=打开应用，2=关闭应用，3=玩游戏，4=结束玩游戏，5=打开关闭应用，6=打开关闭游戏');
            $table->integer('game_id')->comment('分享游戏，event_type=3,4,6时才填写');
            $table->timestamp('start_time');
            $table->timestamp('end_time')->comment('结束时间，event_type=5,6时才填写');
            $table->timestamps();
        });

        Schema::create('versions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('ver');
            $table->string('desc');
            $table->string('url');
            $table->timestamps();
        });

        Schema::create('web_configs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key');
            $table->string('value');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('game_users');
        Schema::drop('google_tokens');
        Schema::drop('games');
        Schema::drop('banners');
        Schema::drop('share_logs');
        Schema::drop('event_logs');
        Schema::drop('versions');
        Schema::drop('web_configs');
    }
}
