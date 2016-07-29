<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
    <title>{{ trans('index.title') }}</title>
    <link rel="stylesheet" href="{!! asset('css/common.css') !!}">
</head>
<body>
<div id="page">
    <header class="ui-bar" data-ui="header primary static" id="header">
        <table class="tabs">
            <tr>
                <td style="width: 44%;">
                    <a href="javascript:void(0)" data-index="1" id="tab-1" v-on:click.prevent="changeTab" v-bind:class="{ 'active' : tab_1 }" class="title">
                        {{ trans('index.list') }}
                    </a>
                </td>
                <td style="width: 44%;">
                    <a href="javascript:void(0)" data-index="2" id="tab-2" v-on:click.prevent="changeTab" v-bind:class="{ 'active' : tab_2 }" class="title">
                        {{ trans('index.history') }}
                    </a>
                </td>
                <td style="width:12%;text-align:center;">
                    <a href="###" id="share-btn" class="ui-btn" data-ui="icon-only" tapmode="" data-track="navsearch"
                       data-app_name="game store"
                       data-app_desc="play games"
                       data-app_url="http://ga.wgchao.com"
                       data-app_icon="http://ga.wgchao.com/images/icon.png"
                    >
                        <img src="{{ asset('images/share_72x72.png') }}" alt="share">
                    </a>
                </td>
            </tr>
        </table>
    </header><!-- end 主导航 -->

    <!-- start 次导航 -->
    <nav class="ui-bar" data-ui="nav header static" id="headerMenu" style="display:none;">
    </nav><!-- end 次导航 -->

    <div class="container index pageStart" id="list_box" style="padding-top:38px;">
        <section id="con-1" v-show="tab_1" style="margin-bottom:50px;">
            <div class="banner-top">
                <a data-id="38"
                   data-display="0"
                   data-title="Striker 1945"
                   href="http://ga.wgchao.com/g/yx8/djz/index.html"
                   data-icon="http://ga.wgchao.com/g/yx8/djz/icon.png"
                   data-stars="4"
                   data-hot="68745"
                   data-hot_label="{{ trans('index.hot') }}"
                >
                    <img src="{!! asset('images/banner1.png') !!}" alt="">
                </a>
            </div>
            <header>
                <h2 class="news">  {{ trans('index.news') }}</h2>
            </header>
            <div class="list">
                @foreach($list as $item)
                    @if($item->recommend == 1)
                        <div class="item">
                            <a data-id="{{ $item->id }}"
                               data-display="{{ $item->screen_display }}"
                               data-title="{{ $item->title }}"
                               href="{{ $item->path }}"
                               data-icon="{{ $item->icon_url }}"
                               data-stars="{{ $item->stars }}"
                               data-hot="{{ intval($item->hot_base) + intval($item->hot) }}"
                               data-hot_label="{{ trans('index.hot') }}"
                            >

                                <figure class="cover">

                                    <img src="{!! asset($item->icon_url) !!}"
                                         style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                                </figure>
                                <div class="meta">
                                    <h3 class="title">{{ $item->title }}</h3>
                                    <i class="icon-star-{{ $item->stars }}"></i>

                                    <span class="count">{{ trans('index.hot') }}

                                        : <span class="hot-count_{{ $item->id }}">{{ intval($item->hot_base) + intval($item->hot) }}</span></span>

                                </div>
                            </a>
                            <a data-id="{{ $item->id }}"
                               data-display="{{ $item->screen_display }}"
                               data-title="{{ $item->title }}"
                               href="{{ $item->path }}"
                               data-icon="{{ $item->icon_url }}"
                               data-stars="{{ $item->stars }}"
                               data-hot="{{ intval($item->hot_base) + intval($item->hot) }}"
                               data-hot_label="{{ trans('index.hot') }}"
                               class="ui-btn play"
                               data-ui="primary small">Play</a>
                        </div>
                        <br>
                    @endif
                @endforeach

            </div>
            <div class="banner-small">
                <table style="width: 100%;">
                    <tr>
                        <td align="right" style="text-align:right">
                            <a data-id="45"
                               data-display="1"
                               data-title="Baccarat"
                               href="http://ga.wgchao.com/g/zzf/bdx/index.html"
                               data-icon="http://ga.wgchao.com/g/zzf/bdx/icon.jpg"
                               data-stars="4"
                               data-hot="32214"
                               data-hot_label="{{ trans('index.hot') }}">
                                <img src="{!! asset('images/banner2.png') !!}" alt="">
                            </a>
                        </td>
                        <td>&nbsp;</td>
                        <td align="left" style="text-align:left">
                            <a  data-id="51"
                                data-display="0"
                                data-title="Monster Connect"
                                href="http://ga.wgchao.com/g/zzf/gwlm/index.html"
                                data-icon="http://ga.wgchao.com/g/zzf/gwlm/icon.png"
                                data-stars="5"
                                data-hot="47463"
                                data-hot_label="{{ trans('index.hot') }}">
                                <img src="{!! asset('images/banner3.png') !!}" alt="">
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <header>
                <h2 class="rank">  {{ trans('index.rank') }}</h2>
            </header>
            <div class="list">
                @foreach($list as $item)
                    @if($item->recommend == 0)
                        <div class="item">
                            <a v-on:click.prevent="sendJava({{ json_encode($item) }})" data-id="{{ $item->id }}"
                               data-display="{{ $item->screen_display }}"
                               data-title="{{ $item->title }}"
                               href="{{ $item->path }}"
                               data-icon="{{ $item->icon_url }}"
                               data-stars="{{ $item->stars }}"
                               data-hot="{{ intval($item->hot_base) + intval($item->hot) }}"
                               data-hot_label="{{ trans('index.hot') }}"
                            >

                                <figure class="cover">

                                    <img src="{!! asset($item->icon_url) !!}"
                                         style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                                </figure>
                                <div class="meta">
                                    <h3 class="title">{{ $item->title }}</h3>
                                    <i class="icon-star-{{ $item->stars }}"></i>

                                    <span class="count">{{ trans('index.hot') }}
                                        : <span class="hot-count_{{ $item->id }}">{{ intval($item->hot_base) + intval($item->hot) }}</span></span>

                                </div>
                            </a>
                            <a v-on:click.prevent="sendJava({{ json_encode($item) }})"  data-id="{{ $item->id }}"
                               data-display="{{ $item->screen_display }}"
                               data-title="{{ $item->title }}"
                               href="{{ $item->path }}"
                               data-icon="{{ $item->icon_url }}"
                               data-stars="{{ $item->stars }}"
                               data-hot="{{ intval($item->hot_base) + intval($item->hot) }}"
                               data-hot_label="{{ trans('index.hot') }}"
                               class="ui-btn play"
                               data-ui="primary small">Play</a>
                        </div>
                        <br>
                    @endif
                @endforeach


            </div>
        </section>
        <section id="con-2" v-show="tab_2" style="display: none;">
            <header>
                <h2>{{ trans('index.history') }}</h2>
            </header>
            <div class="list" id="list_history">
                <h3 id="history-empty">You Don't Have Play Any Games.</h3>
                {{--<small>Go To Play Game Now!</small>--}}
            </div>
        </section>
    </div>
