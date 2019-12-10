var series;
var legendDate;
var times;
var personBarChart;
/**重点航班柱状图*/
function majorBar(beginTime,endTime){
	 personBarChart = echarts.init(document.getElementById('major-flight-echarts'));
      //重点航班
   	 series = getMajorSeries(beginTime,endTime);
   	 //legendDate数据
   	 legendDate = getCodeNameByAjax();
   	 //时间间隔数据
   	 times = getSystemTime(beginTime,endTime);
	 
	var option = {
			 title: {
			        text: '重点航班',
			        sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
			        x: 'left',
			        y: 'top',
			        itemGap: 20,
			        textStyle : {
			            color : 'rgba(30,144,255,0.8)',
			            fontFamily : '微软雅黑',
			            fontSize : 12,
			            position : 'center'
			        }
			 },
			 legend: {
			    data:legendDate
			 },
	        tooltip : {
	            trigger: 'axis',
	            showContent : false
	        },
	        backgroundColor:'#fff',
	        calculable : true,
	        xAxis : [
	            {
	                type : 'category',
	                data :times,
	                axisLabel:{
	                	interval:0
	                }
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',
	                splitArea : {show : true}
	            }
	        ],
	        series : series
	    };
     personBarChart.setOption(option);
    
	 personBarChart.on('dblclick',eConsole);
}
//点击事件
function eConsole(param) {
     if (typeof param.seriesIndex != 'undefined') {
         var dataIndex = param.dataIndex;
    	 var seriesIndex = param.seriesIndex;
    	 var ymd = times.toString().split(",")[dataIndex];
    	 var riskLevel = 4 - seriesIndex;
    	 window.location=ctx+"/indexController/oneDayMajorFligth.do?ymd="+ymd+"&riskLevel="+riskLevel;
     }
     else {
    	 layer.alert("获取数据超时", {
				"title" : "提示信息"
			});
     }
}
//获取等级颜色
function getWarmColors(){
	var obj;
	$.ajax({
		cache : false,
		type : "GET",
		url : ctx + "/warnLevelController/findWarnLevelColors.do",
		async : false,
		error : function (
			XMLHttpRequest,
			textStatus,
			errorThrown) {
			 layer.alert("获取数据超时", {
				"title" : "提示信息"
			});
		},
		success : function (data) {
			var  jsonData = eval("("+data+")");
			obj = jsonData.data;
		}
	});
	return obj;
}
//获取预警等级名称
function getCodeNameByAjax(){
	var CodeArr=[];
	$.ajax({
		cache : false,
		type : "GET",
		url : ctx + "/graveFlightController/getWarnNames.do",
		async : false,
		error : function (
			XMLHttpRequest,
			textStatus,
			errorThrown) {
			 layer.alert("获取数据超时", {
				"title" : "提示信息"
			});
		},
		success : function (data) {
			CodeArr=data.data;
		}
	});
	return CodeArr;
}
//后台时间配置
function getSystemTime(beginTime,endTime){
	var systemTime=[];
	$.ajax({
		cache : false,
		type : "post",
		data:{"beginTime":beginTime,"endTime":endTime},
		url : ctx + "/statisticAnalysisController/returnSystemTime.do",
		async : false,
		error : function (
			XMLHttpRequest,
			textStatus,
			errorThrown) {
			 layer.alert("获取数据超时", {
				"title" : "提示信息"
			});
		},
		success : function (data) {
			var dataJson = eval("("+data+")");
			if(dataJson.success){
				var arr =dataJson.data;
				for(var i=0;i<arr.length;i++){
					systemTime[i]=arr[i];
				}
			}
		}
	});
	return systemTime;
}
function getMajorSeries(beginTime,endTime){
	var majorArr=[];
	var colors = getWarmColors();
	$.ajax({
		cache : false,
		type : "POST",
		data:{"beginTime":beginTime,"endTime":endTime},
		url : ctx + "/statisticAnalysisController/statisticsMajorFlight.do",
		async : false,
		error : function (
			XMLHttpRequest,
			textStatus,
			errorThrown) {
			 layer.alert("获取数据超时", {
				"title" : "提示信息"
			});
		},
		success : function (data) {
			if(data.success){
				var arr = data.data;
				for(var i=0;i<arr.length;i++){
					majorArr.push({
				        name:arr[i].warnName,
		                type:'bar',
		                barWidth: 28,
		                itemStyle: {        //将在柱状图上显示数据
		                    normal: {                   // 系列级个性化，横向渐变填充
		                    	color:colors[i],
		                        label : {
		                            show : true,
		                            textStyle : {
		                                fontSize : '12',
		                                fontFamily : '微软雅黑',
		                                fontWeight : 'bold'
		                            }
		                        }
		                    }
		                },
		                data:arr[i].riskVal
					});
				}
			}
		}
	});
	return majorArr;
}

