$('body').append("<div id='overlay' onclick='hideLight()'></div><div id='tipBox'><div class='tipBoxCon'></div></div><div class='loadBox' id='loadBox'><div class='loadCon'><span class='loading'></span><span>加载中</span></div></div>");

/*比例缩放*/
function resize() {
    var wWidth = document.body.clientWidth;
    var Fsize = wWidth / 7.5 < 50 ? wWidth / 7.5 : 50;
    document.querySelector('html').style.fontSize = Fsize + 'px';
};

function userAgentWx() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    var isAndroid = ua.indexOf('android') != -1;
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    if (!isWeixin) {
        document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
        document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请在微信客户端打开链接</h4></div></div>';
    }
}
window.onload = function() {
    resize();
    btnGray();
    // userAgentWx()
}
window.onresize = resize;

//加载中
function showLoadding() {
    $('body').on('touchmove', function(event) { event.preventDefault(); });
    $("#loadBox").show();
}

function hideLoadding() {
    $("#loadBox").hide();
    $('body').unbind("touchmove");
}
//加载中end


//显示文字提示框
function showTipBox(message, callback) {
    $(".tipBoxCon").html(message);
    $("#tipBox").fadeIn();
    var marginTop = (-$(".tipBoxCon").outerHeight(true)) / 2;
    var marginLeft = (document.body.clientWidth - $(".tipBoxCon").width() - document.body.clientWidth / 7.5) / 2
    $(".tipBoxCon").css({ "margin-top": marginTop, "margin-left": marginLeft });
    $('body').on('touchmove', function(event) { event.preventDefault(); });
    setTimeout(function() {
        $("#tipBox").fadeOut(300);
        $('body').unbind("touchmove");
    }, 2000);
    if (typeof callback === "function") {
        callback();
    }
}


//显示协议弹框
function showAgreementBox(cla) {
    $("#overlay").show();
    $("#" + cla).show();
    var wWidth = document.body.clientWidth;
    var Fsize = wWidth / 7.5 < 50 ? wWidth / 7.5 : 50;
    var h = $(".agreementBox").height() - Fsize * 1.8;
    $(".textCon").css("height", h);
    var agreementBoxCon = new IScroll('#' + cla + ' .textCon', { mouseWheel: true, click: true });
    $('body').css({'overflow':'hidden'})
    $('body').on('touchmove', function(event) { event.preventDefault(); });
}

//显示灯箱
function showLight(cla) {
    $("#overlay").show();
    var marginTop = (-$("#" + cla).outerHeight()) / 2;
    $("#" + cla).css({ "margin-top": marginTop });
    $("#" + cla).show();
    $('body').css({'overflow':'hidden'})
    $('body').on('touchmove', function(event) { event.preventDefault(); });
}
//隐藏灯箱
function hideLight() {
    $("#overlay").hide();
    $(".lightBox").hide();
    $('body').css({'overflow':'auto'})
    $('body').unbind("touchmove");
}


/*表单按钮颜色变化*/
function valF() {
    var val = true;
    $(".field.mustFill").each(function(i) {
        var len = $(this).attr("data-length");
        if (len == undefined) {
            if (!$(this).val()) return val = false
        } else {
            if ($(this).val().trim().length != len) return val = false
        }
    })
    return val;
}

function btnGray() {
    $(".field.mustFill").on("input", function() {
        valF() ? $(".btnMain").removeClass("btnGray") : $(".btnMain").addClass("btnGray")
    })
}
/*表单按钮颜色变化end*/

/*表单按钮位置*/
function btnFixedBottom() {
    var wWidth = document.body.clientWidth;
    var mt = $(window).height() - $(".formWrap").height() - 90;
    console.log(mt)
    var paddingTop = (mt > 50) ? mt : 50;
    $("#btnMainCon").css({ "padding-top": paddingTop, "padding-bottom": "50px" });
}
/*表单按钮位置end*/

