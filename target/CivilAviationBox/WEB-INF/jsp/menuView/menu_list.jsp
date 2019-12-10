<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/../../../static/commons/ui-common.jsp"%>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/bootstrap-3.3.5-dist/css/bootstrap.min.css"/>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/css/style.min.css"/>

<link rel="stylesheet" type="text/css" href="${ctx }/static/alertframe/skin/qq/ymPrompt.css">
<script type="text/javascript" src="${ctx }/static/alertframe/ymPrompt.js"></script>

<div class="ibox-content" id="menu_list" style="overflow: none;">
    <div class="row row-lg">
        <div class="example">
            <table id= "tb_menu"></table>
        </div>
    </div>
</div>

<style>
.hand_span:HOVER {
	cursor: pointer;
	}
</style>
<script>
//缩减显示数据
function substrFormat(briefCase){
	var a=briefCase.substr(0,10);
	return a+"...";
};

var size;
$(function () {

   	size = { width: $(window).width(), height: $(window).height() };
   	$('#menu_list').height(size.height-120);
   	//初始化表格
   	var oTable = new TableInit();
   	oTable.Init();
   	/* //初始化按钮
   	var oButton = new ButtonInit();
   	oButton.Init(); */
});
    
var TableInit = function(){
var oTableInit = new Object();
//初始化表格
oTableInit.Init = function(){
  	$('#tb_menu').bootstrapTable({
  			url:ctx+'/menuViewController/menuList.do',//请求地址
  			method:'get',//请求方式
  			toolbar:'exampleTableEventsToolbar',//工具按钮层
  			striped:true,//隔行变色
  			cache:false,//是否使用缓存
  			sortable:false,//是否启用排序
  			sortOrder:'asc',//排序方式
  			queryParams:oTableInit.queryParams,//查询参数
  			clickToSelect:true,//是否启用点击选中行
  			sidePagination:'server',//分页方式: client客户端分页   server服务端分页
  			pagination:true,//是否显示分页
  			pageNumber:1,//页码
  			pageSize:15,//页大小
  			pageList:[15,30,50,100],//可供选择的页大小
//  			rowStyle:fillRowStyleG,
  			columns:[
		        // {field:'id',title:'ID',align:'center',visible:false},
		         {field:'path',title:'系统路径',align:'center', formatter: function (v, d, i) {
                 	 return (v==''||v==null)?'----':v;
                 }},
                 {field:'menuName',title:'菜单名称',align:'center', formatter: function (v, d, i) {
                	 return (v==''||v==null)?'----':decodeURI(v);
                 }},
                 {field:'menuAbbreviation',title:'菜单名称缩写',align:'center', formatter: function (v, d, i) {
                 	 return (v==''||v==null)?'----':v;
                 }},
                 {field:'menuNumber',title:'菜单编号',align:'center', formatter: function (v, d, i) {
                 	 return (v==''||v==null)?'----':v;
                 }},
                 {field:'isDelete',title:'状态',align:'center', formatter: function (v, d, i) {
                	 if(v=='0'){
                		 return '已启用'; 
                	 }else if(v=='1'){
                		 return '<span class="hand_span" onclick="mdfFlag('+d.id+')"><font color="green">未启用</font></span>';
                	 }
                 }},
                 {field:'id',title:'操作',align:'center', formatter: function (v, d, i) {
                	// var name=decodeURI(v).toString();
                	 return '<span class="hand_span" onclick="delMenu('+v+')"><font color="red">删除</font></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="hand_span" onclick="mdfMenu('+v+')"><font color="blue">修改</font></span>';
                 }}, 
  			],
//             onDblClickRow:function(row,element){
//            	 openPortCompareDetail(row.warnPersonId);
//           } 
  		})
	}
oTableInit.queryParams = function(params){
	  	var pageIndex = 1;
	  	if(params.offset!=0){
	  		pageIndex = params.offset/params.limit + 1;
	  	}
	  	var temp = {//这里的键的名字和控制器的变量名必须一致
	  		page : pageIndex,//页码
	  		rows : params.limit, //页大小
	  		filterJson: JSON.stringify(null),
	  		//orgId : orgId
	  	};
	  	return temp;
	}
  	return oTableInit;
}

function delMenu(id){
	
	layer.confirm("确认要删除选中的菜单吗?",function(){//Are you sure you want to delete the selected menu?
		$.post("/CivilAviationBox/menuViewController/delMenu.do",{"id":id},function(data){
			if(data.success){
//				layer.alert('菜单删除成功！');
				//window.location.reload(true);
				parent.parent.window.location.reload(true);
			}
		},"json");
	});
}

function mdfFlag(id){
	layer.confirm("确认要开启选中的菜单吗?",function(){//Are you sure you want to open the selected menu?
		$.post("/CivilAviationBox/menuViewController/mdfFlag.do",{"id":id},function(data){
			if(data.success){
//				layer.alert('菜单删除成功！');
				//window.location.reload(true);
				parent.parent.window.location.reload(true);
			}
		},"json");
	});
}

function mdfMenu(id){

	var width=$(window).width();
	var height=$(window).height();
	
	if(width>=2100&&height>1200){
		width=width*0.5;
		height=height*0.3;
	}else if(width>=1700&&height>700){
		width=width*0.5;
		height=height*0.5;
	}else if(width>=1000&&width<1700&&height>400&&height<700){
		width=width*0.5;
		height=height*0.6;
	}else if(width>=500&&width<=810&&height>400&&height<=719){
		width=width*0.7;
		height=height*0.6;
	}else{
		width=width*0.5;
		height=height*0.55;
	}
		window.location="javascript:ymPrompt.win('/CivilAviationBox/menuViewController/mdfMenu.do?id="+id+"',"+width+","+height+",'菜单修改',null,null,null,true)";//Menu modification
}    


</script>