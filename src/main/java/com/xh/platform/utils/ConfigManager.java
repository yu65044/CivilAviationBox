package com.xh.platform.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * A class of tools for reading configuration files(读取配置文件的工具类)
 * @author ningxinyu
 *
 */
public class ConfigManager {
	private static ConfigManager configManager;
	private static Properties properties;
	
	/**
	 * Read configuration file information(读取配置文件信息)
	 */
	private ConfigManager(){
		String configFile="database.properties";
		properties=new Properties();
		InputStream in=ConfigManager.class.getClassLoader().getResourceAsStream(configFile);
		try {
			properties.load(in);
			in.close();
		} catch (IOException e) {
			System.out.println("---------Read configuration file information(读取配置文件失败)--------");
			e.printStackTrace();
		}
	}
	
	/**
	 * Return objects that are not null configuration(返回不为null的configManager的对象)
	 * @return
	 */
	public static ConfigManager getInstance(){
		if(configManager==null){
			configManager=new ConfigManager();
		}
		return configManager;
	}
	
	/**
	 * Get the value of the specified key(获取指定key的值)
	 * @param key
	 * @return
	 */
	public String getString(String key){
		return properties.getProperty(key);
	}
}
