
$.EasyUIComboInfoUI=function(v,comboActionURL,tipName){
	var tempTipName = tipName==undefined?"请选择组织机构":tipName;
	$('#'+v).combotree({
		url: comboActionURL, 
		height:36,
	    animate:true,
	    lines: true,
	    editable: true,
	    loadFilter: function(data){  
           	return data.data;
	    }
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
	$(document).find('input[class*="combo-text"]').attr('placeholder',tempTipName);
	$(document).find('span.combo').click(function(){
		var w = $(document).find('span.combo').width();
		$(document).find('div[class*="panel"]').css({'width':w+'px','border-color':'#07B2EB'});
		$(document).find('div[class*="panel"] div[class*="combo-panel"]').css({'width':w+'px'});
	});
	/** 修改easyui树形下拉列表样式 END */
}
$(function(){
	$.fn.combotree.defaults.editable=true;
	$.extend($.fn.combotree.defaults.keyHandler,{
		up:function(){
			console.log('up');
		},
		down:function(){
			console.log('down');
		},
		enter:function(){
			console.log('enter');
		},
		query:function(q){
			var t = $(this).combotree('tree');
			var nodes = t.tree('getChildren');
			for (var i = 0; i < nodes.length; i++) {
				var node = nodes[i];
				if(node.text.indexOf(q)>=0){
					$(node.target).show();
				}else{
					$(node.target).hide();
				}
			}
			
			var opts = $(this).combotree('options');
			if(!opts.hasSetEvents){
				opts.hasSetEvents = true;
				var onShowPanel = opts.onShowPanel;
				opts.onShowPanel = function(){
					var nodes = t.tree('getChildren');
					for(var i = 0 ; i < nodes.length; i++){
						$(nodes[i].target).show();
					}
					onShowPanel.call(this);
				};
				$(this).combo('options').onShowPanel = opts.onShowPanel;
			}
		}
	});
})