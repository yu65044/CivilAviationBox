function fillRowStyle(row,index){
	var fontColor="";
	var backColor="";
	if(row.warnColor!=''){
		var fontColor="black";
		var backColor=row.warnColor;
		return {css:{"background-color":backColor,"color":fontColor}};
	}else{
		if(parseFloat(row.dpqfjg)<24&&parseFloat(row.dpqfjg)>=8){
			return {css:{"background-color":"yellow","color":fontColor}};
		}else if(parseFloat(row.dpqfjg)<8){
			backColor="red";
			fontColor = "#fff";
			return {css:{"background-color":backColor,"color":fontColor}};
		}else{
			backColor="white";
			fontColor = "black";
			return {css:{"background-color":backColor,"color":fontColor}};
		}
	}
}

function fillRowStyleF(row,index){
	var fontColor="";
	var backColor="";
	if(row.personType=='1'){
		var fontColor="black";
		var backColor="red";
		return {css:{"background-color":backColor,"color":fontColor}};
	}else{
		if(parseFloat(row.dpqfjg)<24&&parseFloat(row.dpqfjg)>=8){
			return {css:{"background-color":"yellow","color":fontColor}};
		}else if(parseFloat(row.dpqfjg)<8){
			backColor="white";
			fontColor = "black";
			return {css:{"background-color":backColor,"color":fontColor}};
		}else{
			backColor="white";
			fontColor = "black";
			return {css:{"background-color":backColor,"color":fontColor}};
		}
	}
}


function fillRowStyleE(row,index){
	var fontColor="";
	var backColor="";
	if(row.controlPersonType=='1'){
		var fontColor="black";
		var backColor="red";
		return {css:{"background-color":backColor,"color":fontColor}};
	}else{
		if(parseFloat(row.dpqfjg)<24&&parseFloat(row.dpqfjg)>=8){
			return {css:{"background-color":"yellow","color":fontColor}};
		}else if(parseFloat(row.dpqfjg)<8){
			backColor="white";
			fontColor = "black";
			return {css:{"background-color":backColor,"color":fontColor}};
		}else{
			backColor="white";
			fontColor = "black";
			return {css:{"background-color":backColor,"color":fontColor}};
		}
	}
}

function fillRowStyleG(row,index){
	var fontColor="";
	var backColor="";
	if(row.arrivalAirportCode=='PEK'||row.arrivalAirportCode=='NAY'){
		var fontColor="black";
		var backColor="red";
		return {css:{"background-color":backColor,"color":fontColor}};
	}else if(row.arrivalAirportCode=='TSN'||row.arrivalAirportCode=='SJW'){
		var fontColor="black";
		var backColor="#EE7700";
		return {css:{"background-color":backColor,"color":fontColor}};
	}else{
		if(parseFloat(row.dpqfjg)<24&&parseFloat(row.dpqfjg)>=8){
			return {css:{"background-color":"yellow","color":fontColor}};
		}else if(parseFloat(row.dpqfjg)<8){
			backColor="white";
			fontColor = "black";
			return {css:{"background-color":backColor,"color":fontColor}};
		}else{
			backColor="white";
			fontColor = "black";
			return {css:{"background-color":backColor,"color":fontColor}};
		}
	}
}