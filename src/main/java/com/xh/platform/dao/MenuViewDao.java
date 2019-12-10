package com.xh.platform.dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.xh.platform.model.MenuView;
import com.xh.platform.utils.DataBaseUtil;

/**
 * 菜单视图
 * @author ningxinyu
 *
 */
public class MenuViewDao extends DataBaseUtil{
	/**
	 * 添加菜单视图
	 * @param menuView
	 * @param picPath
	 * @return
	 */
	public int addMeanView(MenuView menuView,MultipartFile picPath){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		InputStream fis=null;
		int rows=0;
		try {

			conn=super.getConnection();
			//fis=new FileInputStream(picPath);
			fis=picPath.getInputStream();
			String sql="insert into menu_view(user_id,system_id,current_menu_id,path,encryption_path,menu_name,menu_abbreviation,menu_number,menu_image,is_delete) "
					+ "values(?,?,?,?,?,?,?,?,?,?)";
					preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
					preparedStatement.setString(1, menuView.getUserId());
					preparedStatement.setString(2, menuView.getSystemId());
					preparedStatement.setString(3, menuView.getCurrentMenuId());
					preparedStatement.setString(4, menuView.getPath());
					preparedStatement.setString(5, menuView.getEncryptionPath());
					preparedStatement.setString(6, menuView.getMenuName());
					preparedStatement.setString(7, menuView.getMenuAbbreviation());
					preparedStatement.setString(8, menuView.getMenuNumber());
					preparedStatement.setBinaryStream(9, fis,fis.available());
					preparedStatement.setInt(10, menuView.getIsDelete());
			
			rows=preparedStatement.executeUpdate();
			if(rows>0){
				System.out.println("-------The CivilAviationBox--Menu view added successfully(民航盒子-菜单视图添加成功)-------");
			}
				
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			this.closeAll(rs, preparedStatement, conn);
		}
		
		return rows;
	}
	
	/**
	 * 删除菜单视图
	 * @param id
	 * @return
	 */
	public int delMenuView(Integer id){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		int rows=0;
		String sql=null;
		try {

			conn=super.getConnection();
			if(id!=null){
				sql="delete from menu_view where id="+id;
			};
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			rows=preparedStatement.executeUpdate();
			if(rows>0){
				System.out.println("-------The CivilAviationBox--Menu view deletion succeeded(民航盒子-菜单视图删除成功)-------");
			}
				
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
		}
		return rows;
	}
	
