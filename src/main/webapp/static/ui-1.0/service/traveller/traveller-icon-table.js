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
var personSelectUrl =  ctx+"/examController/examDetailUrl.do";
var size;
var initFilter ;
var FilterJson;
var compMap = new Map();//存放企业单位信息，键/值对，键为compId 值为comp对像 

var IconTablePlug = {
    Initialize: function(params) {
    	FilterJson = initFilter;
    	Parent = params.parent;
    	Url = params.url;
    	PageList = params.pageList;
    	PageIndex = params.pageIndex;
    	PageSize = params.pageSize;
    	size = { width: $(window).width(), height: $(window).height() }
    	this.OnLoad(PageIndex,PageSize,FilterJson);
    },
    OnLoad:function(page,rows){
    	//console.log(FilterJson)
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
						var userImg;
						if(user.photoDataUrl==null||user.photoDataUrl==""){
							userImg = ctx+'/photo/file/no_head.jpg';
						}else{
							userImg = ctx+user.photoDataUrl;
						}
						var compName = 0;//compMap.get(user.compId) == null?"----":compMap.get(user.compId).compName;
						var sexNamae = sexMap.get(user.sex) == null?"----":sexMap.get(user.sex);
						var nationName = nationMap.get(user.nation) == null?"----":nationMap.get(user.nation);var bizhong ;
						if(user.examCompareStatus==0){
							bizhong = '未有';
						}else if(user.examCompareStatus==4){
							bizhong = '比中';
						}else{
							bizhong = '未对比';
						}
						html += '<div class="col-sm-3" exam-id="'+user.examId+'">';
						html += '    <div class="contact-box" id="icon-item">';
						html += '        <a href="javascript:void(0);" >';
						html += '            <div class="col-sm-3">';
						html += '                <div class="text-center">';
						html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="'+(userImg)+'">';
						html += '                    <div class="m-t-xs font-bold">'+user.examName+'</div>';
						html += '                </div>';
						html += '            </div>';
						html += '            <div class="col-sm-8">';
						html += '                <h3><strong class="icon-view-text-overflow">'+user.examName+'</strong></h3>';
						html += '                    <span class="icon-view-text-overflow">应聘时间：'+getSmpFormatDateByLong(user.createTime,false)+'</span></br>';
						html += '                    <span class="icon-view-text-overflow"><span>性别 : '+sexNamae+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>民族 : '+nationName+'</span></span></br>';
						html += '                    <span class="icon-view-text-overflow">身份证号 : '+(user.cardNumber==''?'未知':user.cardNumber)+'</span>';
						html += '                    <span class="icon-view-text-overflow">比中结果 : '+bizhong+'</span>';
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
	   			    	var examId = $(this).attr('exam-id');
	   			    	openSeurityDetail(examId);
	   			    	
		   			});
	   			})
	   			
	   			IconTablePlug.InitPagination(page,rows,data);
	   			IconTablePlug.OnMouseHover();
	   		}
	   	})
    },
    ReLoad: function(){
    	IconTablePlug.OnLoad(1,PageSize,FilterJson);
    },
    InitPagination: function(page,rows,data){
    	if(data != null && data.total > 0){
	    	var total = parseInt(data.total);
	    	var dataList = data.rows;
	    	var pageIndex = parseInt(page);
	    	var pageSize = parseInt(rows);
	    	var totalPage = parseInt(total%pageSize==0?total/pageSize:total/pageSize+1);
	    	var start = pageIndex==1?pageIndex:pageIndex*pageSize-pageSize;
	    	var end = pageIndex==1?pageIndex*pageSize:pageIndex*pageSize-pageSize+dataList.length;
	    	if(total==0){
	    		start = 0;
	    		end = 0;
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
	    	html+='<div id="pagination" class="text-center" style="border-top: 1px solid #E7EAEC; padding-top:20px; margin-top: 20px;">';
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
	}
}

