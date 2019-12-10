﻿var navgrid;
var actionURL = ctx + '/personInfoController/';
var actionDicURL =ctx+'/dicController/';

var sexMap;

$(function() {
	
	$.ajaxjson(actionDicURL+"/findDicDataListJson.do", "dicTypeStr=sex", function (d) {
	    if (d.success) {
	   	 	sexMap = d.sex;
	    }
	});
	
	//重置
	$("#cz_button").click(function(){
		$("#searchName").val("");
		$('#searchSex').combobox('clear'); 
		$("#cardType1").combobox('clear');
		$("#cardNo").val("");
		$("#mobblePhone").val("");
	});
	loadRoleList();
});

function comboBoxComm(id,data,value){
	$('#'+id).combobox({
        data: data,
        valueField: 'dataCode',
        textField: 'dataValue',
      //  parentField : 'parentId',
        panelWidth: '120',
        editable: false,
        lines: true,
        onSelect: function (item) {
        	
        }
    }).combobox('setValue', value);
}

function comboBoxCommNull(id,data){
	$('#'+id).combobox({
        data: data,
        valueField: 'dataCode',
        textField: 'dataValue',
      //  parentField : 'parentId',
        panelWidth: '120',
        editable: false,
        lines: true,
        onSelect: function (item) {
        	
        }
    });
}

function loadRoleList() {
	var size = {
		width : $(window).width(),
		height : $(window).height()
	};
	mylayout.init(size);
	$(window).resize(function() {
		size = {
			width : $(window).width(),
			height : $(window).height()
		};
		mylayout.resize(size);
	});

	autoResize({
		dataGrid : '#roleGrid',
		gridType : 'datagrid',
		callback : grid.databind,
		height : 5,
		width : 5
	});

	// 分页栏下方修改为中文显示
	$('#roleGrid').datagrid('getPager').pagination({
		beforePageText : '第',
		afterPageText : '页        共{pages}页',
		displayMsg : '当前显示从第 {from} 条到 {to} 条　共 {total} 条记录',
	});

	$('#b_search').click(crud.search);// 搜索
	$('#save_button').click(crud.saveUser);// 新建
	$('#update_button').click(crud.updateUser);// 更新
	$('#delete_button').click(crud.deleteUser);// 删除
	$('#select_button').click(crud.viewUserMoreInfo);//查看

}

var mylayout = {
	init : function(size) {
		$('#layout').width(size.width - 4).height(size.height - 4).layout();
		var center = $('#layout').layout('panel', 'center');
		center.panel({
			onResize : function(w, h) {
				$('#navGrid').datagrid('resize', {
					width : w,
					height : h
				});
			}
		});
	},
	resize : function(size) {
		mylayout.init(size);
		$('#layout').layout('resize');
	}
};

var isCheckFlag = true;// 标识是否勾选复选框选中行的,true-是,false-否
var grid = {
	databind : function(size) {
		var heightSize = size.height;
		var widthSize = size.width;
		navgrid = $('#roleGrid')
				.datagrid(
						{
							toolbar : '#toolbar',
							width : widthSize,
							height : heightSize,
							url : actionURL + "getMerchandiseDataGrid.do",
							iconCls : 'icon-users',
							nowrap : false,
							title : "<font style='font-family:微软雅黑;'>当前位置-->从业人员管理-->从业人员基本信息-->货运区人员基本信息",
							rownumbers : true,
							animate : true,
							collapsible : false,
							singleSelect : true,
							pagination : true,
							pageSize : 20,
							pageList : [ 20, 50, 100 ],
							checkOnSelect : false,
							selectOnCheck : true,
							columns:[[
								{ title : 'personId',field : 'personId',width : 1,hidden : true}, 
								{ title : 'cardType',field : 'cardType',width : 1,hidden : true}, 
								{title : '姓名',field : 'personName',align : 'center',width : 100},
								{title : '性别',field : 'sex',width : 50,align : 'center',formatter : function(v, d, i) {
									return sexMap[v+''];}
								},
								{title : '民族',field : 'nation',width : 70,align : 'center',formatter : function(v, d, i) {
									return checkNation(v);
								}},
								{title : '户籍地址',field : 'domicile',width : 150,align : 'center'}, 
								{title : '现居地',field : 'nowAddr',width : 150,align : 'center'}, 
								{title : '证件号码',field : 'cardNumber',width : 170,align : 'center'}, 
								{title : '联系号码',field : 'phone',width : 105,align : 'center'}, 
//								{title : '电子邮箱',field : 'email',width : 105,align : 'center'}, 
								{title : '出生日期',field : 'birthday',width : 110,align : 'center',formatter: function (v, d, i) {
				                    return getSmpFormatDateByLong(v,false);
				                }},
								{title : '工作岗位',field : 'workPost',width : 100,align : 'center'}, 
								{title : '工号',field : 'workNo',width :100,align : 'center'}, 
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
							]]
						});
	},
	reload : function() {
		navgrid.datagrid('reload');
	},
	selected : function() {
		return navgrid.datagrid('getSelected');
	},
	checked : function() {
		return navgrid.datagrid('getChecked');
	}

};


