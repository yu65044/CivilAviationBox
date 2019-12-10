(function ($) {
    
    function guidDialogId() {
        var  s4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return "XH-" + (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
    }

    $.hDialog = function(options) {
        options = $.extend({}, $.hDialog.defaults, options || {});

        var dialogId = guidDialogId();
        if (options.id)
            dialogId = options.id;

        //if (!options.href && !options.content) {
        //    alert('缺少必要的参数 href or content');
        //    return false;
        //}
        
        var defaultBtn = [{
                text: '保存',
                iconCls: 'icon-ok',
                handler: options.submit
            }, {
                text: '关闭',
                iconCls:'icon-cancel',
                handler: function () {
                    $("#" + dialogId).dialog("close");
                }
            }];
        
        if (!options.showBtns)
            defaultBtn = [];
        
        if(options.buttons.length ==0)
            options.buttons = defaultBtn;
        
        if (options.max) {
            //dialog.dialog('maximize');
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            options.width = winWidth - 20;
            options.height = winHeight - 20;
        }


        var $dialog = $('<div/>').css('padding', options.boxPadding).appendTo($('body'));
        
        var dialog = $dialog.dialog($.extend(options, {
            onClose: function () {
                dialog.dialog('destroy');
            }
        })).attr('id', dialogId);
        //.dialog('refresh').dialog('open')
        
        $dialog.find('.dialog-button').css('text-align', options.align);
       
        return dialog;
    };

    $.hDialog.defaults = $.extend({}, $.fn.dialog.defaults, {
        boxPadding:'3px',
        align:'right', //按钮对齐方式
        href: '',
        id:'',
        content: '',
        height: 200,
        width: 400,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: true,
        modal: true,
        shadow: false,
        mask: true,
        cache: false,
        closed: false,//默认是否关闭窗口 如果为true,需调用open方法打开
        showBtns: true,
        buttons:[],
        submit:function () {
            alert('写入可执行代码');
            return false;
        },
        onBeforeClose: function () {
            $(this).find(".combo-f").each(function () {
                var panel = $(this).data().combo.panel;
                panel.panel("destroy");
            });
            $(this).empty();
        },
        onMove: function(left,right) {
            $('.validatebox-tip').remove();
        }
        
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    $.hWindow = function(options) {
        var windowId = guidDialogId();

        options = $.extend({}, $.hDialog.defaults, options || {});
        if (!options.href && !options.content) {
            alert('缺少必要的参数 href or content');
            return false;
        }
        
        var $dialog = $('<div/>').attr('id', windowId).appendTo($('body'));

        if (options.max) {
            //dialog.dialog('maximize');
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            options.width = winWidth - 20;
            options.height = winHeight - 20;
        }

        var win = $dialog.window($.extend(options, {
            onClose: function () {
                win.window('destroy');
            }
        })).window('refresh').attr('id', windowId);

        
        return win;
    };

    $.hWindow.defaults = $.extend({ }, $.fn.window.defaults, {
        href: '',
        content: '',
        height: 300,
        width: 400,
        collapsible: false, 	//折叠
        closable: true,         //显示右上角关闭按钮
        minimizable: false, 	//最小化
        maximizable: false, 	//最大化
        resizable: false, 	    //是否允许改变窗口大小
        title: '窗口标题', 	    //窗口标题
        modal: true, 		    //模态	
        draggable: true,        //允许拖动
        max: false,
        onBeforeClose:function() {
            $(this).find(".combo-f").each(function () {
                var panel = $(this).data().combo.panel;
                alert(panel.html());
                panel.panel("destroy");
            });
            $(this).empty();
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    //扩展datagrid 方法 getSelectedIndex
    $.extend($.fn.datagrid.methods, {
        getSelectedIndex: function (jq) {
            var row = $(jq).datagrid('getSelected');
            if (row)
                return $(jq).datagrid('getRowIndex', row);
            else
                return -1;
        },
        checkRows: function (jq, idValues) {
            if (idValues && idValues.length > 0) {
                var rows = $(jq).datagrid('getRows');
                var keyFild = $(jq).datagrid('options').idField;
                $.each(rows, function (i, n) {
                    if ($.inArray(n[keyFild], idValues)) {
                        $(jq).datagrid('checkRow', row);
                    }
                })
            }
            return jq;
        }
    });
    //扩展 combobox 方法 selectedIndex
    $.extend($.fn.combobox.methods, {
        selectedIndex: function (jq, index) {
            if (!index)
                index = 0;
            var data = $(jq).combobox('options').data;
            var vf = $(jq).combobox('options').valueField;
            $(jq).combobox('setValue', eval('data[index].' + vf));
        }
    });

    //释放IFRAME内存
    $.fn.panel.defaults = $.extend({}, $.fn.panel.defaults, {
        onBeforeDestroy: function () {
            var frame = $('iframe', this);
            if (frame.length > 0) {
                frame[0].contentWindow.document.write('');
                frame[0].contentWindow.close();
                frame.remove();
                var isIE = /msie/.test(navigator.userAgent.toLowerCase());   //判断是否为ie浏览器
                if (isIE) {
                    CollectGarbage();
                }
            }
        }
    });

    //tree 方法扩展 全选、取消全选
    $.extend($.fn.tree.methods, {
        checkedAll: function (jq, target) {
            var data = $(jq).tree('getChildren');
            if(target)
                data = $(jq).tree('getChildren', target);
            
            $.each(data, function(i,n) {
                $(jq).tree('check', n.target);
            });
        }
    });

    $.extend($.fn.tree.methods, {
        uncheckedAll: function (jq) {
            var data = $(jq).tree('getChildren');
            $.each(data, function (i, n) {
                $(jq).tree('uncheck', n.target);
            });
        }
    });
    
    /**
     * @author 夏悸
     * 
     * @requires jQuery,EasyUI
     * 
     * 扩展tree，使其支持平滑数据格式
     */
    $.fn.tree.defaults.loadFilter = function(data, parent) {
    	var opt = $(this).data().tree.options;
    	var idField, textField, parentField;
    	if (opt.parentField) {
    		idField = opt.idField || 'id';
    		textField = opt.textField || 'text';
    		parentField = opt.parentField;
    		var i, l, treeData = [], tmpMap = [];
    		for (i = 0, l = data.length; i < l; i++) {
    			tmpMap[data[i][idField]] = data[i];
    		}
    		for (i = 0, l = data.length; i < l; i++) {
    			if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
    				if (!tmpMap[data[i][parentField]]['children'])
    					tmpMap[data[i][parentField]]['children'] = [];
    				data[i]['text'] = data[i][textField];
    				tmpMap[data[i][parentField]]['children'].push(data[i]);
    			} else {
    				data[i]['text'] = data[i][textField];
    				treeData.push(data[i]);
    			}
    		}
    		return treeData;
    	}
    	return data;
    };

    /**
     * @author 孙宇
     * 
     * @requires jQuery,EasyUI
     * 
     * 扩展treegrid，使其支持平滑数据格式
     */
    $.fn.treegrid.defaults.loadFilter = function(data, parentId) {
    	var opt = $(this).data().treegrid.options;
    	var idField, textField, parentField;
    	if (opt.parentField) {
    		idField = opt.idField || 'id';
    		textField = opt.textField || 'text';
    		parentField = opt.parentField;
    		var i, l, treeData = [], tmpMap = [];
    		for (i = 0, l = data.length; i < l; i++) {
    			tmpMap[data[i][idField]] = data[i];
    		}
    		for (i = 0, l = data.length; i < l; i++) {
    			if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
    				if (!tmpMap[data[i][parentField]]['children'])
    					tmpMap[data[i][parentField]]['children'] = [];
    				data[i]['text'] = data[i][textField];
    				tmpMap[data[i][parentField]]['children'].push(data[i]);
    			} else {
    				data[i]['text'] = data[i][textField];
    				treeData.push(data[i]);
    			}
    		}
    		return treeData;
    	}
    	return data;
    };

    /**
     * @author 孙宇
     * 
     * @requires jQuery,EasyUI
     * 
     * 扩展combotree，使其支持平滑数据格式
     */
    $.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;


    /**
     * @author 孙宇
     * 
     * @requires jQuery,EasyUI
     * 
     * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
     */
    var createGridHeaderContextMenu = function(e, field) {
    	e.preventDefault();
    	var grid = $(this);/* grid本身 */
    	var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
    	if (!headerContextMenu) {
    		var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
    		var fields = grid.datagrid('getColumnFields');
    		for ( var i = 0; i < fields.length; i++) {
    			var fildOption = grid.datagrid('getColumnOption', fields[i]);
    			if (!fildOption.hidden) {
    				$('<div iconCls="icon-ok" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
    			} else {
    				$('<div iconCls="icon-empty" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
    			}
    		}
    		headerContextMenu = this.headerContextMenu = tmenu.menu({
    			onClick : function(item) {
    				var field = $(item.target).attr('field');
    				if (item.iconCls == 'icon-ok') {
    					grid.datagrid('hideColumn', field);
    					$(this).menu('setIcon', {
    						target : item.target,
    						iconCls : 'icon-empty'
    					});
    				} else {
    					grid.datagrid('showColumn', field);
    					$(this).menu('setIcon', {
    						target : item.target,
    						iconCls : 'icon-ok'
    					});
    				}
    			}
    		});
    	}
    	headerContextMenu.menu('show', {
    		left : e.pageX,
    		top : e.pageY
    	});
    };
    $.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
    $.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
    
    

    /**
     * 解决linkbutton组件disable方法无法禁用jQuery绑定事件的问题
     * linkbutton方法扩展
     * @param {Object} jq
     */
    $.extend($.fn.linkbutton.methods, {
        /**
         * 激活选项（覆盖重写）
         * @param {Object} jq
         */
        enable: function(jq){
            return jq.each(function(){
                var state = $.data(this, 'linkbutton');
                if ($(this).hasClass('l-btn-disabled')) {
                    var itemData = state._eventsStore;
                    //恢复超链接
                    if (itemData.href) {
                        $(this).attr("href", itemData.href);
                    }
                    //回复点击事件
                    if (itemData.onclicks) {
                        for (var j = 0; j < itemData.onclicks.length; j++) {
                            $(this).bind('click', itemData.onclicks[j]);
                        }
                    }
                    //设置target为null，清空存储的事件处理程序
                    itemData.target = null;
                    itemData.onclicks = [];
                    $(this).removeClass('l-btn-disabled');
                }
            });
        },
        /**
         * 禁用选项（覆盖重写）
         * @param {Object} jq
         */
        disable: function(jq){
            return jq.each(function(){
                var state = $.data(this, 'linkbutton');
                if (!state._eventsStore)
                    state._eventsStore = {};
                if (!$(this).hasClass('l-btn-disabled')) {
                    var eventsStore = {};
                    eventsStore.target = this;
                    eventsStore.onclicks = [];
                    //处理超链接
                    var strHref = $(this).attr("href");
                    if (strHref) {
                        eventsStore.href = strHref;
                        $(this).attr("href", "javascript:void(0)");
                    }
                    //处理直接耦合绑定到onclick属性上的事件
                    var onclickStr = $(this).attr("onclick");
                    if (onclickStr && onclickStr != "") {
                        eventsStore.onclicks[eventsStore.onclicks.length] = new Function(onclickStr);
                        $(this).attr("onclick", "");
                    }
                    //处理使用jquery绑定的事件
                    var eventDatas = $(this).data("events") || $._data(this, 'events');
                    if (eventDatas["click"]) {
                        var eventData = eventDatas["click"];
                        for (var i = 0; i < eventData.length; i++) {
                            if (eventData[i].namespace != "menu") {
                                eventsStore.onclicks[eventsStore.onclicks.length] = eventData[i]["handler"];
                                $(this).unbind('click', eventData[i]["handler"]);
                                i--;
                            }
                        }
                    }
                    state._eventsStore = eventsStore;
                    $(this).addClass('l-btn-disabled');
                }
            });
        }
    });


    /**
     * 扩展easyui datagrid的两个方法.动态添加和删除toolbar的项(适用于1.3.0之后的版本)
     * $('#tt').datagrid("addToolbarItem",[{"text":"xxx"},"-",{"text":"xxxsss","iconCls":"icon-ok"}])
     * $('#tt').datagrid("removeToolbarItem","GetChanges")//根据btn的text删除
     *	$('#tt').datagrid("removeToolbarItem",0)//根据下标删除
     * 
     */

    $.extend($.fn.datagrid.methods, {
    	addToolbarItem : function (jq, items) {
    		return jq.each(function () {
    			var dpanel = $(this).datagrid('getPanel');
    			var toolbar = dpanel.children("div.datagrid-toolbar");
    			if (!toolbar.length) {
    				toolbar = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(dpanel);
    				$(this).datagrid('resize');
    			}
    			var tr = toolbar.find("tr");
    			for (var i = 0; i < items.length; i++) {
    				var btn = items[i];
    				if (btn == "-") {
    					$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
    				} else {
    					var td = $("<td></td>").appendTo(tr);
    					var b = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
    					b[0].onclick = eval(btn.handler || function () {});
    					b.linkbutton($.extend({}, btn, {
    							plain : true
    						}));
    				}
    			}
    		});
    	},
    	removeToolbarItem : function (jq, param) {
    		return jq.each(function () {
    			var dpanel = $(this).datagrid('getPanel');
    			var toolbar = dpanel.children("div.datagrid-toolbar");
    			var cbtn = null;
    			if (typeof param == "number") {
    				cbtn = toolbar.find("td").eq(param).find('span.l-btn-text');
    			} else if (typeof param == "string") {
    				cbtn = toolbar.find("span.l-btn-text:contains('" + param + "')");
    			}
    			if (cbtn && cbtn.length > 0) {
    				cbtn.closest('td').remove();
    				cbtn = null;
    			}
    		});
    	}
    });

    if( !('placeholder' in document.createElement('input')) ){   
    	  
        $('input[placeholder],textarea[placeholder]').each(function(){    
          var that = $(this),    
          text= that.attr('placeholder');    
          if(that.val()===""){    
            that.val(text).addClass('placeholder');    
          }    
          that.focus(function(){    
            if(that.val()===text){    
              that.val("").removeClass('placeholder');    
            }    
          })    
          .blur(function(){    
            if(that.val()===""){    
              that.val(text).addClass('placeholder');    
            }    
          })    
          .closest('form').submit(function(){    
            if(that.val() === text){    
              that.val('');    
            }    
          });    
        });    
      }   
    
})(jQuery)
