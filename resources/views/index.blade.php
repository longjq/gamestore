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
                    <a href="#" data-index="1" id="tab-1" class="title active">
                        {{ trans('index.list') }}
                    </a>
                </td>
                {{--<td style="width:5%;text-align:center;">--}}
                    {{--|--}}
                {{--</td>--}}
                <td style="width: 44%;">
                    <a href="#" data-index="2" id="tab-2" class="title">
                        {{ trans('index.history') }}
                    </a>
                </td>
                <td style="width:12%;text-align:center;">
                    <a href="javascript:void(0);" id="share-btn" onclick="shareApp(this)" class="ui-btn" data-ui="icon-only"  data-track="navsearch"
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
        <section id="con-1" style="margin-bottom:50px;">
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
                               data-ui="primary small">PLAY</a>
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
                               data-ui="primary small">PLAY</a>
                        </div>
                        <br>
                    @endif
                @endforeach


            </div>
        </section>
        <section id="con-2" style="display: none;">
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
           data-ui="primary small">PLAY</a>
    </div>
</template>
{{--<script src="{{ asset('js/jquery.min.js') }}" type="text/javascript"></script>--}}
{{--<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.js" type="text/javascript"></script>--}}
<script src="{{ asset('js/jquery.2.2.4.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/common.js') }}" type="text/javascript"></script>
<script>

    var isPlay = false;
    $(function () {

        // change tab
        $(document).on('click', '.tabs .title', function (e) {
            e.preventDefault();
            var index = $(this).data('index');
            if (index == 1) {
                $(this).addClass('active');
                $('#tab-2').removeClass('active');
                $('#con-1').show();
                $('#con-2').hide();
            } else {
                $(this).addClass('active');
                $('#tab-1').removeClass('active');
                $('#con-1').hide();
                $('#con-2').show();
            }
            return false;
        });

        // init history
        var play_history = JSON.parse(utils.getParam('play_history'));
        var tpl = $('#item_tpl').html();
        if (play_history != null && play_history.length > 0) {
            $('#list_history #history-empty').remove();
            $('#list_history').prepend(replaceTpl(tpl, play_history));
        }

        // go to play game
        //$('#list_box a').on('click', function(e){
        //$('#list_box a').click(function(e){
        $(document).on('click', '#list_box a', function (e) {
            e.preventDefault();

            // alert('id:'+$(this).data('id')+'=title:'+$(this).data('title')+"=game_url:"+$(this).attr('href')+"=display:"+$(this).data('display'));
            var item = {
                'game_id': $(this).data('id'),
                'game_title': $(this).data('title'),
                'game_url': $(this).attr('href'),
                'display': $(this).data('display')
            };
            var item_history = {
                'game_id': $(this).data('id'),
                'game_title': $(this).data('title'),
                'game_url': $(this).attr('href'),
                'display': $(this).data('display'),
                'icon': $(this).data('icon'),
                'stars': $(this).data('stars'),
                'hot': $(this).data('hot'),
                'hot_label': $(this).data('hot_label')
            };
            $hots = $('.hot-count_' + item_history.game_id);
            var hotNumber = $hots.html();


            sendNative('functionOpen', item, function (responseData) {
                $hots.html(Number(hotNumber) + 1);
                var tpl = $('#item_tpl').html();
                //var play_history = JSON.parse(utils.getParam('play_history'));
                index = utils.itemExists(item_history.game_id, play_history);
                if (index === false) {
                    // 第一次玩
                    if (play_history === null) {
                        play_history = [];
                    }
                    play_history.unshift(item_history);
                    $('#list_history').prepend(replaceTpl(tpl, [item_history]));
                } else if (typeof index == 'number') {
                    // 已经玩过
                    play_history.splice(index, 1);
                    play_history.unshift(item_history);
                    $('#item_' + item_history.game_id).remove();
                    $('#list_history').prepend(replaceTpl(tpl, [item_history]));
                }
                $('#list_history #history-empty').remove();
                utils.setParam('play_history', JSON.stringify(play_history));

                return false;
            });

        });

    });

// init bridge
// 第一连接时初始化bridage
connectWebViewJavascriptBridge(function (bridge) {
    bridge.init(function (message, responseCallback) {
        console.log('JS got a message', message);
        var data = {
            'Javascript Responds': '测试中文!'
        };
        console.log('JS responding with', data);
        responseCallback(data);
    });
});
    // go to share app
    function shareApp(shareBtn){
            sendNative('share', {
                'app_name': $(shareBtn).data('app_name'),
                'app_desc': $(shareBtn).data('app_desc'),
                'app_icon': $(shareBtn).data('app_icon'),
                'app_url': $(shareBtn).data('app_url')
            },function(d){

            });
            return false;
    }

function sendNative(fnName, params, callback) {
    window.WebViewJavascriptBridge.callHandler(
            fnName,
            params,
            callback
    );
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                    callback(WebViewJavascriptBridge)
                },
                false
        );
    }
}




</script>
</body>
</html>