var crud = {
	search : function() {
		var userName = $("#searchName").val();
		var sex = $('#searchSex').combobox('getValue');
		var cardType = $('#cardType1').combobox('getValue');
		var cardNo = $("#cardNo").val();
		var phone = $("#mobblePhone").val();
		// 存放查询json的数组
		var ruleArr = [];
		if (userName != "") {
			ruleArr.push({
				"field" : "personName",
				"op" : "exp",
				"data" : " personName like '%" + userName + "%'"
			});
		}
		if (sex != "" && sex != "请选择性别") {
			ruleArr.push({
				"field" : "sex",
				"op" : "exp",
				"data" : " sex = '" + sex + "'"
			});
		}
		if (cardType != "" && cardType != "请选择证件类型") {
			ruleArr.push({
				"field" : "cardType",
				"op" : "exp",
				"data" : " cardType = '" + cardType + "'"
			});
		}
		if (cardNo != "") {
			ruleArr.push({
				"field" : "cardNumber",
				"op" : "exp",
				"data" : " cardNumber like '%" + cardNo + "%'"
			});
		}
		if (phone != "") {
			ruleArr.push({
				"field" : "phone",
				"op" : "exp",
				"data" : " phone like '%" + phone + "%'"
			});
		}
		ruleArr.push({
			"field" : "isDelete",
			"op" : "exp",
			"data" : " isDelete = 0 "
		});

		if (ruleArr.length > 0) {
			var filterObj = {
				groupOp : 'AND',
				rules : ruleArr
			};
			$('#roleGrid').datagrid('load', {
				filterJson : JSON.stringify(filterObj)
			});
		} else {
			ruleArr.push({
				"field" : "isDelete",
				"op" : "exp",
				"data" : " isDelete = 0 "
			});
			var filterObj = {
				groupOp : 'AND',
				rules : ruleArr
			};
			$('#roleGrid').datagrid('load', {
				filterJson : JSON.stringify(filterObj)
			});
		}
	},
	viewUserMoreInfo:function(){
		var row = navgrid.datagrid('getSelected');
		if (row) {
			window.location.href = actionURL + "toAddCyryInfo.do?isSelect=1&personId="+row.personId;
		} else {
			layer.alert('请选择一条数据!');
		}
	},
	updateUser : function() {
		var row = navgrid.datagrid('getSelected');
		if (row) {
			window.location.href=actionURL + "toAddCyryInfo.do?personId="+row.personId;
		} else {
			layer.alert('请选择一条数据!');
		}
	},
	saveUser : function() {
		$('#roleGrid').datagrid("clearSelections");
		window.location.href=actionURL + "toAddCyryInfo.do";
	},
	deleteUser : function() {
		var row = navgrid.datagrid('getSelected');
		if (row) {
			
			layer.confirm("确认要删除此人员信息吗?",function(){
				$.ajax({
					url : actionURL + "deleteCyryMeInfo.do?personId="+ row.personId,
					cache : false,
					async : false,
					type : "get",
					dataType : 'text',
					success : function(result) {
						if (result == "0") {
							layer.alert('删除成功!',1);
							$('#roleGrid').datagrid("reload");
						} else {
							layer.alert('系统异常,请联系管理员!',8);
						}
					}
				});
			},function(index){
				layer.close(index);
			});
		} else {
			layer.alert('请选择一条数据!');
		}
	}
};

var setting = {
	view : {
		selectedMulti : false
	},
	check : {
		enable : true
	},
	data : {
		simpleData : {
			enable : true
		}
	}
};

function al(){
	if(imageUrl==null || imageUrl == ""){
		return false;
	}else{
		return true;
	}
}

function checkIsNul(){
	if(al()){
		$("#photoPath").val(imageUrl);
		mainExecute();
	}
}

