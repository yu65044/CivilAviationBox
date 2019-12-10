package com.xh.platform.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;

/**
 * 图片流数据存取的工具类
 * @author ningxinyu
 *
 */
public class ImageUtil {
	private static File file=null;
	
	/**
	 * 将本地图片文件读取为二进制流
	 * @param infile
	 * @return
	 */
	public static FileInputStream getImageByte(String infile){
		FileInputStream imageByte=null;
		file=new File(infile);
		try {
			imageByte=new FileInputStream(file);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		return imageByte;
		
	}
	
	
	/**
	 * 将图片流读出为图片
	 * @param inputStream
	 * @param path
	 */
	public static void readBlob(InputStream inputStream,String path){
		try {
			FileOutputStream fileOutputStream=new FileOutputStream(path);
			byte[] buffer=new byte[1024];
			int len=0;
			while((len=inputStream.read(buffer))!=-1){
				fileOutputStream.write(buffer,0,len);
			}
			inputStream.close();
			fileOutputStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 往数据库添加图片
	 * @param args
	 */
	public static void main(String args[]){
		String filePath="C:\\Users\\LOVEYOU\\Desktop\\no_head.jpg";
		Connection conn=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String user="root";
			String password="123456";
			String url="jdbc:mysql://10.42.48.144:3306/cyry?characterEncoding=utf-8";
			
			conn=(Connection) DriverManager.getConnection(url,user,password);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		PreparedStatement preparedStatement=null;
		InputStream in=null;
			in=ImageUtil.getImageByte(filePath);
		
		try {
			String sql="insert into pic_bak(ID,BH,PIC,RGSJ,PICTYPE) values(?,?,?,?,?)";
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			preparedStatement.setString(1, "20170715");
			preparedStatement.setString(2, "{20170715}");
			preparedStatement.setBinaryStream(3, in,in.available());
			preparedStatement.setLong(4, 20170715);
			preparedStatement.setDouble(5, 2.2);
			preparedStatement.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(in!=null){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}finally{
					if(preparedStatement!=null){
						try {
							preparedStatement.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}finally{
							try {
								conn.close();
							} catch (SQLException e) {
								e.printStackTrace();
							}
						}
					}
				}
			}
		}
		
		}
	
	
}
