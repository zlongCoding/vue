package com.insaic.h5.model;

import java.io.Serializable;

/**
 * 微信认证实体类
 *
 * @author wanghao
 * @create 2017-11-01 11:19
 */
public class WeChatToken implements Serializable{
    private static final long serialVersionUID = 8539054025046983428L;

    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
