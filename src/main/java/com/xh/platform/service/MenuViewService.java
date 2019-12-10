package com.xh.platform.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.xh.platform.model.MenuView;

/**
 * 菜单视图
 * @author ningxinyu
 *
 */
public interface MenuViewService {

	/**
	 * 添加菜单视图
	 * @param menuView
	 * @param picPath
	 * @return
	 */
	public int addMeanView(MenuView menuView,MultipartFile picPath);
	/**
	 * 删除菜单视图
	 * @param id
	 * @return
	 */
	public int delMenuView(Integer id);
	/**
	 * 查询菜单视图
	 * @return
	 */
	public List<MenuView> getMenuViewList();
	/**
	 * 根据id获取菜单图片
	 * @param id
	 * @return
	 */
	public byte[] getImageById(Integer id);
	/**
	 * 根据id修改菜单信息
	 * @param id
	 * @return
	 */
	public int modifyMenuView(MenuView menuView,MultipartFile picPath);
}
