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
var cardMap={'1':'身份证','2':'港澳通行证','3':'护照','':'其它证件',null:'其它证件','I':'身份证','NI':'身份证'};

var compMap = new Map();//存放企业单位信息，键/值对，键为compId 值为comp对像 
var width = 800;
var ZTIconTablePlug = {
    Initialize: function(params) {
    	Parent = params.parent;
    	Url = params.url;
    	PageList = params.pageList;
    	PageIndex = params.pageIndex;
    	PageSize = params.pageSize;
    	size = { width: $(window).width(), height: $(window).height() }
    	if(size.width<width){
    		width = size.width - 20;
    	}
    	this.OnLoad(PageIndex,PageSize,yesterdayJson);
    },
    OnLoad:function(page,rows){
    	//console.log(FilterJson)
    	PageIndex = page;
    	pageSize = rows;
    	$.ajax({
	   		url: ctx+'/arriveWarnController/warnDatagrid.do?flag='+JSON.stringify(flag),
	   		data:{page:page,rows:rows,filterJson:JSON.stringify(yesterdayJson),orgId:orgId},
	   		type:"post",
	   		dataType:"json",
	   		success:function(data){
	   			var list = data.rows;
	   			var html = '';
	   			if(list.length>0){
		   			for (var i = 0; i < list.length; i++) {
						var user = list[i];
						var warnPersonId=encodeURI(encodeURI(user.warnPersonId));
						var warnPersonName =user.warnPersonName==''?"----":user.warnPersonName;
						var cardType = user.cardType==''?"----":user.cardType;
						var cardNumber=user.cardNumber==''?"----":user.cardNumber;
						var userImg = '/zxgkWeb/arriveWarnController/getImage.do?cardNumber='+cardNumber;
						var flightNo =user.flightNo == ''?"----":user.flightNo;
						var flightDate = user.flightDate == ''?"----":user.flightDate;
						var flightTakeOffTime =user.flightTakeOffTime == ''?"----":user.flightTakeOffTime;
						var flightArrivalTime =user.flightArrivalTime==''?"----":user.flightArrivalTime;
						var takeOffAirportName =user.takeOffAirportName==''?"----":user.takeOffAirportName;
						var arrivalAirportName=user.arrivalAirportName==''?"----":user.arrivalAirportName;
						var warnCompareTime=user.warnCompareTime==''?"----":user.warnCompareTime;
						var personType=user.personType==''?"----":user.personType;
						var ticketOperateTime=user.ticketOperateTime==''?"----":user.ticketOperateTime;
						
						html += '<div class="col-sm-3" id="'+user.warnPersonId+'" cardNumber="'+user.cardNumber+'">';
						html += '    <div class="contact-box" id="icon-item">';
						html += '        <a href="javascript:void(0);" >';
						html += '            <div class="col-sm-4">';
						html += '                <div class="text-center">';
						/*html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="../photo/file/no_head.jpg"/>';*/
						html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="'+userImg+'"/>';
						html += '                    <div class="m-t-xs font-bold">'+user.warnPersonName+'</div>';
						html += '                </div>';
						html += '            </div>';
						html += '            <div class="col-sm-8">';
						html += '                    <span class="icon-view-text-overflow">证件号码：'+cardNumber+'</span>';
						html += '                    <span class="icon-view-text-overflow">证件类型：'+cardMap[cardType]+'</span>';
						html += '                    <span class="icon-view-text-overflow"><span>航班号 : '+flightNo+'</span>';
						html += '                    <span class="icon-view-text-overflow"><span>航班日期: '+birthdayFormatF(flightDate)+'</span>';
						html += '                    <span class="icon-view-text-overflow"><span>计划起飞时间: '+flightTakeOffTime+'</span>';
						html += '                    <span class="icon-view-text-overflow"><span>计划到达时间: '+flightArrivalTime+'</span>';
						/*html += '                    <span class="icon-view-text-overflow"><span>起飞机场名称: '+takeOffAirportName+'</span>';
						html += '                    <span class="icon-view-text-overflow">到达机场名称: '+arrivalAirportName+'</span>';
						html += '                    <span class="icon-view-text-overflow">比中时间: '+warnCompareTime+'</span>';*/
						html += '                    <span class="icon-view-text-overflow">订票时间: '+ticketOperateTime+'</span>';
					/*	html += '                    <span class="icon-view-text-overflow">布控人员类型: '+personType+'</span>';*/
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
	   					ZTIconTablePlug.OnSelect(this);
		   			});
	   				$(this).dblclick(function(){
	   					$(this).siblings().children().css("border","1px solid #E7EAEC");
	   			    	$(this).children().css("border","1px solid #0098CB");
	   			    	var id = $(this).attr('id');
	   			    	openTicketCompareDetail(encodeURI(encodeURI(id)));
		   			});
	   			})
	   			
	   			ZTIconTablePlug.InitPagination(page,rows,data);
	   			ZTIconTablePlug.OnMouseHover();
	   		}
	   	})
    },
    ReLoad: function(){
    	ZTIconTablePlug.OnLoad(1,PageSize,yesterdayJson);
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
	    		html+='<li onclick="ZTIconTablePlug.ChangePageSize('+PageList[i]+')"><a href="javascript:void(0)">'+PageList[i]+'</a></li>';
			}
	    	html+='	</ul>';
	    	html+='	</span> 条记录&nbsp;&nbsp;&nbsp;&nbsp;</span>';
	    	html+='</div>';
	    	html+='<div class="pull-right btn-group">';
	    	html+='    <button class="btn btn-white" type="button" onclick="ZTIconTablePlug.OnLoad(1,'+PageSize+')">首页</button>';
	    	html+='    <button class="btn btn-white" type="button" onclick="ZTIconTablePlug.PrePage()"><i class="fa fa-chevron-left"></i></button>';
	    	for (var i = 0; i < indexBtn.length; i++) {
	    		if(indexBtn[i]==pageIndex){
	    			html+='<button class="btn btn-white active">'+indexBtn[i]+'</button>';
	    		}else{
	    			if(indexBtn[i]=='...'){
	    				html+='<button class="btn btn-white">'+indexBtn[i]+'</button>';
	    			}else{
	    				html+='<button class="btn btn-white" onclick="ZTIconTablePlug.OnLoad('+indexBtn[i]+','+PageSize+')">'+indexBtn[i]+'</button>';
	    			}
	    		}
	    	}
	    	html+='    <button class="btn btn-white" type="button" onclick="ZTIconTablePlug.NextPage('+totalPage+')"><i class="fa fa-chevron-right"></i></button>';
	    	html+='    <button class="btn btn-white" type="button" onclick="ZTIconTablePlug.OnLoad('+totalPage+','+PageSize+')">尾页</button>';
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
    	this.OnLoad(PageIndex,PageSize,yesterdayJson);
    },
    OnMouseHover:function(){
    	$(document).find('.contact-box').each(function () {
            animationHover(this, 'pulse');
        });
    },
    PrePage:function(){
    	var pageIndex = PageIndex-1;
    	if(pageIndex<=1){
    		if(PageIndex!=1) this.OnLoad(1,PageSize,yesterdayJson);
    	}else{
    		this.OnLoad(pageIndex,PageSize,yesterdayJson);
    	}
    },
    NextPage:function(t){
    	var pageIndex = PageIndex+1;
    	if(pageIndex>=t){
    		if(PageIndex!=t) this.OnLoad(t,PageSize,yesterdayJson);
    	}else{
    		this.OnLoad(pageIndex,PageSize,yesterdayJson);
    	}
    },
    OnSelect: function(div) {
    	$(div).siblings().removeAttr('select')
    	$(div).attr('select','true');
    	$(div).siblings().children().css("border","1px solid #E7EAEC");
    	$(div).children().css("border","1px solid #0098CB");
	}
}