/*输入银行卡号格式化*/
function inputBankcardNum(obj) {
    var value = obj.value;
    value = value.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i != 0) {
            result.push(" " + value.charAt(i));
        } else {
            result.push(value.charAt(i));
        }

    }
    obj.value = result.join("");
}
function formatBankcardNum(obj) {
    var value = obj.value;
    value = value.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i != 0) {
            result.push(" " + value.charAt(i));
        } else {
            result.push(value.charAt(i));
        }

    }
    obj.value = result.join("");
}

/*输入手机号格式化*/
function inputMobile(obj) {
    var value = obj.value;
    value = value.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
        if (i == 3 || i == 7) {
            result.push(" " + value.charAt(i));
        } else {
            result.push(value.charAt(i));
        }
    }
    obj.value = result.join("");
}


/*校验手机号*/
function isMobile(cla) {
    var mobile = /^1[3456789]\d{9}$/;
    var flag = mobile.test(cla.replace(/\s+/g, ""))
    return flag
}
//去除字符算中的空格
function Trim(cla){
    var obj = cla.replace(/\s+/g, "")
    return obj
}

/*手机号格式化*/
function formatMobile(obj) {
    var value = obj.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
        if (i == 3 || i == 7) {
            result.push(" " + value.charAt(i));
        } else {
            result.push(value.charAt(i));
        }
    }
    return result.join("");
}

/*校验用户名*/
function isusername(cla) {
    return (cla.search(/^\w{6,20}$/) > -1)
}

function isPassword(cla) {
    if (cla.search(/^\w{6,12}$/) > -1) {
        //(/^[A-Z]+$|^[a-z]+$|^[\d]+$|^[_]+$/g).test(cla) 必须包含大写字母、小写字母、数字、下划线的最少两种，6-12个字符
		//myreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/  
		//myreg.text(cla) ('密码为6-12位数字字母的组合！')
        if ((/^[A-Z]+$|^[a-z]+$|^[\d]+$/g).test(cla)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


/*发送验证码*/
function runTime(string,time) {
    var countdown = time;
    string.attr("disabled", true);
    string.addClass("colorGray");
    string.html(countdown+'s后重新发送');
    var timerF = window.setInterval(function(){
    	countdown--;
	    if (countdown == 0) {
	        string.attr("disabled", false);
	        string.html('重新发送');
	        string.removeClass("colorGray");
	        countdown = time;
	        window.clearInterval(timerF);
	        timerF = null;
	        string.attr("onclick", "sendCode("+string+")");
	    } else {
	        string.html(countdown+'s后重新发送');
	    }
    }, 1000);
    string.removeAttr("onclick");
}
/*发送验证码end*/


//根据两点的经纬度生成距离
function GetDistance(lat1, lng1, lat2, lng2) {
    if (null == lat1 || null == lng1 || null == lat2 || null == lng2 || '' == lat1 || '' == lng1 || '' == lat2 || '' == lng2) {
        return 0;
    }
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s.toFixed(1)
    //return s.toFixed(1)
};

//格式化距离<1为m ,>1为km
function formatDistance(val) {
    if (Number(val) < 1) {
        return Number(val) * 1000 + "m"
    } else {
        return Number(val).toFixed(2) * 100 / 100 + "km"
    }
}

/* 排序 */
function commpare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
};

function ajaxData(string){
    var time = new Date();
    time =time.getFullYear()+ ""+formatNumber((time.getMonth()+1))+""+formatNumber(time.getDate())+""+formatNumber(time.getHours())+""+formatNumber(time.getMinutes())+""+formatNumber(time.getSeconds());
    var mydata={
        "data": string,
        "msgid": time,
        "sign": "asfasdfasfasfasfasdf"
    }
    return JSON.stringify(mydata)
}

function postJSON(url,data,callback){
    showLoadding();
    $.ajax({
        url: 'http://192.168.0.121:8888/SaleInterfaces/' + url,
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: data,
        success:function(msg){
            hideLoadding();
            console.log(msg);
            if(msg.data.status==1){
                if (typeof callback === "function") {
                    callback(msg);
                }
            }
            else{
                showTipBox(msg.data.message);
            }
        }
    })
}
