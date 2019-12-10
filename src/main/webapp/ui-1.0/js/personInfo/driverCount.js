
var cyryxxDriverGrid;
var actionDriverURL =ctx+'/driverController/';
var cyryInfoDriverFormUrl = actionDriverURL+"driverInfoForm.do?n=" + Math.random();

$(function () {
    autoResize({ dataGrid: '#cyryxxDriverGrid', gridType: 'datagrid', callback: driverGrid.databind, height: 5,width:5 });
	
    $('#b_search').click(driverCrud.cyrySearch);//查看
    $('#a_search').click(driverCrud.cyrySearch);//查看
    //分页栏下方修改为中文显示
    $('#cyryxxDriverGrid').datagrid('getPager').pagination({
    	beforePageText:'第',
    	afterPageText:'页        共{pages}页',
    	displayMsg:'当前显示从第 {from} 条到 {to} 条　共 {total} 条记录',
    });
});

var driverGrid = {
    databind: function (size) {
    		cyryxxDriverGrid = $('#cyryxxDriverGrid').datagrid({
       	     width:size.width-30,
             height:335,
            url: actionDriverURL+"getDriverList.do",
            iconCls: 'icon-user',
            nowrap: false,
            title:"机动车驾驶人员信息",
            rownumbers: true,
            singleSelect:true,
            pagination : true,
            pageSize:10,
        	pageList:[10,50,100],
            animate: true,
            collapsible: false,
            columns:[[
         				{ title : 'personId',field : 'personId',width : 1,hidden : true}, 
         				{title : '姓名',field : 'personName',align : 'center',width : 100},
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
      					var rstVal = '<img style="cursor:pointer" title="查看详情" href="javascript:;" onclick="driverCrud.showMoreInfo(' + d.userId +')" src="'+ctx+'/static/css/easyui/images/icons/look.png" />';
      					return rstVal;
      				}
      				}
         			]]
        });
    },
    reload: function () {
    	cyryxxDriverGrid.datagrid('reload');
    },
    selected: function () {
        return cyryxxDriverGrid.datagrid('getSelected');
    }
};

var driverCrud = {
	cyrySearch:function(){
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
	    
	    if(xm != ""){
	    	ruleArr.push({ "field": "userName", "op": "exp", "data": " Is_Delete = 0 AND 1=1  AND userName = '"+xm+"'"  });
			ruleArr.push({ "field": "cardNumber", "op": "exp", "data": " cardNumber = '"+xm+"'" });
			ruleArr.push({ "field": "email", 	  "op": "exp", "data": " email like '%"+xm+"%'" });
			if(cardMap.get(xm) != undefined){
				ruleArr.push({ "field": "cardType", "op": "exp", "data": "   cardType = '"+cardMap.get(xm)+"'" });
			}
			ruleArr.push({ "field": "phone", "op": "exp", "data": "  phone like '%"+xm+"%'" });
	    }
	    
	    if (ruleArr.length > 0) {
	        var filterObj = { groupOp: 'OR', rules: ruleArr };
	        $('#cyryxxDriverGrid').datagrid('load', { filterJson: JSON.stringify(filterObj) });
	    } else {
	    	ruleArr.push({ "field": "isDelete", "op": "exp", "data": " isDelete = 0 " });
	    	$('#cyryxxDriverGrid').datagrid('load', { filterJson: JSON.stringify(filterObj) });
	    }
	},showMoreInfo:function(ids){
		if(ids){
			openCompanyForm('查看驾驶区从业人员信息',cyryInfoDriverFormUrl+"&userId="+ids);
		}else{
			layer.alert('请选择一条数据查看！');
		}
		}
};