var JTIconTablePlug = {
	    Initialize: function(params) {
	    	Parent = params.parent;
	    	Url = params.url;
	    	PageList = params.pageList;
	    	PageIndex = params.pageIndex;
	    	PageSize = params.pageSize;
	    	size = { width: $(window).width(), height: $(window).height() }
	    	if(size.width<width){
	    		width = size.width - 20;
	    	}
	    	this.OnLoad(PageIndex,PageSize,todayJson);
	    },
	    OnLoad:function(page,rows){
	    	//console.log(FilterJson)
	    	PageIndex = page;
	    	pageSize = rows;
	    	$.ajax({
		   		url: ctx+'/arriveWarnController/warnDatagrid.do?flag='+JSON.stringify(flag),
		   		data:{page:page,rows:rows,filterJson:JSON.stringify(todayJson),orgId:orgId},
		   		type:"post",
		   		dataType:"json",
		   		success:function(data){
		   			var list = data.rows;
		   			var html = '';
		   			if(list.length>0){
			   			for (var i = 0; i < list.length; i++) {
							var user = list[i];
							var warnPersonId=encodeURI(encodeURI(user.warnPersonId));
							var warnPersonName =user.warnPersonName==''?"----":user.warnPersonName;
							var cardType = user.cardType==''?"----":user.cardType;
							var cardNumber=user.cardNumber==''?"----":user.cardNumber;
							var userImg = '/zxgkWeb/arriveWarnController/getImage.do?cardNumber='+cardNumber;
							var flightNo =user.flightNo == ''?"----":user.flightNo;
							var flightDate = user.flightDate == ''?"----":user.flightDate;
							var flightTakeOffTime =user.flightTakeOffTime == ''?"----":user.flightTakeOffTime;
							var flightArrivalTime =user.flightArrivalTime==''?"----":user.flightArrivalTime;
							var takeOffAirportName =user.takeOffAirportName==''?"----":user.takeOffAirportName;
							var arrivalAirportName=user.arrivalAirportName==''?"----":user.arrivalAirportName;
							var warnCompareTime=user.warnCompareTime==''?"----":user.warnCompareTime;
							var personType=user.personType==''?"----":user.personType;
							var ticketOperateTime=user.ticketOperateTime==''?"----":user.ticketOperateTime;
							
							html += '<div class="col-sm-3" id="'+user.warnPersonId+'" cardNumber="'+user.cardNumber+'">';
							html += '    <div class="contact-box" id="icon-item">';
							html += '        <a href="javascript:void(0);" >';
							html += '            <div class="col-sm-4">';
							html += '                <div class="text-center">';
							html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="'+userImg+'"/>';
							html += '                    <div class="m-t-xs font-bold">'+user.warnPersonName+'</div>';
							html += '                </div>';
							html += '            </div>';
							html += '            <div class="col-sm-8">';
							html += '                    <span class="icon-view-text-overflow">证件号码：'+cardNumber+'</span>';
							html += '                    <span class="icon-view-text-overflow">证件类型：'+cardMap[cardType]+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班号 : '+flightNo+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班日期: '+birthdayFormatF(flightDate)+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划起飞时间: '+flightTakeOffTime+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划到达时间: '+flightArrivalTime+'</span>';
							/*html += '                    <span class="icon-view-text-overflow"><span>起飞机场名称: '+takeOffAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">到达机场名称: '+arrivalAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">比中时间: '+warnCompareTime+'</span>';*/
							html += '                    <span class="icon-view-text-overflow">订票时间: '+ticketOperateTime+'</span>';
						/*	html += '                    <span class="icon-view-text-overflow">布控人员类型: '+personType+'</span>';*/
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
		   					JTIconTablePlug.OnSelect(this);
			   			});
		   				$(this).dblclick(function(){
		   					$(this).siblings().children().css("border","1px solid #E7EAEC");
		   			    	$(this).children().css("border","1px solid #0098CB");
		   			    	var id = $(this).attr('id');
		   			    	openTicketCompareDetail(encodeURI(encodeURI(id)));
			   			});
		   			})
		   			
		   			JTIconTablePlug.InitPagination(page,rows,data);
		   			JTIconTablePlug.OnMouseHover();
		   		}
		   	})
	    },
	    ReLoad: function(){
	    	JTIconTablePlug.OnLoad(1,PageSize,todayJson);
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
		    		html+='<li onclick="JTIconTablePlug.ChangePageSize('+PageList[i]+')"><a href="javascript:void(0)">'+PageList[i]+'</a></li>';
				}
		    	html+='	</ul>';
		    	html+='	</span> 条记录&nbsp;&nbsp;&nbsp;&nbsp;</span>';
		    	html+='</div>';
		    	html+='<div class="pull-right btn-group">';
		    	html+='    <button class="btn btn-white" type="button" onclick="JTIconTablePlug.OnLoad(1,'+PageSize+')">首页</button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="JTIconTablePlug.PrePage()"><i class="fa fa-chevron-left"></i></button>';
		    	for (var i = 0; i < indexBtn.length; i++) {
		    		if(indexBtn[i]==pageIndex){
		    			html+='<button class="btn btn-white active">'+indexBtn[i]+'</button>';
		    		}else{
		    			if(indexBtn[i]=='...'){
		    				html+='<button class="btn btn-white">'+indexBtn[i]+'</button>';
		    			}else{
		    				html+='<button class="btn btn-white" onclick="JTIconTablePlug.OnLoad('+indexBtn[i]+','+PageSize+')">'+indexBtn[i]+'</button>';
		    			}
		    		}
		    	}
		    	html+='    <button class="btn btn-white" type="button" onclick="JTIconTablePlug.NextPage('+totalPage+')"><i class="fa fa-chevron-right"></i></button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="JTIconTablePlug.OnLoad('+totalPage+','+PageSize+')">尾页</button>';
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
	    	this.OnLoad(PageIndex,PageSize,todayJson);
	    },
	    OnMouseHover:function(){
	    	$(document).find('.contact-box').each(function () {
	            animationHover(this, 'pulse');
	        });
	    },
	    PrePage:function(){
	    	var pageIndex = PageIndex-1;
	    	if(pageIndex<=1){
	    		if(PageIndex!=1) this.OnLoad(1,PageSize,todayJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,todayJson);
	    	}
	    },
	    NextPage:function(t){
	    	var pageIndex = PageIndex+1;
	    	if(pageIndex>=t){
	    		if(PageIndex!=t) this.OnLoad(t,PageSize,todayJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,todayJson);
	    	}
	    },
	    OnSelect: function(div) {
	    	$(div).siblings().removeAttr('select')
	    	$(div).attr('select','true');
	    	$(div).siblings().children().css("border","1px solid #E7EAEC");
	    	$(div).children().css("border","1px solid #0098CB");
		}
	}

