package com.insaic.h5.logic;

import com.insaic.common.security.entity.UserBindingEO;
import com.insaic.common.security.entity.UserEO;
import com.insaic.common.security.service.SecurityService;
import com.insaic.ecs.service.WeChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 微信认证服务处理
 *
 * @author wanghao
 * @create 2017-11-01 11:36
 */
@Component
public class WeChatTokenHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private WeChatService weChatService;
    @Autowired
    private SecurityService securityService;

    public String getOpenId(String code){
        String openId = null;
        try {
            openId = weChatService.getOpenId(code);
        } catch (Exception e) {
            logger.error("系统异常:{}",e.getMessage());
        }
        return openId;
    }

    public UserBindingEO findUserBinding(String openId ,String unionId){
        UserBindingEO binding = null;
        try {
            binding = securityService.findUserBinding(openId, unionId);
        } catch (Exception e) {
            logger.error("系统异常:{}",e.getMessage());
        }
        return binding;
    }

    public UserEO findByUserId(Long userId){
        UserEO userEO = null;
        try {
            userEO = securityService.findByUserId(userId);
        } catch (Exception e) {
            logger.error("系统异常:{}",e.getMessage());
        }
        return userEO;
    }
}
