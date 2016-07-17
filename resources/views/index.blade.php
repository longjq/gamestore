<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>index</title>
    <link rel="stylesheet" href="{!! asset('css/common.css') !!}">
</head>
<body>

<div id="page">
    <header class="ui-bar" data-ui="header primary static" id="header">
        <table class="tabs">
            <tr>
                <td>
                    <a href="#" data-index="1" id="tab-1" class="title active">Game List</a>
                </td>
                <td>
                    &nbsp;
                    |
                    &nbsp;
                </td>
                <td>
                    <a href="#" data-index="2" id="tab-2" class="title">My Games</a>
                </td>
                <td align="center">
                    <a href="###" style="background-color: #fff;color:#145fd7;" style="text-align: right;" class="ui-btn" data-ui="icon-only" tapmode="" data-track="navsearch">
                        S
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

    <div class="container index pageStart" id="list-box" style="padding-top:40px;">
        <section id="con-1" style="margin-bottom:50px;">
            <div class="banner-top">
                <a href="#">
                    <img src="{!! asset('images/l.jpg') !!}" alt="">
                </a>
            </div>
            <header>
                <h2>The New Games</h2>
            </header>
            <div class="list">
                <div class="item">
                    <a data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/logo-wx.png') !!}"" !!}
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">一个不能死</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 961199</span>

                        </div>
                    </a>
                    <a  data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div><br>
                <div class="item">
                    <a  data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/logo-wx.png') !!}"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">一个不能死</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 961199</span>

                        </div>
                    </a>
                    <a  data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div><br>
                <div class="item">
                    <a  data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/logo-wx.png') !!}"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">一个不能死</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 961199</span>

                        </div>
                    </a>
                    <a  data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
            </div>
            <div class="banner-small">
                <div class="banner-l">
                    <a href="#">
                        <img src="{!! asset('images/l.jpg') !!}" alt="">
                    </a>
                </div>
                <div class="banner-r">
                    <a href="#">
                        <img src="{!! asset('images/r.jpg') !!}" alt="">
                    </a>
                </div>
            </div>
            <header>
                <h2>Ranking List</h2>
            </header>
            <div class="list">
                <div class="item">
                    <a  data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/logo-wx.png') !!}"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">一个不能死</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 961199</span>

                        </div>
                    </a>
                    <a  data-id="1" data-title="一个不能死" href="http://smg.wgchao.com/good/syt/bunengsi/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a  data-id="2" data-title="滑木块" href="http://smg.wgchao.com/good/syt/hmk/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/icon.png') !!}"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">滑木块</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 309744</span>

                        </div>
                    </a>
                    <a data-id="2" data-title="滑木块" href="http://smg.wgchao.com/good/syt/hmk/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a data-id="3" data-title="扔鸡蛋" href="http://smg.wgchao.com/good/syt/jidan/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/icon(1).png') !!}"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">扔鸡蛋</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 891611</span>

                        </div>
                    </a>
                    <a data-id="3" data-title="扔鸡蛋" href="http://smg.wgchao.com/good/syt/jidan/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a  data-id="4" data-title="街头篮球" href="http://smg.wgchao.com/good/syt/jtlq/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/icon(2).png') !!}"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">街头篮球</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 239135</span>

                        </div>
                    </a>
                    <a data-id="4" data-title="街头篮球" href="http://smg.wgchao.com/good/syt/jtlq/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a  data-id="5" data-title="小心女司机" href="http://smg.wgchao.com/good/syt/mlss/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/icon(3).png') !!}"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">小心女司机</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 323381</span>

                        </div>
                    </a>
                    <a  data-id="5" data-title="小心女司机" href="http://smg.wgchao.com/good/syt/mlss/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/syt/mspt/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(4).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">美女拼图</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 276856</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/syt/mspt/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/syt/ppl/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(5).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">泡泡龙</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 278230</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/syt/ppl/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/syt/ssrz/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(6).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">生死忍者</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 881453</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/syt/ssrz/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/syt/wuziqi/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/logo-wx.png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">五子棋</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 819570</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/syt/wuziqi/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/syt/xmxx/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(7).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">消灭星星</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 204431</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/syt/xmxx/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/yx8/chengshilianjie/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(8).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">城市连接</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 337712</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/yx8/chengshilianjie/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/yx8/djz/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(9).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">打击者</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 857708</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/yx8/djz/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/yx8/nipenlidexiaozhu3/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon.jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">泥盆里的小猪3</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 594359</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/yx8/nipenlidexiaozhu3/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/yx8/paopaolixianji/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(10).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">泡泡历险记</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 883999</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/yx8/paopaolixianji/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/yx8/shiluodedaoyu3/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(11).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">失落的岛屿3</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 794669</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/yx8/shiluodedaoyu3/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/yx8/xiadaoluobinhan/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/logo-wx.png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">侠盗罗宾汉</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 145410</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/yx8/xiadaoluobinhan/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/bdfm/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (1).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">棒打疯猫</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 613935</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/bdfm/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/blackjack/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(12).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">21点</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 287896</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/blackjack/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/dapopinata/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(13).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">打破皮纳塔</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 306797</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/dapopinata/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/djqgk/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (2).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">电锯切割</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 316367</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/djqgk/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/dqcs/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(14).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">点球射手</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 312679</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/dqcs/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/freekick/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (3).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">任意球大师</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 758965</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/freekick/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/gqds/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(15).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">钢琴大师</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 790219</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/gqds/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/gulaodekuangshi/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(16).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">古老的矿石</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 623844</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/gulaodekuangshi/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/guodongrenwu/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (4).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">果冻任务</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 262514</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/guodongrenwu/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/hgy/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(17).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">画个圆</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 159261</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/hgy/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/htsys/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(18).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">合体实验室</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 393666</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/htsys/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/hxsdlr/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (5).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">唤醒圣诞老人</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 393137</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/hxsdlr/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/hypk/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(19).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">火影酷跑</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 942432</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/hypk/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/jinhuashi2048/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (6).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">进化史2048</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 359642</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/jinhuashi2048/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/kickups/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(20).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">颠球达人</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 484056</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/kickups/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/ktfx/index.html">

                        <figure class="cover">

                            <img src="{!! asset('images/icon (7).png') !!}
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">卡通飞行</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 903631</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/ktfx/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/luomazhiyue/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(21).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">罗马之约</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 569387</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/luomazhiyue/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/mml/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(22).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">挑战记忆力</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 375667</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/mml/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/msts/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (8).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">密室逃生</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 142765</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/msts/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/pmdtw/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(23).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">PM2.5大逃亡</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 792768</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/pmdtw/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/sudoku/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (9).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">数独</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 552523</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/sudoku/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/ttt/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(24).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">ttt</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 320995</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/ttt/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/mys/xjmt/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(25).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">星际摩托</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 674220</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/mys/xjmt/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/vdcom/ljsp/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(26).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">六角方块</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 372093</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/vdcom/ljsp/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/vdcom/tingche/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(27).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">停车入位</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 425427</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/vdcom/tingche/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/vdcom/tkdz/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(28).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">坦克大战</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 911933</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/vdcom/tkdz/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/vdcom/wxdz/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(29).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">无限的直</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 229801</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/vdcom/wxdz/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/3dqcybs/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(30).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">3d汽车简史</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 919786</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/3dqcybs/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/Bubblefish/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (10).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">泡泡鱼与螃蟹</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 795932</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/Bubblefish/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/NinjaFlips/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(31).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">忍者跳</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 924471</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/NinjaFlips/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/ai/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon (11).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">糖果丘比特</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 965196</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/ai/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/ajkyq/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(32).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">爱就快一起</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 409866</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/ajkyq/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/bdx/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(33).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">赌大小</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 212366</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/bdx/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/bzylls/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(34).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">八爪鱼拉拉手</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 271993</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/bzylls/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/dzt/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(35).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">弹珠台</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 626233</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/dzt/index.html" class="ui-btn play" data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/gldsys/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(36).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">格鲁的实验室</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 425045</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/gldsys/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/gwlm/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(37).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">怪物联盟</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 930959</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/gwlm/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/jiangshiganran/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(38).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">僵尸感染</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 416451</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/jiangshiganran/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/jiedong/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(39).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">解冻</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 948890</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/jiedong/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/maya/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(40).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">玛雅传奇</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 193473</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/maya/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/mmsz/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(41).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">萌萌水贼</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 475713</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/mmsz/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/tangguo/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(42).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">糖果乐园</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 342556</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/tangguo/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/xingxingxianglian/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(43).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">星星相连</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 486610</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/xingxingxianglian/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/xybp/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(44).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">小样别跑</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 418144</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/xybp/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a href="http://smg.wgchao.com/good/zzf/yansetongxing/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(45).jpg"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">颜色通行</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 602199</span>

                        </div>
                    </a>
                    <a href="http://smg.wgchao.com/good/zzf/yansetongxing/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>
                <div class="item">
                    <a  href="http://smg.wgchao.com/good/zzf/yblc/index.html">

                        <figure class="cover">

                            <img src="./游戏集中营_files/icon(46).png"
                                 style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                        </figure>
                        <div class="meta">
                            <h3 class="title">一笔连成</h3>
                            <br>
                            <i class="icon-star-4"></i>

                            <span class="count">人气: 870667</span>

                        </div>
                    </a>
                    <a  href="http://smg.wgchao.com/good/zzf/yblc/index.html" class="ui-btn play"
                       data-ui="primary small">play</a>
                </div>
                <br>


            </div>
        </section>
        <section id="con-2" style="display: none;">
            <header>
                <h2>Play Games History</h2>
            </header>
            <div class="list">
            <div class="item">
                <a  data-id="1" data-title="一个不能死"  href="http://smg.wgchao.com/good/syt/bunengsi/index.html">

                    <figure class="cover">

                        <img src="{!! asset('images/logo-wx.png') !!}"
                             style="opacity: 1; transition: opacity 0.5s linear 0s; -webkit-transition: opacity 0.5s linear 0s;">
                    </figure>
                    <div class="meta">
                        <h3 class="title">一个不能死</h3>
                        <br>
                        <i class="icon-star-4"></i>

                        <span class="count">人气: 961199</span>

                    </div>
                </a>
                <a  data-id="1" data-title="一个不能死"  href="http://smg.wgchao.com/good/syt/bunengsi/index.html" class="ui-btn play"
                   data-ui="primary small">play</a>
            </div>
                </div>
        </section>
    </div>

