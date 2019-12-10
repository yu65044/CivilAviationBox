
/*-------------------------鼠标左键拖动---------------------*/
/*--------当不需要实现此功能时，可以将这一部分代码删除------------*/
var objDrag;
var dropDiv=function(divId){
	var objDiv = document.getElementById(divId);
	var mouseD;
	var isIE = document.all ? true : false;//判断浏览器类型
	document.onmousedown = function(evnt) {//当鼠标左键按下后执行此函数
		var evnt = evnt ? evnt : window.event;
		if (evnt.button == 1 || evnt.button == 0) {
			mouseD = true;//mouseD为鼠标左键状态标志，为true时表示左键被按下
		}
	}
    var headDiv=$(objDiv).find("div:eq(1)").get(0);
   
    if(headDiv==undefined){
    	headDiv=objDiv;
    }
    headDiv.onmousedown = function(evnt) {
		objDrag = $(this).parents("div:eq(1)");//objDrag为拖动的对象
		var evnt = evnt ? evnt : window.event;
		if (evnt.button == 1 || evnt.button == 0) {
			mx = evnt.clientX;
			my = evnt.clientY;
			if(headDiv.id="bindingStep1"){
				$(headDiv).removeAttr("id");
				
				objDiv.style.left = objDiv.offsetLeft + "px";
				$(objDiv).css('marginLeft','0px');
			}else if(headDiv.id="bindingStep2"){
				$(headDiv).removeAttr("id");
				objDiv.style.left = objDiv.offsetLeft + "px";
			}else{
				objDiv.style.left = objDiv.offsetLeft + "px";
			}

			objDiv.style.top = objDiv.offsetTop + "px";
			$(objDiv).css('marginTop','0px');
			if (isIE) {
			  objDiv.setCapture();
			//objDiv.filters.alpha.opacity = 50;//当鼠标按下后透明度改变
			} else {
				window.captureEvents(Event.MOUSEMOVE);//捕获鼠标拖动事件
			//objDiv.style.opacity = 0.5;//当鼠标按下后透明度改变
			}
		}
	}
	document.onmouseup = function() {
		mouseD = false;//左键松开
		objDrag = "";
		if (isIE) {
			objDiv.releaseCapture();
		//objDiv.filters.alpha.opacity = 100;//当鼠标左键松开后透明度改变
		} else {
		   window.releaseEvents(objDiv.MOUSEMOVE);//释放鼠标拖动事件
		//objDiv.style.opacity = 1;//当鼠标左键松开后透明度改变
		}
	}
	document.onmousemove = function(evnt) {
		var evnt = evnt ? evnt : window.event;
		if (mouseD == true && objDrag != undefined && objDrag != "") {
			var mrx = evnt.clientX - mx;
			var mry = evnt.clientY - my;
			objDiv.style.left = parseInt(objDiv.style.left) + mrx + "px";
			objDiv.style.top = parseInt(objDiv.style.top) + mry + "px";
			mx = evnt.clientX;
			my = evnt.clientY;
		}
	}
}

