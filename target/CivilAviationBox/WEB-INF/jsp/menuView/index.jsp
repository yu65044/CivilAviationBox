<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0" />
<meta name="renderer" content="webkit" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta charset="UTF-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<link rel="stylesheet" href="../css/demo-styles.css" />
<link href="../static/fullcalendar/css/fullcalendar.css" rel="stylesheet">
<link href="../static/fullcalendar/css/fullcalendar.print.css" rel="stylesheet">
<link rel="../stylesheet" href="src/images-grid.css">

<link rel="stylesheet" type="text/css" href="../static/alertframe/skin/qq/ymPrompt.css">
<script type="text/javascript" src="../static/alertframe/ymPrompt.js"></script>
<!-- 全局js -->
<script src="../static/fullcalendar/js/jquery.min.js?v=2.1.4"></script>

<title>民航盒子</title>
<c:if test="${count>=0 && count<=7}">
<style type="text/css">
body{
	background-size:100%;
	-webkit-background-size:100%;
	background:url(../photo/bg.jpg)no-repeat;
	overflow-x: hidden;
	overflow-y: hidden;
}

		* {margin: 0; padding: 0;}
		body { font: 90%/160% "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans UTF-8","Heiti SC","WenQuanYi Micro Hei",sans-serif;}
		h1 {font-size: 2em; color: #fff;}
		.container {width: 90%; margin-left:  auto; margin-right: auto;}
		.container .left-block {float: left; width: auto; height: 180px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
		
		@media all and (min-width: 2001px) {
			.container .left-block {float: left; width: auto; height: 330px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
			#mhBox{position: fixed;left:-2050px;right:0;margin:0 auto;top:10%;}
			.container {position: absolute;left:-36%;right:0;top:0;bottom:0;width: 1330px;height: 1045px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-52.5%;top:0;bottom:0;width: 910px;height:1024px;margin:auto;}
			.left-block {float: left; width: 330px; height: 330px; margin: 3% 0 0 1%; border-radius: 0; }
		
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:8px !important;right:20px !important;}
			</c:forEach>
			
			.name{font-size: 30px;}
			
			/* .color-one img{width: 480px;_width:expression(this.width<480?"480":this.width);height: 330px;min-height: 330px;}
			.color-two img{width: 370px;_width:expression(this.width<370?"370px":this.width);height: 330px;min-height: 330px;}
			.color-three img{width: 430px;_width:expression(this.width<430?"430px":this.width);height: 330px;min-height: 330px;}
			.color-four img{width: 863px;_width:expression(this.width<863?"863px":this.width);height: 330px;min-height: 330px;}
			.color-five img{width: 430px;_width:expression(this.width<430?"430px":this.width);height: 330px;min-height: 330px;}
			.color-six img{width: 310px;_width:expression(this.width<310?"310px":this.width);height: 330px;min-height: 330px;}
			.color-seven img{width: 540px;_width:expression(this.width<540?"540px":this.width);height: 330px;min-height: 330px;} */
			.color-more img{width: 430px;_width:expression(this.width<430?"430px":this.width);height: 330px;min-height: 330px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{width: 480px;_width:expression(this.width<480?"480":this.width);height: 330px;min-height: 330px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{width: 370px;_width:expression(this.width<370?"370px":this.width);height: 330px;min-height: 330px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{width: 430px;_width:expression(this.width<430?"430px":this.width);height: 330px;min-height: 330px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{width: 863px;_width:expression(this.width<863?"863px":this.width);height: 330px;min-height: 330px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{width: 430px;_width:expression(this.width<430?"430px":this.width);height: 330px;min-height: 330px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{width: 310px;_width:expression(this.width<310?"310px":this.width);height: 330px;min-height: 330px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 540px;_width:expression(this.width<540?"540px":this.width);height: 330px;min-height: 330px;}
				</c:if>
				
			</c:forEach>
			
			.fc-border-separate tbody tr.fc-week {height:151px;}
			.fc-border-separate tbody tr.fc-week td{height:151px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:151px;}
			
		}
		@media all and (min-width: 1881px) and (max-width: 2000px){
			/* #mhBox{position: fixed;left:-72%;right:0;margin:0 auto;top:7%;}
			.container {position: absolute;left:-30%;right:0;top:0;bottom:0;width: 52%;height: 68.5%;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-52%;top:0;bottom:0;width: 30%;height:67%;margin:auto;} */
			#mhBox{position: fixed;left:-1330px;right:0;margin:0 auto;top:7%;}
			/* #mhBox{position:fixed;top:16%;left:-1250px;right:0;margin:0 auto;} */
			.container {position: absolute;left:-28%;right:0;top:0;bottom:0;width: 990px;height: 670px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-51%;top:0;bottom:0;width: 510px;height:656px;margin:auto;}
			.left-block {float: left; min-width: 210px; min-height: 210px; margin: 3% 0 0 1%; border-radius: 0; }
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:8px !important;right:20px !important;}
			</c:forEach>
			
			.name{font-size: 19px;}
			
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{width: 350px;_width:expression(this.width<350?"350":this.width);height: 210px;min-height: 210px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{width: 270px;_width:expression(this.width<270?"270px":this.width);height: 210px;min-height: 210px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{width: 330px;_width:expression(this.width<330?"330px":this.width);height: 210px;min-height: 210px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{width: 630px;_width:expression(this.width<630?"630px":this.width);height: 210px;min-height: 210px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{width: 330px;_width:expression(this.width<330?"330px":this.width);height: 210px;min-height: 210px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{width: 210px;_width:expression(this.width<210?"210px":this.width);height: 210px;min-height: 210px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 410px;_width:expression(this.width<410?"410px":this.width);height: 210px;min-height: 210px;}
				</c:if>
				
			</c:forEach>
			/* .color-one img{width: 350px;_width:expression(this.width<350?"350":this.width);height: 210px;min-height: 210px;}
			.color-two img{width: 270px;_width:expression(this.width<270?"270px":this.width);height: 210px;min-height: 210px;}
			.color-three img{width: 330px;_width:expression(this.width<330?"330px":this.width);height: 210px;min-height: 210px;}
			.color-four img{width: 630px;_width:expression(this.width<630?"630px":this.width);height: 210px;min-height: 210px;}
			.color-five img{width: 330px;_width:expression(this.width<330?"330px":this.width);height: 210px;min-height: 210px;}
			.color-six img{width: 210px;_width:expression(this.width<210?"210px":this.width);height: 210px;min-height: 210px;}
			.color-seven img{width: 410px;_width:expression(this.width<410?"410px":this.width);height: 210px;min-height: 210px;} */
			.color-more img{width: 330px;_width:expression(this.width<330?"330px":this.width);height: 210px;min-height: 210px;}
		
			.fc-border-separate tbody tr.fc-week {height:89.5px;}
			.fc-border-separate tbody tr.fc-week td{height:89.5px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:89.5px;}
		}
		@media all and (min-width: 1574px) and (max-width: 1880px) {
			/* .container {max-width: 910px;height: 570px;position: absoult;top:21%;left: 50%;-webkit-transform:transform(-50%,-50%);-moz-transform:transform(-50%,-50%);-ms-transform:transform(-50%,-50%);-o-transform:transform(-50%,-50%);transform:transform(-50%,-50%);} */
			.left-block {float: left; width: 180px; height: 180px; margin: 3% 0 0 1%; border-radius: 5px;}
			 .container {position: absolute;left:-32.3%;right:0;top:0;bottom:0;width: 910px;height: 570px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-56.8%;top:0;bottom:0;width: 510px;height:555px;margin:auto;}
			 #mhBox{position: fixed;left:-1230px;right:0;margin:0 auto;top:5%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:8px !important;right:20px !important;}
			</c:forEach>
			
			.name{font-size: 18px;}
			
			.fc-border-separate tbody tr.fc-week {height:74.2px;}
			.fc-border-separate tbody tr.fc-week td{height:74.2px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:74.2px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{width: 330px;_width:expression(this.width<330?"330":this.width);height: 180px;min-height: 180px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{width: 240px;_width:expression(this.width<240?"240px":this.width);height: 180px;min-height: 180px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{width: 300px;_width:expression(this.width<300?"300px":this.width);height: 180px;min-height: 180px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{width: 579px;_width:expression(this.width<579?"579px":this.width);height: 180px;min-height: 180px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{width: 300px;_width:expression(this.width<300?"300px":this.width);height: 180px;min-height: 180px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{width: 180px;_width:expression(this.width<210?"390px":this.width);height: 180px;min-height: 180px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 390px;_width:expression(this.width<390?"390px":this.width);height: 180px;min-height: 180px;}
				</c:if>
				
			</c:forEach>
			.color-more img{width: 300px;_width:expression(this.width<300?"300px":this.width);height: 180px;min-height: 180px;}
		}
			@media all and (min-width: 1358px) and (max-width: 1574px) {
			.container {position: absolute;left:-34.7%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 150px; max-height: 150px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-34.7%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:210px;top:6%;}
			/* #menuBox{position: absolute;left:-30%;right:0;top:0;bottom:0;width: 560px;height: 391px;margin:auto;} */
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 304.5px;_width:expression(this.width<304.5?"304.5px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				
			</c:forEach>
			/* .color-one img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-two img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-three img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-four img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-five img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-six img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-seven img{max-width: 304px;_width:expression(this.width<304?"304px":this.width);height: 150px;min-height: 150px;} */
			.color-more img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			.name{font-size: 15px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:10px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1274px) and (max-width: 1358px) {
			.container {position: absolute;left:-37.2%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 150px; max-height: 150px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-36.2%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:165px;top:6%;}
			/* #menuBox{position: absolute;left:-30%;right:0;top:0;bottom:0;width: 560px;height: 391px;margin:auto;} */
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 304.5px;_width:expression(this.width<304.5?"304.5px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				
			</c:forEach>
			/* .color-one img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-two img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-three img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-four img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-five img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-six img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-seven img{max-width: 304px;_width:expression(this.width<304?"304px":this.width);height: 150px;min-height: 150px;} */
			.color-more img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			.name{font-size: 15px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:10px !important;}
			</c:forEach>
		}
		/* @media all and (max-width: 768px) {
			.container .left-block {float: left; width: 180px; height: 180px; margin: 2% 0 0 1%; border-radius: 5px; }
			#calendarBox{display: none;}
			#mhBox{position: fixed;left:-300px;right:0;margin:0 auto;top:15%;}
			#menuBox{position: fixed;left:0;right:0;top:21%;width: 730px;height: 585px;margin:0 auto;}
			.color-two img{max-width: 180px;_width:expression(this.width>180?"180px":this.width);height: 180px;min-height: 180px;}
			.color-three img{max-width: 180px;_width:expression(this.width>180?"180px":this.width);height: 180px;min-height: 180px;}
			.color-five img{max-width: 180px;_width:expression(this.width>180?"180px":this.width);height: 180px;min-height: 180px;}
			.color-more img{max-width: 180px;_width:expression(this.width>180?"180px":this.width);height: 180px;min-height: 180px;}
		} */
		 @media all and (min-width: 1024px) and (max-width: 1274px){
			.container {position: absolute;left:-46%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 150px; max-height: 150px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-46%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:42px;top:6%;}
			/* #menuBox{position: absolute;left:-30%;right:0;top:0;bottom:0;width: 560px;height: 391px;margin:auto;} */
			/* .color-one img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-two img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-three img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-four img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-five img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-six img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			.color-seven img{max-width: 305.1px;_width:expression(this.width<305.1?"305.1px":this.width);height: 150px;min-height: 150px;} */
			.color-more img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{max-width: 150px;_width:expression(this.width>150?"150px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 304.5px;_width:expression(this.width<304.5?"304.5px":this.width);height: 150px;min-height: 150px;}
				</c:if>
				
			</c:forEach>
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			.name{font-size: 13px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:10px !important;}
			</c:forEach>
			
		} 
	 	 @media all and (max-width: 1023px) {
			
			#mhBox{position: fixed;left:-470px;right:0;margin:0 auto;top:5%;}
			/* #mhBox{position:fixed;top:16%;left:-1250px;right:0;margin:0 auto;} */
			.container {position: absolute;left:-43.5%;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-40%;top:0;bottom:0;width: 315px;height:310px;margin:auto;}
			.left-block {float: left; width: 100px; max-height: 100px; margin: 3% 0 0 1%; border-radius: 0; }
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
			
			/* .color-one img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-two img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-three img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-four img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-five img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-six img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-seven img{width: 203px;_width:expression(this.width>203?"203px":this.width);height: 100px;max-height: 100px;} */
			.color-more img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
		
		<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 203px;_width:expression(this.width>203?"203px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				
			</c:forEach>
		
			.name{font-size: 10px;}
		
			.fc-border-separate tbody tr.fc-week {height:32.2px;}
			.fc-border-separate tbody tr.fc-week td{height:32.2px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:32.2px;}
		} 
		@media all and (max-width: 767px){
			#mhBox{position: fixed;left:0;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:0;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{display: none}
			.left-block {float: left; width: 100px; max-height: 100px; margin: 3% 0 0 1%; border-radius: 0; }
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
			
			.name{font-size: 10px;}
			
			/* .color-one img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-two img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-three img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-four img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-five img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-six img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
			.color-seven img{width: 203px;_width:expression(this.width>203?"203px":this.width);height: 100px;max-height: 100px;} */
			.color-more img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
		
		<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="6">
				<c:if test="${_status.index==0}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==1}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==2}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==3}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==4}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==5}">
					.color-${menuView.menuNumber } img{width: 100px;_width:expression(this.width>100?"100px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				<c:if test="${_status.index==6}">
					.color-${menuView.menuNumber } img{width: 203px;_width:expression(this.width>203?"203px":this.width);height: 100px;max-height: 100px;}
				</c:if>
				
			</c:forEach>
			
		} 
		/* @media all and (min-width: 240px) {
		    .container .left-block {float: left; width: 160px; height: 140px; margin: 3% 0 0 1%; border-radius: 5px; }
			#calendarBox{display: none;}
		}  */
</style>
</c:if>

<c:if test="${count>7 && count<=23}">
<style type="text/css">
	body{
	background-image:url(../photo/bg.jpg);
	background-size:100%;
	-webkit-background-size:100%;
	backgroung-repeat:no-repeat;
	overflow-x: hidden;
	overflow-y: hidden;
}
		* {margin: 0; padding: 0;}
		body { font: 90%/160% "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans UTF-8","Heiti SC","WenQuanYi Micro Hei",sans-serif;}
		h1 {font-size: 2em; color: #fff;}
		.container {width: 90%; margin-left:  auto; margin-right: auto;}
		.container .left-block {float: left; width: auto; height: 155px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
		
		@media all and (min-width: 2001px) {
			.container .left-block {float: left; width: auto; height: 242.5px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
			#mhBox{position: fixed;left:-2050px;right:0;margin:0 auto;top:10%;}
			.container {position: absolute;left:-32%;right:0;top:0;bottom:0;width: 1440px;height: 1045px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-55%;top:0;bottom:0;width: 800px;height:1024px;margin:auto;}
			.left-block {float: left; width: 222px; height: 242.5px; margin: 3% 0 0 1%; border-radius: 0; }
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 222px;_width:expression(this.width>222?"222px":this.width);height: 242.5px;min-height: 242.5px;}
			</c:forEach>
			.color-more img{max-width: 222px;_width:expression(this.width>222?"222px":this.width);height: 242.5px;min-height: 242.5px;}
			
			.name{font-size: 18px;}
			.fc-border-separate tbody tr.fc-week {height:151px;}
			.fc-border-separate tbody tr.fc-week td{height:151px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:151px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:10px !important;right:25px !important;}
			</c:forEach>
			
		}
		@media all and (min-width: 1881px) and (max-width: 2000px){
			#mhBox{position: fixed;left:-1330px;right:0;margin:0 auto;top:7%;}
			.container {position: absolute;left:-28%;right:0;top:0;bottom:0;width: 990px;height: 670px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-51%;top:0;bottom:0;width: 510px;height:658px;margin:auto;}
			.left-block {float: left; width: 154px; max-height: 155px; margin: 3% 0 0 1%; border-radius: 5px;}
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 154px;_width:expression(this.width>154?"154px":this.width);height: 155px;min-height: 155px;}
			</c:forEach>
			.color-more img{max-width: 154px;_width:expression(this.width>154?"154px":this.width);height: 155px;min-height: 155px;}
			
			.name{font-size: 15px;}
			.fc-border-separate tbody tr.fc-week {height:89.5px;}
			.fc-border-separate tbody tr.fc-week td{height:89.5px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:89.5px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:10px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1574px) and (max-width: 1880px) {
			.container .left-block {float: left; width: auto; height: 132px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
			 #mhBox{position: fixed;left:-1170px;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:-32.3%;right:0;top:0;bottom:0;width: 850px;height: 570px;margin:auto;}
			.left-block {float: left; width: 132px; height: 132px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-53.8%;top:0;bottom:0;width: 510px;height:560px;margin:auto;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 132px;_width:expression(this.width>132?"132px":this.width);height: 132px;min-height: 132px;}
			</c:forEach>
			
			.name{font-size: 13px;}
			.color-more img{max-width: 132px;_width:expression(this.width>132?"132px":this.width);height: 132px;min-height: 132px;}
			
			.fc-border-separate tbody tr.fc-week {height:74px;}
			.fc-border-separate tbody tr.fc-week td{height:74px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:74px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1358px) and (max-width: 1574px) {
			.container {position: absolute;left:-35.2%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 88px; max-height: 88px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-34.2%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:205px;top:6%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 88px;_width:expression(this.width>88?"88px":this.width);height: 88px;min-height: 88px;}
			</c:forEach>
			
			.name{font-size: 10px;}
			.color-more img{max-width: 88px;_width:expression(this.width>88?"88px":this.width);height: 88px;min-height: 88px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1274px) and (max-width: 1358px) {
			.container {position: absolute;left:-37.2%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 88px; max-height: 88px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-36.2%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:165px;top:6%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 88px;_width:expression(this.width>88?"88px":this.width);height: 88px;min-height: 88px;}
			</c:forEach>
			
			.name{font-size: 10px;}
			.color-more img{max-width: 88px;_width:expression(this.width>88?"88px":this.width);height: 88px;min-height: 88px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
		}
		 @media all and (min-width: 1024px) and (max-width: 1274px){
			.container {position: absolute;left:-46%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 88px; max-height: 88px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-46%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:38px;top:3%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 88px;_width:expression(this.width>88?"88px":this.width);height: 88px;min-height: 88px;}
			</c:forEach>
			
			.name{font-size: 10px;}
			.color-more img{max-width: 88px;_width:expression(this.width>88?"88px":this.width);height: 88px;min-height: 88px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
			
		} 
	 	 @media all and (max-width: 1023px) {
			#mhBox{position: fixed;left:-470px;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:-43.5%;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-40%;top:0;bottom:0;width: 315px;height:310px;margin:auto;}
			.left-block {float: left; width: 58px; max-height: 58px; margin: 3% 0 0 1%; border-radius: 0; }
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 58px;_width:expression(this.width>58?"58px":this.width);height: 58px;min-height: 58px;}
			</c:forEach>
			
			.name{font-size: 4px;}
			.color-more img{max-width: 58px;_width:expression(this.width>58?"58px":this.width);height: 58px;min-height: 58px;}
		
			.fc-border-separate tbody tr.fc-week {height:32.2px;}
			.fc-border-separate tbody tr.fc-week td{height:32.2px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:32.2px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
		} 
		@media all and (max-width: 767px){
			#mhBox{position: fixed;left:0;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:0;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{display: none}
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.color-${menuView.menuNumber } img{max-width: 58px;_width:expression(this.width>58?"58px":this.width);height: 58px;min-height: 58px;}
			</c:forEach>
			
			.name{font-size: 3px;}
			.color-more img{max-width: 58px;_width:expression(this.width>58?"58px":this.width);height: 58px;min-height: 58px;}
		
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
			
		} 
</style>
</c:if>

<c:if test="${count>23 && count<=95}">
<style type="text/css">
	body{
	background-image:url(../photo/bg.jpg);
	background-size:100%;
	-webkit-background-size:100%;
	backgroung-repeat:no-repeat;
	overflow-x: hidden;
	overflow-y: hidden;
}


		* {margin: 0; padding: 0;}
		body { font: 90%/160% "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans UTF-8","Heiti SC","WenQuanYi Micro Hei",sans-serif;}
		h1 {font-size: 2em; color: #fff;}
		.container {width: 90%; margin-left:  auto; margin-right: auto;}
		.container .left-block {float: left; width: auto; height: 72px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
		
		@media all and (min-width: 2001px) {
			.container .left-block {float: left; width: auto; height: 105px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
			#mhBox{position: fixed;left:-2050px;right:0;margin:0 auto;top:10%;}
			.container {position: absolute;left:-32%;right:0;top:0;bottom:0;width: 1440px;height: 980px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-55.5%;top:0;bottom:0;width: 800px;height:960px;margin:auto;}
			.left-block {float: left; width: 105px; height: 105px; margin: 3% 0 0 1%; border-radius: 0; }
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 105px;_width:expression(this.width>105?"105px":this.width);height: 105px;min-height: 105px;}
			</c:forEach>
			.color-more img{max-width: 105px;_width:expression(this.width>105?"105px":this.width);height: 105px;min-height: 105px;}
			
			.name{font-size: 12px;}
			.fc-border-separate tbody tr.fc-week {height:139px;}
			.fc-border-separate tbody tr.fc-week td{height:139px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:139px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
			
		}
		@media all and (min-width: 1881px) and (max-width: 2000px){
			#mhBox{position: fixed;left:-1330px;right:0;margin:0 auto;top:7%;}
			.container {position: absolute;left:-28%;right:0;top:0;bottom:0;width: 990px;height: 670px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-51%;top:0;bottom:0;width: 510px;height:656px;margin:auto;}
			.left-block {float: left; width: 72px; max-height: 72.4px; margin: 3% 0 0 1%; border-radius: 5px;}
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 72px;_width:expression(this.width>72?"72px":this.width);height: 72.4px;min-height: 72.4px;}
			</c:forEach>
			.color-more img{max-width: 72px;_width:expression(this.width>72?"72px":this.width);height: 72.4px;min-height: 72.4px;}
			
			.name{font-size: 10px;}
			.fc-border-separate tbody tr.fc-week {height:89px;}
			.fc-border-separate tbody tr.fc-week td{height:89px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:89px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:5px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1574px) and (max-width: 1880px) {
			.container .left-block {float: left; width: auto; height: 62px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
			 #mhBox{position: fixed;left:-1230px;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:-32.3%;right:0;top:0;bottom:0;width: 850px;height: 570px;margin:auto;}
			.left-block {float: left; width: 62px; height: 62px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-54.8%;top:0;bottom:0;width: 510px;height:560px;margin:auto;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 62px;_width:expression(this.width>62?"62px":this.width);height: 62px;min-height: 62px;}
			</c:forEach>
			
			.name{font-size: 8px;}
			.color-more img{max-width: 62px;_width:expression(this.width>62?"62px":this.width);height: 62px;min-height: 62px;}
			
			.fc-border-separate tbody tr.fc-week {height:74px;}
			.fc-border-separate tbody tr.fc-week td{height:74px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:74px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1358px) and (max-width: 1574px) {
			.container {position: absolute;left:-35.2%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 42px; max-height: 42px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-34.2%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:205px;top:6%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			</c:forEach>
			
			.name{font-size: 3px;}
			.color-more img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:3px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1274px) and (max-width: 1358px) {
			.container {position: absolute;left:-37.2%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 42px; max-height: 42px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-36.2%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:165px;top:6%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			</c:forEach>
			
			.name{font-size: 3px;}
			.color-more img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:3px !important;}
			</c:forEach>
		}
		 @media all and (min-width: 1024px) and (max-width: 1274px){
			.container {position: absolute;left:-46%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 42px; max-height: 42px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-46%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:38px;top:3%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			</c:forEach>
			
			.name{font-size: 3px;}
			.color-more img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:3px !important;}
			</c:forEach>
			
		} 
	 	 @media all and (max-width: 1023px) {
			#mhBox{position: fixed;left:-470px;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:-43.5%;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-40%;top:0;bottom:0;width: 315px;height:310px;margin:auto;}
			.left-block {float: left; width: 28px; max-height: 28px; margin: 3% 0 0 1%; border-radius: 0; }
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
			</c:forEach>
			
			.name{font-size: 2px;}
			.color-more img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
		
			.fc-border-separate tbody tr.fc-week {height:32.2px;}
			.fc-border-separate tbody tr.fc-week td{height:32.2px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:32.2px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:2px !important;right:2px !important;}
			</c:forEach>
		} 
		@media all and (max-width: 767px){
			#mhBox{position: fixed;left:0;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:0;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{display: none}
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.color-${menuView.menuNumber } img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
			</c:forEach>
			
			.name{font-size: 2px;}
			.color-more img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
		
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:1px !important;right:1px !important;}
			</c:forEach>
			
		} 
</style>
</c:if>

<c:if test="${count==96}">
<style type="text/css">
	body{
	background-image:url(../photo/bg.jpg);
	background-size:100%;
	-webkit-background-size:100%;
	backgroung-repeat:no-repeat;
	overflow-x: hidden;
	overflow-y: hidden;
}
		* {margin: 0; padding: 0;}
		body { font: 90%/160% "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans UTF-8","Heiti SC","WenQuanYi Micro Hei",sans-serif;}
		h1 {font-size: 2em; color: #fff;}
		.container {width: 90%; margin-left:  auto; margin-right: auto;}
		.container .left-block {float: left; width: auto; height: 72px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
		
		@media all and (min-width: 2001px) {
			.container .left-block {float: left; width: auto; height: 105px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
			#mhBox{position: fixed;left:-2050px;right:0;margin:0 auto;top:10%;}
			.container {position: absolute;left:-36%;right:0;top:0;bottom:0;width: 1440px;height: 980px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-52.5%;top:0;bottom:0;width: 800px;height:960px;margin:auto;}
			.left-block {float: left; width: 105px; height: 105px; margin: 3% 0 0 1%; border-radius: 0; }
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 105px;_width:expression(this.width>105?"105px":this.width);height: 105px;min-height: 105px;}
			</c:forEach>
			.color-more img{max-width: 105px;_width:expression(this.width>105?"105px":this.width);height: 105px;min-height: 105px;}
			
			.name{font-size: 12px;}
			.fc-border-separate tbody tr.fc-week {height:139px;}
			.fc-border-separate tbody tr.fc-week td{height:139px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:139px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
			
		}
		@media all and (min-width: 1881px) and (max-width: 2000px){
			#mhBox{position: fixed;left:-1330px;right:0;margin:0 auto;top:7%;}
			.container {position: absolute;left:-28%;right:0;top:0;bottom:0;width: 990px;height: 670px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-51%;top:0;bottom:0;width: 510px;height:656px;margin:auto;}
			.left-block {float: left; width: 72px; max-height: 72.4px; margin: 3% 0 0 1%; border-radius: 5px;}
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 72px;_width:expression(this.width>72?"72px":this.width);height: 72.4px;min-height: 72.4px;}
			</c:forEach>
			.color-more img{max-width: 72px;_width:expression(this.width>72?"72px":this.width);height: 72.4px;min-height: 72.4px;}
			
			.name{font-size: 10px;}
			.fc-border-separate tbody tr.fc-week {height:89px;}
			.fc-border-separate tbody tr.fc-week td{height:89px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:89px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:5px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1574px) and (max-width: 1880px) {
			.container .left-block {float: left; width: auto; height: 62px; margin: 1% 0 0 1%; border-radius: 0; /* padding: 1em; */ box-sizing: border-box; position: relative; overflow: hidden;}
			 #mhBox{position: fixed;left:-1230px;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:-32.3%;right:0;top:0;bottom:0;width: 850px;height: 570px;margin:auto;}
			.left-block {float: left; width: 62px; height: 62px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-54.8%;top:0;bottom:0;width: 510px;height:560px;margin:auto;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 62px;_width:expression(this.width>62?"62px":this.width);height: 62px;min-height: 62px;}
			</c:forEach>
			
			.name{font-size: 8px;}
			.color-more img{max-width: 62px;_width:expression(this.width>62?"62px":this.width);height: 62px;min-height: 62px;}
			
			.fc-border-separate tbody tr.fc-week {height:74px;}
			.fc-border-separate tbody tr.fc-week td{height:74px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:74px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:5px !important;right:5px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1358px) and (max-width: 1574px) {
			.container {position: absolute;left:-35.2%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 42px; max-height: 42px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-34.2%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:205px;top:6%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			</c:forEach>
			
			.name{font-size: 3px;}
			.color-more img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:3px !important;}
			</c:forEach>
		}
		@media all and (min-width: 1274px) and (max-width: 1358px) {
			.container {position: absolute;left:-37.2%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 42px; max-height: 42px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-36.2%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:165px;top:6%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			</c:forEach>
			
			.name{font-size: 3px;}
			.color-more img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:3px !important;}
			</c:forEach>
		}
		 @media all and (min-width: 1024px) and (max-width: 1274px){
			.container {position: absolute;left:-46%;right:0;top:0;bottom:0;width: 470px;height: 470px;margin:auto;}
			.left-block {float: left; width: 42px; max-height: 42px; margin: 3% 0 0 1%; border-radius: 5px;}
			#calendarBox{position:absolute;left:0;right:-46%;top:-0.5%;bottom:0;width: 450px;height:457px;margin:auto;}
			#mhBox{position: absolute;left:38px;top:3%;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			</c:forEach>
			
			.name{font-size: 3px;}
			.color-more img{max-width: 42px;_width:expression(this.width>42?"42px":this.width);height: 42px;min-height: 42px;}
			
			.fc-header .fc-button {vertical-align:top;background:transparent;margin-bottom:0em;}
			.fc-border-separate tbody tr.fc-week {height:60px;}
			.fc-border-separate tbody tr.fc-week td{height:60px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{width:72px;height:60px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:3px !important;right:3px !important;}
			</c:forEach>
			
		} 
	 	 @media all and (max-width: 1023px) {
			#mhBox{position: fixed;left:-470px;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:-43.5%;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{position:absolute;left:0;right:-40%;top:0;bottom:0;width: 315px;height:310px;margin:auto;}
			.left-block {float: left; width: 28px; max-height: 28px; margin: 3% 0 0 1%; border-radius: 0; }
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
			</c:forEach>
			
			.name{font-size: 2px;}
			.color-more img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
		
			.fc-border-separate tbody tr.fc-week {height:32.2px;}
			.fc-border-separate tbody tr.fc-week td{height:32.2px;}
			.fc-border-separate tbody tr.fc-week td.fc-last{height:32.2px;}
			
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:2px !important;right:2px !important;}
			</c:forEach>
		} 
		@media all and (max-width: 767px){
			#mhBox{position: fixed;left:0;right:0;margin:0 auto;top:5%;}
			.container {position: absolute;left:0;right:0;top:0;bottom:0;width: 313px;height: 315px;margin:auto;}
			#calendarBox{display: none}
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.color-${menuView.menuNumber } img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
			</c:forEach>
			
			.name{font-size: 2px;}
			.color-more img{max-width: 28px;_width:expression(this.width>28?"28px":this.width);height: 28px;min-height: 28px;}
		
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				.span-${menuView.menuNumber } {position:absolute !important;bottom:1px !important;right:1px !important;}
			</c:forEach>
			
		} 
</style>
</c:if>
</head>
<body>

	<div class="background"><img alt="民航盒子" src="../photo/logo.png" id="mhBox"></div>
	<div class="container col2" id="menuBox">
		
		<c:if test="${count>=0 && count<=7}">
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status"  begin="0" end="6">
				<div class="left-block color-${menuView.menuNumber }" style="display:inline;position:relative;" id="${menuView.menuAbbreviation }" ${menuView.menuAbbreviation}Url="${menuView.encryptionPath}" title="${menuView.menuName }">
					<img alt="${menuView.menuName }" src="/CivilAviationBox/menuViewController/getImage.do?id=${menuView.id }">
					<div class="span-${menuView.menuAbbreviation }" style="position:absolute;bottom:5px;right:5px;"><font color="white" class="name">${menuView.menuName }</font></div>
					<script type="text/javascript">
					$('#'+'${menuView.menuAbbreviation}').click(function(){
						var obj=$(this);
						var url=obj.attr('${menuView.menuAbbreviation }'+'Url');
						var width=$(window).width()-50;
						var height=$(window).height()-30;
							 window.location="javascript:ymPrompt.win('/CivilAviationBox/menuViewController/forward.do?url="+url+"',"+width+","+height+",'${menuView.menuName }',null,null,null,true)";
					});
					</script >
				</div>
			</c:forEach>
			<div class="left-block color-more" style="display:inline;position:relative;" id="more">
				<img alt="" src="../photo/more.png">
			</div> 
		</c:if>
		
		<c:if test="${count>7 && count<=23}">
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="22">
				<div class="left-block color-${menuView.menuNumber }" style="display:inline;position:relative;" id="${menuView.menuAbbreviation }" ${menuView.menuAbbreviation}Url="${menuView.encryptionPath}" title="${menuView.menuName }">
					<img alt="${menuView.menuName }" src="/CivilAviationBox/menuViewController/getImage.do?id=${menuView.id }">
					<div class="span-${menuView.menuAbbreviation }" style="position:absolute;bottom:5px;right:5px;"><font color="white" class="name">${menuView.menuName }</font></div>
					<script type="text/javascript">
						$('#'+'${menuView.menuAbbreviation}').click(function(){
							var obj=$(this);
							var url=obj.attr('${menuView.menuAbbreviation }'+'Url');
							var width=$(window).width()-50;
							var height=$(window).height()-30;
								 window.location="javascript:ymPrompt.win('/CivilAviationBox/menuViewController/forward.do?url="+url+"',"+width+","+height+",'${menuView.menuName }',null,null,null,true)";
						});
					</script >
				</div>
			</c:forEach>
			<div class="left-block color-more" style="display:inline;position:relative;" id="more">
				<img alt="" src="../photo/more.png">
			</div> 
		</c:if>
		
		<c:if test="${count>23 && count<=95}">
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="95">
				<div class="left-block color-${menuView.menuNumber }" style="display:inline;position:relative;" id="${menuView.menuAbbreviation }" ${menuView.menuAbbreviation}Url="${menuView.encryptionPath}" title="${menuView.menuName }">
					<img alt="${menuView.menuName }" src="/CivilAviationBox/menuViewController/getImage.do?id=${menuView.id }">
					<div class="span-${menuView.menuAbbreviation }" style="position:absolute;bottom:5px;right:5px;"><font color="white" class="name">${menuView.menuName }</font></div>
					<script type="text/javascript">
						$('#'+'${menuView.menuAbbreviation}').click(function(){
							var obj=$(this);
							var url=obj.attr('${menuView.menuAbbreviation }'+'Url');
							var width=$(window).width()-50;
							var height=$(window).height()-30;
								 window.location="javascript:ymPrompt.win('/CivilAviationBox/menuViewController/forward.do?url="+url+"',"+width+","+height+",'${menuView.menuName }',null,null,null,true)";
						});
					</script >
				</div>
			</c:forEach>
			<div class="left-block color-more" style="display:inline;position:relative;" id="more">
				<img alt="" src="../photo/more.png">
			</div> 
		</c:if>
		
		<c:if test="${count==96}">
			<c:forEach items="${menuViewList }" var="menuView" varStatus="_status" begin="0" end="96">
				<div class="left-block color-${menuView.menuNumber }" style="display:inline;position:relative;" id="${menuView.menuAbbreviation }" ${menuView.menuAbbreviation}Url="${menuView.encryptionPath}" title="${menuView.menuName }">
					<img alt="${menuView.menuName }" src="/CivilAviationBox/menuViewController/getImage.do?id=${menuView.id }">
					<div class="span-${menuView.menuAbbreviation }" style="position:absolute;bottom:3px;right:3px;"><font color="white" class="name">${menuView.menuName }</font></div>
					<script type="text/javascript">
						$('#'+'${menuView.menuAbbreviation}').click(function(){
							var obj=$(this);
							var url=obj.attr('${menuView.menuAbbreviation }'+'Url');
							var width=$(window).width()-50;
							var height=$(window).height()-30;
								 window.location="javascript:ymPrompt.win('/CivilAviationBox/menuViewController/forward.do?url="+url+"',"+width+","+height+",'${menuView.menuName }',null,null,null,true)";
						});
					</script >
				</div>
			</c:forEach>
		
		</c:if>
	</div>
		
		 <div class="col3 clearfix" id="calendarBox">  
                <div id="calendar"></div>
		 </div> 
</body>

<!-- Full Calendar -->
<script src="../static/fullcalendar/js/fullcalendar.min.js"></script>
<script src="../src/images-grid.js"></script>
 
<script type="text/javascript">
$(function($){
	
    /* initialize the calendar
    -----------------------------------------------------------------*/
   var date = new Date();
   var d = date.getDate();
   var m = date.getMonth();
   var y = date.getFullYear();

   $('#calendar').fullCalendar({
	   height:600,
       header: {
           left: 'prev',
          /*  center: 'prevYear,title,nextYear', */
          center: 'title',
           right: 'next'
       },
       editable: true,
       droppable: true,
       drop: function (date, allDay) { 

           var originalEventObject = $(this).data('eventObject');
           var copiedEventObject = $.extend({}, originalEventObject);
           
           copiedEventObject.start = date;
           copiedEventObject.allDay = allDay;

           $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
           
           if ($('#drop-remove').is(':checked')) {
               $(this).remove();
           }
       },
   });

});

//添加更多
$('#more').click(function(){
	var width=$(window).width();
	var height=$(window).height();
	
	if(width>=1263&&height>694&&width<1583&&height<794){
		width=width*0.5;
		height=height*0.45;
	}else if(width>=1583&&height>794&&width<2100&&height<1200){
		width=width*0.5;
		height=height*0.4;
	}else if(width>=2500&&height>1500){
		width=width*0.5;
		height=height*0.25;
	}else if(width>=1263&&height>694){
		width=width*0.5;
		height=height*0.4;
	}else if(width>=1263&&height>600&&height<=694){
		width=width*0.5;
		height=height*0.53;
	}else{
		width=width*0.5;
		height=height*0.45;
	}
	 window.location="javascript:ymPrompt.win('/CivilAviationBox/menuViewController/openAddPage.do',"+width+","+height+",'菜单添加',null,null,null,true)";//Menu addition

	//window.location=encodeURI(encodeURI("#"));
});

$('#mhBox').click(function(){
	var obj=$(this);
	var width=$(window).width()-150;
	var height=$(window).height()-200;
	window.location="javascript:ymPrompt.win('/CivilAviationBox/menuViewController/openMenuList.do',"+width+","+height+",'菜单列表',null,null,null,true)";//Menu list
});

</script>
</html>