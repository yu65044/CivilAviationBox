
var cyryxxControlGrid1;
var actionURL1 =ctx;


$(function () {
    autoResize({ dataGrid: '#cyryxxControlGrid1', gridType: 'datagrid', callback: grid1.databind, height: 5,width:5 });
	
    $('#a_search').click(crud1.search);//查看
    $('#b_search').click(crud1.search);//查看
    
    $('#cyryxxControlGrid1').datagrid('getPager').pagination({
		beforePageText : '第',
		afterPageText : '页        共{pages}页',
		displayMsg : '当前显示从第 {from} 条到 {to} 条　共 {total} 条记录',
	});
});

var mylayout1 = {
	    init: function (size) {
	        $('#layout').width(size.width - 4).height(size.height - 4).layout();
	        var center = $('#layout').layout('panel', 'center');
	        center.panel({
	            onResize: function (w, h) {
	                $('#cyryxxControlGrid1').datagrid('resize', { width: w, height: h });
	            }
	        });
	    },
	    resize: function (size) {
	        mylayout1.init(size);
	        $('#layout').layout('resize');
	    }
	};

var grid1 = {
    databind: function (size) {
    	cyryxxControlGrid1 = $('#cyryxxControlGrid1').datagrid({
    		 toolbar : '#toolbar',
    	     width:size.width-30,
             height:638, 
             url: ctx+"/personInfoController/advancedQuery.do",
             idField: 'id',
             iconCls: 'icon-user',
             nowrap: false,
             title:"高级检索人员结果列表",
             pagination:true,
             rownumbers: true,
             singleSelect:true,
             animate: true,
             collapsible: false,
             pageSize : 20,
			 pageList : [ 20, 50, 100 ],
             columns:[[
       				{ title : 'personId',field : 'personId',width : 1,hidden : true}, 
       				{title : '姓名',field : 'personName',align : 'center',width : 90},
       				{title : '性别',field : 'sex',width : 50,align : 'center',formatter : function(v, d, i) {
       					return v == '0' ? "女" : "男";}
       				},
       				{title : '民族',field : 'nation',width : 70,align : 'center',formatter : function(v, d, i) {
       					return checkNation(v);
       				}},
       				{title : '出生日期',field : 'birthday',width : 100,align : 'center',formatter: function (v, d, i) {
	                    return getSmpFormatDateByLong(v,false);
	                }},
	                {title : '证件号码',field : 'cardNumber',width : 160,align : 'center'}, 
	                {title : '联系号码',field : 'phone',width : 110,align : 'center'}, 
       				{title : '户籍地址',field : 'hjdz',width : 150,align : 'center'}, 
       				{title : '现居地',field : 'nowAddr',width : 150,align : 'center'}, 
       				{title : '工作岗位',field : 'workPost',width : 90,align : 'center'}, 
       				{title : '工号',field : 'workNo',width : 90,align : 'center'}, 
       				{title : '婚否',field : 'marry',width : 60,align : 'center',formatter : function(v, d, i) {
       					if (v == 1) {
       						return "已婚";
       					} 
       					if (v == 2) {
       						return "未婚";
       					}if (v == 3) {
       						return "丧偶";
       					}else {
       						return "未知";
       					}
       				}},
                    { title: '操作',field: 'action',width: 50,align: 'center',formatter: function (v, d, i) {
    					var rstVal = '<img style="cursor:pointer" title="查看详情" href="javascript:;" onclick="crud1.showMoreInfo(' + d.personId +','+d.personType+')" src="'+ctx+'/static/css/easyui/images/icons/look.png" />';
    					return rstVal;
    				}
    				}
       			]]
        });
    },
    reload: function () {
    	cyryxxControlGrid1.datagrid('reload');
    },
    selected: function () {
        return cyryxxControlGrid1.datagrid('getSelected');
    }
   };

var crud1 = {
	showMoreInfo : function(ids,typeId) {
		var title = "";
		var urlAddress = "";
		if(typeId){
			if(typeId=="1"){
				title ="查看安保人员信息详情";
				urlAddress = "/cyrySecurityController/cyrySecurityForm.do?n=" + Math.random()+"&personId="+ids;
			}else if(typeId=="2"){
				title ="查看控制区人员信息详情";
				urlAddress="/controlAreaInfoController/controlAreaInfoForm.do?n=" + Math.random()+"&userId="+ids;
			}else if(typeId=="3"){
				title ="查看驾驶机动车从业人员信息详情";
				urlAddress ="/driverController/driverInfoForm.do?n=" + Math.random()+"&userId="+ids;
			}else if(typeId=="4"){
				title ="查看货运区从业人员信息详情";
				urlAddress = "/personInfoController/toAddCyryInfo.do?isSelect=1&personId="+ids;
			}else {
				title ="查看公共区域从业人员信息详情";
				urlAddress = "/publicAreaController/publicAreaForm.do?personId="+ids;
			}
			openCompanyForm(title, actionURL1+ urlAddress);
		}
	}
};