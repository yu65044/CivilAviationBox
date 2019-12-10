// jQuery Alert Dialogs Plugin
//
// Version 1.0
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 29 December 2008
//
// Visit http://keleyi.com/a/bjac/no0m3cb1.htm for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
// modify by wbj 20130927
//
(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFFFFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '确定',         // text for the OK button
		cancelButton: '取消', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		dialogBoxStyle:'background-color:#EAEAEA;border:1px solid #AAAAAA;border-radius:5px;box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);',//外部样式
		dialogTitle:'cursor:move;background-color:#EAEAEA;border-bottom:1px solid #CCCCCC;border-radius:5px 5px 0 0;font-weight:bold;height:25px;line-height:25px;padding:5px 15px;',//标题
		dialogContent:'padding:23px 30px 30px 37px;text-align:left;background:#FFFFFF;',
		dialogButtonBox:'background-color:#EAEAEA;border-top:1px solid #CCCCCC;line-height:25px;padding:5px 12px;text-align:center;margin-bottom:2px;',
		dialogButtonStyle:'cursor:pointer;height:auto;padding:2px 10px;border:1px solid #3577B4;background:#66BAE6;border-radius:5px;color:#FFFFFF;',
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		dailog: function(message, value, title, callback) {
			if( title == null ) title = 'Dailog';
			$.alerts._show(title, message, value, 'dailog', function(result) {
				if( callback ) callback(result);
			});
		},
		
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container" style="'+$.alerts.dialogBoxStyle+'">'
			    +'<div id="popup_title" style="'+$.alerts.dialogTitle+'">'
			    	+'<div style="float:left;">'
			    		+'<span id="popup_span_title" style="font-weight:bold;line-height:25px;">'+title+'</span>'
			    	+'</div>'
			    	+'<div style="float:right;">'
			    		+'<input type="button" value="X" id="popup_a_title" title="关闭"/>'
			    	+'</div>'
			    +'</div>'
			    +'<div id="popup_content" style="'+$.alerts.dialogContent+'">'
			      +'<div id="popup_message"></div>'
				+'</div>'
				+'<div id="popup_panel" style="'+$.alerts.dialogButtonBox+'"></div>'
			  +'</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			//var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			var pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';

			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			//$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			$("#popup_container").css({
				minWidth: 220,
				maxWidth: $("#popup_container").outerWidth()<220? 220:$("#popup_container").outerWidth()
			});
			//ie7 无法识别maxWidth 导致满屏宽带
			//if($.browser.msie&&($.browser.version == "7.0" || $.browser.version == "6.0")){
			if($("#popup_container").outerWidth()>350){//最大宽度给350
				$("#popup_container").css({width:350});
			} 

			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_panel").append('<input type="button" value="' + $.alerts.okButton + '" id="popup_ok" />');
					$("#popup_ok").click( function() {
						callback(true);
						$.alerts._hide();
					});
					$("#popup_ok").keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
					$("#popup_a_title").click(function(){
						$("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_panel").append('<input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /><span style="padding:5px 10px;">&nbsp;</span><input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" />');
					$("#popup_ok").click( function() {
						if( callback ) callback(true);
						$.alerts._hide();
					});
					$("#popup_cancel").click( function() {
						if( callback ) callback(false);
						$.alerts._hide();
					});
					//$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					
					$("#popup_a_title").click(function(){
						$("#popup_cancel").trigger('click');
					});
				break;
				case 'dailog':
					$("#popup_panel").append('<input type="button" value="' + (value?value:$.alerts.okButton) + '" id="popup_ok" /><span style="padding:5px 10px;">&nbsp;</span><input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" />');
					$("#popup_ok").click( function() {
						if( callback ) callback($.alerts);
						//$.alerts._hide();
					});
					$("#popup_cancel").click( function() {
						if( callback ) callback(false);
						$.alerts._hide();
					});
					//$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					
					$("#popup_a_title").click(function(){
						$("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><textarea type="text" size="30" id="popup_prompt" ></textarea>');
					$("#popup_panel").append('<input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /><span style="padding:5px 10px;">&nbsp;</span><input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" />');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						if( callback ) callback( val );
						$.alerts._hide();
					});
					$("#popup_cancel").click( function() {
						if( callback ) callback( null );
						$.alerts._hide();
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					$("#popup_a_title").click(function(){
						$("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					//$("#popup_prompt").focus().select();
				break;
			}
			$("#popup_a_title,#popup_panel :button").attr("style",$.alerts.dialogButtonStyle).hover(function(){
				$(this).css({"background":"#26D5F4","boxShadow":"0 0 8px 2px #26D5F4"});
			},function(){
				$(this).css({"background":"#66BAE6","boxShadow":""});
			});
			$("#popup_a_title").css("padding","0 2px");
			// Make draggable
			/* 以下代码处理框体是否可以移动 */
	        var mouse={x:0,y:0};
	        var dialog = $("#popup_container");
	        function moveDialog(event){
	            var e = window.event || event;
	            var top = parseInt(dialog.css('top')) + (e.clientY - mouse.y);
	            var left = parseInt(dialog.css('left')) + (e.clientX - mouse.x);
	            dialog.css({top:top,left:left});
	            mouse.x = e.clientX;
	            mouse.y = e.clientY;
	        };
	        dialog.find("#popup_title").mousedown(function(event){
	            if(!$.alerts.draggable){  return; }
	
	            var e = window.event || event;
	            mouse.x = e.clientX;
	            mouse.y = e.clientY;
	            $(document).bind('mousemove',moveDialog);
	        });
	        $(document).mouseup(function(event){
	            $(document).unbind('mousemove', moveDialog);
	        });
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if ('undefined' == typeof (document.body.style.maxHeight)) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', function() {
							$.alerts._reposition();
						});
					break;
					case false:
						$(window).unbind('resize');
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jDailog = function(message, value, title, callback) {
		$.alerts.dailog(message, value, title, callback);
	};
	
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
})(jQuery);