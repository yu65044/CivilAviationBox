/**原因类型饼图*/ //机场从业人员数占比%
function abrnPieFn(airportName,airportData,titleText,chartsId){
	var abrnPieChart = echarts.init(document.getElementById(chartsId)); 
	option = {
		title: {
	        text: titleText,
	        sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
	        x: 'center',
	        y: 'center',
	        itemGap: 20,
	        textStyle : {
	            color : 'rgba(30,144,255,0.8)',
	            fontFamily : '微软雅黑',
	            fontSize : 12,
	            position : 'center'
	        }
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} "
	    },
	    legend: {
	        orient: 'vertical',
	        x: 'left',
	        data:[]
	    },
	    series: [{
	            name:'机场人员信息',
	            type:'pie',
	            radius: ['40%', '55%'],
				     data:airportData
	        }
	    ]
	};
	// 为echarts对象加载数据 
	abrnPieChart.setOption(option);
}