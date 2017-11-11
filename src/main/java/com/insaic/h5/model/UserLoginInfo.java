package com.insaic.h5.model;

import java.io.Serializable;

/**
 * Created by pengfarui on 2017/10/31.
 */
public class UserLoginInfo implements Serializable {
    private static final long serialVersionUID = -4108935740430588115L;

    /**
     * 用户代码
     */
    private String userCode;

    /**
     * 密码
     */
    private String password;

    /**
     * 验证码
     */
    private String captcha;

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }
}
