//异步请求SESSION_OUT跳转到登录页
$.ajaxSetup({
	complete:function(XMLHttpRequest){
		if(XMLHttpRequest.responseText=="SESSION_OUT"){
			location.href=basePath;
			return;
		}
	}
}); 

$(function(){
	//loadI18NProperties();
});
function loadI18NProperties(){
	// i18n 国际化加载 cookie
	var language = $.cookie('clientLanguage');
	var language;
	if (language == null) {
		language = 'zh_CN';
	}
	jQuery.i18n.properties({// 加载资浏览器语言对应的资源文件
		name : 'message', // 资源文件名称
		language : language,// 国际化语言
		path : basePath + 'i18n/', // 资源文件路径
		mode : 'map', // 用Map的方式使用资源文件中的值
		callback : function() {// 加载成功后设置显示内容
		}
	});

	// console.info($.i18n.prop('test00'));
}

String.prototype.SubText = function(obj) {
	if (this == null | this.length == 0) return "";
	if (this.length < obj) {
		return this;
	} else {
		return this.substring(0, obj) + "...";
	}
}

/**
 * 格式化文件大小, 输出成带单位的字符串
 * @method formatSize
 * @grammar Base.formatSize( size ) => String
 * @grammar Base.formatSize( size, pointLength ) => String
 * @grammar Base.formatSize( size, pointLength, units ) => String
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 * @example
 * console.log( Base.formatSize( 100 ) );    // => 100B
 * console.log( Base.formatSize( 1024 ) );    // => 1.00K
 * console.log( Base.formatSize( 1024, 0 ) );    // => 1K
 * console.log( Base.formatSize( 1024 * 1024 ) );    // => 1.00M
 * console.log( Base.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
 * console.log( Base.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
 */
var formatSize = function( size, pointLength, units ) {
    var unit;

    units = units || [ 'B', 'K', 'M', 'G', 'TB' ];

    while ( (unit = units.shift()) && size > 1024 ) {
        size = size / 1024;
    }

    return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) +
            unit;
}

/*
 * 比较版本号
 * @param {String} v1 版本号1
 * @param {String} v2 版本号2
 * @resturn 1：大于，-1：小于，0：相同
 */
var compareVersion = function(v1, v2) {
	v1 = v1.replace(/^v/g, ''); 
	v2 = v2.replace(/^v/g, ''); 

    var l1 = v1.split('.');
    var l2 = v2.split('.');
    len = l1.length > l2.length? l1.length: l2.length;
    for (var i = 0; i < len; i++) {
        n1 = l1[i] || 0;
        n2 = l2[i] || 0;
        if (n1 > n2) {
            return 1;
        } else if (n1 < n2) {
            return -1;
        }
    }
    return 0;
}
//从url地址参数(dirPath为null的时候返回"/")
var getQueryString=function(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
    	return unescape(r[2]);
    }else if(name=="dirPath"){
    	return "/";
    }
    return null;
};
//设置遮罩层
function blockUi(showArg){
	var showStr = '正在处理数据中，请稍候……';
	if(showArg){
		showStr = showArg;
	}
	var mssageStr = '<div style="border:1px solid #99BCE8;background:#DFE9F6;height:30px;line-height:30px;width:auto;margin:5px;padding:0 10px;">'
					 +'<img src="'+basePath+'images/loading.gif" style="margin-right:10px;vertical-align:middle;"/>'
				     +showStr
				   +'</div>';
	//方法位于 jquery.blockUI.js中
	$.blockUI({
		message: mssageStr,
		baseZ:88888,
		css: {border:'1px solid #99BCE8',width:'auto',left:'45%',top:'45%'},
		overlayCSS:{backgroundColor:'#DDDDDD'}
	});
}

//取消遮罩层
function unblockUi(){
	//方法位于 jquery.blockUI.js中
	$.unblockUI();
}


function dateFormat(number){
	//为了匹配yyyy-MM-dd hh:mm:ss等字符串格式
	if(isNaN(number)){
		number = Date.parse(number.replace(/-/g,   "/"));
	}
	var d = new Date(number);
	var yyyy = d.getFullYear();
	var MM = d.getMonth() + 1;
		MM = MM<10? '0'+MM:MM;
	var dd = d.getDate();
		dd = dd<10? '0'+dd:dd;
	var hh = d.getHours();
		hh = hh<10? '0'+hh:hh;
	var mm = d.getMinutes();
		mm = mm<10? '0'+mm:mm;
	var ss = d.getSeconds();
		ss = ss<10? '0'+ss:ss;
	return yyyy+'-'+MM+'-'+dd+' '+hh+':'+mm+':'+ss;
}

