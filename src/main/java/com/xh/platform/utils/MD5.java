package com.xh.platform.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class MD5 {
	
	public static String MD5Encode(String origin){
		
	String resultString="";
	
	try {
		MessageDigest md=MessageDigest.getInstance("MD5");
		 resultString=ByteArrayToHexString(md.digest(origin.getBytes()));
		 
	} catch (NoSuchAlgorithmException e) {
		e.printStackTrace();
	}
		return resultString;
	}

	private static String ByteArrayToHexString(byte[] digest) {

		StringBuffer result=new StringBuffer();
		for(int i=0;i<digest.length;i++){
			result.append(byteToHexString(digest[i]));
		}
		return result.toString();
	}

	
	private final static String[] hexDigits={"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"}; 
	
	//字节转16进制字符串
	private static String byteToHexString(byte b) {

		int n=b;
		if(n<0)
			n=n+256;
			int d1=n/16;
			int d2=n%16;
		
		return hexDigits[d1]+hexDigits[d2];
	}
	
	
	
	
}
