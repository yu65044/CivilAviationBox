package com.xh.platform.model;

import java.io.Serializable;

/**
 * 菜单视图
 * @author ningxinyu
 *
 */
public class MenuView implements Serializable{

	private static final long serialVersionUID = -2910885558395259185L;
	/**序号*/
	private Integer id;
	/**用户编号*/
	private String userId;
	/**系统编号*/
	private String systemId;
	/**菜单编号*/
	private String currentMenuId;
	/**系统路径*/
	private String path;
	/**加密路径*/
	private String encryptionPath;
	/**菜单名称*/
	private String menuName;
	/**菜单名称缩写*/
	private String menuAbbreviation;
	/**菜单编号*/
	private String menuNumber;
	/**菜单图片*/
	private byte[] menuImage;
	/**是否删除*/
	private Integer isDelete;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSystemId() {
		return systemId;
	}
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	public String getCurrentMenuId() {
		return currentMenuId;
	}
	public void setCurrentMenuId(String currentMenuId) {
		this.currentMenuId = currentMenuId;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
	
	public String getEncryptionPath() {
		return encryptionPath;
	}
	public void setEncryptionPath(String encryptionPath) {
		this.encryptionPath = encryptionPath;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuAbbreviation() {
		return menuAbbreviation;
	}
	public void setMenuAbbreviation(String menuAbbreviation) {
		this.menuAbbreviation = menuAbbreviation;
	}

	public String getMenuNumber() {
		return menuNumber;
	}
	public void setMenuNumber(String menuNumber) {
		this.menuNumber = menuNumber;
	}
	public byte[] getMenuImage() {
		return menuImage;
	}
	public void setMenuImage(byte[] menuImage) {
		this.menuImage = menuImage;
	}
	public Integer getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}
	
	
	
}
