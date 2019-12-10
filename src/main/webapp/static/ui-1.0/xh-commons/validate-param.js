
//验证下拉框的值是否为选择,idVal:Id;defaultVal:默认没有选择的值，一般为代码；promptVal:提示信息
function chooseValidateVal(idVal,defaultVal,promptVal,seat){
	var tempChooseVal = $.trim($('#'+idVal).val());
	
	if(tempChooseVal==defaultVal){
		$('#'+idVal).focus();
		layer.tips(promptVal,$('#'+idVal),
	   		 {tips: [seat, '#78BA32'],time:2000}
	   	);
		return false;
	}else{
		return true;
	}
}

//验证文本框的值，是否为空和是否争取;idVal:id值；validateFormat：验证的格式类型数据,seat:显示的位置
function textValidateVal(idVal,validateFormat,seat){
	var tempTextVal = $.trim($('#'+idVal).val());
	if(tempTextVal!=''){
		if(''!=validateFormat){
			if(!validateFormat.test(tempTextVal)){
				layer.tips("输入的信息有误、请重新输入!",$('#'+idVal),
				   		 {tips: [seat, '#78BA32'],time:2000});
				$("#"+idVal).focus();
				return  false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		$('#'+idVal).focus();
		layer.tips('信息不能为空',$('#'+idVal),
	   		 {tips: [seat, '#78BA32'],time:2000}
	   	);
		return false;
	}
}

/**添加无人机数据*/
function saveUAVValidate(){
	var memberName = $('#memberName').val();
	var uavModel = $('#uavModel').val();
	var prdName = $('#prdName').val();
	var uavWeight = $('#uavWeight').val();
	var modelFlyWeight = $('#modelFlyWeight').val();
	var uavNumber = $('#uavNumber').val();
	var uavFlightNum = $('#uavFlightNum').val();
	var uavRotorNum = $('#uavRotorNum').val();
	var uavPurpose = $('#uavPurpose').val();
	var uavIdent = $('#uavIdent').val();
	var uavMakerName = $('#uavMakerName').val();
	var uavMakerPhone = $('#uavMakerPhone').val();
	
	if(memberName!=''&&uavModel!=-1&&prdName!=''&&uavWeight!=-1&&modelFlyWeight!=''&&uavNumber!=''
		&&uavFlightNum!=''&&uavRotorNum!=''&&uavPurpose!=''&&uavIdent!=''&&uavMakerName!=''&&uavMakerPhone!=''){
		return true;
	}else{
		return false;
	}
};

/**添加无人机布控数据*/
function saveUAVDValidate(){
	var uavId = $.trim($('#uavId').val());//无人机ID
	var dispatchedType = $.trim($('#dispatchedType').val());//布控类别
	var dispatchedState = $.trim($('#dispatchedState').val());//布控状态
	var beginTime = $.trim($('#beginTime').val());//布控开始时间
	var endTime = $.trim($('#endTime').val());//布控结束时间
	
	if(uavId!=''&&dispatchedType!=-1&&dispatchedState!=-1&&beginTime!=''&&endTime!=''){
		return true;
	}else{
		return false;
	}
};


function textValidFn(param){
	if(!textValidateVal('name','','2')){
		return false;
	}
	if(!chooseValidateVal('sex','-1','请选择性别',3)){
		return false;
	}
	if(!chooseValidateVal('nation','-1','请选择民族',3)){
		return false;
	}
	
	
	//身份证号码验证
	var idCardFormat = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	if(!textValidateVal('cardNumber',idCardFormat,'2')){
		return false;
	}
	//入职日期
	if(!textValidateVal('hireDate','','2')){
		return false;
	}
	//手机号码验证
	var  phoneFormat = /^(((0\d{2,3}-){0,}\d{7,8})|(1[35847]\d{9}))$/;
	if(!textValidateVal('phone',phoneFormat,'2')){
		return false;
	}
	return true;
}