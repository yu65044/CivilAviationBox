<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@include file="/../../../static/commons/ui-common.jsp"%>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/css/style.min.css"/>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/bootstrap-3.3.5-dist/css/bootstrap.min.css"/>

<!-- 全局js -->
<!-- <script src="../static/fullcalendar/js/jquery.min.js?v=2.1.4"></script> -->
<%-- <script type="text/javascript" src="${ctx }/static/ui-1.0/js/jquery.form.js"></script> --%><%-- 表单插件 JS BEGIN --%>
<%-- <script type="text/javascript" src="${ctx }/static/ui-1.0/layer-v2.4/layer/layer.js" ></script> --%>
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="row">
			<div class="col-sm-12">
				<div class="ibox float-e-margins">
					<div id="d-info" >
						
						<div class="ibox-content border-left-right">
						<form role="form" id="menuForm" name="menuForm" enctype="multipart/form-data" method="post">
                        	<table class="tb">
								<tr>
									<td class="w-130" colspan="1">系统路径：</td>
	           						<td colspan="3"><input type="text" id="path" name="path" placeholder="请输入系统路径" class="form-control"></td>
								</tr>
								<tr>
									<td class="w-130">菜单名称(中文)：</td>
	           						<td><input type="text" id="menuName" name="menuName" placeholder="请输入菜单名称" class="form-control"></td>
	           						<td class="w-130">菜单名称缩写(拼音缩写)：</td>
	           						<td><input type="text" id="menuAbbreviation" name="menuAbbreviation" placeholder="请输入菜单名称缩写" class="form-control"></td>
									
								</tr>
								<tr>
									<td class="w-130">菜单编号：</td>
				           			<td><input type="text" id="menuNumber" name="menuNumber" placeholder="请输入菜单编号" class="form-control"></td>
				           			<td class="w-130">是否启用：</td>
				           			<td><select id="isDelete" name="isDelete" class="form-control">
				           				<option value="0">启用</option>
				           				<option value="1">不启用</option>
				           			</select>
	           						</td>
								</tr>
								<tr>
									<td class="w-130" colspan="1">菜单图片：</td>
				           			<td  colspan="3">
				           			<input type="file" id="picPath" name="picPath" class="form-control" onchange="changeFile()"></td>
								</tr>
							</table>
							<div style="text-align: center; clear: both;">
				               <button type="submit" id="save" class="btn btn-outline btn-default" style="margin-top: 30px;width:85px;height:30px;">
								保存
							   </button>
							   &nbsp;&nbsp;&nbsp;&nbsp;<button type="reset"  class="btn btn-outline btn-default" style="margin-top: 30px;width:85px;height:30px;">
								 重置
							   </button>
				   			</div>
					</form>
						</div>
					 </div>
					</div>
				</div>
			</div>
		</div>
		
