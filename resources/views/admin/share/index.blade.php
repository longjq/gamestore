<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>hello world</title>
    <link rel="stylesheet" href="{{ asset('css/back.css')  }}">
    <script src="{{ asset('js/jquery.min.js') }}"></script>
</head>
<body>

<div class="box-options">

</div>

<div class="box-search">
    <h2 class="title">
        搜索
    </h2>
    <form action="">
        时间：<input type="text">
        时间：<input type="text">
        时间：
        <select class="select_2" name="posids" style="width:70px;">
            <option value="" selected="">全部</option>
            <option value="1">推荐</option>
            <option value="2">不推荐</option>
        </select>
        <input type="submit" value="搜索">
    </form>
</div>

<div class="box-table">
    <table class="table">
        <thead>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="box-options">
    <label class="mr20"><input type="checkbox" class="J_check_all" data-direction="y" data-checklist="J_check_y">全选</label>
    <button class="btn J_ajax_submit_btn" type="submit" data-action="http://localhost/shuipfcms/index.php?m=Content&amp;a=listorder&amp;catid=16">排序</button>
    <button class="btn J_ajax_submit_btn" type="submit" data-action="http://localhost/shuipfcms/index.php?m=Content&amp;a=public_check&amp;catid=16">审核</button>
    <button class="btn J_ajax_submit_btn" type="submit" data-action="http://localhost/shuipfcms/index.php?m=Content&amp;a=public_nocheck&amp;catid=16">取消审核</button>
    <button class="btn J_ajax_submit_btn" type="submit" data-action="http://localhost/shuipfcms/index.php?m=Content&amp;a=delete&amp;catid=16">删除</button>
    <button class="btn" type="button" onclick="pushs()">推送</button>
    <button class="btn" type="button" id="J_Content_remove">批量移动</button>
    <button class="btn J_ajax_submit_btn" type="submit" data-action="http://localhost/shuipfcms/index.php?m=Createhtml&amp;a=batch_show&amp;catid=16&amp;steps=0">批量生成HTML</button>
</div>

<script src="/js/back.js"></script>
</body>
</html>