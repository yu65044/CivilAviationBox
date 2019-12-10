
import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class test {
	/**
	 * 获取用户详细信息
	 * @param userCode
	 * @return
	 */
	public static String getCode() {
			CloseableHttpClient httpCilent2 = HttpClients.createDefault();
	        RequestConfig requestConfig = RequestConfig.custom()
	                .setConnectTimeout(5000)   //设置连接超时时间
	                .setConnectionRequestTimeout(5000) // 设置请求超时时间
	                .setSocketTimeout(5000)
	                .setRedirectsEnabled(true)//默认允许自动重定向
	                .build();
	        HttpGet httpGet2 = new HttpGet("https://msjw.ga.sz.gov.cn/wxsite/weixin/cms/getWeixinCode"
				+ "?appid=wx43154456b4c489e3&redirect_uri=http://www.baidu.com");
	        httpGet2.setConfig(requestConfig);
	        String srtResult = "";
	        try {
	            HttpResponse httpResponse = httpCilent2.execute(httpGet2);
	            if(httpResponse.getStatusLine().getStatusCode() == 200){
	                srtResult = EntityUtils.toString(httpResponse.getEntity());//获得返回的结果
	                System.out.println(srtResult);
	            }else if(httpResponse.getStatusLine().getStatusCode() == 400){
	                //..........
	            }else if(httpResponse.getStatusLine().getStatusCode() == 500){
	                //.............
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }finally {
	            try {
	                httpCilent2.close();
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
			return srtResult;
	}
	
	public static String getOpenId(String code) {
		CloseableHttpClient httpCilent2 = HttpClients.createDefault();
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectTimeout(5000)   //设置连接超时时间
                .setConnectionRequestTimeout(5000) // 设置请求超时时间
                .setSocketTimeout(5000)
                .setRedirectsEnabled(true)//默认允许自动重定向
                .build();
        HttpGet httpGet2 = new HttpGet("https://msjwt.ga.sz.gov.cn/bmswx/mobile/common/openid"
				+ "?code=061K0pQd21d5YG0h3VPd2Q8dQd2K0pQL&account=7");
        httpGet2.setConfig(requestConfig);
        String srtResult = "";
        try {
            HttpResponse httpResponse = httpCilent2.execute(httpGet2);
            if(httpResponse.getStatusLine().getStatusCode() == 200){
                srtResult = EntityUtils.toString(httpResponse.getEntity());//获得返回的结果
                System.out.println(srtResult);
            }else if(httpResponse.getStatusLine().getStatusCode() == 400){
                //..........
            }else if(httpResponse.getStatusLine().getStatusCode() == 500){
                //.............
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                httpCilent2.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
		return srtResult;
	}
	
	
	public static void main(String[] args) {
		getOpenId(null);
	}
	
}
