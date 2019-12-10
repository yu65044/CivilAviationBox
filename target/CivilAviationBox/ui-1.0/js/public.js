//从file文件域获取到文件路径
function getFileUrl(sourceId) {
	var url;
	//IE
	if (navigator.userAgent.indexOf('MSIE') > 0) {
		url = window.URL .createObjectURL(document.getElementById(sourceId).files
						.item(0));
	//火狐	
	} else if (navigator.userAgent.indexOf('Firefox') > 0) {
		url = window.URL.createObjectURL(document.getElementById(sourceId).files
						.item(0));
	//谷歌	
	} else if (navigator.userAgent.indexOf('Chrome') > 0) {
		//document.getElementById(sourceId).files.length
		url = window.webkitURL.createObjectURL(document.getElementById(sourceId).files.item(0));
	}
	return url;
}

function preImg(sourceId, targetId) {
	var imgPaths =  document.getElementById(sourceId).value;
	if(lastPicName(imgPaths)){
		var url = getFileUrl(sourceId);
		document.getElementById(targetId).src = url;
	} else {
		layer.alert('请选择正确的图片文件!');
	}
}

function lastPicName(fn) {
	if (fn != null && fn != "") {
		var filepath = fn;
		var re = /(\\+)/g;
		var filename = filepath.replace(re, "#");
		var one = filename.split("#");
		var two = one[one.length - 1];
		var three = two.split(".");
		var last = three[three.length - 1];
		//获取设置上传文件格式
		//document.getElementById("fileext").value = last;
		var tp = "jpg,JPG,png,PNG,bmp,BMP,GIF,gif";
		var rs = tp.indexOf(last);
		if (rs >= 0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}



//修改用户时，给定json数据和默认值
function comboBoxComm(id,data,value){
	$('#'+id).combobox({
      data: data,
      valueField: 'dataCode',
      textField: 'dataValue',
      panelWidth: '120',
      editable: false,
      lines: true,
      onSelect: function (item) {
      	
      }
  }).combobox('setValue', value);
}

//新增时无默认值
function comboBoxCommNull(id,data){
	$('#'+id).combobox({
      data: data,
      valueField: 'dataCode',
      textField: 'dataValue',
      panelWidth: '120',
      editable: false,
      lines: true,
      onSelect: function (item) {
      	
      }
  });
}

//提交方法
$.ajaxjson = function (url, dataMap, fnSuccess) {
    $.ajax({
        type: "POST",
        url: url,
        data: dataMap,
        dataType: "json",
        success: fnSuccess
    });
}

$.asynchronousAjax = function (url, dataMap, fnSuccess) {
    $.ajax({
        type: "POST",
        url: url,
        async:false,
        data: dataMap,
        dataType: "json",
        success: fnSuccess
    });
}
/**接收json数据返回给前台
 * 
 * elementId:需要填充的select框Id,多个ID用,分开
 * typeNameString:填充的类型,多个类型,分开
 * */


$.jsonStuffSelect = function (ElementId,typeNameString,checkedString){
	//存放条件
	var typeNameStringArr = typeNameString.split(",");
	//存放反序列之后的数据
	var typeNameStringSerializeArr = [];
	//所需填充的元素ID
	var ElementIdArr = ElementId.split(",");
	//选中的默认值
	var checkArr = checkedString.split(",");
	 $.asynchronousAjax(ctx+"/dicController/findDicDataJson.do", "dicTypeStr="+typeNameString, function (d) {
  	     if (d.success) {
  	    	 //通过之前的填充类型数组去获取后台传来的值
  	    	 for(var i = 0; i < typeNameStringArr.length; i++){
  	    		 var stepValue = typeNameStringArr[i];
  	    		 for(var item in d){
  	    			 if(item == stepValue){
  	    				 var jValue = d[item];
  	    				 typeNameStringSerializeArr.push(jValue);
  	    			 }
  	    		 }
  	    	 }
  	     }
	 	});
	//循环设置对于标签的值	
	for(var i = 0; i< typeNameStringSerializeArr.length;i++){
		var currentData = typeNameStringSerializeArr[i];
		var selectString = "";
		for(var j = 0 ; j < currentData.length; j++){
			var currentDataDictype = currentData[j].dicType;
			var typeNameStringArrIvalue = typeNameStringArr[i];
			if(currentData[j].dataCode == checkArr[i] && currentDataDictype.toUpperCase() == typeNameStringArrIvalue.toUpperCase()){
				selectString = "  selected='selected' ";
			}else if(checkArr[i] =="" && j==0){
				selectString = "  selected='selected' ";
			}
			$("#"+ElementIdArr[i]).append("<option value='"+currentData[j].dataCode+"'"+selectString+">"+currentData[j].dataValue+"</option>");
			selectString = "";
		}
	}
}