</div>
<template id="item_tpl">
    <div class="item" id="item_$game_id$">
        <a data-id="$game_id$"
           data-title="$game_title$"
           href="$game_url$"
           data-display="$display$"
           data-icon="$icon$"
           data-stars="$stars$"
           data-hot="$hot$"
           data-hot_label="$hot_label$"
        >
            <figure class="cover">
                <img src="$icon$"
                     style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
            </figure>
            <div class="meta">
                <h3 class="title">$game_title$</h3>
                <br>
                <i class="icon-star-$stars$"></i>
                <span class="count">$hot_label$: <span class="hot-count_$game_id$">$hot$</span></span>
            </div>
        </a>
        <a data-id="$game_id$"
           data-title="$game_title$"
           href="$game_url$"
           data-display="$display$"
           data-icon="$icon$"
           data-stars="$stars$"
           data-hot="$hot$"
           data-hot_label="$hot_label$"
           class="ui-btn play"
           data-ui="primary small">Play</a>
    </div>
</template>
{{--<script src="{{ asset('js/jquery.2.2.4.min.js') }}" type="text/javascript"></script>--}}
<script src="http://cdn.bootcss.com/vue/1.0.26/vue.js"></script>
<script>
new Vue({
    el:'#page',
    data:{
        'tab_1':true,
        'tab_2':false
    },
    methods:{
        changeTab:function(e){
            this.tab_1 = !this.tab_1;
            this.tab_2 = !this.tab_2;
        },
        sendJava:function(item){
            var data = JSON.stringify({
                'game_id': item.game_id,
                'game_title': item.title,
                'game_url': item.path,
                'display': item.screen_display
            });

            window.callandroid.callFromJs(data);
//            sendNative('functionOpen',{
//                'game_id': item.game_id,
//                'game_title': item.title,
//                'game_url': item.path,
//                'display': item.screen_display
//            },function(d){});
        }
    }
});

function getPhoneUid(rs){
    document.getElementById('tab-1').innerHTML = '调用成功：uid='+rs;
}


</script>
</body>
</html>