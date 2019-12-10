package com.xh.platform.utils;

import java.security.MessageDigest;
/**
 * 提供md5加密
 * @author J2SEJ2EE
 *
 */
public class MD5Util {
	private final static String[] hexDigits = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d","e", "f" };

	private static String byteArrayToHexString(byte[] b) {
		StringBuffer resultSb = new StringBuffer();
		for (int i = 0; i < b.length; i++) {
			resultSb.append(byteToHexString(b[i]));
		}
		return resultSb.toString();
	}

	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0)
			n = 256 + n;
		int d1 = n / 16;
		int d2 = n % 16;
		return hexDigits[d1] + hexDigits[d2];
	}

	public static String MD5Encode(String origin) {
		String resultString = null;

		try {
			resultString = new String(origin);
			MessageDigest md = MessageDigest.getInstance("MD5");
			resultString = byteArrayToHexString(md.digest(resultString.getBytes()));
		} catch (Exception ex) {

		}
		return resultString;
	}
	
	 /** 
     *用户名解密 
     *@param ssoToken 字符串 
     *@return String 返回加密字符串 
    */  
    public static String decrypt(String ssoToken)  
    {  
      try  
      {  
        String name = new String();  
        java.util.StringTokenizer st=new java.util.StringTokenizer(ssoToken,"MO");  
        while (st.hasMoreElements()) {  
          int asc =  Integer.parseInt((String)st.nextElement()) - 27;  
          name = name + (char)asc;  
        }  

        return name;  
      }catch(Exception e)  
      {  
        e.printStackTrace() ;  
        return null;  
      }  
    }  

    /** 
     *用户名加密 
     *@param ssoToken 字符串 
     *@return String 返回加密字符串 
    */  
    public static String encrypt(String ssoToken)  
    {  
      try  
      {  
        byte[] _ssoToken = ssoToken.getBytes("utf-8");  
        String name = new String();  
       // char[] _ssoToken = ssoToken.toCharArray();  
        for (int i = 0; i < _ssoToken.length; i++) {  
            int asc = _ssoToken[i];  
            _ssoToken[i] = (byte) (asc + 27);  
            name = name + (asc + 27) + "MO";  
        }  
        return name;  
      }catch(Exception e)  
      {  
        e.printStackTrace() ;  
        return null;  
      }  
    }  
	public static void main(String[] args) {
		System.out.println(MD5Util.encrypt("220281198809121015"));
		
		System.out.println(MD5Util.decrypt(MD5Util.encrypt("220281198809121015")));
		//A099B7E6301C2C587B5D864DC7551303
		//a099b7e6301c2c587b5d864dc7551303
	}
}