</div>


<script src="http://cdn.bootcss.com/jquery/2.2.0/jquery.min.js" type="text/javascript"></script>
<script src="{!! asset('js/jquery.easytabs.min.js') !!}" type="text/javascript"></script>
<script src="{!! asset('js/java_bridge.js') !!}" type="text/javascript"></script>
<script>
    $(function(){
        $('#list-box a').click(function (e) {
            e.preventDefault();
          
            // alert('id:'+$(this).data('id')+'=title:'+$(this).data('title')+"=game_url:"+$(this).attr('href'));
             sendNative('functionOpen', {
                    'id': $(this).data('id'),
                    'title': $(this).data('title'),
                    'game_url': $(this).attr('href')
                });
             return false;
        });

        $('.tabs a').click(function(){
            var index = $(this).data('index');
            if(index == 1){
                $(this).addClass('active');
                $('#tab-2').removeClass('active');
                $('#con-1').show();
                $('#con-2').hide();
            }else{
                $(this).addClass('active');
                $('#tab-1').removeClass('active');
                $('#con-1').hide();
                $('#con-2').show();
            }
        });
    });

    function sendNative(fnName, params) {
        window.WebViewJavascriptBridge.callHandler(
                fnName,
                params
                , function (responseData) {
                    alert(responseData);
                    document.getElementById("response").innerHTML = "repsonseData from java, data = " + responseData
                }
        );
    }

</script>
</body>
</html>