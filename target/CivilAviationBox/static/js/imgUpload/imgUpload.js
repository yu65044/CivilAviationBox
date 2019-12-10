function setImagePreview(avalue){
	var docObj = document.getElementById("doc");
	var imgObjPreview=document.getElementById("preview");
	if(docObj.files && docObj.files[0]){
		//火狐下,直接设img属性
		imgObjPreview.style.display='block';
		imgObjPreview.style.width='150px';
		imgObjPreview.style.height='180px';
		imgObjPreview.src = widow.URL.createObjectURL(docObj.files[0]);
	}else{
		//IE下,使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImgId = document.getElementById("localImg");
		//必须设置初始大小
		localImgId.style.width='150px';
		localImgId.style.height='180px';
		//图片异常的捕捉,防止用户修改后缀来伪造图片
		try{
			localImgId.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
			localImgId.filters.item('DXImageTransform.Microsoft.AlpphaImageLoader').src= imgSrc;
		}catch(e){
			layer.alert('您上传的图片格式不正确,请重新选择！');
			return false;
		}
		imgObjPreview.style.display='none';
		document.selection.empty();
	}
	return true;
}