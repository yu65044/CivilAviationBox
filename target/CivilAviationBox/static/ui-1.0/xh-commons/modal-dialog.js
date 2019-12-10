var cardTypeMap = new Map();//证件类型
var sexMap = new Map();//性别
var nationMap = new Map();//民族
var marryMap = new Map();//婚姻状况
var memberTypeMap = new Map();//用户类型
var factoryTypeMap = new Map();//单位类型
var dimensionLevelMap = new Map();//航班风险等级的维度级别
var orgListUrl = ctx+"/userPermissionController/findOrgPermission.do";
$(function() {
	/** 查询弹窗自适应窗口大小 BEGIN */
	var size = {
		width : $(window).width(),
		height : $(window).height()
	};
	var w = $('.modal-dialog').width();
	if (size.width < w) {
		w = size.width - 20;
	}
	$('.modal-dialog').css("width", w + 'px');
	/** 查询弹窗自适应窗口大小 END */

})


/** 加载数据字典信息 */
function loadDicType(dicTypeStr) {
	
	$.ajax({
		url : ctx + "/dicController/findDicDataJson.do" + "?n=" + Math.random(),
		data : {
			dicTypeStr : dicTypeStr
		},
		 async:false,
		type : "POST",
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var typeTemp = result.cardType;
				if(undefined!=typeTemp){
					for (var i = 0; i < typeTemp.length; i++) {
						var temp = typeTemp[i];
						cardTypeMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}
				var sexTemp = result.sex;
				if(undefined!=sexTemp){
					for (var i = 0; i < sexTemp.length; i++) {
						var temp = sexTemp[i];
						sexMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}

				var nationTemp = result.nation;
				if(undefined!=nationTemp){
					for (var i = 0; i < nationTemp.length; i++) {
						var temp = nationTemp[i];
						nationMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}

				var marryTemp = result.marry;
				if(undefined!=marryTemp){
					for (var i = 0; i < marryTemp.length; i++) {
						var temp = marryTemp[i];
						marryMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}
				var wdjbTemp = result.hbfxdj_wdjb;
				if(undefined!=wdjbTemp){
					for (var i = 0; i < wdjbTemp.length; i++) {
						var temp = wdjbTemp[i];
						dimensionLevelMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}
				var memberTypeTemp = result.memberType;
				if(undefined!=memberTypeTemp){
					for (var i = 0; i < memberTypeTemp.length; i++) {
						var temp = memberTypeTemp[i];
						memberTypeMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}
				var factoryTypeTemp = result.factoryType;
				if(undefined!=factoryTypeTemp){
					for (var i = 0; i < factoryTypeTemp.length; i++) {
						var temp = factoryTypeTemp[i];
						factoryTypeMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}
				
			}else{
				layer.msg("加载数据字典信息失败，请联系管理员!");
			}
		},
		error: function(){
			layer.msg("加载数据字典信息异常，请联系管理员!");
		}
	})
}

//加载工作单位下拉列表
function loadCompanyInfo(){
	var compId = $('#compId option:selected').val();
	if(compId!=-1||compId=='') $('#compId option:selected').remove();
	var initFilter = {"groupOp":"AND","rules":[{"field":"is_delete","op":"exp","data":" is_delete = 0"}]};
	$.ajax({
		url: ctx+"/companyController/findAllCompanyDatagrid.do"+"?n=" + Math.random(),
		data:{filterJson:JSON.stringify(initFilter)},
		async:false,
		type:"POST",
		dataType:"json",
		success:function(data){
			var compTemp = data.rows;
			for(var i = 0; i< compTemp.length;i++){
				var temp = compTemp[i];
				compMap.put(''+temp.compId,temp);
				var selectString = ''
				if(compId == temp['compId']){
					selectString = "  selected='selected' ";
				}
				$("#compId").append("<option style='color:#000;' value='"+temp["compId"]+"'"+selectString+">"+temp["compName"]+"</option>");
			}
		}
	})
}

$.EasyUICombo=function(v){
	$('#'+v).combotree({
		url: ctx+"/userPermissionController/findOrgComPermission.do?n=" + Math.random(), 
		height:36,
	    animate:true,
	    lines: true,
	    loadFilter: function(data){  
           	return data.data;
	    },
    });
	
	/** 修改easyui树形下拉列表样式 BEGIN */
	$(document).find('span.combo-arrow').css({'opacity':'10','position':'relative', 'right':'7px', 'bottom':'-2px','height':'30px', 'width':'20px', 'background': 'url(\'../static/images/commons/btn_arrow.bmp\')'});
	$(document).find('span.combo-arrow').mouseover(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow_mouseover.bmp\') 1px 1px no-repeat');
	}).mouseout(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow.bmp\') no-repeat');
	});
	$(document).find('span.combo').css({'width':'100%'});
	$(document).find('span.combo').mouseover(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow_mouseover.bmp\') 1px 1px no-repeat');
	}).mouseout(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow.bmp\') no-repeat');
	});
	$(document).find('input[class*="combo-text"]').css({'width':'91.8%','cursor':'default'});
	$(document).find('input[class*="combo-text"]').attr('placeholder','请选择组织机构');
	$(document).find('span.combo').click(function(){
		var w = $(document).find('span.combo').width();
		$(document).find('div[class*="panel"]').css({'width':w+'px','border-color':'#07B2EB'});
		$(document).find('div[class*="panel"] div[class*="combo-panel"]').css({'width':w+'px'});
	});
	/** 修改easyui树形下拉列表样式 END */
}
$.EasyUIComboInfo=function(v,width){
	$('#'+v).combotree({
		url: ctx+"/userPermissionController/findOrgComPermission.do?n=" + Math.random(), 
		height:36,
	    animate:true,
	    lines: true,
	    loadFilter: function(data){  
           	return data.data;
	    },
    });
	
	/** 修改easyui树形下拉列表样式 BEGIN */
	$(document).find('span.combo-arrow').css({'opacity':'10','position':'relative', 'right':'7px', 'bottom':'-2px','height':'30px', 'width':'20px', 'background': 'url(\'../static/images/commons/btn_arrow.bmp\')'});
	$(document).find('span.combo-arrow').mouseover(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow_mouseover.bmp\') 1px 1px no-repeat');
	}).mouseout(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow.bmp\') no-repeat');
	});
	$(document).find('span.combo').css({'width':width+'px'});
	$(document).find('span.combo').mouseover(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow_mouseover.bmp\') 1px 1px no-repeat');
	}).mouseout(function(){
		$(document).find('span.combo-arrow').css('background','url(\'../static/images/commons/btn_arrow.bmp\') no-repeat');
	});
	$(document).find('input[class*="combo-text"]').css({'width':'91.8%','cursor':'default'});
	$(document).find('input[class*="combo-text"]').attr('placeholder','请选择组织机构');
	$(document).find('span.combo').click(function(){
		var w = $(document).find('span.combo').width();
		$(document).find('div[class*="panel"]').css({'width':w+'px','border-color':'#07B2EB'});
		$(document).find('div[class*="panel"] div[class*="combo-panel"]').css({'width':w+'px'});
	});
	/** 修改easyui树形下拉列表样式 END */
}

