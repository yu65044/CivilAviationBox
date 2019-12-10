/**
 * 此文件为校验货运从业人员的新增,修改完整性的js
 * 
 * */

function checkInputIsIfCombo(){
	var isTrue = true;
	//姓名
	if($("#personName").val()==""){
		alert('请填写姓名！');
		isTrue = false;
		$("#personName").css('border','1px solid green');
	}
	//户籍地址
	else if($("#domicile").val() == ""){
		alert('请填写户籍地址!');
		isTrue = false;
		$("#domicile").css('border','1px solid green');
	}
	else if($("#domiclie").val() == ""){
		alert('请填写户籍地址!');
		isTrue = false;
		$("#domiclie").css('border','1px solid green');
	}
	
	
	else if($("#birthday").val() == ""){
		alert('请填写出生日期!');
		isTrue = false;
		$("#birthday").css('border','1px solid green');
	}
	
	else if($("#cardNumber").val() == ""){
		alert('请填写证件号码!');
		isTrue = false;
		$("#cardNumber").css('border','1px solid green');
	}
	
	else if($("#workNo").val() == ""){
		alert('请填写工号!');
		isTrue = false;
		$("#workNo").css('border','1px solid green');
	}
	
	else if($("#phone").val() == ""){
		alert('请填写联系电话!');
		isTrue = false;
		$("#phone").css('border','1px solid green');
	}
	
	else if($("#workPost").val() == ""){
		alert('请填写工作岗位!');
		isTrue = false;
		$("#workPost").css('border','1px solid green');
	}
	
	else if($("#higreenate").val() == ""){
		alert('请填写入职时间!');
		isTrue = false;
		$("#higreenate").css('border','1px solid green');
	}
	
	return isTrue;
}

$(document).ready(function() {
	$("input").each(function(){
		$(this).blur(function(){
			if($(this).val() != "" && $(this).val() != null){
				$(this).css('border','1px solid #22b6e4');//
			}
		});
	});
});