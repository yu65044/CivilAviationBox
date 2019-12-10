<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script type="text/javascript">
	var ctx = "${ctx}";
</script>
<%-- bootstrap 全局依赖JS插件及CSS BEGIN --%>
<script type="text/javascript" src="${ctx }/static/ui-1.0/js/jquery.min.js?v=2.1.4"></script>
<script type="text/javascript" src="${ctx }/static/ui-1.0/bootstrap-3.3.5-dist/js/bootstrap.min.js?v=3.3.5"></script>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/stage/font-awesome.css?v=4.4.0"/><%-- font-awesome 为 Bootstrap 创造的全局图标字体库CSS --%>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/stage/bootstrap.min.css?v=3.3.6"/>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/css/animate.min.css"/><%-- CSS3 动画库 --%>
<link rel="stylesheet" href="${ctx }/static/ui-1.0/stage/style.css?v=4.1.0"/>
<script type="text/javascript" src="${ctx }/static/ui-1.0/layer-v2.4/layer/layer.js" ></script><%-- 弹窗插件 JS BEGIN --%>

<link rel="stylesheet" href="${ctx }/static/ui-1.0/css/xh.layer-win.css"/><%-- 自定义样式 ( layer弹窗、下拉列表、查询弹窗DIV ) --%>
<%-- bootstrap 全局依赖JS插件及CSS END --%>

