var qresult = new Array();
var pre_qids = new Array();
var cur_qids = new Array();
var lastdata;
var lastdatapushed = false;
var serviceUrl = "/Services/WebService.asmx/GetReportHtml";

var voted = false;
var posttime;
var commentUrl = "/Services/SurService.svc/comment";

var commentLoadUrl = "/Services/SurService.svc/commenthtml"

var voteUrl = "/Services/SurService.svc/vote";


//begin survey actions

function do_prev() {
    var preQid = pre_qids.pop();
    var curQid = cur_qids.pop();
    qresult.pop();
    $('#id_show_result').hide();
    $('#qindex_' + curQid).hide();
    $('#qindex_' + preQid).fadeIn();
    $("#id_submit").hide();
    if (pre_qids.length === 0) {
        $('#id_pre_link').hide();
    }
}

function do_next(el) {
    $(".surveydetailmask").show();
    var radio = $($(el).find('input:checked')[0]);
    var cindex = radio.attr('cindex');
    var nindex = radio.attr('nindex');
    var qid = radio.attr('qid');
    var aid = radio.attr('value');
    if (nindex === "" || nindex === "0") {
        nindex = parseInt(cindex) + 1;
        if ($('#qindex_' + nindex).length === 0) {
            nindex = 1;
        }
    }
    $('#id_pre_link').show();
    var data;
    if (nindex > 1) {
        data = { Q: qid, A: aid };
        qresult.push(data);
        pre_qids.push(cindex);
        cur_qids.push(nindex);
        setTimeout("$('#qindex_' +" + cindex + ").hide();$('#qindex_' +" + nindex + ").show();$('.surveydetailmask').hide();loadImg();", 300);
        $("#id_submit").hide();
    } else {
        data = { Q: qid, A: aid };
        lastdata = data;
        $("#id_submit").show();
        $(".surveydetailmask").hide();
        //last question
    }
    //loadImg();
}

function setTestSels(ele, clickfun) {
    var items = $(ele);
    items.hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    }).click(function () {
        items.removeClass('act');
        var radio = $(this).find(':radio');
        if (radio.length > 0) {
            $(this).addClass('act');
            radio.attr('checked', 'checked');
            if (clickfun) {
                clickfun(this);
            }
        }
    });
}

function showresult() {
    if (!lastdatapushed) {
        qresult.push(lastdata);
        lastdatapushed = true;
    }
    if ($("#imgLoad").css("display") === "none") {
        $("#imgLoad").show();
        $("#id_pre_link").hide();
        $("#id_submit").hide();
    }

    $.ajax({
        url: serviceUrl,
        type: "post",
        dataType: "json",
        data: JSON.stringify({ "result": { "MasterID": masterid, "UserOpenID": usercode, "QAList": qresult, "RealTest": true }}),
        contentType: 'application/json',
        //async: true,
        success: function (data) {
            $(".surveydetail").hide();
            $(".surveyoperation").hide();
            $(".surveyreport").show();
            $(".surveyreport").html(data.d);
            var title = $("#navtitle").text();
            if ($(".shortreport").text().length > 0) {
                title = $(".shortreport").text();
            }
            var shortimg = $(".shortimg").text();
            //window._bd_share_config = {
            //    'common': {
            //        'bdSnsKey': {},
            //        'bdText': title,
            //        'bdDesc': title,
            //        'bdMini': '1',
            //        'bdMiniList': false,
            //        'bdPic': shortimg,
            //        'bdStyle': '0',
            //        'bdSize': '32',
            //        'bdUrl': window.location.href.substring(0, window.location.href.length - 1)
            //    },
            //    'share': {}
            //};
            //with (document)
            //    0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89343201.js?cdnversion=' + ~(-new Date() / 36e5)];


            //$(".bdshare_m").show();
            $(".result_tools").show();
            $(".mouter").show();
            loadcomment(1);
        },
        error: function () {
            $("#id_submit").show();
            alert("获取数据超时，请尝试重新点击提交按钮");
        }
    });
    return false;
}

function loadImg() {
    $(".test_contents:visible").find("img").each(function () {
        var e = $(this).attr("data-url");
        $(this).attr("src", e);
    });
}

//end survey actions

//begin vote and comment section
function voteup(el,agree) {
    if (voted) {
        alert("你已经投过票了哦！");
        return;
    }
    var mid = $(el).attr("mid");
    $.ajax({
        url: voteUrl,
        type: "post",
        dataType: "json",
        data: JSON.stringify({ "MasterId": mid, "Agree": agree }),
        contentType: 'application/json',
        success: function (data) {
            voted = true;
            $(".up_downs a").addClass("greylink");
            $(el).attr('disabled', true);
            var num = 0;
            if (agree)
            {
                 num = parseInt($("#id_up_span").html());
                $("#id_up_span").html(num + 1);
            }
            else
            {
                 num = parseInt($("#id_down_span").html());
                $("#id_down_span").html(num + 1);
            }
           
            alert("投票成功");
        },
        error: function () {
        }
    });
}

function addcomment(el) {
    if ($("#id_comment_content").val() === "") {
        $("#id_comment_content_msg").show();
        return;
    }
    $("#id_comment_content_msg").hide();
    if (posttime !== undefined && (new Date() - posttime) < 30000) {
        alert("发表评论过快，请稍后再试！");
        return;
    }
    var postcomment = function (el) {
        var code = "113B976142B8E34EAD0F6D74C8791522";
        var masterId = $(el).attr("mid");
        var comment = $("#id_comment_content").val();
        $.ajax({
            url: commentUrl,
            type: "post",
            dataType: "json",
            data: JSON.stringify({ "MasterId": masterid, "UserOpenId": code, "Comment": comment }),
            contentType: 'application/json',
            success: function (data) {
                alert("评论发布成功，等待系统审核!");
            },
            error: function () { alert("评论发布失败，请重试!"); }
        });
    }
    postcomment(el);
    return false;
}

function loadcomment(p) {
    //var masterId = $("#id_comment_submit").attr("mid");
    //$.ajax({
    //    url: commentLoadUrl + "/" + masterId + "/" + p,
    //    type: "get",
    //    dataType: "json",
    //    cache: false,
    //    success: function (data) {
    //        $("#comment_list").html(data);
    //    },
    //    error: function () {
    //    }
    //});
}

//end vote and comment section


$(function () {
    setTestSels('.sels_list .items', do_next);
    $('.test_contents').hide();
    $("#id_submit").hide();
    $('.test_contents:first').show();
    $('#id_pre_link').hide();
    $("#imgLoad").hide();
    loadImg();
});