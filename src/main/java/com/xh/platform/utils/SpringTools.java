package com.xh.platform.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class SpringTools {

	
	/**
	 * 取得HttpServletRequest的简化函数.
	 */
	public static HttpServletRequest getRequest() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		return request;
	}
	
	/**
	 * 取得HttpServletResponse的简化函数.
	 */
	public static HttpServletResponse getResponse() {
		HttpServletResponse response =((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
		return response;
	}
	
	/**
	 * 取得HttpResponse的简化函数.
	 */
	public static HttpSession getSession() {
		HttpSession session = getRequest().getSession();
		return session;
	}
	
	/**
	 * 判断字符串是否为空
	 */
	public  static boolean  decideIsNull(String str){
		if(str==null||"".equals(str)){
			return false;
		}else{
			return  true;
		}
	}
	
	/**      
	 * 作用：    传入文件名根据时间等因素获得随机的文件名
	 * @param fileName
	 * @return      
	 */
	public static String generateFileName (String fileName){
		int random =new Random().nextInt(1000000000);
		int position=fileName.lastIndexOf(".");
		String extension=fileName.substring(position);
		return random+extension;
	}
	
	
	/**
	 * 转换日期公共方法
	 * @author Zn
	 *  dateString 日期字符串
	 * */
	/**时间字符串转换称date类型*/
	public static String parseDateFromString(String dateString){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		java.util.Calendar cl = Calendar.getInstance();
		if(SpringTools.decideIsNull(dateString)){
			try {
				date = sdf.parse(dateString);
				cl.setTime(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return String.valueOf(date.getTime());
		}else{
			return "0";
		}
	}
	
	/**
	 * 保存文件到指定路径
	 * @author Zn
	 * @param 输入流,文件保存路径,文件名
	 * */
	public static File saveFileFromInputStream(InputStream stream, String path, String filename) {
		// 检查保存上传文件的文件夹是否存在
		File dirFile = new File(path);
		if (!dirFile.exists()) {
			dirFile.mkdir();
		}
		File file = null;
		FileOutputStream fs = null;
		try {
			file = new File(path + "/" + filename);
			fs = new FileOutputStream(file);
			byte[] buffer = new byte[1024 * 1024];
			int byteread = 0;
			while ((byteread = stream.read(buffer)) != -1) {
				fs.write(buffer, 0, byteread);
				fs.flush();
			}
			fs.close();
			stream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fs != null) {
					fs.close();
				}
				if (stream != null) {
					stream.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return file;
	}
	
}
