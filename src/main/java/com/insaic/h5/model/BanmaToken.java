package com.insaic.h5.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * 斑马的Token对象
 * @author Aaron.Ji
 * @version 1.0.0
 * create by Aaron.Ji on 2017.8.24
 */
public class BanmaToken implements Serializable {
    private static final long serialVersionUID = 7730533303473853660L;

    /** 授权代码 */
    private String authCode;

    /** VIN */
    private String vin;

    /** 访问Token */
    private String accessToken;

    /** Token的有效时间 */
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date expireTime;

    public String getAuthCode() {
        return authCode;
    }

    public void setAuthCode(String authCode) {
        this.authCode = authCode;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Date getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Date expireTime) {
        this.expireTime = expireTime;
    }
}
