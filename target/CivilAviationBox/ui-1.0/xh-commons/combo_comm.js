$.EasyUIComboComm=function(v,width){
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