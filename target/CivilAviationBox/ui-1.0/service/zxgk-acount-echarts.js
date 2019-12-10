//获取当天比中订票人员
var warnResultTodayDzxx ;
//获取当天比中离港人数
var warnResultTodayJgxx ;

//获取所有比中订票人员
var warnResultAllDzxx ;
//获取所有比中离港人数
var warnResultAllJgxx ;

//获取近7天比中订票人员
var warnResult7DayDzxx ;
//获取近7天比中离港人数
var warnResult7DayJgxx ;

//当天比中订票离港数据统计分析
function zxgkTodarWarnCount(){
	var  personBarChart = echarts.init(document.getElementById('zxgk-feedback-acount'));
	//获取全部省份或者城市
	var citys = getCity();
	//获取当天订票离港数据方法
	getWarnResultTodayDzxxCount();
	getWarnResultTodayJgxxCount();
	
	var  option = {
		    title : {
		    	
		        text: '',
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['订票','离港']
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            data : citys
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'订票',
		            type:'bar',
		            data:warnResultTodayDzxx,
		        },
		        {
		            name:'离港',
		            type:'bar',
		            data:warnResultTodayJgxx,
		        }
		    ]
		};
    personBarChart.setOption(option);
}

	
//全国各省所有重点人员数量统计分析柱状图js
function zxgkAllWarnCount(){
	var  personBarChart = echarts.init(document.getElementById('zxgk-person-acount'));
	//获取全部省份或者城市
	var citys = getCity();
	//获取所有订票离港数据方法
	getWarnResultAllDzxxCount();
	getWarnResultAllJgxxCount();
	
	var  option = {
		    title : {
		    	
		        text: '',
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['订票','离港']
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            data : citys
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'订票',
		            type:'bar',
		            data:warnResultAllDzxx,
		        },
		        {
		            name:'离港',
		            type:'bar',
		            data:warnResultAllJgxx,
		        }
		    ]
		};
    personBarChart.setOption(option);
}



//近7天比中订票离港数据统计分析
function zxgk7DarWarnCount(){
	var  personBarChart = echarts.init(document.getElementById('zxgk-person-7dayAcount'));
	//获取近7天日期
	var days = getDays();
	//获取近7天订票离港数据方法
	getWarnResult7DayDzxxCount();
	getWarnResult7DayJgxxCount();
	option = {
		    title : {
		        text: ''
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['订票','离港']
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : days
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'订票',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:warnResult7DayDzxx
		        },
		        {
		            name:'离港',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:warnResult7DayJgxx
		        }
		    ]
		};
    personBarChart.setOption(option);
}


//获取全部省份
function getCity(){
	var citys=[];
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getCitys.do",
		dataType : 'json',
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
				citys =data.data;
			}
		}
	});
	return citys;
}

//获取近七天日期
function getDays(){
	var days=[];
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getDays.do",
		dataType : 'json',
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
				days =data.data;
			}
		}
	});
	return days;
}


//仪表数据
function personGauge(){
	var  personBarChart = echarts.init(document.getElementById('zxgk-person-gauge'));
	//获取比中人数与不比中人数差
	var policeWarnResultCount= getPoliceWarnResultCount();
	var  option = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series : [
		        {
		            name:'业务指标',
		            type:'gauge',
		            startAngle: 180,
		            endAngle: 0,
		            center : ['50%', '80%'],    // 默认全局居中
		            radius : 110,
		            axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    width: 40
		                }
		            },
		            axisTick: { 
		            	show:false,// 坐标轴小标记
		                splitNumber: 10,   // 每份split细分多少段
		                length :12,        // 属性length控制线长
		            },
		            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
		                formatter: function(v){
		                  
		                },
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    color: '#fff',
		                    fontSize: 15,
		                    fontWeight: 'bolder'
		                }
		            },
		            pointer: {
		                width:3,
		                length: '90%',
		                color: 'black'
		            },
		            title : {
		                show : false,
		                offsetCenter: [0, '-60%'],       // x, y，单位px
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    color: '#fff',
		                    fontSize: 30
		                }
		            },
		            detail : {
		                show : true,
		                backgroundColor: 'rgba(0,0,0,0)',
		                borderWidth: 0,
		                borderColor: '#ccc',
		                width: 10,
		                height: 10,
		                offsetCenter: [-140, -100],       // x, y，单位px
		                formatter:'比中率{value}%',
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    fontSize : 20
		                }
		            },
		            data:policeWarnResultCount
		        }
		    ]
		};
	personBarChart.setOption(option);
}




//获取当天,订票比中总数
function getWarnResultTodayDzxxCount(){
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getWarnResultTodayDzxxCount.do",
		async : false,
		dataType : 'json',
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
				//获取当天比中订票人员
				warnResultTodayDzxx = data.warnResultTodayDzxx;
			}
		}
	});
}



//获取当天,离港比中总数
function getWarnResultTodayJgxxCount(){
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getWarnResultTodayJgxxCount.do",
		async : false,
		dataType : 'json',
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
				//获取当天比中离港人数
				warnResultTodayJgxx = data.warnResultTodayJgxx;
			}
		}
	});
}



//获取历史,订票比中总数
function getWarnResultAllDzxxCount(){
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getWarnResultAllDzxxCount.do",
		async : false,
		dataType : 'json',
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
				//获取所有比中订票人员
				warnResultAllDzxx = data.warnResultAllDzxx;
			}
		}
	});
}



//获取历史,离港比中总数
function getWarnResultAllJgxxCount(){
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getWarnResultAllJgxxCount.do",
		async : false,
		dataType : 'json',
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
				//获取所有比中离港人数
				warnResultAllJgxx = data.warnResultAllJgxx;
			}
		}
	});
}
//获取近7天订票比中总数
function getWarnResult7DayDzxxCount(){
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getWarnResult7DayDzxxCount.do",
		async : false,
		dataType : 'json',
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
				//获取近7天比中订票人员
				warnResult7DayDzxx = data.warnResult7DayDzxx;
			}
		}
	});
}


//获取近7天离港比中总数
function getWarnResult7DayJgxxCount(){
	$.ajax({
		cache : false,
		type : "post",
		url : ctx + "/zxgkAcountController/getWarnResult7DayJgxxCount.do",
		async : false,
		dataType : 'json',
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
				//获取近7天比中离港人数
				warnResult7DayJgxx = data.warnResult7DayJgxx;
			}
		}
	});
}