<script type="text/javascript">
//判断菜单名称(中文)是否重复
$(function(){
   var options = {  
       url:'/CivilAviationBox/menuViewController/addMenuView.do',
       success:	showResponse,  //处理完成 
       resetForm: true,  
       dataType:'json'  
};

//判断菜单名称(中文)是否重复
$('#menuName').blur(function(){
	var menuName=$("#menuName").val().trim();
	$.post("/CivilAviationBox/menuViewController/isExistChiness.do",{"menuName":menuName},function(data){
		if(data.isExist){
			$("#menuName").val('');
			layer.msg('菜单名称(中文)已存在，请重新输入！');//The menu name(Chinese) already exists,Please re-enter it!
			$("#menuName").focus();
		}
	},"json");
});      

//判断菜单名称缩写是否重复
$('#menuAbbreviation').blur(function(){
	var menuAbbreviation=$("#menuAbbreviation").val().trim();
	$.post("/CivilAviationBox/menuViewController/isExistAbbreviation.do",{"menuAbbreviation":menuAbbreviation},function(data){
		if(data.isExist){
			$("#menuAbbreviation").val('');
			layer.msg('菜单名称缩写已存在，请重新输入！');//The menu name abbreviation already exists,Please re-enter it!
			$("#menuAbbreviation").focus();
		}
	},"json");
});     
   
   
//判断菜单编号是否重复     
$('#menuNumber').blur(function(){
	var menuNumber=$("#menuNumber").val().trim();
	if(menuNumber=='more'){
		$("#menuNumber").val('');
		layer.msg('菜单编号已存在，请重新输入！');//The menu name number already exists,Please re-enter it!
		$("#menuNumber").focus();
	}else{
		$.post("/CivilAviationBox/menuViewController/isExistNumber.do",{"menuNumber":menuNumber},function(data){
			if(data.isExist){
				$("#menuNumber").val('');
				layer.msg('菜单编号已存在，请重新输入！');//The menu name number already exists,Please re-enter it!
				$("#menuNumber").focus();
			}
		},"json");
	}
});     



//提交表单
$('#menuForm').submit(function() { //注意这里的index_form
//		var userId=$("#userId").val().trim();
//		var systemId=$("#systemId").val().trim();
//		var currentMenuId=$("#currentMenuId").val().trim();
		var path=$("#path").val().trim();
		var menuName=$("#menuName").val().trim();
		var menuAbbreviation=$("#menuAbbreviation").val().trim();
		var menuNumber=$("#menuNumber").val().trim();
		var isDelete=$("#isDelete").val().trim();
		var picPath=$("#picPath").val().trim();
		
		/* if(userId==''||userId==null){
			layer.alert('用户编号不能为空！');
		}else if(systemId==''||systemId==null){
			layer.alert('系统编号不能为空！');
		}else if(currentMenuId==''||currentMenuId==null){
			layer.alert('菜单编号不能为空！');
		}else */
		if(path==''||path==null){
			layer.alert('系统路径不能为空！');//The system path cannot be empty!
		}else if(menuName==''||menuName==null){
			layer.alert('菜单名称(中文)不能为空！');//The menu name(Chinese) cannot be empty!
		}else if(menuAbbreviation==''||menuAbbreviation==null){
			layer.alert('菜单名称缩写不能为空！');//The menu name abbreviation cannot be empty!
		}else if(menuNumber==''||menuNumber==null){
			layer.alert('菜单编号不能为空！');//The menu name number cannot be empty!
		}else if(picPath==''||picPath==null){
			layer.alert('请选择菜单图片！');//Please select menu pictures!
		}else{
    		$(this).ajaxSubmit(options);
  	 }
   return false;//防止dialog 自动关闭
});
});
	
	
//校验上传文件是否为excel格式
function changeFile() {
    var strs = new Array(); //定义一数组
    var imageFile= $("#picPath").val();
    strs = imageFile.split('.');
    var suffix = strs [strs .length - 1];

    if (suffix != 'jpg' && suffix != 'jepg' && suffix != 'png') {
   	 layer.alert("您选择的不是图片文件,请选择图片文件！");//The file you selected is not a picture file,Please select the picture file!
        var obj = document.getElementById('picPath');
        obj.outerHTML = obj.outerHTML; //这样清空，在IE8下也能执行成功
         //obj.select(); document.selection.clear(); 
    }
};

function showResponse(responseText, statusText) {
    if (responseText.success) {
//		layer.alert(responseText.message);
		parent.ymPrompt.doHandler('close');
		parent.window.location.reload(true);
//		window.location="/CivilAviationBox/menuViewController/flushMain.do";
		
/* 		$.post("/CivilAviationBox/menuViewController/main.do",function(data){
			if(data!=null){
				window.location.reload(true);
			}
		},"html"); */
//		window.location.reload(true);
//		
       }else if(!responseText.success){
       	layer.alert("菜单添加失败！");//Menu addition failed!
    	} 
};

function showRequest(formData, jqForm, options) {//提交前完成，验证input file 中的文件
//	 alert((formData[0].value).toString()+","+(formData[1].value).toString()+","+(formData[2].value).toString());
	 if((formData[2].value).toString()==''){
		 layer.alert('请选择文件');//Please select a file!
		 return false;
	}
}; 
</script>