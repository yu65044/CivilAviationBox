var sexMap = new Map();//性别
var nationMap = new Map();//民族
var cardTypeMap = new Map();//证件类型
var airportMap = new Map();//机场名称
var parentNameMap = new Map();//重点人员父节点名称
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
	
	loadDicType();
	$(document).find('select[class*="wide"]').each(function(){
		if($(this).val()!=-1){
			$(this).css('color','#000');
		}else{
			$(this).css('color','#AAA');
		}
	});
	$(document).find('select[class*="wide"]').change(function(){
		if( $(this).val()!=-1 && $(this).val()!='' ){
			$(this).css('color','#000');
		}else{
			$(this).css('color','#AAA');
		}
	});
})

/** 加载数据字典信息 */
function loadDicType() {
	var dicTypeStr = 'sex,nation,cardType';
	var sex = $(document).find('span[id="sex"]').text();
	var nation = $(document).find('span[id="nation"]').text();
	var cardType = $(document).find('span[id="cardType"]').text();
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

				var sexTemp = result.sex;
				for (var i = 0; i < sexTemp.length; i++) {
					var temp = sexTemp[i];
					sexMap.put('' + temp['dataCode'],temp['dataValue']);
				}
				var nationTemp = result.nation;
				for (var i = 0; i < nationTemp.length; i++) {
					var temp = nationTemp[i];
					nationMap.put('' + temp['dataCode'],temp['dataValue']);
				}
				var typeTemp = result.cardType;
				if(undefined!=typeTemp){
					for (var i = 0; i < typeTemp.length; i++) {
						var temp = typeTemp[i];
						cardTypeMap.put('' + temp['dataCode'],temp['dataValue']);
					}
				}

				
				if(sex==-1||sex==''){
					$(document).find('span[id="sex"]').html('----');
				}else{
					$(document).find('span[id="sex"]').html(sexMap.get(sex));
				}
				if(nation==-1||nation==''){
					$(document).find('span[id="nation"]').html('----');
				}else{
					$(document).find('span[id="nation"]').html(nationMap.get(nation));
				}
				if(cardType==-1||cardType==''){
					$(document).find('span[id="cardType"]').html('----');
				}else{
					$(document).find('span[id="cardType"]').html(cardTypeMap.get(cardType));
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

//加载起飞机场信息
function loadAirportMap(){
	var airSegDptAirptCd = $('#airSegDptAirptCd option:selected').val();
	
	if(airSegDptAirptCd!=-1||airSegDptAirptCd=='') $('#airSegDptAirptCd option:selected').remove();
	$.ajax({
		url: ctx+"/airportController/findPageData.do"+"?n=" + Math.random(),
		async:false,
		type:"POST",
		dataType:"json",
		success:function(data){
			var airportList = data.rows;
			for(var i = 0; i< airportList.length;i++){
				var airport = airportList[i];
				airportMap.put(airport.airportIataCd,airport.airportChnNm);
				var selectString = '';
					if(airSegDptAirptCd == airport['airportIataCd']){
						selectString = "  selected='selected' ";
					}
					$("#airSegDptAirptCd").append("<option style='color:#000;' value='"+airport["airportIataCd"]+"'"+selectString+">"+airport["airportChnNm"]+"</option>");
			}
		}
	})
}

//加载到达机场信息
function loadAirportArrMap(){
	var airSegArrvAirptCd = $('#airSegArrvAirptCd option:selected').val();
	
	if(airSegArrvAirptCd!=-1||airSegArrvAirptCd=='') $('#airSegArrvAirptCd option:selected').remove();
	$.ajax({
		url: ctx+"/airportController/findPageData.do"+"?n=" + Math.random(),
		async:false,
		type:"POST",
		dataType:"json",
		success:function(data){
			var airportList = data.rows;
			for(var i = 0; i< airportList.length;i++){
				var airport = airportList[i];
				var selectString = '';
					if(airSegArrvAirptCd == airport['airportIataCd']){
						selectString = "  selected='selected' ";
					}
					$("#airSegArrvAirptCd").append("<option style='color:#000;' value='"+airport["airportIataCd"]+"'"+selectString+">"+airport["airportChnNm"]+"</option>");
			}
		}
	})
}

//加载起飞航站
function loadsegDeptCodeMap(){
	var segDeptCode = $('#segDeptCode option:selected').val();
	
	if(segDeptCode!=-1||segDeptCode=='') $('#segDeptCode option:selected').remove();
	$.ajax({
		url: ctx+"/airportController/findPageData.do"+"?n=" + Math.random(),
		async:false,
		type:"POST",
		dataType:"json",
		success:function(data){
			var airportList = data.rows;
			for(var i = 0; i< airportList.length;i++){
				var airport = airportList[i];
				airportMap.put(airport.airportIataCd,airport.airportChnNm);
				var selectString = '';
					if(segDeptCode == airport['airportIataCd']){
						selectString = "  selected='selected' ";
					}
					$("#segDeptCode").append("<option style='color:#000;' value='"+airport["airportIataCd"]+"'"+selectString+">"+airport["airportChnNm"]+"</option>");
			}
		}
	})
}

//加载到达航站
function loadsegDestCodeMap(){
	var segDestCode = $('#segDestCode option:selected').val();
	
	if(segDestCode!=-1||segDestCode=='') $('#segDestCode option:selected').remove();
	$.ajax({
		url: ctx+"/airportController/findPageData.do"+"?n=" + Math.random(),
		async:false,
		type:"POST",
		dataType:"json",
		success:function(data){
			var airportList = data.rows;
			for(var i = 0; i< airportList.length;i++){
				var airport = airportList[i];
				var selectString = '';
					if(segDestCode == airport['airportIataCd']){
						selectString = "  selected='selected' ";
					}
					$("#segDestCode").append("<option style='color:#000;' value='"+airport["airportIataCd"]+"'"+selectString+">"+airport["airportChnNm"]+"</option>");
			}
		}
	})
}


//重点人员父节点名称
function loadparentNameMap(){
	var parentCode = $('#parentCode option:selected').val();
	
	if(parentCode!=-1||parentCode=='') $('#parentCode option:selected').remove();
	$.ajax({
		url: ctx+"/zdryPersonTypeController/loadparentNameMap.do"+"?n=" + Math.random(),
		async:false,
		type:"POST",
		dataType:"json",
		success:function(data){
			var personTypeList = data.rows;
			for(var i = 0; i< personTypeList.length;i++){
				
				var personType = personTypeList[i];
				if(personType.parentCode != null && personType.parentName != null){
					parentNameMap.put(personType.parentCode,personType.parentName);

					var selectString = '';
					if(parentCode == personType['parentCode']){
						selectString = "  selected='selected' ";
					}
					$("#parentCode").append("<option style='color:#000;' value='"+personType["parentCode"]+"'"+selectString+">"+personType["parentName"]+"</option>");
				}
				
			}
		}
	})
}
