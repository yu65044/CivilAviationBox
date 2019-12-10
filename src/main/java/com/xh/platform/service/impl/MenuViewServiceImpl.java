package com.xh.platform.service.impl;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.xh.platform.dao.MenuViewDao;
import com.xh.platform.model.MenuView;
import com.xh.platform.service.MenuViewService;

/**
 * 菜单视图
 * @author ningxinyu
 *
 */
//@Repository
public class MenuViewServiceImpl implements MenuViewService{
	
	private MenuViewDao menuViewDao=new MenuViewDao();
	/**
	 * 添加菜单视图
	 * @param menuView
	 * @param picPath
	 * @return
	 */
	@Override
	public int addMeanView(MenuView menuView, MultipartFile picPath) {
		
		return menuViewDao.addMeanView(menuView, picPath);
	}
	/**
	 * 删除菜单视图
	 * @param id
	 * @return
	 */
	@Override
	public int delMenuView(Integer id) {
		
		return menuViewDao.delMenuView(id);
	}
	/**
	 * 查询菜单视图
	 * @return
	 */
	@Override
	public List<MenuView> getMenuViewList() {
		
		return menuViewDao.getMenuViewList();
	}
	/**
	 * 根据id获取菜单图片
	 * @param id
	 * @return
	 */
	@Override
	public byte[] getImageById(Integer id) {
		
		return menuViewDao.getImageById(id);
	}
	/**
	 * 根据id修改菜单信息
	 * @param id
	 * @return
	 */
	@Override
	public int modifyMenuView(MenuView menuView, MultipartFile picPath) {
		
		return menuViewDao.modifyMenuView(menuView, picPath);
	}
	
}