var MTIconTablePlug = {
	    Initialize: function(params) {
	    	Parent = params.parent;
	    	Url = params.url;
	    	PageList = params.pageList;
	    	PageIndex = params.pageIndex;
	    	PageSize = params.pageSize;
	    	size = { width: $(window).width(), height: $(window).height() }
	    	if(size.width<width){
	    		width = size.width - 20;
	    	}
	    	this.OnLoad(PageIndex,PageSize,tomorrowJson);
	    },
	    OnLoad:function(page,rows){
	    	//console.log(FilterJson)
	    	PageIndex = page;
	    	pageSize = rows;
	    	$.ajax({
		   		url: ctx+'/arriveWarnController/warnDatagrid.do?flag='+JSON.stringify(flag),
		   		data:{page:page,rows:rows,filterJson:JSON.stringify(tomorrowJson),orgId:orgId},
		   		type:"post",
		   		dataType:"json",
		   		success:function(data){
		   			var list = data.rows;
		   			var html = '';
		   			if(list.length>0){
			   			for (var i = 0; i < list.length; i++) {
							var user = list[i];
							var warnPersonId=encodeURI(encodeURI(user.warnPersonId));
							var warnPersonName =user.warnPersonName==''?"----":user.warnPersonName;
							var cardType = user.cardType==''?"----":user.cardType;
							var cardNumber=user.cardNumber==''?"----":user.cardNumber;
							var userImg = '/zxgkWeb/arriveWarnController/getImage.do?cardNumber='+cardNumber;
							var flightNo =user.flightNo == ''?"----":user.flightNo;
							var flightDate = user.flightDate == ''?"----":user.flightDate;
							var flightTakeOffTime =user.flightTakeOffTime == ''?"----":user.flightTakeOffTime;
							var flightArrivalTime =user.flightArrivalTime==''?"----":user.flightArrivalTime;
							var takeOffAirportName =user.takeOffAirportName==''?"----":user.takeOffAirportName;
							var arrivalAirportName=user.arrivalAirportName==''?"----":user.arrivalAirportName;
							var warnCompareTime=user.warnCompareTime==''?"----":user.warnCompareTime;
							var personType=user.personType==''?"----":user.personType;
							var ticketOperateTime=user.ticketOperateTime==''?"----":user.ticketOperateTime;
							
							html += '<div class="col-sm-3" id="'+user.warnPersonId+'" cardNumber="'+user.cardNumber+'">';
							html += '    <div class="contact-box" id="icon-item">';
							html += '        <a href="javascript:void(0);" >';
							html += '            <div class="col-sm-4">';
							html += '                <div class="text-center">';
							html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="'+userImg+'"/>';
							html += '                    <div class="m-t-xs font-bold">'+user.warnPersonName+'</div>';
							html += '                </div>';
							html += '            </div>';
							html += '            <div class="col-sm-8">';
							html += '                    <span class="icon-view-text-overflow">证件号码：'+cardNumber+'</span>';
							html += '                    <span class="icon-view-text-overflow">证件类型：'+cardMap[cardType]+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班号 : '+flightNo+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班日期: '+birthdayFormatF(flightDate)+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划起飞时间: '+flightTakeOffTime+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划到达时间: '+flightArrivalTime+'</span>';
							/*html += '                    <span class="icon-view-text-overflow"><span>起飞机场名称: '+takeOffAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">到达机场名称: '+arrivalAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">比中时间: '+warnCompareTime+'</span>';*/
							html += '                    <span class="icon-view-text-overflow">订票时间: '+ticketOperateTime+'</span>';
						/*	html += '                    <span class="icon-view-text-overflow">布控人员类型: '+personType+'</span>';*/
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
		   					MTIconTablePlug.OnSelect(this);
			   			});
		   				$(this).dblclick(function(){
		   					$(this).siblings().children().css("border","1px solid #E7EAEC");
		   			    	$(this).children().css("border","1px solid #0098CB");
		   			    	var id = $(this).attr('id');
		   			    	openTicketCompareDetail(encodeURI(encodeURI(id)));
			   			});
		   			})
		   			
		   			MTIconTablePlug.InitPagination(page,rows,data);
		   			MTIconTablePlug.OnMouseHover();
		   		}
		   	})
	    },
	    ReLoad: function(){
	    	MTIconTablePlug.OnLoad(1,PageSize,tomorrowJson);
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
		    		html+='<li onclick="MTIconTablePlug.ChangePageSize('+PageList[i]+')"><a href="javascript:void(0)">'+PageList[i]+'</a></li>';
				}
		    	html+='	</ul>';
		    	html+='	</span> 条记录&nbsp;&nbsp;&nbsp;&nbsp;</span>';
		    	html+='</div>';
		    	html+='<div class="pull-right btn-group">';
		    	html+='    <button class="btn btn-white" type="button" onclick="MTIconTablePlug.OnLoad(1,'+PageSize+')">首页</button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="MTIconTablePlug.PrePage()"><i class="fa fa-chevron-left"></i></button>';
		    	for (var i = 0; i < indexBtn.length; i++) {
		    		if(indexBtn[i]==pageIndex){
		    			html+='<button class="btn btn-white active">'+indexBtn[i]+'</button>';
		    		}else{
		    			if(indexBtn[i]=='...'){
		    				html+='<button class="btn btn-white">'+indexBtn[i]+'</button>';
		    			}else{
		    				html+='<button class="btn btn-white" onclick="MTIconTablePlug.OnLoad('+indexBtn[i]+','+PageSize+')">'+indexBtn[i]+'</button>';
		    			}
		    		}
		    	}
		    	html+='    <button class="btn btn-white" type="button" onclick="MTIconTablePlug.NextPage('+totalPage+')"><i class="fa fa-chevron-right"></i></button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="MTIconTablePlug.OnLoad('+totalPage+','+PageSize+')">尾页</button>';
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
	    	this.OnLoad(PageIndex,PageSize,tomorrowJson);
	    },
	    OnMouseHover:function(){
	    	$(document).find('.contact-box').each(function () {
	            animationHover(this, 'pulse');
	        });
	    },
	    PrePage:function(){
	    	var pageIndex = PageIndex-1;
	    	if(pageIndex<=1){
	    		if(PageIndex!=1) this.OnLoad(1,PageSize,tomorrowJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,tomorrowJson);
	    	}
	    },
	    NextPage:function(t){
	    	var pageIndex = PageIndex+1;
	    	if(pageIndex>=t){
	    		if(PageIndex!=t) this.OnLoad(t,PageSize,tomorrowJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,tomorrowJson);
	    	}
	    },
	    OnSelect: function(div) {
	    	$(div).siblings().removeAttr('select')
	    	$(div).attr('select','true');
	    	$(div).siblings().children().css("border","1px solid #E7EAEC");
	    	$(div).children().css("border","1px solid #0098CB");
		}
	}

