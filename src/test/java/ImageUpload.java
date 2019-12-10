

import java.io.IOException;
import java.io.InputStream;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.xh.platform.utils.ImageUtil;
/**
 * 添加图片数据文件
 * @author ningxinyu
 *
 */
public class ImageUpload {
	
	public static void main(String args[]){
		String filePath="C:\\Users\\LOVEYOU\\Desktop\\民航盒子\\images\\icon_rt.png";
		Connection conn=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String user="root";
			String password="123456";
			String url="jdbc:mysql://10.42.48.144:3306/menu_view?characterEncoding=utf-8";
			
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
//			String sql="insert into pic_bak(ID,BH,PIC,RGSJ,PICTYPE) values(?,?,?,?,?)";
//			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
//			preparedStatement.setString(1, "0010125");
//			preparedStatement.setString(2, "125");
//			preparedStatement.setBinaryStream(3, in,in.available());
//			preparedStatement.setLong(4, 20170610);
//			preparedStatement.setDouble(5, 2.2);
//			preparedStatement.execute();
			
			String sql="update menu_view set menu_image=? where id=7";
			preparedStatement=(PreparedStatement) conn.prepareStatement(sql);
			preparedStatement.setBinaryStream(1,in,in.available());
			preparedStatement.executeUpdate();
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
