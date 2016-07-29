/**
 * Created by Administrator on 2016/7/21.
 */
String.prototype.tmp = function(obj) {
    return this.replace(/\$\w+\$/g, function(matchs) {
        var returns = obj[matchs.replace(/\$/g, "")];
        return (returns + "") == "undefined"? "": returns;
    });
};

function replaceTpl(tpl, datas){
    var html = '';
    for (item in datas)
    {
        html += tpl.tmp(datas[item])
    }
    return html;
}


utils = {
    setParam : function (name,value){
        localStorage.setItem(name,value)
    },
    getParam : function(name){
        return localStorage.getItem(name)
    },
    itemExists : function (key, datas) {
        var index = 0;
        for (var i in datas){
            if (datas[i].game_id == key){
                return index;
                break;
            }
            index++;
        }
        return false;
    }
};