var HTIconTablePlug = {
	    Initialize: function(params) {
	    	Parent = params.parent;
	    	Url = params.url;
	    	PageList = params.pageList;
	    	PageIndex = params.pageIndex;
	    	PageSize = params.pageSize;
	    	size = { width: $(window).width(), height: $(window).height() }
	    	if(size.width<width){
	    		width = size.width - 20;
	    	}
	    	this.OnLoad(PageIndex,PageSize,afterTomorrowJson);
	    },
	    OnLoad:function(page,rows){
	    	//console.log(FilterJson)
	    	PageIndex = page;
	    	pageSize = rows;
	    	$.ajax({
		   		url: ctx+'/arriveWarnController/warnDatagrid.do?flag='+JSON.stringify(flag),
		   		data:{page:page,rows:rows,filterJson:JSON.stringify(afterTomorrowJson),orgId:orgId},
		   		type:"post",
		   		dataType:"json",
		   		success:function(data){
		   			var list = data.rows;
		   			var html = '';
		   			if(list.length>0){
			   			for (var i = 0; i < list.length; i++) {
							var user = list[i];
							var warnPersonId=encodeURI(encodeURI(user.warnPersonId));
							var warnPersonName =user.warnPersonName==''?"----":user.warnPersonName;
							var cardType = user.cardType==''?"----":user.cardType;
							var cardNumber=user.cardNumber==''?"----":user.cardNumber;
							var userImg = '/zxgkWeb/arriveWarnController/getImage.do?cardNumber='+cardNumber;
							var flightNo =user.flightNo == ''?"----":user.flightNo;
							var flightDate = user.flightDate == ''?"----":user.flightDate;
							var flightTakeOffTime =user.flightTakeOffTime == ''?"----":user.flightTakeOffTime;
							var flightArrivalTime =user.flightArrivalTime==''?"----":user.flightArrivalTime;
							var takeOffAirportName =user.takeOffAirportName==''?"----":user.takeOffAirportName;
							var arrivalAirportName=user.arrivalAirportName==''?"----":user.arrivalAirportName;
							var warnCompareTime=user.warnCompareTime==''?"----":user.warnCompareTime;
							var personType=user.personType==''?"----":user.personType;
							var ticketOperateTime=user.ticketOperateTime==''?"----":user.ticketOperateTime;
							
							html += '<div class="col-sm-3" id="'+user.warnPersonId+'" cardNumber="'+user.cardNumber+'">';
							html += '    <div class="contact-box" id="icon-item">';
							html += '        <a href="javascript:void(0);" >';
							html += '            <div class="col-sm-4">';
							html += '                <div class="text-center">';
							html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="'+userImg+'"/>';
							html += '                    <div class="m-t-xs font-bold">'+user.warnPersonName+'</div>';
							html += '                </div>';
							html += '            </div>';
							html += '            <div class="col-sm-8">';
							html += '                    <span class="icon-view-text-overflow">证件号码：'+cardNumber+'</span>';
							html += '                    <span class="icon-view-text-overflow">证件类型：'+cardMap[cardType]+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班号 : '+flightNo+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班日期: '+birthdayFormatF(flightDate)+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划起飞时间: '+flightTakeOffTime+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划到达时间: '+flightArrivalTime+'</span>';
							/*html += '                    <span class="icon-view-text-overflow"><span>起飞机场名称: '+takeOffAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">到达机场名称: '+arrivalAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">比中时间: '+warnCompareTime+'</span>';*/
							html += '                    <span class="icon-view-text-overflow">订票时间: '+ticketOperateTime+'</span>';
						/*	html += '                    <span class="icon-view-text-overflow">布控人员类型: '+personType+'</span>';*/
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
		   					HTIconTablePlug.OnSelect(this);
			   			});
		   				$(this).dblclick(function(){
		   					$(this).siblings().children().css("border","1px solid #E7EAEC");
		   			    	$(this).children().css("border","1px solid #0098CB");
		   			    	var id = $(this).attr('id');
		   			    	openTicketCompareDetail(encodeURI(encodeURI(id)));
			   			});
		   			})
		   			
		   			HTIconTablePlug.InitPagination(page,rows,data);
		   			HTIconTablePlug.OnMouseHover();
		   		}
		   	})
	    },
	    ReLoad: function(){
	    	HTIconTablePlug.OnLoad(1,PageSize,afterTomorrowJson);
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
		    		html+='<li onclick="HTIconTablePlug.ChangePageSize('+PageList[i]+')"><a href="javascript:void(0)">'+PageList[i]+'</a></li>';
				}
		    	html+='	</ul>';
		    	html+='	</span> 条记录&nbsp;&nbsp;&nbsp;&nbsp;</span>';
		    	html+='</div>';
		    	html+='<div class="pull-right btn-group">';
		    	html+='    <button class="btn btn-white" type="button" onclick="HTIconTablePlug.OnLoad(1,'+PageSize+')">首页</button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="HTIconTablePlug.PrePage()"><i class="fa fa-chevron-left"></i></button>';
		    	for (var i = 0; i < indexBtn.length; i++) {
		    		if(indexBtn[i]==pageIndex){
		    			html+='<button class="btn btn-white active">'+indexBtn[i]+'</button>';
		    		}else{
		    			if(indexBtn[i]=='...'){
		    				html+='<button class="btn btn-white">'+indexBtn[i]+'</button>';
		    			}else{
		    				html+='<button class="btn btn-white" onclick="HTIconTablePlug.OnLoad('+indexBtn[i]+','+PageSize+')">'+indexBtn[i]+'</button>';
		    			}
		    		}
		    	}
		    	html+='    <button class="btn btn-white" type="button" onclick="HTIconTablePlug.NextPage('+totalPage+')"><i class="fa fa-chevron-right"></i></button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="HTIconTablePlug.OnLoad('+totalPage+','+PageSize+')">尾页</button>';
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
	    	this.OnLoad(PageIndex,PageSize,afterTomorrowJson);
	    },
	    OnMouseHover:function(){
	    	$(document).find('.contact-box').each(function () {
	            animationHover(this, 'pulse');
	        });
	    },
	    PrePage:function(){
	    	var pageIndex = PageIndex-1;
	    	if(pageIndex<=1){
	    		if(PageIndex!=1) this.OnLoad(1,PageSize,afterTomorrowJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,afterTomorrowJson);
	    	}
	    },
	    NextPage:function(t){
	    	var pageIndex = PageIndex+1;
	    	if(pageIndex>=t){
	    		if(PageIndex!=t) this.OnLoad(t,PageSize,afterTomorrowJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,afterTomorrowJson);
	    	}
	    },
	    OnSelect: function(div) {
	    	$(div).siblings().removeAttr('select')
	    	$(div).attr('select','true');
	    	$(div).siblings().children().css("border","1px solid #E7EAEC");
	    	$(div).children().css("border","1px solid #0098CB");
		}
	}

