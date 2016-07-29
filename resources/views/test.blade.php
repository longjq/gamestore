<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<h1>hello world!</h1>
<script src="{{ asset('js/java_bridge.js') }}"></script>
{{--<script src="{{ asset('js/jquery.min.js') }}"></script>--}}
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.js"></script>
<script>
$(document).ready(function(){
    $('body').css('background','blue');
});
</script>
</body>
</html>