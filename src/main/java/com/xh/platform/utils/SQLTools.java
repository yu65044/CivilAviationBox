package com.xh.platform.utils;

public class SQLTools {
	
	
	//模糊查询防SQL注入
	public static String transfer(String keyword){
		
		if(keyword.contains("%")||keyword.contains("_")){
				
			//替换\\,\%,_
			keyword=keyword.replaceAll("\\\\", "\\\\\\\\")
					.replaceAll("\\%", "\\\\%")
					.replaceAll("\\_", "\\\\_");
		}
		
		return keyword;
	}
}
