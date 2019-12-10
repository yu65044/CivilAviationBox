<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script type="text/javascript">
	var ctx = "${ctx}";
</script>
<%-- bootstrap 全局依赖JS插件及CSS BEGIN --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/jquery.min.js?v=2.1.4"></script>
<script type="text/javascript" src="${ctx }/static/ui-1.0/bootstrap-3.3.5-dist/js/bootstrap.min.js?v=3.3.5"></script>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/font-awesome-4.4.0/css/font-awesome.min.css"/><%-- font-awesome 为 Bootstrap 创造的全局图标字体库CSS --%>
<%-- <link rel="stylesheet" href="${ctx }/static/ui-1.0/bootstrap-3.3.5-dist/css/bootstrap.min.css"/> --%>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/css/animate.min.css"/><%-- CSS3 动画库 --%>
<%-- <link rel="stylesheet" href="${ctx }/static/ui-1.0/css/style.min.css"/> --%>

<%-- <link rel="stylesheet" href="${ctx }/static/ui-1.0/css/custom.css" > --%>

<%-- bootstrap 全局依赖JS插件及CSS END --%>
<%-- bootstrap-table  JS插件及CSS  BEGIN --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/bootstrap-table/bootstrap-table.js"></script>
<script type="text/javascript" src="${ctx }/static/ui-1.0/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="${ctx }/static/ui-1.0/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script type="text/javascript" src="${ctx }/static/ui-1.0/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/bootstrap-table/css/bootstrap-table.min.css"/>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/bootstrap-table/bootstrap-table.css"/>
<%-- bootstrap-table  JS插件及CSS  END --%>
<%-- bootstrap 菜单插件 JS BEGIN --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/jquery.metisMenu.js"></script>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/contabs.min.js"></script>

<%-- bootstrap 菜单插件 JS END --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/jquery.sparkline.min.js"></script><%-- 线形图数据统计插件 - 首页使用  JS BEGIN   --%>
<%-- <script type="text/javascript" src="${ctx }/static/ui-1.0/js/sparkline-demo.min.js"></script> --%><%-- 线形图数据统计插件 - 首页使用  JS END   --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/layer-v2.4/layer/layer.js" ></script><%-- 弹窗插件 JS BEGIN --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/pace.min.js"></script><%-- 网页自动加载进度条插件 JS BEGIN --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/jquery.form.js"></script><%-- 表单插件 JS BEGIN --%>
<script type="text/javascript" src="${ctx}/static/ui-1.0/fileUpload/ajaxfileupload.js"></script><%-- 文件上传 JS BEGIN(暂时用于头像上传) --%>
<%-- 日期   JS插件及CSS  BEGIN --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/layer-v2.4/laydate/laydate.js" ></script>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/layer-v2.4/laydate/need/laydate.css"/>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/layer-v2.4/laydate/skins/default/laydate.css"/>
<%-- 日期   JS插件及CSS  END --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/qqmsg/jQuery.qqmsg.js"></script><%-- jQuery.Ajax.js依赖的js(ajax请求时loading样式)  --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/easyui/jQuery.Ajax.js" ></script><%-- ajaxJson JS  --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/xh-commons/jsMap.js"></script><%-- 键/值对 JS --%>
<script type="text/javascript" src="${ctx}/static/ui-1.0/js/jquery.nice-select.min.js"></script><%-- 下拉列表框插件  JS  --%>
<script type="text/javascript" src="${ctx}/static/ui-1.0/xh-commons/public.js"></script><%-- 下拉列表框插件  JS  --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/xh-commons/date-long.js"></script><%-- 自定义 long-data 转换JS  --%>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/css/xh.layer-win.css"/><%-- 自定义样式 ( layer弹窗、下拉列表、查询弹窗DIV ) --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/xh-commons/modal-dialog.js"></script><%-- 自定义 查询弹窗自适应JS  --%>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/css/easyui/site.css" type="text/css" ><%--easyui 树形下拉列表样式 --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/easyui/jquery.easyui.min.js"></script>

