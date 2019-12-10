package com.xh.platform.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

/**
 * 时间工具类
 * @author frying
 *
 */
@SuppressWarnings("unchecked")
public final class DateUtil {

	public final static int LASTDAY = 26;
	public static final long MILLISECOND_PER_DAY = 86400000;
	protected static Logger logger = LoggerFactory.getLogger(DateUtil.class);
	
	@SuppressWarnings("unused")
	private static String timePattern = "HH:mm";

	private DateUtil() {
	}

	public static String getDatePattern() {
		String defaultDatePattern = "yyyy-MM-dd";
		return defaultDatePattern;
	}

	public static String dateToStr(Date date) {
		SimpleDateFormat df = new SimpleDateFormat(getDatePattern());
		return df.format(date);
	}
	
	public static String dateToStr4format(Date date,final String formatStr) {
		SimpleDateFormat df = new SimpleDateFormat(formatStr);
		return df.format(date);
	}
	
	public static String dateToStrNoYear(Date date) {
		SimpleDateFormat df = new SimpleDateFormat("MM-dd");
		return df.format(date);
	}

	public static String dateToStr(Date date, String datePattern) {
		SimpleDateFormat df = new SimpleDateFormat(datePattern);
		return df.format(date);
	}

	public static String getNow() {
    	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
       String nowstr = df.format(new Date());       
       return nowstr;
    }
	
	public static Date strToDate(String str) {
		Date date = null;
		try {
			date = DateUtils.parseDate(str, new String[] { "yyyy-MM-dd" });
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	/**
	 * 根据用户提供的日期格式将日期格式化成date格式，如果异常则返回NULL
	 * @param date
	 * @param datePattern 例(YYYYMM)
	 * @return
	 * @throws ParseException
	 */
	public static Date strToDateNew(String date,String datePattern){
		try {
			SimpleDateFormat df = new SimpleDateFormat(datePattern);
			return df.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 根据用户提供的日期格式将日期格式化成date格式，如果异常则返回NULL
	 * @param date
	 * @param datePattern 例(YYYYMM)
	 * @return
	 * @throws ParseException
	 */
	public static String formatDate2Str(String date,String datePattern){
		try {
			SimpleDateFormat df = new SimpleDateFormat(datePattern);
			Date resultDate = df.parse(date);
			return df.format(resultDate);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * format date
	 *
	 * @param date
	 * @return
	 */
	public static String formatDate(Date date) {
		return formatDate(date, null);
	}

	/**
	 * format date
	 *
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String formatDate(Date date, String pattern) {
		String strDate = null;
		try {
			String YYYYMMDD = "yyyy-MM-dd";
			if(pattern == null) {
				pattern = YYYYMMDD;
			}
			SimpleDateFormat format = new SimpleDateFormat(pattern);
			strDate = format.format(date);
		} catch (Exception e) {
			logger.error("formatDate error:", e);
			e.printStackTrace();
		}
		return strDate;
	}
	
	public static String formatDateTime(Date date) {
		String strDate = null;
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			strDate = format.format(date);
		} catch (Exception e) {
			logger.error("formatDate error:", e);
			e.printStackTrace();
		}
		return strDate;
	}
	
	public static String formatTime(Date date) {
		String strDate = null;
		try {
			SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
			strDate = format.format(date);
		} catch (Exception e) {
			logger.error("formatDate error:", e);
			e.printStackTrace();
		}
		return strDate;
	}
	/**
	 * 蒋新明添加
	 * 用来转化把包含时分秒的时间字符串
	 * @param str
	 * @return
	 */
	public static Date strToTime(String str) {
		Date date = null;
		try {
			date = DateUtils.parseDate(str, new String[] {  "yyyy-MM-dd" ,"yyyy-MM-dd HH:mm","yyyy-MM-dd HH:mm:ss" });
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	public static String getLastMonthStr() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, -1);
		Date d1 = cal.getTime();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMM");
		String lastMonthStr = df.format(d1);
		return lastMonthStr;
	}

	public static String getThisMonthStr() {
		Calendar cal = Calendar.getInstance();
		Date d1 = cal.getTime();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMM");
		String lastMonthStr = df.format(d1);
		return lastMonthStr;
	}

	public static String getTodayBhStr() {
		Calendar cal = Calendar.getInstance();
		Date d1 = cal.getTime();
		SimpleDateFormat df = new SimpleDateFormat("yyMMdd");
		return df.format(d1);
	}
	
	public static String getTodayBhStr2() {
		Calendar cal = Calendar.getInstance();
		Date d1 = cal.getTime();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		return df.format(d1);
	}	
	
	@SuppressWarnings("static-access")
	public static Integer getAgoBh(int dayNo) {
		Calendar cal = Calendar.getInstance();
		cal.add(cal.DAY_OF_MONTH,-dayNo+1);
		Date d1 = cal.getTime();
		SimpleDateFormat df = new SimpleDateFormat("yyMMdd");
		return  Integer.valueOf(df.format(d1)+"0000") ;
	}

	public static Date getThisMonthEndDate() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	/**
	 * 获取当前月份下一个月的最后一天
	 * @return
	 */
	public static Date getNextThisMonthEndDate() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, +1);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	/**
	 * 获取上一个月的最后一天
	 * @return
	 */
	public static Date getLastMonthEndDate() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, -1);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	
	/**
	 * 获取某月的第一天（-0:当有，-1:下月，-1:上月）
	 * @param i
	 * @return
	 */
	public static Date getMonthStartDate(int i) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, i);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	
	/**
	 * 获取某月的最后一天（-0:当有，-1:下月，-1:上月）
	 * @param i
	 * @return
	 */
	public static Date getMonthEndDate(int i) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, i);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	
	/**
	 * 取得上个月的第一天
	 * @return
	 */
	public static Date getLastMonthStartDate() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, -1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	
	/**
	 * 获取当前月份下一个月的第一天
	 * @return
	 */
	public static Date getNextLastMonthStartDate() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, +1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	
	public static Date getThisMonthStartDate() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}

	public static String getCNYearMonthStr(String yearMonth) {
		Assert.isTrue(yearMonth.length() == 6);
		int year = Integer.parseInt(yearMonth.substring(0, 4));
		int month = Integer.parseInt(yearMonth.substring(4));
		return year + "年" + month + "月";
	}

	public static String getFirstDayOfMonth(String yearMonth) {
		Assert.isTrue(yearMonth.length() == 6);
		int year = Integer.parseInt(yearMonth.substring(0, 4));
		int month = Integer.parseInt(yearMonth.substring(4));
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, 1);
		return dateToStr(getFirstDayOfMonthDate(yearMonth));
	}

