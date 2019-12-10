/**
 * 
 * author:liuhuan
 * Js-Icon-Table图标列表插件
 * 使用时必须在此文件前导入jquery库 、 bootstrap.min.css 、 static/ui-1.0/css/style.min.css
 *
 */
var Parent;
var Url;
var PageList;
var PageIndex = 1;
var PageSize = 12;
var personSelectUrl = ctx + '/zdryCaacController/personInfo.do';
var size;
var initFilter = {"groupOp":"AND","rules":[{"field":"is_delete","op":"exp","data":" is_delete = 0"}]};
var FilterJson;
var width = 800;//弹窗的宽度
var height = 460;//弹窗的高度
var IconTablePlug = {
    Initialize: function(params) {
    	FilterJson = initFilter;
    	Parent = params.parent;
    	Url = params.url;
    	PageList = params.pageList;
    	PageIndex = params.pageIndex;
    	PageSize = params.pageSize;
    	size = { width: $(window).width(), height: $(window).height() }
    	if(size.width<width){
    		width = size.width - 20;
    	}
    	if(size.height<height){
    		height = size.height - 50;
    	}
    	this.OnLoad(PageIndex,PageSize,FilterJson);
    },
    OnLoad:function(page,rows){
    	PageIndex = page;
    	pageSize = rows;
    	$.ajax({
	   		url: Url,
	   		data:{page:page,rows:rows,filterJson:JSON.stringify(FilterJson)},
	   		type:"post",
	   		dataType:"json",
	   		success:function(data){
	   			var list = data.rows;
	   			var html = '';
	   			if(list.length>0){
		   			for (var i = 0; i < list.length; i++) {
						var user = list[i];
/*						var userImg;
						if(user.photoUrl == null || user.photoUrl == ''){
							userImg = '/photo/file/no_head.jpg';
						}else{
							userImg = user.photoUrl;
						}
						var userSex = sexMap.get(user.sex) == null?"----":sexMap.get(user.sex);
						var userNation = nationMap.get(user.nation) == null?"----":nationMap.get(user.nation);
*/						html += '<div class="col-sm-3" person-id="'+user.personId+'">';
						html += '    <div class="contact-box" id="icon-item">';
						html += '        <a href="javascript:void(0);" >';
						html += '            <div class="col-sm-4">';
						html += '                <div class="text-center">';
						html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="'+(ctx+userImg)+'">';
						html += '                    <div class="m-t-xs font-bold">'+user.personName+'</div>';
						html += '                </div>';
						html += '            </div>';
						html += '            <div class="col-sm-8">';
						html += '                <h3 class="text-overflow"><strong>'+user.personName+'</strong></h3>';
						//html += '                    <span class="text-overflow" style="width:100%;font-size:10px;float:left; padding-top:5px;">工作单位：'+compName+'</span>';
						html += '                    <span class="text-overflow" style="width:100%;font-size:10px;float:left; padding-top:5px;">工作岗位：'+user.workPost+'</span>';
						html += '                    <span class="text-overflow" style="width:100%;font-size:10px;float:left; padding-top:5px;">入职时间：'+getSmpFormatDateByLong(user.hireDate,false)+'</span>';
						html += '                    <span class="text-overflow" style="width:100%;float:left; padding-top:5px;font-size:10px;"><span>性别 : '+userSex+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>民族 : '+userNation+'</span></span>';
						html += '                    <span class="text-overflow" style="width:100%;float:left;font-size:10px;padding-top:5px;">身份证号 : '+(user.cardNumber==''?'----':user.cardNumber)+'</span>';
						html += '                    <span class="text-overflow" style="width:100%;float:left;font-size:10px;padding-top:5px;">户籍地址 : '+(user.domicile==''?'----':user.domicile)+'</span>';
						html += '            </div>';
						html += '            <div class="clearfix"></div>';
						html += '        </a>';
						html += '    </div>';
						html += '</div>';
					}
	   			}else{
	   				html += '<div class="col-sm-4" style="text-align: center; width:100%; font-size:14px;">没有找到匹配的记录</div>'
	   			}
	   			Parent.html('');
	   			Parent.append(html);
	   			
	   			Parent.children().each(function(){
	   				$(this).click(function(){
	   					IconTablePlug.OnSelect(this);
		   			});
	   				$(this).dblclick(function(){
	   					$(this).siblings().children().css("border","1px solid #E7EAEC");
	   			    	$(this).children().css("border","1px solid #0098CB");
	   			    	var personId = $(this).attr('person-id');
	   					IconTablePlug.DblClick(personSelectUrl,personId);
		   			});
	   			})
	   			
	   			IconTablePlug.InitPagination(page,rows,data);
	   			IconTablePlug.OnMouseHover();
	   		}
	   	})
    },
    ReLoad: function(){
    	IconTablePlug.OnLoad(PageIndex,PageSize,FilterJson);
    },
    InitPagination: function(page,rows,data){
    	if(data != null && data.total > 0){
	    	var total = parseInt(data.total);
	    	var dataList = data.rows;
	    	var pageIndex = parseInt(page);
	    	var pageSize = parseInt(rows);
	    	var totalPage = parseInt(total%pageSize==0?total/pageSize:total/pageSize+1);
	    	var start = pageIndex==1?pageIndex:pageIndex*pageSize-pageSize;
	    	var end;
	    	if(total==0){
	    		start = 0;
	    		end = 0;
	    	}
	    	if(dataList.length<pageSize){
	    		end = pageIndex==1?dataList.length:pageIndex*pageSize-pageSize+dataList.length;
	    	}else{
	    		end = pageIndex==1?pageIndex*pageSize:pageIndex*pageSize-pageSize+dataList.length;
	    	}
	    	var indexBtn=[];
	    	if(totalPage<=7){
	    		for (var i = 0; i < totalPage; i++) {
	    			indexBtn[i] = i+1;
				}
	    	}else{
	    		if(pageIndex<5){
	    			indexBtn[0] = 1;
	    			indexBtn[1] = 2;
	    			indexBtn[2] = 3;
	    			indexBtn[3] = 4;
	    			indexBtn[4] = 5;
	    			indexBtn[5] = '...';
	    			indexBtn[6] = totalPage;
	    		}else{
		    		if(pageIndex+3>=totalPage){
		    			indexBtn[0] = 1;
		    			indexBtn[1] = '...';
		    			indexBtn[2] = totalPage-4;
		    			indexBtn[3] = totalPage-3;
		    			indexBtn[4] = totalPage-2;
		    			indexBtn[5] = totalPage-1;
		    			indexBtn[6] = totalPage;
		    		}
		    		
		    		if(pageIndex+3<totalPage){
		    			indexBtn[0] = 1;
		    			indexBtn[1] = '...';
		    			indexBtn[2] = pageIndex-1;
		    			indexBtn[3] = pageIndex;
		    			indexBtn[4] = pageIndex+1;
		    			indexBtn[5] = '...';
		    			indexBtn[6] = totalPage;
		    		}
	    		}
	    	}
	    	
	    	var html='';
	    	html+='<div id="pagination" class="text-center" style="border-top: 1px solid #E7EAEC; padding-top:18px;">';
	    	html+='<div class="pull-left pagination-detail" style="border: 1px solid #E7EAEC;">';
	    	html+='	<span class="pagination-info">&nbsp;&nbsp;&nbsp;&nbsp;显示第 '+start+' - '+end+' 条记录，总共 '+total+' 条记录</span>';
	    	html+='	<span class="page-list">每页显示 <span class="btn-group dropup">';
	    	html+='	<button type="button" class="btn dropdown-toggle" data-toggle="dropdown">';
	    	html+='	<span class="page-size">'+PageSize+'</span><i class="fa fa-sort-desc" style="position: relative; top:-2px; left:4px;"></i></button>';
	    	html+='	<ul class="dropdown-menu" role="menu">';
	    	for (var i = 0; i < PageList.length; i++) {
	    		html+='<li onclick="IconTablePlug.ChangePageSize('+PageList[i]+')"><a href="javascript:void(0)">'+PageList[i]+'</a></li>';
			}
	    	html+='	</ul>';
	    	html+='	</span> 条记录&nbsp;&nbsp;&nbsp;&nbsp;</span>';
	    	html+='</div>';
	    	html+='<div class="pull-right btn-group">';
	    	html+='    <button class="btn btn-white" type="button" onclick="IconTablePlug.OnLoad(1,'+PageSize+')">首页</button>';
	    	html+='    <button class="btn btn-white" type="button" onclick="IconTablePlug.PrePage()"><i class="fa fa-chevron-left"></i></button>';
	    	for (var i = 0; i < indexBtn.length; i++) {
	    		if(indexBtn[i]==pageIndex){
	    			html+='<button class="btn btn-white active">'+indexBtn[i]+'</button>';
	    		}else{
	    			if(indexBtn[i]=='...'){
	    				html+='<button class="btn btn-white">'+indexBtn[i]+'</button>';
	    			}else{
	    				html+='<button class="btn btn-white" onclick="IconTablePlug.OnLoad('+indexBtn[i]+','+PageSize+')">'+indexBtn[i]+'</button>';
	    			}
	    		}
	    	}
	    	html+='    <button class="btn btn-white" type="button" onclick="IconTablePlug.NextPage('+totalPage+')"><i class="fa fa-chevron-right"></i></button>';
	    	html+='    <button class="btn btn-white" type="button" onclick="IconTablePlug.OnLoad('+totalPage+','+PageSize+')">尾页</button>';
	    	html+='</div>';
	    	html+='</div>';
	    	$(document).find('#pagination').remove();
	    	$(Parent).after(html);
    	}else{
    		$(document).find('#pagination').remove();
    	}
    },
    ChangePageSize:function(v){
    	PageSize = v;
    	PageIndex = 1;
    	$(document).find('.page-size').text(PageSize);
    	this.OnLoad(PageIndex,PageSize,FilterJson);
    },
    OnMouseHover:function(){
    	$(document).find('.contact-box').each(function () {
            animationHover(this, 'pulse');
        });
    },
    PrePage:function(){
    	var pageIndex = PageIndex-1;
    	if(pageIndex<=1){
    		if(PageIndex!=1) this.OnLoad(1,PageSize,FilterJson);
    	}else{
    		this.OnLoad(pageIndex,PageSize,FilterJson);
    	}
    },
    NextPage:function(t){
    	var pageIndex = PageIndex+1;
    	if(pageIndex>=t){
    		if(PageIndex!=t) this.OnLoad(t,PageSize,FilterJson);
    	}else{
    		this.OnLoad(pageIndex,PageSize,FilterJson);
    	}
    },
    OnSelect: function(div) {
    	$(div).siblings().removeAttr('select')
    	$(div).attr('select','true');
    	$(div).siblings().children().css("border","1px solid #E7EAEC");
    	$(div).children().css("border","1px solid #0098CB");
	},
	DblClick: function(url,personId){
    	var index = layer.open({
			   type:2,
			   area: [width+'px', height+'px'],  
			   title:"个人档案",
			   skin: 'layer-win-class',
			   fix: true,
			   maxmin: false,//窗口最大最小
			   closeBtn:1, //0:不显示关闭按钮，1：显示关闭按钮，2：关闭按钮在右正上方
			   content: url+'?personId='+personId,
		});
	},
	LoadCompInfo:function(){
		$.ajax({
    	    type: "POST",
    	    url: compUrl,
    	    async:false,
    	    dataType: "json",
    	    success: function (d) {
    		    var list = d["rows"];
    	  		if(list.length>0){
    	   			for (var i = 0; i < list.length; i++) {
    	   				var comp = list[i];
    	   				var key = comp.compId;
    	   				compMap.put(""+key,comp);
    	   			}
    	 		}
    	    },
    	    error:function(){
    	    	layer.alert('获取企业单位信息异常，请联系管理员!')
    	    }
    	});
	}
}