function mainExecute(){
	if(checkInputIsIfCombo()){
		if ($("#sex").combobox("getValue") == "请选择性别" || $("#sex").combobox("getValue") == "") {
			layer.alert('请选择性别');
			return;
		}
		
		if ($("#nation").combobox("getValue") == "请选择民族" || $("#nation").combobox("getValue") == "") {
			layer.alert('请选择民族');
			return;
		}
		
		if ($("#marry").combobox("getValue") == "请选择婚姻状况" || $("#marry").combobox("getValue") == "") {
			layer.alert('请选择婚姻状况');
			return;
		}
		
		if ($("#cardType").combobox("getValue") == "请选择证件类型" || $("#cardType").combobox("getValue") == "") {
			layer.alert('请选择证件类型');
			return;
		}

		var query = $('#cyryInfoform').formSerialize();
        $.ajaxjson(ctx + "/personInfoController/addCyryMeInfo.do", query, function (d) {
             if (d.success) {
             	layer.alert("成功!", 1);
                editDailog.dialog('close');
                $('#roleGrid').datagrid("reload");
//            	window.location.reload();
            	isClick = 0 ;
             } else {
             	layer.alert("失败!",8);
             	isClick = 0 ;
             }
        });
        window.clearInterval(setTimeOutId);
        imageUrl = "";
	}
}



var imageUrl = "";
/**
 * @param title
 * @param urlPath
 */
var editDailog = null;
var setTimeOutId = null;
function openCompanyForm(title, urlPath) {
	 editDailog = $.hDialog({
		href : urlPath,
		title : title,
		iconCls : 'icon-pencil',
		width : 715,
		height : 600,
		buttons:[{
			text:'<font style="color:black;font-family:微软雅黑;font-weight:bold">保存</font>',
            iconCls: 'icon-ok',
			handler:function(){
				if(isClick == 1){
					var filevalue = $("#file").val();
						$.ajaxFileUpload({
							url : actionURL + 'uploadCyryInfoPicture.do',
							secureuri : false,
							fileElementId : 'file',
							dataType : 'text',
							success : function(data) {
								imageUrl = data;
							}
						});
						if(al()){
							checkIsNul();
						}else{
							setTimeOutId = window.setInterval("checkIsNul()", 500);
						}
			}else{
				mainExecute();
			}
		}},{
			text:'<font style="color:green;font-family:微软雅黑;font-weight:bold">关闭</font>',
            iconCls:'icon-cancel',
			handler:function(){
				editDailog.window('close');
			}
		}],
		onLoad:function () {
			var row = $('#roleGrid').datagrid('getSelected');
			 $.ajaxjson(actionDicURL+"/findDicDataJson.do", "dicTypeStr=work,sex,nation,marry,cardsType,compareStatus,jobsTatus", function (d) {
	    	     if (d.success) {
	    	    	 var work = JSON.stringify(d.work)
	    	     	 var marry = JSON.stringify(d.marry);
	    	     	 var sexArr = JSON.stringify(d.sex);
	    	     	 var cardType = JSON.stringify(d.cardsType);
	    	     	 var compareStatus = JSON.stringify(d.compareStatus);
	    	     	 if(row){
		    	     	 comboBoxComm('status',JSON.parse(work),row.status);
		    	     	 comboBoxComm('marry',JSON.parse(marry),row.marry);
		    	     	 comboBoxComm('sex',JSON.parse(sexArr),row.sex);
		    	     	 comboBoxComm('nation',JSON.parse(JSON.stringify(d.nation)),row.nation);
		    	     	 comboBoxComm('cardType',JSON.parse(cardType),row.cardType);
		    	      	 comboBoxComm('validateStatus',JSON.parse(compareStatus),row.validateStatus);
		    	     	 
	    	     	 }else{
	    	     		 comboBoxCommNull('status',JSON.parse(work));
	    	     		 comboBoxCommNull('marry',JSON.parse(marry));
	    	     		 comboBoxCommNull('sex',JSON.parse(sexArr));
	    	     		 comboBoxCommNull('nation',JSON.parse(JSON.stringify(d.nation)));
	    	     		 comboBoxCommNull('cardType',JSON.parse(cardType));
	    	     		 comboBoxCommNull('validateStatus',JSON.parse(compareStatus));
	    	     	 }
	    	     }
	    	 });
		}
	});
}

function convertTime(times){
	var rzsjLong = new Date(times.replace(new RegExp("-","gm"),"/")).getTime();
	return rzsjLong;
}

var mysetting = {
	data : {

		simpleData : {
			enable : true
		}
	}
};