/*$(function(){
	var validateArr = [];
	validateArr.push({ "field": "personName", "reg": "", "tips_text": "用户名不能为空","tips_align":"2","tips_color":"#78BA32"});
	$.formValidate(validateArr);
})*/

 //电话号码正则表达式
 var phoneReg = /^(((0\d{2,3}-){0,}\d{7,8})|(1[35847]\d{9}))$/;
 //身份证号码格式
 var cardNumberReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
/***
 * 验证前端的数据格式是否正确
 * validateArr 的数据格式类型:
 * eg:var validateArr = [];
 *	validateArr.push({ "field": "personName", reg_data:[{reg_type:'验证类型',reg_val:'验证值',tips_text:'提示信息'}],"tips_align":"2","tips_color":"#78BA32"});
 *  field: input 的ID
 *  reg_data:[{reg_type:'验证类型',reg_val:'验证值',tips_text:'提示信息'}]”
 *  解释reg_data的属性值： reg_type: 为1：是否相等；为2：正则表达式；为3：大于reg_val 的数值，4为:小于reg_val的数值；为5：ajax请求
 *  tips_align:提示的位置
 *  tips_color: 提示的颜色
 */
$.formValidateFn = function(validateArr){
	for (var i = 0; i < validateArr.length; i++) {
		var validate = validateArr[i];
		var field = '#'+validate.field;//元素ID
		var fieldVal = $.trim($(field).val())
		var tips_align = validate.tips_align==null?2:validate.tips_align;
		var tips_color = validate.tips_color==null?'#78BA32':validate.tips_color;
		var regData = validate.reg_data;
		if(undefined!=regData){
			var regTemp,regType,regVal,tipsText ;
			for(var r=0;r<regData.length;r++){
				regTemp = regData[r];
				regType = regTemp.reg_type;
				regVal = regTemp.reg_val;
				tipsText = regTemp.tips_text;
				if('1'==regType&&fieldVal==regVal){//不为空
					$(field).focus();
					layer.tips(tipsText,$(field),
				   		 {tips: [tips_align, tips_color],time:2000}
				   	);
					return false;
				}else if('2'==regType){//正则表达式
					if(!regVal.test(fieldVal)){
						layer.tips(tipsText,$(field),
						   		 {tips: [tips_align, tips_color],time:2000});
						$(field).focus();
						return  false;
					}
				}else if('3'==regType){ //大于的判断内容的个数
					if(fieldVal.length>parseInt(regVal)){
						layer.tips(tipsText,$(field),
						   		 {tips: [tips_align, tips_color],time:2000});
						$(field).focus();
						return  false;
					}
				}else if('4'==regType){ //小于的判断内容的个数
					if(regVal.length<parseInt(fieldVal)){
						layer.tips(tipsText,$(field),
						   		 {tips: [tips_align, tips_color],time:2000});
						$(field).focus();
						return  false;
					}
				}else if('5'==regType){
					var flag = true;
					$.ajax({
						url: regVal,
						async:false,
						type:"POST",
						dataType:"json",
						success:function(result){
							if (!result.success) {
								$(field).focus();
								layer.tips(tipsText,$(field),
							   		 {tips: [tips_align, tips_color],time:2000}
							   	);
								flag = false;
					        }
						}
					})
					if(!flag){
						return flag;
					}
				}else if('6'==regType){
					var tempCoboxVal = $(field).combotree('getValue');
					if(tempCoboxVal==regVal){
						layer.tips(tipsText,$(field),
						   		 {tips: [tips_align, tips_color],time:2000});
						$(field).focus();
						return  false;
					}
				}else if('7'==regType){ //针对身份证和港澳通行证及护照等证件
					var tempCardTypeVal = regTemp.cardTypeVal;
					if(tempCardTypeVal&&!regVal.test(fieldVal)){
						layer.tips(tipsText,$(field),
						   		 {tips: [tips_align, tips_color],time:2000});
						$(field).focus();
						return  false;
					}
				}else if('num'==regType){ //判断是否是数值
					var t = /^(([1-9]\d*(\.\d?[0-9])?)|(0\.[1-9][0-9])|(0\.[0][1-9]))$/;
					if(!t.test(fieldVal)){
						layer.tips(tipsText,$(field),
						   		 {tips: [tips_align, tips_color],time:2000});
						$(field).focus();
						return  false;
					} 
				}
				
			}
		}
	}
	return true;
}
