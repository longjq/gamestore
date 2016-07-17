
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
    bridge.init(function (message, responseCallback) {
        console.log('JS got a message', message);
        var data = {
            'Javascript Responds': 'test!'
        };
        console.log('JS responding with', data);
        responseCallback(data);
    });
})