	public static Date getFirstDayOfMonthDate(String yearMonth) {
		Assert.isTrue(yearMonth.length() == 6);
		int year = Integer.parseInt(yearMonth.substring(0, 4));
		int month = Integer.parseInt(yearMonth.substring(4));
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, 1);
		return cal.getTime();
	}

	public static String getLastDayOfMonth(String yearMonth) {
		return dateToStr(getLastDayOfMonthDate(yearMonth));
	}

	public static Date getLastDayOfMonthDate(String yearMonth) {
		Assert.isTrue(yearMonth.length() == 6);
		int year = Integer.parseInt(yearMonth.substring(0, 4));
		int month = Integer.parseInt(yearMonth.substring(4));
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, 1);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		return cal.getTime();
	}

	public static Integer getMonthDays(String yearMonth) {
		Assert.isTrue(yearMonth.length() == 6);
		int year = Integer.parseInt(yearMonth.substring(0, 4));
		int month = Integer.parseInt(yearMonth.substring(4));
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, 1);
		return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 计算天数 
	 * @param beginDate yyyy-MM-dd
	 * @param endDate yyyy-MM-dd
	 * @return
	 */
	public static int daysBetween(String beginDate, String endDate) {
		try {

			Date date1 = DateUtils.parseDate(beginDate, new String[] { "yyyy-MM-dd" });
			Date date2 = DateUtils.parseDate(endDate, new String[] { "yyyy-MM-dd" });
			long days = Math.abs((date2.getTime() - date1.getTime()) / MILLISECOND_PER_DAY) + 1;
			// log.debug("beginDate:"+beginDate+"\tendDate:"+endDate+"\tdays："+days);
			return new Long(days).intValue();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	/**
	 * 用在请假间隔天数
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public static int daysBetween(Date beginDate, Date endDate) {
		long days = ((endDate.getTime() - beginDate.getTime()) / MILLISECOND_PER_DAY) + 1;
		return new Long(days).intValue();
	}
	
	/**
	 * 获取指定月份
	 * @param monthStr yyyyMM格式
	 * @param monthAdd
	 * @return
	 */
	public static String getMonthStr(String monthStr, int monthAdd) {
		if (monthAdd == 0) {
			return monthStr;
		}

		int year = Integer.parseInt(monthStr.substring(0, 4));
		int month = Integer.parseInt(monthStr.substring(4));
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, 1);
		cal.add(Calendar.MONTH, monthAdd);
		Date d1 = cal.getTime();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMM");
		String newmonthStr = df.format(d1);
		return newmonthStr;
	}

	public static String[] getMonthStr(String monthStr) {
		int year = Integer.parseInt(monthStr.substring(0, 4));
		int month = Integer.parseInt(monthStr.substring(4));
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, 1);
		int maxDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		String[] dates = new String[maxDay];
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		for (int i = 0; i < maxDay; i++) {

			dates[i] = df.format(cal.getTime());
			cal.add(Calendar.DAY_OF_MONTH, 1);

		}

		return dates;
	}

	public static int getMonthMaxDays(String monthStr) {
		int year = Integer.parseInt(monthStr.substring(0, 4));
		int month = Integer.parseInt(monthStr.substring(4));
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, 1);
		return cal.getMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 只接受开始日期小余等于结束日期
	 * 计算开始日期和结束日期
	 * @param beginDate
	 * @param start
	 * @param endDate
	 * @param end
	 * @return
	 */
	@SuppressWarnings({ "deprecation" })
	public static double computeHolidayNums(Date beginDate, int start, Date endDate, int end) {
		double no = 0;
		if (start == 2) {
			beginDate.setHours(12);
		}
		if (end == 2) {
			endDate.setHours(12);
		}
		//只接受开始日期小余等于结束日期
		Assert.isTrue(beginDate.getTime() <= endDate.getTime());
		double b = endDate.getTime() - beginDate.getTime();
		no = 0.5 + b / MILLISECOND_PER_DAY;
		return no;
	}

	public static Double computeStrHolidayNums(String beginDate, int start, String endDate, int end) {
		try {
			Date d1 = DateUtils.parseDate(beginDate, new String[] { "yyyy-MM-dd" });
			Date d2 = DateUtils.parseDate(endDate, new String[] { "yyyy-MM-dd" });
			return computeHolidayNums(d1, start, d2, end);
		} catch (ParseException e) {
			//e.printStackTrace();
			return null;
		}
	}

	public static List<Integer> getMonthList(int beginMonth, int endMonth) {
		List<Integer> list = new ArrayList<Integer>();

		while (beginMonth <= endMonth) {
			list.add(beginMonth);
			beginMonth = Integer.parseInt(getMonthStr("" + beginMonth, 1));
		}
		return list;
	}


	/**
	 * 取上周的今天
	 * @return
	 */
	public static Date getLastWeekDate() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)-7);
		return cal.getTime();
	}
	
	/**
	 * 取下周的今天
	 * @return
	 */
	public static Date getNextWeekDate() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)+7);
		return cal.getTime();
	}
	
	/**
	 * 日期加1天后再格式化
	 * @param date
	 * @return
	 */
	public static String nextDayToStr(Date date){
		date=new Date(date.getTime()+1*24*60*60*1000);
		return dateToStr(date);
	}
	
	/**
	 * 取给定日期的该月一号
	 * @param date
	 * @return
	 */
	public static Date getMonthStartDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		try {
			return DateUtils.parseDate(dateToStr(cal.getTime()), new String[] { "yyyy-MM-dd" });
		} catch (ParseException e) {
			e.printStackTrace();
			return new Date();
		}
	}
	
	/**
	 * 取给定日期的该月最后一天
	 * @param date
	 * @return
	 */
	public static Date getLastMonthEndDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	
	/**
	 * 取当前日期的前一天
	 * @param date
	 * @return
	 */
	public static Date getYesterdayDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)-1);
		try {
			return DateUtils.parseDate(dateToStr(cal.getTime()), new String[] { "yyyy-MM-dd" });
		} catch (ParseException e) {
			e.printStackTrace();
			return new Date();
		}
	}
	
	/**
	 * 取当前日期的后一天
	 * @param date
	 * @return
	 */
	public static Date getTomorrowDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)+1);
		try {
			return DateUtils.parseDate(dateToStr(cal.getTime()), new String[] { "yyyy-MM-dd" });
		} catch (ParseException e) {
			e.printStackTrace();
			return new Date();
		}
	}
	
	/**
	 * 取当天是否为当月的第一天
	 * @param date
	 * @return
	 */
	public static boolean isFirstDate(Date date){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		if(cal.get(Calendar.DATE)==1){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 是否月末
	 * @param date
	 * @return
	 */
	public static boolean isMonthEndDate(Date date){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		if(cal.get(Calendar.DATE)==cal.getActualMaximum(Calendar.DAY_OF_MONTH)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 取当前的年龄
	 * @param birthDay
	 * @return
	 * @throws Exception
	 */
	public static int getAge(Date birthDay) throws Exception {
        Calendar cal = Calendar.getInstance();

        if (cal.before(birthDay)) {
            throw new IllegalArgumentException("出生时间大于当前时间!");
        }

        int yearNow = cal.get(Calendar.YEAR);
        int monthNow = cal.get(Calendar.MONTH) + 1;//注意此处，如果不加1的话计算结果是错误的
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);
        cal.setTime(birthDay);

        int yearBirth = cal.get(Calendar.YEAR);
        int monthBirth = cal.get(Calendar.MONTH);
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);

        int age = yearNow - yearBirth;

        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                if (dayOfMonthNow < dayOfMonthBirth) {
                    age--;
                } 
            } else {
                age--;
            }
        } 
        return age;
    }
	
	/**
	 * 取上周五
	 * @return
	 */
	public static Date getLastThursday(){
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_WEEK , 6);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)-7);
		return cal.getTime();
	}
	
	/**
	 * 取这周四
	 * @return
	 */
	public static Date getThisWednesday(){
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_WEEK , 5);
		return cal.getTime();
	}
	
	/**
	 * 取规定日期之前的X天的日期
	 * @param date
	 * @param i
	 * @return
	 */
	public static Date getBeforeDay(Date date, int i) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)-i);
		return cal.getTime();
	}
	
	/**
	 * 取规定日期之后的X天的日期
	 * @param date
	 * @param i
	 * @return
	 */
	public static Date getAfterDay(Date date, int i) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)+i);
		return cal.getTime();
	}
	
	/**
	 * 取两个时间之间的日期数组(用于工作日志统计报表)
	 * @param soStartTime
	 * @param soEndTime
	 * @return
	 */
	public static String[] getDays(Date soStartTime, Date soEndTime){
		
		ArrayList<String> list=new ArrayList<String>();
		
		//将开始时间添加进去
		list.add(dateToStr(soStartTime));
		
		//循环迭代两个时间之间的日期数组
		if(soStartTime.before(soEndTime)){
			addDay(soStartTime, soEndTime, list);
		}
		
		//将日期放入数组中
		String[] times=new String[list.size()];
		int i=0;
		for(String time:list){
			times[i]=time;
			i++;
		}
		
		return times;
	}
	
	/**
	 * 循环迭代出两个时间之间的日期数组
	 * @param soStartTime
	 * @param soEndTime
	 * @param list
	 */
	public static void addDay(Date soStartTime, Date soEndTime, ArrayList<String> list){
		Calendar cal = Calendar.getInstance();
		cal.setTime(soStartTime);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE)+1);
		soStartTime=cal.getTime();
		list.add(dateToStr(soStartTime));
		
		if(soStartTime.before(soEndTime)){
			addDay(soStartTime, soEndTime, list);
		}
	}
	
	/**
	 * 根据用户提供的日期格式将日期格式化成date格式，如果异常则返回NULL
	 * @param date
	 * @param datePattern 例(YYYYMM)
	 * @return
	 * @throws ParseException
	 */
	public static Date strToDate(String date,String datePattern){
		try {
			SimpleDateFormat df = new SimpleDateFormat(datePattern);
			return df.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	} 
	
	/**
	 * 根据用户提供的日期格式将日期格式化成date格式，如果异常则抛出
	 * @param date
	 * @param datePattern
	 * @return
	 * @throws Exception
	 */
	public static Date strToDate2(String date,String datePattern) throws Exception{
		SimpleDateFormat df = new SimpleDateFormat(datePattern);
		return df.parse(date);
	} 
	
	
	  public static Calendar setStartDay(Calendar paramCalendar)
	  {
	    paramCalendar.set(11, 0);
	    paramCalendar.set(12, 0);
	    paramCalendar.set(13, 0);
	    return paramCalendar;
	  }

	  public static Calendar setEndDay(Calendar paramCalendar)
	  {
	    paramCalendar.set(11, 23);
	    paramCalendar.set(12, 59);
	    paramCalendar.set(13, 59);
	    return paramCalendar;
	  }
	  
	public static int[] monthDays = { 31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30 };

	
	/**
	 * 取得月天数
	 *
	 * @param date
	 * @return
	 */
	public static int getDayOfMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.getActualMaximum(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * 取得季度第一天
	 *
	 * @param date
	 * @return
	 */
	public static Date getFirstDateOfSeason(Date date) {
		return getMonthStartDate(getSeasonDate(date)[0]);
	}

	/**
	 * 取得季度最后一天
	 *
	 * @param date
	 * @return
	 */
	public static Date getLastDateOfSeason(Date date) {
		return getLastMonthEndDate(getSeasonDate(date)[2]);
	}

	/**
	 * 取得季度天数
	 * @param date
	 * @return
	 */
	public static int getDayOfSeason(Date date) {
		int day = 0;
		Date[] seasonDates  = getSeasonDate(date);
		for (Date date2 : seasonDates) {
			day += getDayOfMonth(date2);
		}
		return day;
	}

	/**
	 * 取得季度月
	 *
	 * @param date
	 * @return
	 */
	public static Date[] getSeasonDate(Date date) {
		Date[] season = new Date[3];

		Calendar c = Calendar.getInstance();
		c.setTime(date);

		int nSeason = getSeason(date);
		if(nSeason == 1) {//第一季度
			c.set(Calendar.MONTH, Calendar.JANUARY);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.FEBRUARY);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.MARCH);
			season[2] = c.getTime();
		} else if(nSeason == 2) {//第二季度
			c.set(Calendar.MONTH, Calendar.APRIL);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.MAY);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.JUNE);
			season[2] = c.getTime();
		} else if(nSeason == 3) {//第三季度
			c.set(Calendar.MONTH, Calendar.JULY);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.AUGUST);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.SEPTEMBER);
			season[2] = c.getTime();
		} else if(nSeason == 4) {//第四季度
			c.set(Calendar.MONTH, Calendar.OCTOBER);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.NOVEMBER);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.DECEMBER);
			season[2] = c.getTime();
		}
		return season;
	}

	/**
	 *
	 * 1 第一季度  2 第二季度 3 第三季度 4 第四季度
	 *
	 * @param date
	 * @return
	 */
	public static int getSeason(Date date) {

		int season = 0;

		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int month = c.get(Calendar.MONTH);
		switch (month) {
			case Calendar.JANUARY:
			case Calendar.FEBRUARY:
			case Calendar.MARCH:
				season =  1;
				break;
			case Calendar.APRIL:
			case Calendar.MAY:
			case Calendar.JUNE:
				season =  2;
				break;
			case Calendar.JULY:
			case Calendar.AUGUST:
			case Calendar.SEPTEMBER:
				season =  3;
				break;
			case Calendar.OCTOBER:
			case Calendar.NOVEMBER:
			case Calendar.DECEMBER:
				season =  4;
				break;
			default:
				break;
		}
		return season;
	}
	
	public static void main(String[] args) throws Exception {
//		Date date = new Date();
		System.out.println(getFirstYearByApart(0));
//		System.out.println(" 所在季度第一天日期？" + formatDate(getFirstDateOfSeason(date)));
//		System.out.println(" 所在季度最后一天日期？" + formatDate(getLastDateOfSeason(date)));
//		System.out.println(" 所在季度天数？" + getDayOfSeason(date));
//		System.out.println(" 是第几季度？" + getSeason(date));
//		System.out.println(" 所在季度月份？" + formatDate(getSeasonDate(date)[0], "yyyy年MM月") + "/" + formatDate(getSeasonDate(date)[1], "yyyy年MM月") + "/" + formatDate(getSeasonDate(date)[2], "yyyy年MM月"));
	}
	/**
	 * 根据两个日期查找两个日期中的日期
	 * @param start开始时间
	 * @param end结束时间
	 * @param calendarType时间的类型
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Date[] getDateArrays(Date start, Date end, int calendarType) {  
		  ArrayList ret = new ArrayList();  
		  Calendar calendar = Calendar.getInstance();  
		  calendar.setTime(start);  
		  Date tmpDate = calendar.getTime();  
		  long endTime = end.getTime();  
		  while (tmpDate.before(end) || tmpDate.getTime() == endTime) {  
		    ret.add(calendar.getTime());  
		    calendar.add(calendarType, 1);  
		    tmpDate = calendar.getTime();  
		  }  
		  Date[] dates = new Date[ret.size()];  
		  return (Date[]) ret.toArray(dates);  
		} 
	
	/**
	 * 获得yyyyMM
	 * @return
	 */
	 public static String getYearAndMonth(Date date) {
		 String yearAndMonth = dateToStr(date, "yyyyMM");
	     return yearAndMonth;
	    }
	 
	 /**获得时间2014年10月01日格式*/
		public static synchronized String toChineseYearMonthOrDay(String str){
			StringBuffer sb = new StringBuffer();
			String[] strs=str.split("-");
			sb.append(strs[0].toString()).append("年").append(strs[1].toString()).append("月").append(strs[2].toString()).append("日");
			return sb.toString();
		}
		
		/**
		 * 按apart计算公安月第一天
		 */
		public static String getFirstDayOfMonthByApart(int apart){
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.MONTH , apart-1);
			cal.set(Calendar.DATE , 26);
			return formatDate(cal.getTime());
		}
		
		/**
		 * 按apart计算公安月最后一天
		 */
		public static String getLastDayOfMonthByApart(int apart){
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.MONTH , apart);
			cal.set(Calendar.DATE , 25);
			return formatDate(cal.getTime());
		}
		
		/**
		 * 按apart计算公安月第一天
		 */
		public static String getFirstYearByApart(int apart){
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.YEAR , apart-1);
			cal.set(Calendar.MONTH, Calendar.DECEMBER);
			return formatDate(cal.getTime());
		}
		
		/**
		 * 按apart计算公安月第一天
		 */
		public static String getLaseYearByApart(int apart){
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.YEAR , apart);
			cal.set(Calendar.MONTH, Calendar.DECEMBER);
			return formatDate(cal.getTime());
		}
		/**
		 * 提供公安日期查询的初始公共日期
		 * huangkewei
		 * @return
		 */
		@SuppressWarnings("deprecation")
		public static String getBeginDate() {
			String beginTime = null;
			Date date = new Date();
			SimpleDateFormat str = new SimpleDateFormat("yyyy-MM-dd 18:00:01"); // 格式化日期格式例如：2012-02-01
			int day = date.getDate();	//获得今天的是几号
			//判断今天是否大于等于25号，如果大于等于25号则初始日期的月份就是本月，否则为上月的月份
			if( day>=25 ){
				beginTime = str.format(getCalendar(0).getTime());//开始时间
			}else{
				beginTime = str.format(getCalendar(-1).getTime());//开始时间
			}
			return beginTime;
		}
		/**
		 * 根据参数获得需要的日期
		 * @param i 根据i的值获得月份如果参数是0则为当月月份，如果为非0，则自动是当月加上参数（正负皆可）
		 * @return 日历实体
		 * huangkewei
		 */
		public static Calendar getCalendar(int i){
			java.util.Calendar c = Calendar.getInstance(); // 获取当前日期
			c.add(Calendar.MONTH, i); // 获得上个月日期
			c.set(Calendar.DAY_OF_MONTH, 25); // 得到上个月的25号
			return c;
		}
}
