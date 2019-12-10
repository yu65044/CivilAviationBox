
var warnLevelMap = new Map();//预警等级的MAP
var WarnLevelActionUrl = ctx+"/warnLevelController/findWarnLevelList.do?n=" + Math.random();
/** 预警等级的信息 */
function loadWarnLevelInfo() {
	$.ajax({  //维度信息
		url : WarnLevelActionUrl,
		async:false,
		type : "POST",
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var typeTemp = result.data;
				for (var i = 0; i < typeTemp.length; i++) {
					var temp = typeTemp[i];
					warnLevelMap.put('P'+temp['warnLevel'],temp['warnBeginVal']+'#'+temp['warnEndVal']);
				}
			}else{
				layer.msg("加载预警等级信息失败，请联系管理员!");
			}
		},
		error: function(){
			layer.msg("加载预警等级信息异常，请联系管理员!");
		}
	})	
}