var QBIconTablePlug = {
	    Initialize: function(params) {
	    	Parent = params.parent;
	    	Url = params.url;
	    	PageList = params.pageList;
	    	PageIndex = params.pageIndex;
	    	PageSize = params.pageSize;
	    	size = { width: $(window).width(), height: $(window).height() }
	    	if(size.width<width){
	    		width = size.width - 20;
	    	}
	    	this.OnLoad(PageIndex,PageSize,allJson);
	    },
	    OnLoad:function(page,rows){
	    	//console.log(FilterJson)
	    	PageIndex = page;
	    	pageSize = rows;
	    	$.ajax({
		   		url: ctx+'/arriveWarnController/warnDatagrid.do?flag='+JSON.stringify(flag),
		   		data:{page:page,rows:rows,filterJson:JSON.stringify(allJson),orgId:orgId},
		   		type:"post",
		   		dataType:"json",
		   		success:function(data){
		   			var list = data.rows;
		   			var html = '';
		   			if(list.length>0){
			   			for (var i = 0; i < list.length; i++) {
							var user = list[i];
							var warnPersonId=encodeURI(encodeURI(user.warnPersonId));
							var warnPersonName =user.warnPersonName==''?"----":user.warnPersonName;
							var cardType = user.cardType==''?"----":user.cardType;
							var cardNumber=user.cardNumber==''?"----":user.cardNumber;
							var userImg = '/zxgkWeb/arriveWarnController/getImage.do?cardNumber='+cardNumber;
							var flightNo =user.flightNo == ''?"----":user.flightNo;
							var flightDate = user.flightDate == ''?"----":user.flightDate;
							var flightTakeOffTime =user.flightTakeOffTime == ''?"----":user.flightTakeOffTime;
							var flightArrivalTime =user.flightArrivalTime==''?"----":user.flightArrivalTime;
							var takeOffAirportName =user.takeOffAirportName==''?"----":user.takeOffAirportName;
							var arrivalAirportName=user.arrivalAirportName==''?"----":user.arrivalAirportName;
							var warnCompareTime=user.warnCompareTime==''?"----":user.warnCompareTime;
							var personType=user.personType==''?"----":user.personType;
							var ticketOperateTime=user.ticketOperateTime==''?"----":user.ticketOperateTime;
							
							html += '<div class="col-sm-3" id="'+user.warnPersonId+'" cardNumber="'+user.cardNumber+'">';
							html += '    <div class="contact-box" id="icon-item">';
							html += '        <a href="javascript:void(0);" >';
							html += '            <div class="col-sm-4">';
							html += '                <div class="text-center">';
						/*	html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="../photo/file/no_head.jpg"/>';*/
							html += '                    <img alt="image" class="img-circle m-t-xs img-responsive" src="'+userImg+'"/>';
							html += '                    <div class="m-t-xs font-bold">'+user.warnPersonName+'</div>';
							html += '                </div>';
							html += '            </div>';
							html += '            <div class="col-sm-8">';
							html += '                    <span class="icon-view-text-overflow">证件号码：'+cardNumber+'</span>';
							html += '                    <span class="icon-view-text-overflow">证件类型：'+cardMap[cardType]+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班号 : '+flightNo+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>航班日期: '+birthdayFormatF(flightDate)+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划起飞时间: '+flightTakeOffTime+'</span>';
							html += '                    <span class="icon-view-text-overflow"><span>计划到达时间: '+flightArrivalTime+'</span>';
							/*html += '                    <span class="icon-view-text-overflow"><span>起飞机场名称: '+takeOffAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">到达机场名称: '+arrivalAirportName+'</span>';
							html += '                    <span class="icon-view-text-overflow">比中时间: '+warnCompareTime+'</span>';*/
							html += '                    <span class="icon-view-text-overflow">订票时间: '+ticketOperateTime+'</span>';
						/*	html += '                    <span class="icon-view-text-overflow">布控人员类型: '+personType+'</span>';*/
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
		   					QBIconTablePlug.OnSelect(this);
			   			});
		   				$(this).dblclick(function(){
		   					$(this).siblings().children().css("border","1px solid #E7EAEC");
		   			    	$(this).children().css("border","1px solid #0098CB");
		   			    	var id = $(this).attr('id');
		   			    	openTicketCompareDetail(encodeURI(encodeURI(id)));
			   			});
		   			})
		   			
		   			QBIconTablePlug.InitPagination(page,rows,data);
		   			QBIconTablePlug.OnMouseHover();
		   		}
		   	})
	    },
	    ReLoad: function(){
	    	QBIconTablePlug.OnLoad(1,PageSize,allJson);
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
		    		html+='<li onclick="QBIconTablePlug.ChangePageSize('+PageList[i]+')"><a href="javascript:void(0)">'+PageList[i]+'</a></li>';
				}
		    	html+='	</ul>';
		    	html+='	</span> 条记录&nbsp;&nbsp;&nbsp;&nbsp;</span>';
		    	html+='</div>';
		    	html+='<div class="pull-right btn-group">';
		    	html+='    <button class="btn btn-white" type="button" onclick="QBIconTablePlug.OnLoad(1,'+PageSize+')">首页</button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="QBIconTablePlug.PrePage()"><i class="fa fa-chevron-left"></i></button>';
		    	for (var i = 0; i < indexBtn.length; i++) {
		    		if(indexBtn[i]==pageIndex){
		    			html+='<button class="btn btn-white active">'+indexBtn[i]+'</button>';
		    		}else{
		    			if(indexBtn[i]=='...'){
		    				html+='<button class="btn btn-white">'+indexBtn[i]+'</button>';
		    			}else{
		    				html+='<button class="btn btn-white" onclick="QBIconTablePlug.OnLoad('+indexBtn[i]+','+PageSize+')">'+indexBtn[i]+'</button>';
		    			}
		    		}
		    	}
		    	html+='    <button class="btn btn-white" type="button" onclick="QBIconTablePlug.NextPage('+totalPage+')"><i class="fa fa-chevron-right"></i></button>';
		    	html+='    <button class="btn btn-white" type="button" onclick="QBIconTablePlug.OnLoad('+totalPage+','+PageSize+')">尾页</button>';
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
	    	this.OnLoad(PageIndex,PageSize,allJson);
	    },
	    OnMouseHover:function(){
	    	$(document).find('.contact-box').each(function () {
	            animationHover(this, 'pulse');
	        });
	    },
	    PrePage:function(){
	    	var pageIndex = PageIndex-1;
	    	if(pageIndex<=1){
	    		if(PageIndex!=1) this.OnLoad(1,PageSize,allJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,allJson);
	    	}
	    },
	    NextPage:function(t){
	    	var pageIndex = PageIndex+1;
	    	if(pageIndex>=t){
	    		if(PageIndex!=t) this.OnLoad(t,PageSize,allJson);
	    	}else{
	    		this.OnLoad(pageIndex,PageSize,allJson);
	    	}
	    },
	    OnSelect: function(div) {
	    	$(div).siblings().removeAttr('select')
	    	$(div).attr('select','true');
	    	$(div).siblings().children().css("border","1px solid #E7EAEC");
	    	$(div).children().css("border","1px solid #0098CB");
		}
	}
