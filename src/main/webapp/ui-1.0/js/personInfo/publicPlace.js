var theGrid;
var actionPublicURL = ctx + '/publicAreaController/';

$(function() {
	loadRoleList();
});

function loadRoleList() {
	autoResize({
		dataGrid : '#theGrid',
		gridType : 'datagrid',
		callback : publicGrid.databind,
		height : 5,
		width : 5
	});

	// 分页栏下方修改为中文显示
	$('#theGrid').datagrid('getPager').pagination({
		beforePageText : '第',
		afterPageText : '页        共{pages}页',
		displayMsg : '当前显示从第 {from} 条到 {to} 条　共 {total} 条记录',
	});

	$('#a_search').click(publicCrud.search);// 搜索
	$('#b_search').click(publicCrud.search);// 搜索
}

var publicGrid = {
	databind : function(size) {
		var heightSize = size.height;
		var widthSize = size.width;
		theGrid = $('#theGrid') .datagrid(
			{	    	     width:size.width-30,
	             height:335,	            url: actionPublicURL+"publicAreaDataGrid.do",	            idField: 'id',	            iconCls: 'icon-nav',	            nowrap: false,	            title:"公共区域人员信息",	            rownumbers: true,
	            singleSelect:true,
	            pagination:true,
	            pageSize:10,
	        	pageList:[10,50,100],
	            animate: true,
	            collapsible: false,	            columns:[[
     				{ title : 'personId',field : 'userId',width : 1,hidden : true}, 
     				{ title: '姓名', field: 'personName', width: 80 , align: 'center'},
     				{title : '性别',field : 'sex',width : 50,align : 'center',formatter : function(v, d, i) {
     					return v == '0' ? "女" : "男";}
     				},
     				{title : '婚否',field : 'marry',width : 50,align : 'center',formatter : function(v, d, i) {
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
     				{title : '民族',field : 'nation',width : 70,align : 'center',formatter : function(v, d, i) {
     					return checkNation(v);
     				}},
     				{title : '出生日期',field : 'birthday',width : 110,align : 'center',formatter: function (v, d, i) {
                         return getSmpFormatDateByLong(v,false);
                 	}},
                  {title : '联系号码',field : 'phone',width : 104,align : 'center'}, 
                  {title : '电子邮箱',field : 'email',width : 104,align : 'center'}, 
                 	{title : '公司名称',field : 'companyName',align : 'center',width : 100,formatter : function(v, d, i) {
     					return v == '1' ? "女" : "男";}},
     				{title : '公司地址',field : 'companyAddress',align : 'center',width : 120,formatter : function(v, d, i) {
         					return v == '1' ? "女" : "男";}},
     				{title : '工作岗位',field : 'workPost',width : 100,align : 'center'}, 
     				{title : '户籍地址',field : 'hjdz',width : 120,align : 'center'}, 
     				{title : '现居地',field : 'nowAddr',width : 120,align : 'center'}, 
                  { title: '操作',field: 'action',width: 50,align: 'center',formatter: function (v, d, i) {
  					var rstVal = '<img style="cursor:pointer" title="查看详情" href="javascript:;" onclick="publicCrud.showMoreInfo(' + d.personId +')" src="'+ctx+'/static/css/easyui/images/icons/look.png" />';
  					return rstVal;
  				}
  				}
     			]]			});
	},
	reload : function() {
		theGrid.datagrid('reload');
	},
	selected : function() {
		return theGrid.datagrid('getSelected');
	},
	checked : function() {
		return theGrid.datagrid('getChecked');
	}

};


var publicCrud = {
	search : function() {
		/**一键检索所需字段*/
		var xm  = $("#searchName").val();
		/**高级检索所需字段*/   
		var companyName = $("#companyName").val();
		var companyAddress = $("#companyAddress").val();
		var userName = $("#userName").val();
		var sex = $("#sex").val();
		var cardType = $("#cardType").val();
		var cardNo = $("#cardNo").val();
		var mobblePhone = $("#mobblePhone").val();
		var mateName = $("#mateName").val();
		var homePhone = $("#homePhone").val();
		var homeAddress = $("#homeAddress").val();
		//存放查询json的数组
		var ruleArr = [];
		
		if (xm != ''){
			ruleArr.push({ "field": "personName", "op": "exp", "data": " Is_Delete = 0 AND 1=1  AND personName = '"+xm+"'"  });
			ruleArr.push({ "field": "cardNumber", "op": "exp", "data": " cardNumber = '"+xm+"'" });
			ruleArr.push({ "field": "email", 	  "op": "exp", "data": " email like '%"+xm+"%'" });
			if(cardMap.get(xm) != undefined){
				ruleArr.push({ "field": "cardType", "op": "exp", "data": "   cardType = '"+cardMap.get(xm)+"'" });
			}
			ruleArr.push({ "field": "phone", "op": "exp", "data": "  phone like '%"+xm+"%'" });
	    }
		
	    if (ruleArr.length > 0) {
	        var filterObj = { groupOp: 'OR', rules: ruleArr};
	        $('#theGrid').datagrid('load', { filterJson: JSON.stringify(filterObj) });
	    } else {
	    	 ruleArr.push({ "field": "isDelete", "op": "exp", "data": " isDelete = 0" });
	    	 var filterObj = { groupOp: 'AND', rules: ruleArr};
	    	 $('#theGrid').datagrid('load', { filterJson: JSON.stringify(filterObj) });
	    }
	},showMoreInfo:function(ids){
		if(ids){
			openCompanyForm('查看公共区从业人员信息', actionPublicURL + "/publicAreaForm.do?personId=" + ids);
		}else{
			layer.alert('请选择一条数据查看！');
		}
		}
};