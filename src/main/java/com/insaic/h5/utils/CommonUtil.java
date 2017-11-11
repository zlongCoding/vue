package com.insaic.h5.utils;

import com.insaic.base.utils.DateUtil;
import com.insaic.base.utils.StringUtil;
import com.insaic.common.code.entity.CodeEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * 公共工具类
 * Created by jiyaqun on 2015/11/13.
 */
public class CommonUtil {

    private static final Logger logger = LoggerFactory.getLogger(CommonUtil.class);

    /**
     * 根据公共代码category获取property数组
     * @param codeEntry
     * @return
     */
    public static List<String> getPropertyToStringArray(CodeEntry codeEntry){
        List<String> propertyList = new ArrayList<>();
        if(codeEntry == null){
            return propertyList;
        }
        StringBuilder result = new StringBuilder();
        if(StringUtil.isNotBlank(codeEntry.getProperty1())){
            result.append(codeEntry.getProperty1());
        }
        if(StringUtil.isNotBlank(codeEntry.getProperty2())){
            result.append(codeEntry.getProperty2());
        }
        if(StringUtil.isNotBlank(codeEntry.getProperty3())){
            result.append(codeEntry.getProperty3());
        }
        if(StringUtil.isNotBlank(codeEntry.getProperty4())){
            result.append(codeEntry.getProperty4());
        }
        if(StringUtil.isNotBlank(codeEntry.getProperty5())){
            result.append(codeEntry.getProperty5());
        }
        if(StringUtil.isNotBlank(codeEntry.getProperty6())){
            result.append(codeEntry.getProperty6());
        }
        if(StringUtil.isNotBlank(result.toString())){
            return StringUtil.splitToList(result.toString());
        }
        return propertyList;
    }

    /**
     * 获取URL的文件类型
     * @param url URL
     * @return 文件类型
     */
    public static String getFileTypeByURL(String url){
        String fileType = "";
        int i = url.lastIndexOf(".");
        if(i != -1) {
            fileType = url.substring(i + 1).toUpperCase();
        }
        return fileType;
    }

    /**
     * 计算2个时间相差的秒数
     * @param startDate 开始时间
     * @param endDate   结束时间
     * @return 秒
     */
    public static long getIntervalSecond(Date startDate, Date endDate){
        long end = endDate.getTime();
        long start = startDate.getTime();
        long interval = (end-start)/1000;
        return interval;
    }

    /**
     * 获取省
     * @param province
     * @return
     */
    public static String getSingleProvince(String province){
        if(StringUtil.isBlank(province)){
            return province;
        }
        String single = province;
        int index = province.indexOf(".");
        if(index > -1){
            single = province.substring(0, index);
        }
        return single;
    }

    /**
     * 获取市
     * @param provinceAndCity
     * @return
     */
    public static String getSingleCity(String provinceAndCity){
        if(StringUtil.isBlank(provinceAndCity)){
            return provinceAndCity;
        }
        String city = "";
        int index = provinceAndCity.indexOf(".");
        if(index > -1){
            city = provinceAndCity.substring(provinceAndCity.indexOf(".")+1,provinceAndCity.length());
        }
        return city;
    }
}