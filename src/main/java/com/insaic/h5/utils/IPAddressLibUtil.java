package com.insaic.h5.utils;

import com.alibaba.fastjson.JSONObject;
import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.exception.SystemException;
import com.insaic.base.mapper.JsonMapper;
import com.insaic.h5.model.IpAddressInfo;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;

/**
 * Created by jiyaqun on 2017-09-21.
 */
public class IPAddressLibUtil {
    private static final String TAOBAO_IP_URL = "http://ip.taobao.com/service/getIpInfo.php?ip=";

    /**
     *
     * @param ip
     * @return
     */
    public static IpAddressInfo getIpAddressInfo(String ip){
        HttpURLConnection conn = null;
        StringBuffer sb = new StringBuffer();

        try {
            String url = TAOBAO_IP_URL + ip;
            URL e = new URL(url);
            conn = (HttpURLConnection) e.openConnection();
            conn.setConnectTimeout(120000);
            conn.setReadTimeout(60000);
            conn.setUseCaches(false);
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);

            int status = conn.getResponseCode();
            InputStream in = null;
            if (status/100 == 2) {
                in = conn.getInputStream();
            } else {
                in = conn.getErrorStream();
            }

            if (null != in) {
                InputStreamReader responseContent = new InputStreamReader(in);
                char[] quota = new char[1024];

                int remaining;
                while ((remaining = responseContent.read(quota)) > 0) {
                    sb.append(quota, 0, remaining);
                }
            }

            String responseContent = sb.toString();
            if (status >= 200 && status < 300) {
                JSONObject obj = JSONObject.parseObject(responseContent);
                //淘宝IP地址库0标识成功， 1标识失败
                if("0".equals(obj.getString("code"))){
                    IpAddressInfo addressInfo = JsonMapper.nonDefaultMapper().fromJson(obj.getString("data"), IpAddressInfo.class);
                    return addressInfo;
                }
            } else {
                throw ExceptionUtil.handleException(new SystemException("请求服务失败：" + responseContent));
            }
        } catch (SocketTimeoutException e) {
            if (e.getMessage().contains("connect timed out")) {
                throw ExceptionUtil.handleException(new SystemException("connect timed out", e));
            }

            if (e.getMessage().contains("Read timed out")) {
                throw ExceptionUtil.handleException(new SystemException("Read timed out", e));
            }

            throw ExceptionUtil.handleException(new SystemException("Connection IO error. \n" +
                    "Can not connect to the Server. Please ensure your internet connection is ok. ", e));
        } catch (IOException e) {
            throw ExceptionUtil.handleException(new SystemException("Connection IO error. \n" +
                    "Can not connect to the Server. Please ensure your internet connection is ok. ", e));
        } finally {
            if (null != conn) {
                conn.disconnect();
            }
        }
        return null;
    }
}
