package com.xh.platform.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 * Get database connections based on configuration files(根据配置文件获取数据库连接)
 * @author ningxinyu
 *
 */
public class DataBaseUtil {
	protected Connection connection;
	protected Connection conn;
	protected PreparedStatement ps;
	protected ResultSet rs;
	
	/**
	 * Get the Mysql database connection(获取数据库连接1)(Mysql)
	 * @return
	 */
	public Connection getConnection(){
		//Read configuration file information(读取配置文件信息)
		String driver=ConfigManager.getInstance().getString("jdbc.driver_class");
		String url=ConfigManager.getInstance().getString("jdbc.connection.url");
		String username=ConfigManager.getInstance().getString("jdbc.connection.username");
		String password=ConfigManager.getInstance().getString("jdbc.connection.password");
		
		try {
			//Load JDBC Driver(加载JDBC驱动)
			Class.forName(driver);
			//Establishing connection with database(与数据库建立连接)
			connection=DriverManager.getConnection(url, username, password);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			System.out.println("-------Failed to connect to the Mysql database(与Mysql数据库连接失败)-------");
			e.printStackTrace();
		}
		return connection;
		
	}
	
	
	/**
	 * Get the Oracle database connection(获取数据库连接2)(Oracle)
	 * @return
	 */
	public Connection getConn(){
		//Read configuration file information(读取配置文件信息)
		String driver1=ConfigManager.getInstance().getString("jdbc.driver_class1");
		String url1=ConfigManager.getInstance().getString("jdbc.connection.url1");
		String username1=ConfigManager.getInstance().getString("jdbc.connection.username1");
		String password1=ConfigManager.getInstance().getString("jdbc.connection.password1");
		
		try {
			//Load JDBC Driver(加载JDBC驱动)
			Class.forName(driver1);
			//Establishing connection with database(与数据库建立连接)
			conn=DriverManager.getConnection(url1, username1, password1);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			System.out.println("-------Failed to connect to the Oracle database(与Oracle数据库连接失败)-------");
			e.printStackTrace();
		}
		return conn;
		
	}
	
	
	/**
	 * Close all connection resources(关闭所有连接资源)
	 * @param rs
	 * @param ps
	 * @param connection
	 */
	public void closeAll(ResultSet rs,PreparedStatement ps,Connection connection){
		if(rs!=null){
			try {
				rs.close();
			} catch (SQLException e) {
				System.out.println("-------ResultSet resource shutdown exception(ResultSet资源关闭异常)-------");
				e.printStackTrace();
			}
		}
		
		if(ps!=null){
			try {
				ps.close();
			} catch (SQLException e) {
				System.out.println("-------PreparedStatement resource shutdown exception(PreparedStatement资源关闭异常)-------");
				e.printStackTrace();
			}
		}
		
		if(connection!=null){
			try {
				connection.close();
			} catch (SQLException e) {
				System.out.println("-------Connection resource shutdown exception(Connection资源关闭异常)-------");
				e.printStackTrace();
			}
		}
	}
	
	
}
