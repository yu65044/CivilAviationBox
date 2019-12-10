package com.xh.platform.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xh.platform.dao.MenuViewDao;
import com.xh.platform.model.MenuView;
import com.xh.platform.utils.MD5Util;

import net.sf.json.JSONObject;

/**
 * 菜单视图
 * @author ningxinyu
 *
 */
@Controller
@RequestMapping("/menuViewController")
public class MenuViewController {
	
	/**菜单视图*/
	private MenuViewDao menuViewDao=new MenuViewDao();
	Logger logger=Logger.getLogger(MenuViewController.class);
	/**
	 * 菜单视图主页
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String menuViewIndex(HttpServletRequest request, Model model) {
		
		String currentMenuId = request.getParameter("currentMenuId");
		request.setAttribute("currentMenuId",currentMenuId);
	
		List<MenuView> menuViewList=null;
		int count=0;
		try {
			menuViewList = menuViewDao.getMenuViewList();
			count=menuViewDao.count();
		} catch (Exception e) {
			logger.error("菜单视图加载异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		request.setAttribute("menuViewList",menuViewList);
		request.setAttribute("count",count);
		
		
//		String str=menuViewService.findAllBySQL(request, null);
//		JSONObject obj = JSONObject.fromObject(str);
		
		/*List<MenuViewDto> menuList=(List<MenuViewDto>) obj.get("data");
		if(obj.getBoolean("success")){
			request.setAttribute("MenuViewList",obj.get("data"));
		}*/
		
		
		return "menuView/index";
	}
	
	
	/**
	 * 根据Id获取菜单图片
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/getImage", method = RequestMethod.GET)
	public void getImageById(HttpServletRequest request,HttpServletResponse response){
		Integer id=Integer.parseInt(request.getParameter("id"));
		try {
			byte[] b = menuViewDao.getImageById(id);
			for (int i = 0; i < b.length; i++) {
			    if (b[i] < 0) {
				b[i] += 256;
			    }
			}

			if (b.length > 0) {
			    response.setContentType("image/jepg");
			    response.setCharacterEncoding("UTF-8");
			    OutputStream outputStream = response.getOutputStream();
			    InputStream in = new ByteArrayInputStream(b);
			    int len = 0;

			    byte[] buf = new byte[1024];
			    while ((len = in.read(buf, 0, 1024)) != -1) {
				outputStream.write(buf, 0, len);
			    }
			    outputStream.flush();
			    outputStream.close();
			}

		} catch (Exception e) {
			logger.error("图片加载异常，请确认此图片在数据库表中是否存在。。。"+e.getMessage());
		    e.printStackTrace();
		}

	}
	
	
	
	/**
	 * 菜单链接转发到各个系统
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping(value = "/forward", method = RequestMethod.GET)
	public void forward(HttpServletRequest request,HttpServletResponse response) throws IOException{
//		PrintWriter out=response.getWriter();
		String url=MD5Util.decrypt(request.getParameter("url"));
//		CloseableHttpResponse resp=null;
//		String content="";
		try {
			if(url!=null&&!("").equals(url)){
			//request.getRequestDispatcher(url).forward(request, response);
			response.sendRedirect(url);
			}
//			HttpClient httpClient=new DefaultHttpClient();
//			HttpContext httpContext=new BasicHttpContext();
//			CloseableHttpClient closeableHttpClient=HttpClients.createDefault();
//			HttpGet httpGet=new HttpGet(url);
//			resp=closeableHttpClient.execute(httpGet);
//			if(resp.getStatusLine().getStatusCode()==200){
//				content=EntityUtils.toString(resp.getEntity(),"utf-8");
//			}
//			out.write(content);
		} catch (IOException e) {
			logger.error("URL重定向异常，请确认此URL是否真实有效。。。"+e.getMessage());
			e.printStackTrace();
		}
	
	}
	
	/**
	 * 添加新菜单
	 * @param request
	 * @param response
	 * @param excelFile
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/addMenuView",produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	public String addMenuView(HttpServletRequest request,HttpServletResponse response,@RequestParam("picPath") MultipartFile picPath){
		
		int i=0;
		try {
			MenuView menuView=new MenuView();
			
			menuView.setUserId("0");//request.getParameter("userId"));
			menuView.setSystemId("0");//request.getParameter("systemId"));
			menuView.setCurrentMenuId("0");//request.getParameter("currentMenuId"));
			menuView.setPath(request.getParameter("path"));
			menuView.setEncryptionPath(MD5Util.encrypt(request.getParameter("path")));
			menuView.setMenuName(request.getParameter("menuName"));
			menuView.setMenuAbbreviation(request.getParameter("menuAbbreviation"));
			menuView.setMenuNumber(request.getParameter("menuNumber"));
			menuView.setIsDelete(Integer.parseInt(request.getParameter("isDelete")));
//			String picPath=request.getParameter("picPath");
//			File file=new File(picPath);
//			picPath=file.getAbsolutePath();
			
			int count=menuViewDao.count();
			if(count>=96){
				System.out.println("------The menu is out of quantity(菜单数量超出)------");
			}else{
				i = menuViewDao.addMeanView(menuView, picPath);
			}
		} catch (Exception e) {
			logger.error("添加菜单异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
		
		if(i>0){
			obj.put("success", true);
			obj.put("message", "Menu added successfully!");
		}else{
			obj.put("success", false);
			obj.put("message", "Menu addition failed!");
		}
		return obj.toString();
	}
	
	/**
	 * 打开菜单列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/openMenuList")
	public String openMenuList(HttpServletRequest request,HttpServletResponse response){
		return "menuView/menu_list";
	}
	
	
	/**
	 * 查询菜单列表
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/menuList",produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
	public String getMenuViewList(HttpServletRequest request,HttpServletResponse response){
		
		String page=request.getParameter("page");
		String pageSize=request.getParameter("rows");
		List<MenuView> menuViewList=null;
		int count=0;
		try {
			menuViewList = menuViewDao.getMenuList(Integer.parseInt(page),Integer.parseInt(pageSize));
			count = menuViewDao.allCount();
		} catch (NumberFormatException e) {
			logger.error("获取菜单列表异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
		obj.put("total", count);
		obj.put("rows", menuViewList);
		return obj.toString();
	}
	
	/**
	 * 打开菜单添加页面
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/openAddPage")
	public String openAddPage(HttpServletRequest request,HttpServletResponse response){
		return "menuView/add_data";
	}
	
	/**
	 * 判断菜单名称(中文)是否重复
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/isExistChiness",produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	public String isExistChiness(HttpServletRequest request,HttpServletResponse response) {
		String menuName=request.getParameter("menuName");
		int num=0;
		try {
			num = menuViewDao.isExistChiness(menuName);
		} catch (Exception e) {
			logger.error("数据校验异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
	
		if(num>0){
			obj.put("isExist", true);
			obj.put("message", "The menu name(Chinese) already exists,Please re-enter it!");
		}else{
			obj.put("isExist", false);
			obj.put("message", "Can input!");
		}
		return obj.toString();
	}
	
	/**
	 * 判断菜单名称缩写是否重复
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/isExistAbbreviation",produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	public String isExistAbbreviation(HttpServletRequest request,HttpServletResponse response) {
		String menuAbbreviation=request.getParameter("menuAbbreviation");
		int num=0;
		try {
			num = menuViewDao.isExistAbbreviation(menuAbbreviation);
		} catch (Exception e) {
			logger.error("数据校验异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
	
		if(num>0){
			obj.put("isExist", true);
			obj.put("message", "The menu name abbreviation already exists,Please re-enter it!");
		}else{
			obj.put("isExist", false);
			obj.put("message", "Can input!");
		}
		return obj.toString();
	}
	
	
	/**
	 * 判断菜单编号是否重复
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/isExistNumber",produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	public String isExistNumber(HttpServletRequest request,HttpServletResponse response) {
		String menuNumber=request.getParameter("menuNumber");
		int num=0;
		try {
			num = menuViewDao.isExistNumber(menuNumber);
		} catch (Exception e) {
			logger.error("数据校验异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
	
		if(num>0){
			obj.put("isExist", true);
			obj.put("message", "The menu name number already exists,Please re-enter it!");
		}else{
			obj.put("isExist", false);
			obj.put("message", "Can input!");
		}
		return obj.toString();
	}
	
	/**
	 * 删除菜单
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/delMenu",produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	public String delMenu(HttpServletRequest request,HttpServletResponse response){
		
		String id=request.getParameter("id");
		int num=0;
		try {
			num = menuViewDao.delMenuView(Integer.parseInt(id));
		} catch (NumberFormatException e) {
			logger.error("删除菜单信息异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
		if(num>0){
			obj.put("success", true);
			obj.put("message", "Menu deletion succeeded!");
		}else{
			obj.put("success", false);
			obj.put("message", "Menu deletion failed!");
		}
		return obj.toString();
	}
	
	
	/**
	 * 修改菜单
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/mdfMenu", method = RequestMethod.GET)
	public String mdfMenu(HttpServletRequest request,HttpServletResponse response){
		
		String id=request.getParameter("id");
		MenuView menuView=null;
		try {
			menuView = menuViewDao.getMenuById(Integer.parseInt(id));
		} catch (NumberFormatException e) {
			logger.error("跳转修改菜单页面异常，请检查页面路径。。。"+e.getMessage());
			e.printStackTrace();
		}
		request.setAttribute("menuView", menuView);
		
		return "menuView/update_data";
	}
	
	
	/**
	 * 修改保存
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/saveMenu",produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	public String saveMenu(HttpServletRequest request,HttpServletResponse response,@RequestParam("picPath") MultipartFile picPath){
		
		int num=0;
		try {
			MenuView menuView=new MenuView();
			menuView.setId(Integer.parseInt(request.getParameter("id")));
			menuView.setUserId("0");//request.getParameter("userId"));
			menuView.setSystemId("0");//request.getParameter("systemId"));
			menuView.setCurrentMenuId("0");//request.getParameter("currentMenuId"));
			menuView.setPath(request.getParameter("path"));
			menuView.setEncryptionPath(MD5Util.encrypt(request.getParameter("path")));
			menuView.setMenuName(request.getParameter("menuName"));
			menuView.setMenuAbbreviation(request.getParameter("menuAbbreviation"));
			menuView.setMenuNumber(request.getParameter("menuNumber"));
			menuView.setIsDelete(Integer.parseInt(request.getParameter("isDelete")));
			num = menuViewDao.modifyMenuView(menuView, picPath);
		} catch (Exception e) {
			logger.error("保存菜单信息异常，请检查各参数是否为NULL。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
		if(num>0){
			obj.put("success", true);
			obj.put("message", "Menu modification successful!");
		}else{
			obj.put("success", false);
			obj.put("message", "Menu modification failed!");
		}
		return obj.toString();
	}
	
	/**
	 * 修改菜单开启状态
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/mdfFlag",produces = "application/json;charset=UTF-8",method = RequestMethod.POST)
	public String mdfFlag(HttpServletRequest request,HttpServletResponse response){
		
		Integer id=Integer.parseInt(request.getParameter("id"));
		
		int num=0;
		try {
			num = menuViewDao.mdfMenuFlag(id);
		} catch (Exception e) {
			logger.error("数据修改异常，请检查数据库连接。。。"+e.getMessage());
			e.printStackTrace();
		}
		JSONObject obj=new JSONObject();
		if(num>0){
			obj.put("success", true);
			obj.put("message", "The menu open state has been modified successfully!");
		}else{
			obj.put("success", false);
			obj.put("message", "Menu open state modification failed!");
		}
		return obj.toString();
	}
}