/*重点航线*/
var majorColor;
function majorCrosswiseBar(beginTime,endTime,begin,interval,level){
	
	 var personBarChart = echarts.init(document.getElementById('major-line-echarts'));
	 var lineData = majorLine(beginTime,endTime,begin,interval,level);
	 var option = {
			 title: {
			        text: '重点航线',
			        sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
			        x: 'left',
			        y: 'top',
			        itemGap: 20,
			        textStyle : {
			            color : 'rgba(30,144,255,0.8)',
			            fontFamily : '微软雅黑',
			            fontSize : 12,
			            position : 'center'
			        }
			 },
			 legend: {
			    data:["风险值","重点人员"]
			 },
	        tooltip : {
	            trigger: 'axis'
	        },
	        backgroundColor:'#fff',
	        calculable : true,
	        yAxis : [
	            {
	                type : 'value',
	                splitArea : {show : true}
	            
	            }
	        ],
	        xAxis : [
	            {
	                type : 'category',
	                data : lineData[0]
	            }
	        ],
	        series : [
						{
							  name:"风险值",
						      type:'bar',
						      barWidth: 28,
						      itemStyle: {        //将在柱状图上显示数据
						          normal: {                   // 系列级个性化，横向渐变填充
						        	  color:majorColor,
						              label : {
						                  show : true,
						                  textStyle : {
						                      fontSize : '12',
						                      fontFamily : '微软雅黑',
						                      fontWeight : 'bold'
						                  }
						              }
						          }
						      },
						      data:lineData[1]
						},
						{
							  name:"重点人员",
						      type:'bar',
						      barWidth: 28,
						      itemStyle: {        //将在柱状图上显示数据
						          normal: {                   // 系列级个性化，横向渐变填充
						              label : {
						                  show : true,
						                  textStyle : {
						                      fontSize : '12',
						                      fontFamily : '微软雅黑',
						                      fontWeight : 'bold'
						                  }
						              }
						          }
						      },
						      data:lineData[3]
						}]
	    };
	 personBarChart.setOption(option);
}
function majorLine(beginTime,endTime,begin,interval,level){
	var arr =[];
	$.ajax({
		cache : false,
		type : "POST",
		data:{'beginTime':beginTime,'endTime':endTime,'begin':begin,'interval':interval,'level':level},
		url : ctx + "/statisticAnalysisController/getMajorAirLine.do",
		async : false,
		error : function (
			XMLHttpRequest,
			textStatus,
			errorThrown) {
			 layer.alert("获取数据超时", {
				"title" : "提示信息"
			});
		},
		success : function (data) {
			arr[0] = data.lines;//航线地址
			arr[1] = data.risk;//航线风险值
			arr[2] = data.codes;//三字码
			arr[3] = data.person;
			majorColor = data.color;
		}
	});
	return arr;
}


/*重点机场*/
function majorAirPort(type,interval){
	 var personBarChart = echarts.init(document.getElementById('major-ariport-echarts'));
	 var jsons= getAirPortAndRiskVal(type,interval);
	 var option = {
			 title: {
			        text: '重点机场',
			        sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
			        x: 'left',
			        y: 'top',
			        itemGap: 20,
			        textStyle : {
			            color : 'rgba(30,144,255,0.8)',
			            fontFamily : '微软雅黑',
			            fontSize : 12,
			            position : 'center'
			        }
			 },
			 legend: {
				    data:["风险值","重点人员"]
				 },
	        tooltip : {
	            trigger: 'axis'
	        },
	        backgroundColor:'#fff',
	        calculable : true,
	        xAxis : [
	            {
	                type : 'category',
	                data :jsons[0]
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',
	                splitArea : {show : true}
	            }
	        ],
	        series : [{
	                	  name:"风险值",
			                type:'bar',
			                barWidth: 28,
			                itemStyle: {        //将在柱状图上显示数据
			                    normal: {                   // 系列级个性化，横向渐变填充
			                        label : {
			                            show : true,
			                            textStyle : {
			                                fontSize : '12',
			                                fontFamily : '微软雅黑',
			                                fontWeight : 'bold'
			                            }
			                        }
			                    }
			                },
			                data:jsons[1]
	                  },
	                  {
	                	  name:"重点人员",
			                type:'bar',
			                barWidth: 28,
			                itemStyle: {        //将在柱状图上显示数据
			                    normal: {                   // 系列级个性化，横向渐变填充
			                        label : {
			                            show : true,
			                            textStyle : {
			                                fontSize : '12',
			                                fontFamily : '微软雅黑',
			                                fontWeight : 'bold'
			                            }
			                        }
			                    }
			                },
			                data:jsons[2]
	                  }]
	    };
	 personBarChart.setOption(option);
}

function  getAirPortAndRiskVal(type,interval){
	var dataArr = [];
	$.ajax({
		cache : false,
		type : "post",
		data:{"type":type,"interval":interval},
		url : ctx + "/statisticAnalysisController/getMajorAirPorts.do",
		async : false,
		error : function (
			XMLHttpRequest,
			textStatus,
			errorThrown) {
			 layer.alert("获取数据超时", {
				"title" : "提示信息"
			});
		},
		success : function (data) {
			if(data.success){
				dataArr[0]=data.airport;
				dataArr[1]=data.risk;
				dataArr[2]=data.emps;
				dataArr[3]=data.codes;
			}
		}
	});
	return dataArr;
	
}


