	/**
	 * 查询菜单视图
	 * @return
	 */
	public List<MenuView> getMenuViewList(){
		List<MenuView> menuViewList=new ArrayList<MenuView>();
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		
		try {
			conn=super.getConnection();
			
			String sql="select * from menu_view where is_delete=0 order by id asc";
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				MenuView menuView=new MenuView();
				menuView.setId(rs.getInt("id"));
				menuView.setUserId(rs.getString("user_id"));
				menuView.setSystemId(rs.getString("system_id"));
				menuView.setCurrentMenuId(rs.getString("current_menu_id"));
				menuView.setPath(rs.getString("path"));
				menuView.setEncryptionPath(rs.getString("encryption_path"));
				menuView.setMenuName(rs.getString("menu_name"));
				menuView.setMenuAbbreviation(rs.getString("menu_abbreviation"));
				menuView.setMenuNumber(rs.getString("menu_number"));
				menuView.setMenuImage(rs.getBytes("menu_image"));
				menuView.setIsDelete(rs.getInt("is_delete"));
				
				menuViewList.add(menuView);
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return menuViewList;
	}
	
	
	/**
	 * 查询菜单视图
	 * @return
	 */
	public List<MenuView> getMenuList(int pageNo,int pageSize){
		List<MenuView> menuViewList=new ArrayList<MenuView>();
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		
		try {
			conn=super.getConnection();
			
			String sql="select * from menu_view order by id asc limit ?,?";
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			preparedStatement.setInt(1, (pageNo-1)*pageSize);
			preparedStatement.setInt(2, pageSize);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				MenuView menuView=new MenuView();
				menuView.setId(rs.getInt("id"));
				menuView.setUserId(rs.getString("user_id"));
				menuView.setSystemId(rs.getString("system_id"));
				menuView.setCurrentMenuId(rs.getString("current_menu_id"));
				menuView.setPath(rs.getString("path"));
				menuView.setEncryptionPath(rs.getString("encryption_path"));
//				menuView.setMenuName(URLEncoder.encode(rs.getString("menu_name")));
				menuView.setMenuName(java.net.URLEncoder.encode(rs.getString("menu_name"),"UTF-8"));
				menuView.setMenuAbbreviation(rs.getString("menu_abbreviation"));
				menuView.setMenuNumber(rs.getString("menu_number"));
				menuView.setMenuImage(rs.getBytes("menu_image"));
				menuView.setIsDelete(rs.getInt("is_delete"));
				
				menuViewList.add(menuView);
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return menuViewList;
	}
	
	/**
	 * 统计全部菜单数量
	 * @return
	 */
	public int allCount(){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		int rows=0;
		try {
			conn=super.getConnection();
			
			String sql="select count(1) as count from menu_view";
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				rows=rs.getInt("count");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return rows;
	}
	
	
	
	/**
	 * 根据id获取菜单图片
	 * @param id
	 * @return
	 */
	public byte[] getImageById(Integer id){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		byte[] byteData=null;
		try {
			conn=super.getConnection();
			
			String sql="select menu_image from menu_view where id="+id;
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				byteData=rs.getBytes("menu_image");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return byteData;
	}
	
	/**
	 * 根据id查询单条数据
	 * @param id
	 * @return
	 */
	public MenuView getMenuById(Integer id){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		MenuView menuView=new MenuView();
		try {
			conn=super.getConnection();
			
			String sql="select * from menu_view where id="+id;
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				menuView.setId(rs.getInt("id"));
				menuView.setUserId(rs.getString("user_id"));
				menuView.setSystemId(rs.getString("system_id"));
				menuView.setCurrentMenuId(rs.getString("current_menu_id"));
				menuView.setPath(rs.getString("path"));
				menuView.setEncryptionPath(rs.getString("encryption_path"));
				menuView.setMenuName(rs.getString("menu_name"));
				menuView.setMenuAbbreviation(rs.getString("menu_abbreviation"));
				menuView.setMenuNumber(rs.getString("menu_number"));
				menuView.setMenuImage(rs.getBytes("menu_image"));
				menuView.setIsDelete(rs.getInt("is_delete"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return menuView;
	}
	
	
	/**
	 * 根据id修改菜单信息
	 * @param id
	 * @return
	 */
	public int modifyMenuView(MenuView menuView,MultipartFile picPath){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		InputStream fis=null;
		int rows=0;
		String sql=null;
		try {

			conn=super.getConnection();
			fis=picPath.getInputStream();
			sql="update menu_view set `user_id`=?,`system_id`=?,current_menu_id=?,path=?,encryption_path=?,menu_name=?,menu_abbreviation=?,menu_number=?,menu_image=?,`is_delete`=? where id="+menuView.getId();
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			preparedStatement.setString(1, menuView.getUserId());
			preparedStatement.setString(2, menuView.getSystemId());
			preparedStatement.setString(3, menuView.getCurrentMenuId());
			preparedStatement.setString(4, menuView.getPath());
			preparedStatement.setString(5, menuView.getEncryptionPath());
			preparedStatement.setString(6, menuView.getMenuName());
			preparedStatement.setString(7, menuView.getMenuAbbreviation());
			preparedStatement.setString(8, menuView.getMenuNumber());
			preparedStatement.setBinaryStream(9,fis,fis.available());
			preparedStatement.setInt(10,menuView.getIsDelete());
		
			rows=preparedStatement.executeUpdate();
			
			if(rows>0){
				System.out.println("-------The CivilAviationBox--modify the menu view successfully(民航盒子-菜单视图修改成功)-------");
			}
				
		} catch (SQLException e) {
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			this.closeAll(rs, preparedStatement, conn);
		}
		
		return rows;
	}
	
	/**
	 * 统计菜单数量
	 * @return
	 */
	public int count(){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		int rows=0;
		try {
			conn=super.getConnection();
			
			String sql="select count(1) as count from menu_view where is_delete=0";
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				rows=rs.getInt("count");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return rows;
	}
	
	/**
	 * 判断菜单名称(中文)是否重复
	 * @param menuName
	 * @return
	 */
	public int isExistChiness(String menuName){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		int rows=0;
		try {
			conn=super.getConnection();
			
			String sql="select count(1) as count from menu_view where menu_name=?";
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			preparedStatement.setString(1, menuName);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				rows=rs.getInt("count");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return rows;
	}
	
	
	/**
	 * 判断菜单名称缩写是否重复
	 * @param menuAbbreviation
	 * @return
	 */
	public int isExistAbbreviation(String menuAbbreviation){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		int rows=0;
		try {
			conn=super.getConnection();
			
			String sql="select count(1) as count from menu_view where menu_abbreviation=?";
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			preparedStatement.setString(1, menuAbbreviation);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				rows=rs.getInt("count");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return rows;
	}
	
	
	/**
	 * 判断菜单编号是否重复
	 * @param menuNumber
	 * @return
	 */
	public int isExistNumber(String menuNumber){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		int rows=0;
		try {
			conn=super.getConnection();
			
			String sql="select count(1) as count from menu_view where menu_number=?";
			
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			preparedStatement.setString(1, menuNumber);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				rows=rs.getInt("count");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
			}
		return rows;
	}
	
	/**
	 * 修改菜单开启状态
	 * @param id
	 * @return
	 */
	public int mdfMenuFlag(Integer id){
		Connection conn=null;
		PreparedStatement preparedStatement=null;
		int rows=0;
		String sql=null;
		try {

			conn=super.getConnection();
			if(id!=null){
				sql="update menu_view set is_delete=0 where id="+id;
			};
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			rows=preparedStatement.executeUpdate();
			if(rows>0){
				System.out.println("-------The CivilAviationBox--menu open state has been modified successfully(民航盒子-菜单开启状态修改成功)-------");
			}
				
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.closeAll(rs, preparedStatement, conn);
		}
		return rows;
	}
}
