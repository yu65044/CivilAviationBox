/** StringBuffer Begin **/
function StringBuffer() {
	this._objArray = [];
	this._undoFlag = false;
};

StringBuffer.prototype.toString = function() {
	if(this._objArray.length==0) {
		return '';
	}
	var str = this._objArray.join('');
	if(this._objArray.length > 1) {
		this.clear();
		this.append(str);
	}
	this._undoFlag = false;
	return str;
};

StringBuffer.prototype.append = function(object) {
	this._objArray[this._objArray.length] = object;
	this._undoFlag = true;
	return this;
};

StringBuffer.prototype.clear = function() {
	this._objArray.length = 0;
	this._undoFlag = false;
};

StringBuffer.prototype.undoLastAppend = function() {
	if(this._undoFlag) {
		this._objArray.length = this._objArray.length -1;
		this._undoFlag = false;
	}
};

StringBuffer.prototype.setSize = function(size) {
	if(size==null || size<=0) {
		this.clear();
		return;
	}
	var str = this._objArray.join('');
	if(size < str.length) {
		str = str.substring(0, size);
		this.clear();
		this.append(str);
	} else if(this._objArray.length > 1) {
		this.clear();
		this.append(str);
	}
	this._undoFlag = false;
};

StringBuffer.prototype.getSize = function() {
	var str = this.toString();
	return str.length;
};
/** StringBuffer end **/

$.ajaxjson = function (url, dataMap, fnSuccess) {
    $.ajax({
        type: "POST",
        url: url,
        data: dataMap,
        dataType: "json",
        beforeSend: function () { $.hLoading.show(); },
        complete: function () { $.hLoading.hide(); },
        success: fnSuccess
    });
}
$.ajaxtext = function (url, dataMap, fnSuccess) {
    $.ajax({
        type: "POST",
        url: url,
        data: dataMap,
        beforeSend: function () { $.hLoading.show(); },
        complete: function () { $.hLoading.hide(); },
        success: fnSuccess
    });
}


function autoResize(options) {
    var defaults = {
        width: 6,
        height: 119,
        gridType: 'jqgrid'
    };
    options = $.extend(defaults, options);

    // 第一次调用
    var wsize = getWidthAndHeigh();
    if ($.isFunction(options.callback)) {
        options.callback(wsize);
    }

    // 窗口大小改变的时候
    $(window).resize(function () {
        var size = getWidthAndHeigh(true);
        switch (options.gridType)
        {
            case "datagrid":
                $(options.dataGrid).datagrid('resize', { width: size.width, height: size.height });
                break;
            case "treegrid":
                $(options.dataGrid).treegrid('resize', { width: size.width, height: size.height });
                break;
            case "jqgrid":
                $(options.dataGrid).jqGrid('setGridHeight', size.height).jqGrid('setGridWidth', wsize.width);
                break;
        }
    });

    // 获取iframe大小
    function getWidthAndHeigh(resize) {
        var windowHeight = 0;
        var widowWidth = 0;
        if (typeof (window.innerHeight) == 'number') {
            windowHeight = window.innerHeight;
            widowWidth = window.innerWidth;
        }
        else {
            if (document.documentElement && document.documentElement.clientHeight) {
                windowHeight = document.documentElement.clientHeight;
                widowWidth = document.documentElement.clientWidth;
            }
            else {
                if (document.body && document.body.clientHeight) {
                    windowHeight = document.body.clientHeight;
                    widowWidth = document.body.clientWidth;
                }
            }
        }

        
        widowWidth -= options.width;
        windowHeight -= options.height;

        
        return { width: widowWidth, height: windowHeight };
    }
}



function _StringFormatInline() {
    var txt = this;
    for (var i = 0; i < arguments.length; i++) {
        var exp = new RegExp('\\{' + (i) + '\\}', 'gm');
        txt = txt.replace(exp, arguments[i]);
    }
    return txt;
}

function _StringFormatStatic() {
    for (var i = 1; i < arguments.length; i++) {
        var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        arguments[0] = arguments[0].replace(exp, arguments[i]);
    }
    return arguments[0];
}

if (!String.prototype.format) {
    String.prototype.format = _StringFormatInline;
}

if (!String.format) {
    String.format = _StringFormatStatic;
}

//主要是推荐这个函数。它将jquery系列化后的值转为name:value的形式。
function convertArray(o) { 
    var v = {};
    for (var i in o) {
        if (o[i].name != '__VIEWSTATE') {
            if (typeof (v[o[i].name]) == 'undefined')
                v[o[i].name] = o[i].value;
            else
                v[o[i].name] += "," + o[i].value;
        }
    }
    return v;
}

/*
随机字符串 
length : 字符串长度
*/
function randomString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var size = length || 8;
    var i = 1;
    var ret = "";
    while (i <= size) {
        var max = chars.length - 1;
        var num = Math.floor(Math.random() * max);
        var temp = chars.substr(num, 1);
        ret += temp;
        i++;
    }
    return ret;
}


function MessageOrRedirect(d) {
    if (d) {
        if (d.data == "-99")
            $.hLoading.show({
                type: 'hits',
                msg: d.msg,
                onAfterHide: function() {
                    location.href = "/login.html";
                },
                timeout: 1000
            });

        else {
            $.messager.alert('系统提示', d.msg, 'warning');
        }
    }
}





