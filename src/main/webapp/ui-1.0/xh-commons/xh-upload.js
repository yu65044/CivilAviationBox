var uploader;
/** swf文件路径*/
var param_swf;
/** 文件接收服务端。*/
var param_server_url;
/** 选择文件的按钮。可选。内部根据当前运行是创建，可能是input元素，也可能是flash.*/
var param_pick_id;
/** 文件上传格式限制。*/
var param_extensions;
/** 文件上传大小限制 */
var param_fileSingleSizeLimit;
/** 图片预览img元素ID */
var param_img_id;
/** 图片上传成功后回调函数 */
var param_callback;
var InitUploaderPlug = {
    Initialize: function(params) {
    	param_swf = params.param_swf;
    	param_server_url = params.param_server_url;
    	console.log(param_server_url);
    	param_pick_id = params.param_pick_id;
    	param_extensions = params.param_extensions;
    	param_fileSingleSizeLimit = params.param_fileSingleSizeLimit;
    	param_img_id = params.param_img_id;
    	param_callback = params.param_callback;
    	uploader = WebUploader.create({
    	    swf: param_swf,
    	    server: param_server_url,
    	    pick:{
    	    	id:param_pick_id,
    	    	multiple: false, 
    	    } ,
    	    accept: {
    	       	title: 'accpet',
    		     extensions: param_extensions
    	    },
    	    fileSingleSizeLimit:param_fileSingleSizeLimit,
    	    resize: false/** 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传*/
    	});
    	uploader.on("error",function (type){
    		if(type=="Q_TYPE_DENIED"){
    			layer.alert('请上传'+param_extensions+'格式图片！');
    		}
    		else if(type=="F_EXCEED_SIZE"){
    			layer.alert('上传文件大小不能超过'+(param_fileSingleSizeLimit/1024/1024)+'Mb！');
    		}
    	});

    	uploader.on( 'fileQueued', function( file ) {
    		uploader.makeThumb( file, function( error, ret ) {
    	        if ( error ) {
    	            $(param_img_id).text('预览错误');
    	        } else {
    	        	$(param_img_id).attr('src',ret);
    	        }
    	    });
    	});

    	uploader.on( 'uploadFinished', function(){
    		param_callback.call();
    	});
    }
}


var InitUploaderFilePlug = {
	    Initialize: function(params) {
	    	param_swf = params.param_swf;
	    	param_server_url = params.param_server_url;
	    	console.log(param_server_url);
	    	param_pick_id = params.param_pick_id;
	    	param_extensions = params.param_extensions;
	    	param_fileSingleSizeLimit = params.param_fileSingleSizeLimit;
	    	param_img_id = params.param_img_id;
	    	param_callback = params.param_callback;
	    	uploader = WebUploader.create({
	    	    swf: param_swf,
	    	    server: param_server_url,
	    	    pick:{
	    	    	id:param_pick_id,
	    	    	multiple: false, 
	    	    } ,
	    	    accept: {
	    	       	title: 'accpet',
	    		     extensions: param_extensions
	    	    },
	    	    fileSingleSizeLimit:param_fileSingleSizeLimit,
	    	    resize: false/** 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传*/
	    	});
	    	uploader.on("error",function (type){
	    		if(type=="Q_TYPE_DENIED"){
	    			layer.alert('请上传'+param_extensions+'格式图片！');
	    		}
	    		else if(type=="F_EXCEED_SIZE"){
	    			layer.alert('上传文件大小不能超过'+(param_fileSingleSizeLimit/1024/1024)+'Mb！');
	    		}
	    	});

	    	uploader.on( 'fileQueued', function( file ) {
	    		
	    		$(param_img_id).append('<div id="' + file.id + '" class="item_file">' + 
	    				'<div class="file-mask"></div>' + 
	    			 	'<i class=""></i>' + 
	    			 	'<span class="file_content file_name ellipsis" style="color:green" title="' + file.name + '">' + file.name + '</span>' +  
	    			 	'<span class="file_content file_state ellipsis" title=""> 等待上传...</span>' + 
	    			 	'<a href="javascript:void(0);" class="btn btn-primary file_btn btnRemoveFile">删除</a>' + 
	    			 '</div>');
	    			$(".btnRemoveFile").bind("click", function() {
	    				var fileItem = $(this).parent();
	    				uploader.removeFile($(fileItem).attr("id"), true);
	    				$(fileItem).fadeOut(function() {
	    					$(fileItem).remove();
	    				});
	    			});
	    	});

	    	uploader.on( 'uploadFinished', function(){
	    		param_callback.call();
	    	});
	    }
	}