<%--鼠标移上div的动态效果 --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/content.min.js"></script><%-- jQuery.Ajax.js依赖的js(ajax请求时loading样式)  --%>
<!-- 验证文本框的信息 -->
<script type="text/javascript" src="${ctx }/static/ui-1.0/xh-commons/validate-form.js"></script><%-- jQuery.Ajax.js依赖的js(ajax请求时loading样式)  --%>

<script type="text/javascript" src="${ctx }/static/ui-1.0/xh-commons/dropDiv.js"></script><%-- jQuery.Ajax.js依赖的js(ajax请求时loading样式)  --%>
<script>
function getButtons(menuId,$toolbar){
	//加载按钮
	$.ajax({
		type:"POST",
		async:false,
		cache:false,
		url:ctx+"/userPermissionController/findButtonInfoByRole.do?menuId="+menuId+"&n=" + Math.random(),
		dataType:"json",
		success:function(returnData){
			//console.log(returnData.data);
			if(returnData.success){
				var lhtml="";
				var rhtml="";
				for (var i = 0; i < returnData.data.length; i++) {
					var btn = returnData.data[i];
					
					if(btn.btnName!='浏览'){
						if(btn.align==0){//判断按钮位置是放在左边还是右边  0：左  1：右 ||btn.btnName=='导入' 导入的涉稳模型
							if(btn.btnName=='查询'||btn.btnName=='高级查询'||(btn.btnName=='导入'&&btn.linkUrl=='index.jsp#modal-excel-form')){
								lhtml+='<a data-toggle="modal"  href="'+btn.linkUrl+'" style="color: #000;">';
								lhtml+='<button type="button" class="btn btn-outline btn-default">';
								lhtml+='	<i class="'+btn.iconCls+'" aria-hidden="true"></i> '+btn.btnName;
								lhtml+='</button></a>&nbsp;&nbsp;';
							}else{
								lhtml+='<button type="button" onclick="'+btn.linkUrl+'" id="'+btn.btnId+'" class="btn btn-outline btn-default">';
								lhtml+='	<i class="'+btn.iconCls+'" aria-hidden="true"></i> '+btn.btnName;
								lhtml+='</button>&nbsp;&nbsp;';
							}
						}else if(btn.align==1){
							if(btn.btnName=='查询'||btn.btnName=='高级查询'||btn.btnName=='导入'){
								rhtml+='<a data-toggle="modal"  href="'+btn.linkUrl+'" style="color: #000;">';
								rhtml+='<button type="button" class="btn btn-outline btn-default">';
								rhtml+='	<i class="'+btn.iconCls+'" aria-hidden="true"></i> '+btn.btnName;
								rhtml+='</button></a>&nbsp;&nbsp;';
							}else{
								rhtml+='<button type="button" onclick="'+btn.linkUrl+'" id="'+btn.btnId+'" class="btn btn-outline btn-default">';
								rhtml+='	<i class="'+btn.iconCls+'" aria-hidden="true"></i> '+btn.btnName;
								rhtml+='</button>&nbsp;&nbsp;';
							}
						}
					}
				}
				var leftDiv = '<div id="left" role="group" style="float:left; margin-bottom: 15px;">'+lhtml+'</div>';
				var rightDiv = '<div class="ibox-tools" style="float:right; margin-bottom: 15px;">'+rhtml+'</div>';
				var html = leftDiv+rightDiv;
				$toolbar.append(html);
			}
		},
		error:function(){
			//异常
			layer.alert("获取数据超时", 5);
		}
	});
}

	/* $(function($){
		$("#hbyw_search").mouseup(function(){
			 $('#hbyw_list').bootstrapTable('selectPage',1);
		});
		
		$("#icon_warn_user_search").mouseup(function(){
			 $('#warn_user_tb').bootstrapTable('selectPage',1);
		});
		
		$("#icon_zbxx_search").mouseup(function(){
			 $('#hbdt_zbList').bootstrapTable('selectPage',1);
		});
	});	 */
</script>

