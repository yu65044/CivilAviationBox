
var dimensionTypeMap = new Map();//维度类型
var dimensionInfoMap = new Map();//维度信息
var dimenInfoTypeMap = new Map();//维度类型与维度对应
var dimensionInfoActionUrl = ctx+"/dimensionController/findAllDimensionInfo.do?n=" + Math.random();
var dimensionTypeActionUrl = ctx+"/dimensionTypeController/findDetailDimensionType.do?n=" + Math.random();
var dimenLabelMap = new Map(); //计算维度和维度的Map对象

/** 加载数据字典信息 */
function loadDimensionInfo(dimesionIdStr) {
	$.ajax({  //维度信息
		url : dimensionInfoActionUrl,
		async:false,
		type : "POST",
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var typeTemp = result.data;
				if(undefined!=typeTemp){
					for (var i = 0; i < typeTemp.length; i++) {
						var temp = typeTemp[i];
						dimensionInfoMap.put(temp['dimensionId'],temp['dimensionName']+','+temp['dimensionType']);
						dimenInfoTypeMap.put(temp['dimensionId'],temp['dimensionType']);
					}
				}
				
			}else{
				layer.msg("加载维度信息失败，请联系管理员!");
			}
		},
		error: function(){
			layer.msg("加载维度信息异常，请联系管理员!");
		}
	})
	//维度类型信息
	$.ajax({
		url : dimensionTypeActionUrl,
		async:false,
		type : "POST",
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var typeTemp = result.data;
				if(undefined!=typeTemp){
					for (var i = 0; i < typeTemp.length; i++) {
						var temp = typeTemp[i];
						dimensionTypeMap.put(temp['dimensionTypeId'],temp['dimensionTypeName']);
					}
				}
				
			}else{
				layer.msg("加载维度类型信息失败，请联系管理员!");
			}
		},
		error: function(){
			layer.msg("加载维度类型信息异常，请联系管理员!");
		}
	})
	
}

function dimensionInfoFn(dimensionId,dimensionInfoMap,dimensionTypeMap){
	var tempMap = new Map();
	if(dimenArr != null){
		var dimenArr = dimensionId.split(",");
		for(var d=0;d<dimenArr.length;d++){
			if(undefined!=dimensionInfoMap.get(dimenArr[d])){
				var dimenArrTemp = dimensionInfoMap.get(dimenArr[d]).split(',');
				if(tempMap.get(dimenArrTemp[1])==null){
					tempMap.put(dimenArrTemp[1],dimenArrTemp[0]);
				}else{
					tempMap.put(dimenArrTemp[1],tempMap.get(dimenArrTemp[1],dimenArrTemp[0])+","+dimenArrTemp[0]);
				}
			}
		}
	}
	 var resultVal = "--";
	 if(tempMap.elements.length>0){
		 resultVal ="";
		 for(i = 0; i < tempMap.elements.length; i++) {     
			 if(i>0){
				 resultVal +=';'
			 }
			 var key = tempMap.elements[i].key;
			 resultVal +='('+dimensionTypeMap.get(key)+')'+tempMap.get(key);     
	     } 
	}
	 return resultVal;
}
/** 加载计算维度和维度的信息 */
function loadDimenLabel(dimenLabelActionUrl,parem) {
	//计算维度和维度的信息
	$.ajax({
		url : dimenLabelActionUrl,
		async:false,
		type : "POST",
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var typeTemp = result.data;
				if(undefined!=typeTemp){
					for (var i = 0; i < typeTemp.length; i++) {
						var temp = typeTemp[i];
						dimenLabelMap.put(temp['id'],temp['text']);
					}
				}
			}else{
				layer.msg("加载维度类型信息失败，请联系管理员!");
			}
		},
		error: function(){
			layer.msg("加载维度类型信息异常，请联系管理员!");
		}
	})
}
//获取前置条件信息
function getTerm(labelFirstCombox,labelSecondCombox){
	var isTerm1 = document.getElementById('isTerm1').checked;
	var isTerm = '';
	var isTerm2 = document.getElementById('isTerm2').checked;
	if(isTerm1){
		isTerm = labelFirstCombox;
	}
	if(isTerm2){
		if(isTerm==''){
			isTerm = labelSecondCombox;
		}else{
			isTerm = labelFirstCombox+','+labelSecondCombox;
		}
	}
	return isTerm;
}

