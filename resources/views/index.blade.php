<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ trans('index.title') }}</title>
    <link rel="stylesheet" href="{!! asset('css/common.css') !!}">
</head>
<body>
<div id="page">
    <header class="ui-bar" data-ui="header primary static" id="header">
        <table class="tabs">
            <tr>
                <td>
                    <a href="#" data-index="1" id="tab-1" class="title active">
                        {{ trans('index.list') }}
                    </a>
                </td>
                <td>
                    &nbsp;
                    |
                    &nbsp;
                </td>
                <td>
                    <a href="#" data-index="2" id="tab-2" class="title">
                        {{ trans('index.history') }}
                    </a>
                </td>
                <td align="center">
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


        {{--<h1 data-ui="title">Game KingDom</h1>--}}

                <!--<div class="ui-btns" data-ui="inline rounded">
            <div class="user_toolbar" id="user-setting" style="display:none">
                <ul>
                    <li><span class="icon"><i class="icon-user"></i></span><a href="http://smg.wgchao.com/good/a.php###"
                                                                              id="banguser"><span
                                    class="title">绑定账号</span></a></li>
                    <li><span class="icon"><i class="icon-special"></i></span><span class="title">清除缓存</span></li>
                    <li><span class="icon"><i class="icon-user-setting"></i></span><span class="title">设置</span></li>
                </ul>
            </div>
            <a class="ui-btn" href="###" data-ui="icon-only" tapmode="" data-setting="" style="display:none"><i
                        class="icon-plus-empty"></i></a>
            <a class="ui-btn" href="###" data-ui="icon-only" tapmode="" data-track="played"><i
                        class="icon-user3"></i></a>
        </div>-->
    </header><!-- end 主导航 -->
    <!-- start 次导航 -->
    <nav class="ui-bar" data-ui="nav header static" id="headerMenu" style="display:none;">

    </nav><!-- end 次导航 -->

    <div class="container index pageStart" id="list_box" style="padding-top:40px;">
        <section id="con-1" style="margin-bottom:50px;">
            <div class="banner-top">
                <a href="#">
                    <img src="{!! asset('images/big.jpg') !!}" alt="">
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
                                        : {{ intval($item->hot_base) + intval($item->hot) }}</span>

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
                <table>
                    <tr>
                        <td align="right" style="text-align:right"><img src="{!! asset('images/l.jpg') !!}" alt=""></td>
                        <td>&nbsp;</td>
                        <td align="left" style="text-align:left"><img src="{!! asset('images/r.jpg') !!}" alt=""></td>
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
                                        : {{ intval($item->hot_base) + intval($item->hot) }}</span>

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
        </section>
        <section id="con-2" style="display: none;">
            <header>
                <h2>{{ trans('index.history') }}</h2>
            </header>
            <div class="list" id="list_history">
                <h3>You Don't Have Play Any Games.</h3>
                <small>Go To Play Game Now!</small>
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
                <span class="count">$hot_label$: $hot$</span>
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
<script src="http://cdn.bootcss.com/jquery/2.2.0/jquery.min.js" type="text/javascript"></script>
<script src="{{ asset('js/common.js') }}" type="text/javascript"></script>
<script>

    $(function () {
        // init history
        var play_history = JSON.parse(utils.getParam('play_history'));
        var tpl = $('#item_tpl').html();
        $('#list_history').prepend(replaceTpl(tpl, play_history));

        // go to play game
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
            sendNative('functionOpen', item, function (responseData) {
                var tpl = $('#item_tpl').html();
                var play_history = JSON.parse(utils.getParam('play_history'));
                if (!utils.itemExists(item_history.game_id, play_history)) {
                    if (play_history === null) {
                        play_history = [item_history];
                    } else {
                        play_history.unshift(item_history);
                    }
                    utils.setParam('play_history', JSON.stringify(play_history));
                    $('#list_history').prepend(replaceTpl(tpl, [item_history]));
                }
                $.get("/v/hot", {game_id:item_history.game_id},function (rs) {
                    $('#incr').html(JSON.stringify(rs));
                });
            });
            return false;
        });

        // go to share app
        $('#share-btn').click(function (e) {
            e.preventDefault();
//            console.log({
//                'app_name': $(this).data('app_name'),
//                'app_desc': $(this).data('app_desc'),
//                'app_icon': $(this).data('app_icon'),
//                'app_url' : $(this).data('app_url')
//            });
            sendNative('share', {
                'app_name': $(this).data('app_name'),
                'app_desc': $(this).data('app_desc'),
                'app_icon': $(this).data('app_icon'),
                'app_url': $(this).data('app_url')
            });
            return false;
        });

        // change tab
        $('.tabs .title').click(function () {
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
        });

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
    });


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