//获取资源
var mngGrade = [];//年级
var mngSubject = [];//学科
var mngVersion = [];//资源版本
var mngResourceType = [];//资源文件
var mngContentType = [];//资源分类
function getMngDictionaryList(){
	$.ajax({
		url:basePath+"school/getDictionaryMore",
		type:"POST",
		cache:false,
		async:false,
		data:{keyCode:"'CONTENTTYPE','RESOURCETYPE','VERSION','SUBJECT','GRADE'",pKeyValue:"0000"},
		dataType:"json",
		success:function(rd, textStatus, XMLHttpRequest){
			//[[年级,0000,GRADE],[一年级,01,GRADE]]
			var r;
			for(var i=0,li=rd.length; i<li; i++){
				r = rd[i];
				switch(r.c){
					case 'GRADE': 
						mngGrade.push({keyCName:r.n,keyValue:r.k});
						break;
					case 'SUBJECT': 
						mngSubject.push({keyCName:r.n,keyValue:r.k});
						break;
					case 'VERSION': 
						mngVersion.push({keyCName:r.n,keyValue:r.k});
						break;
					case 'RESOURCETYPE': 
						mngResourceType.push({keyCName:r.n,keyValue:r.k});
						break;
					case 'CONTENTTYPE': 
						mngContentType.push({keyCName:r.n,keyValue:r.k});
						break;
					default:
				}
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			
		}
	});
}
//获取年级option
function edu_mng_getOptionFunc(d){//mngGrade
	var md = [];
	switch(d.type.toUpperCase()){
		case 'GRADE': 
			md = mngGrade;
			break;
		case 'SUBJECT': 
			md = mngSubject;
			break;
		case 'VERSION': 
			md = mngVersion;
			break;
		case 'RESOURCETYPE': 
			md = mngResourceType;
			break;
		case 'CONTENTTYPE': 
			md = mngContentType;
			break;
		default:
	}
	var options = "";
	if(d.isOnly){//只获取一个option的
		for(var i=0;i<md.length;i++){
			if(md[i].keyValue==d.val){
				options ='<option value="'+md[i].keyValue+'">'+md[i].keyCName+'</option>';
				break;
			}
		}
	}else{
		if(d.option=="span"){//自己的span样式
			for(var i=0;i<md.length;i++){
				options +='<span val="'+md[i].keyValue+'">'+md[i].keyCName+'</span>';
			}
		}else{
			for(var i=0;i<md.length;i++){
				options +='<option '+(md[i].keyValue==d.val?'selected="selected"':'')+' value="'+md[i].keyValue+'">'+md[i].keyCName+'</option>';
			}
		}
		
	}
	return options;
}
function getUserTypeName(id){
	var r = "未知";
	switch(id){
		case 6: r="班主任兼任课教师";break;
		case 4: r="班主任";break;
		case 2: r="任课教师";break;
		case 1: r="学生";break;
		default:
	}
	return r;
}
//获取option 名称
function edu_mng_getOptionNameFunc(d){//mngGrade
	var md = [];
	switch(d.type.toUpperCase()){
		case 'GRADE': 
			md = mngGrade;
			break;
		case 'SUBJECT': 
			md = mngSubject;
			break;
		case 'VERSION': 
			md = mngVersion;
			break;
		case 'RESOURCETYPE': 
			md = mngResourceType;
			break;
		case 'CONTENTTYPE': 
			md = mngContentType;
			break;
		default:
	}
	var gn = d.val;
	for(var i=0; i<md.length; i++){
		if(md[i].keyValue==d.val){
			gn = md[i].keyCName;
			break;
		}
	}
	return gn;
}
function myInterval(){
	var myi = setInterval(function(){
		$.ajax({
			url:basePath+"eduUser/checkIsLogin",
			type:"POST",
			cache:false,
			async:false,
			data:{},
			dataType:"json",
			success:function(r, textStatus, XMLHttpRequest){
				if(XMLHttpRequest.status == 901){return false;}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
			}
		});
	},10*60*1000);
	
}

//每分钟刷新一次是否有未读消息
function getUnMessageInterval(){
	var myi = setInterval(refreshUnRead,60*1000);
}

function refreshUnRead(){
	//前端显示没有消息的时候才向后台请求。
	if(!$("msg-tip-dot").hasClass("has-news")){
		$.ajax({
			url:basePath+"message/getInformCount",
			type:"POST",
			cache:false,
			async:false,
			dataType:"json",
			success:function(r, textStatus, XMLHttpRequest){
				if(r.homeworkcount>0||r.noticecount>0||r.applycount>0||r.classApplyCount>0){
					$("#msg-tip-dot").addClass("has-news");
				}else{
					$("#msg-tip-dot").removeClass("has-news");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				//取消遮罩层
				//unblockUi();
				//jAlert("加载消息列表时，系统出错啦...","信息提醒对话框",function(){});
			}
		});
	}
}


/**管理中心个人主库信息 start*/
var edu_act_user_info = [];//{"uid":10168,"rn":"","ue":"324129770@qq.com","ua":"lumingming1987","um":""}
function isEdu_act_user_info_exists(id){//读取数据
	var ret = false;
	for(var i=0,li=edu_act_user_info.length;i<li;i++){
		if(edu_act_user_info[i].uid==id){
			ret = true;
			break;
		}
	}
	return ret;
}
function getEdu_act_user_info(id){//读取数据
	var ret = {};
	for(var i=0,li=edu_act_user_info.length;i<li;i++){
		if(edu_act_user_info[i].uid==id){
			ret = edu_act_user_info[i];
			break;
		}
	}
	return ret;
}
function setEdu_act_user_info(id){//写入记录
	$.ajax({//加载主库的信息
		url:basePath+"eduUser/getMyActUserInfo",
		type:"POST",
		cache:false,
		async:false,//
		data:{uid:id},
		dataType:"json",
		success:function(r, textStatus, XMLHttpRequest){
			if(XMLHttpRequest.status == 901){return false;}
			var edu_act_user_info_temp = [];
			for(var i=0,li=edu_act_user_info.length;i<li;i++){
				if(edu_act_user_info[i].uid!=id){
					edu_act_user_info_temp.push(edu_act_user_info[i]);
				}
			}
			edu_act_user_info_temp.push(r);
			edu_act_user_info = edu_act_user_info_temp;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}

var edu_mng_sm=[];
//获取当前登陆教师所在年级//val,shid
function getPersonGrade(d_){
	val = d_.val?true:false;
	$.ajax({
		url:basePath+"school/getDictionaryMore",
		type:"POST",
		cache:false,
		async:val,
		data:{keyCode:"'GRADE'", pKeyValue:'0000',shid:d_.shid},
		dataType:"json",
		success:function(r, textStatus, XMLHttpRequest){
			edu_mng_sm = r;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){}
	});
}
/**管理中心个人主库信息 start*/