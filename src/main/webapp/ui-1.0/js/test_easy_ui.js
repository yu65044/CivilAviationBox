var navgrid;
var createFormUrl = ctx+"/menu/createMenu.do?n=" + Math.random();
var updateFormUrl = ctx+"/menu/updateMenu.do?n=" + Math.random();
var actionURL =ctx+'/odc/';


$(function () {
	   var size = { width: $(window).width(), height: $(window).height() };
	    mylayout.init(size);
	    $(window).resize(function () {
	        size = { width: $(window).width(), height: $(window).height() };
	        mylayout.resize(size);
	    });
	
    autoResize({ dataGrid: '#navGrid', gridType: 'datagrid', callback: grid.databind, height: 5,width:5 });
    $('#a_create').click(crud.create);
    $('#a_update').click(crud.update);
    $('#a_delete').click(crud.del);
    
});

var mylayout = {
	    init: function (size) {
	        $('#layout').width(size.width - 4).height(size.height - 4).layout();
	        var center = $('#layout').layout('panel', 'center');
	        center.panel({
	            onResize: function (w, h) {
	                $('#navGrid').datagrid('resize', { width: w, height: h });
	            }
	        });
	    },
	    resize: function (size) {
	        mylayout.init(size);
	        $('#layout').layout('resize');
	    }
	};

var grid = {
    databind: function (size) {
        navgrid = $('#navGrid').datagrid({
            toolbar: '#toolbar',
            width: size.width,
            height: size.height,
            url: actionURL+"/datagrid.do",
            idField: 'id',
            treeField: 'menu_name',
            parentField : 'parent_menu_id',
            iconCls: 'icon-nav',
            nowrap: false,
            title:"当前位置->用户中心服务->菜单管理",
            rownumbers: true,
            animate: true,
            collapsible: false,
//            frozenColumns: [[
//                { title: 'ID', field: 'id', width: 50 , align: 'center'},
//                { title: '菜单名称', field: 'menu_name', width: 400 }
//            ]],
            columns: [[
                { title: '菜单名称', field: 'onDutyDeptId', width: 400 },
                { title: '图标', field: 'onDutyTel', width: 160 , align: 'center'},
                
                { title: '链接地址', field: 'onDutyPInfoId', width: 180 , align: 'center'},
                { title: '备注', field: 'onDutyDate', width: 200 , align: 'center'},
                { title: '是否显示', field: 'is_show', width: 60, align: 'center', formatter: function (v, d, i) {
                	
                    return '<img src="'+ctx+'/static/images/' + (v==1 ? "checkmark.gif" : "checknomark.gif") + '" />';
                }}
            ]]
        });
    },
    reload: function () {
        navgrid.datagrid('reload');
    },
    selected: function () {
        return navgrid.datagrid('getSelected');
    }
    
    
};

function createParam() {
	var combotree = $('#parent').combotree('tree');	// 获取树对象
	var node = combotree.tree('getSelected');		// 获取选择的节点
	$('#parent_menu_id').val(node.id);
    if($('#chk_is_show').is(":checked")){
    	$('#is_show').val(1);
    }else{
    	$('#is_show').val(0);
    }
    return $('#uiform').formSerialize();
}

function formValidate(){
	var menu_name = $.trim($('#uiform #menu_name').val());
	var menu_type = $('#uiform input[type="radio"]:checked').val();
	if(menu_name==''){
		layer.alert('菜单名不能为空!');
		return false;
	}
	if(menu_type==0){
		//选择系统时
		$('#parent').combotree('setValue',0);
		return true;
	}else{
		//选择菜单时
		var parent = $('#parent').combotree('getValue');
		if(parent==0){
			layer.alert('请选择父级菜单');
			return false;
		}
		return true;
	}
	return true;
}

function getChildNodes(treeNodeId, result) {
    var childrenNodes = navgrid.datagrid('getChildren', treeNodeId);
    if (childrenNodes) {
        for (var i = 0; i < childrenNodes.length; i++) {
            result.push(childrenNodes[i].id);
            //result = getChildNodes(childrenNodes[i].id, result);
        }
    }
    return result;
}

