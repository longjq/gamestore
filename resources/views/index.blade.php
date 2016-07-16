<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>index</title>
    <style>
        ul {margin:0;padding: 0;}
        ul li {margin:0;padding: 0;
            background: dodgerblue;
            margin-top: 10px;
            height: 30px;
            line-height:30px;
        }
        a{
            padding-left: 30px;
            display: block;
        }
    </style>
</head>
<body>
<div id="response">
    <h1>这里会显示从java类返回的数据</h1>
</div>
<ul>
    <li><a href="#" data-id="1" data-title="游戏1_title" data-url="g/1/index.html">游戏1</a></li>
    <li><a href="#" data-id="2" data-title="游戏2_title" data-url="g/2/index.html">游戏2</a></li>
    <li><a href="#" data-id="3" data-title="游戏3_title" data-url="g/3/index.html">游戏3</a></li>
    <li><a href="#" data-id="4" data-title="游戏4_title" data-url="g/4/index.html">游戏4</a></li>
    <li><a href="#" data-id="5" data-title="游戏5_title" data-url="g/5/index.html">游戏5</a></li>
    <li><a href="#" data-id="6" data-title="游戏6_title" data-url="g/6/index.html">游戏6</a></li>
    <li><a href="#" data-id="7" data-title="游戏7_title" data-url="g/7/index.html">游戏7</a></li>
    <li><a href="#" data-id="8" data-title="游戏8_title" data-url="g/8/index.html">游戏8</a></li>
    <li><a href="#" data-id="9" data-title="游戏9_title" data-url="g/9/index.html">游戏9</a></li>
    <li><a href="#" data-id="10" data-title="游戏10_title" data-url="g/10/index.html">游戏10</a></li>
</ul>
<script>
    window.onload=function(){
        var aA = document.getElementsByTagName('a');

        for (var i=0;i<aA.length;i++){
           
            aA[i].onclick=function(){
                // window.location.href= this.getAttribute('data-url');
                sendNative('functionOpen',{
                    'id': this.getAttribute('data-id'),
                    'title': this.getAttribute('data-title'),
                    'game_url': this.getAttribute('data-url')
                });
            };
        }
    };

    function sendNative(fnName,params) {
        window.WebViewJavascriptBridge.callHandler(
                fnName,
                params
                , function(responseData) {
                    alert(responseData);
                    document.getElementById("response").innerHTML = "repsonseData from java, data = " + responseData
                }
        );
    }

    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function() {
                        callback(WebViewJavascriptBridge)
                    },
                    false
            );
        }
    }

    // 第一连接时初始化bridage
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
            console.log('JS got a message', message);
            var data = {
                'Javascript Responds': '测试中文!'
            };
            console.log('JS responding with', data);
            responseCallback(data);
        });
</script>
</body>
</html>