var crud = {
    bindCtrl: function (navId) {
    	var treeData = '[{"id":0,"selected":true,"text":"请选择父级菜单"}]';
    	if(navgrid.datagrid('getData')!=""){
	        var treeData = navgrid.datagrid('getData');
	        treeData = JSON.stringify(treeData).replace(/menu_name/g, 'text');
	        treeData = '[{"id":0,"selected":true,"text":"请选择父级菜单"},' + treeData.substr(1, treeData.length - 1);
    	}
        $('#parent').combotree({
            data: JSON.parse(treeData),
            valueField: 'id',
            textField: 'text',
          //  parentField : 'parentId',
            panelWidth: '180',
            editable: false,
            lines: true,
            onSelect: function (item) {
            	//var nodeId = $('#parent').combotree('getValue');
            	if(item.id==0) return;
        		if (item.id == navId) {
        			layer.alert("上级菜单不能与当前菜单相同!", 0)
                }
            	//console.log(item.id+","+navId);
            }
        }).combotree('setValue', 0);
    },
    create: function () {
        var addDialog =$.hDialog({
            href: createFormUrl, title: '添加菜单', iconCls: 'icon-add', width: 500, height: 400,
            onLoad:function () {
                crud.bindCtrl(0);
                $('#uiform input[type="radio"]').each(function(){
            		$(this).click(function(){
            			if($(this).val()==1){
            				$('#parentTR').show();
            			}else{
            				$('#parentTR').hide();
            			}
            		})
            	})
                var row = grid.selected();
                if (row){
                    $('#parent').combotree('setValue', row.menu_id);
                }
            },
            submit: function () {
            	if(formValidate()){
                    var param = createParam();
                    $.ajaxjson(actionURL+"/addMenu2.do", param, function (d) {
                        if (d.success) {
                        	layer.alert("新增菜单成功!", 1);
                            addDialog.dialog('close');
                            grid.reload();
                        } else {
                        	layer.alert(d.message,8);
                        }
                    });
            	}
            }
        });

    },
    update: function () {
        var row = grid.selected();
        if (row) {
            var editDailog = $.hDialog({
                href: updateFormUrl, title: '编辑菜单', iconCls: 'icon-add', width: 500, height: 400,
                onLoad:function () {
            		crud.bindCtrl(row.menu_id);
            		$('#uiform input[type="radio"]').each(function(){
                		$(this).click(function(){
                			if($(this).val()==1){
                				$('#parentTR').show();
                			}else{
                				$('#parentTR').hide();
                			}
                		})
                	})
            		$('#menu_name').val(row.menu_name);
            		if(''!= row.menu_type && 0 == row.menu_type){
            			$('#menu_type_system').attr('checked','checked');
            		}else{
            			$('#menu_type_menu').attr('checked','checked');
            		}
                    $('#href').val(row.href);
                    $('#icon').val(row.icon);
                    $('#parent').combotree('setValue', row.parent_menu_id);
                    $('#chk_is_show').attr('checked', row.is_show==1);
                    $('#remark').val(row.remark);
                    $('#menu_id').val(row.menu_id);
                },
                submit: function () {
                	if(formValidate()){
                        var query = createParam();
                        $.ajaxjson(actionURL+"/update.do", query, function (d) {
                            if (d.success) {
                            	layer.alert("修改菜单成功!", 1);
                                editDailog.dialog('close');
                                grid.reload();
                            } else {
                            	layer.alert(d.message,8);
                            }
                        });
                	}
                }
            });
        } else {
            layer.alert('请选择要修改菜单!',0);
            return false;
        }
        return false;
    },
    del: function () {
        var row = grid.selected();
        if (row != null) {
            var nodes = [row.menu_id];
            getChildNodes(row.menu_id, nodes);
            
            if(nodes.length>1)
            {
            	layer.alert('有子菜单，不能删除！',0);
                return false;
            }

            layer.confirm("确认要删除选中的菜单吗?",function(){
            	$.ajaxjson(actionURL+"/deleteMenu.do", "idsStr="+row.menu_id, function (d) {
                    if (d.success) {
                    	layer.alert("删除菜单成功!", 1);
                        grid.reload();
                    } else {
                    	layer.alert(d.message,8);
                    }
                });
			},function(index){
				layer.close(index);
			}) ;
//            if (confirm('确认要删除选中的菜单吗？')) {
//            	$.ajaxjson(actionURL+"/deleteMenu.do", "idsStr="+row.menu_id, function (d) {
//                    if (d.success) {
//                    	layer.alert("删除菜单成功!", 1);
//                        grid.reload();
//                    } else {
//                    	layer.alert(d.message,8);
//                    }
//                });
//            } else
//                return false;
        }
        else {
        	layer.alert('请选择要删除的菜单!',0);
            return false;
        }
        return false;
    }
};

