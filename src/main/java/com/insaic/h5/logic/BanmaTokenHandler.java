package com.insaic.h5.logic;

import com.insaic.base.context.ThreadLocalContext;
import com.insaic.base.context.UserProfile;
import com.insaic.base.exception.BusinessException;
import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.mapper.JsonMapper;
import com.insaic.base.redis.RedisClient;
import com.insaic.base.utils.Cryptos;
import com.insaic.base.utils.DateUtil;
import com.insaic.base.utils.StringUtil;
import com.insaic.h5.model.BanmaToken;
import com.insaic.h5.utils.CommonUtil;
import com.insaic.integration.model.GetTokenDataMO;
import com.insaic.integration.model.GetTokenErrRespMO;
import com.insaic.integration.model.GetTokenRequest;
import com.insaic.integration.model.GetTokenResponse;
import com.insaic.integration.service.OwnerAndVehicleInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * 斑马授权认证处理类
 * Created by jiyaqun on 2017-08-22.
 */
@Component
public class BanmaTokenHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String INSAIC_AUTH_CODE = "insaic-h5-2017";
    @Autowired
    private OwnerAndVehicleInfoService  ownerAndVehicleInfoService;

    /**
     * 获取斑马Token
     * @param authCode 授权码
     * @param vin 车架号
     */
    public BanmaToken getBanMaToken(String authCode, String vin){
        logger.info("获取斑马Token, authCode:{}, vin:{}......", authCode, vin);
        BanmaToken banmaToken = null;
        String key = "bm:token:" + vin + ":" + authCode;
        String tokenJson = RedisClient.get(key);
        if(StringUtil.isNotBlank(tokenJson)){
            banmaToken = JsonMapper.nonDefaultMapper().fromJson(tokenJson, BanmaToken.class);
            if(banmaToken.getExpireTime().after(new Date())) {
                return banmaToken;
            }
        }
        GetTokenResponse getTokenResponse = null;
        try {
            GetTokenRequest request = new GetTokenRequest();
            request.setAuthCode(authCode);
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vin);
            getTokenResponse = ownerAndVehicleInfoService.getToken(request);
        }catch (Exception ex){
            throw ExceptionUtil.handleDubboException(ex);
        }
        if(getTokenResponse != null && getTokenResponse.getErrResp() == null
                && getTokenResponse.getData() != null){
            GetTokenDataMO getTokenDataMO = getTokenResponse.getData();
            if(StringUtil.isBlank(getTokenDataMO.getAccessToken()) || StringUtil.isBlank(getTokenDataMO.getExpireTime())){
                logger.error("vin:{},authcode:{},调用斑马授权认证接口，返回Token为空或过期时间为空!", vin, authCode);
                throw new BusinessException("调用斑马授权认证接口，返回Token为空或过期时间为空!");
            }
            banmaToken = new BanmaToken();
            banmaToken.setVin(vin);
            banmaToken.setAuthCode(authCode);
            banmaToken.setAccessToken(getTokenDataMO.getAccessToken());
            banmaToken.setExpireTime(new Date(Long.parseLong(getTokenDataMO.getExpireTime())));
            int interval = (int) CommonUtil.getIntervalSecond(new Date(), banmaToken.getExpireTime());
            RedisClient.setex(key, interval, JsonMapper.nonDefaultMapper().toJson(banmaToken));
        }else if(getTokenResponse != null && getTokenResponse.getErrResp() != null){
            GetTokenErrRespMO getTokenErrRespMO = getTokenResponse.getErrResp();
            String errCode = getTokenErrRespMO.getCode();
            String errMsg = getTokenErrRespMO.getMsg();
            logger.error("vin:{},authcode:{},调用斑马授权认证接口异常,异常编号:{}", vin, authCode,errCode);
            throw new BusinessException("调用斑马授权认证服务接口异常，错误编号:" + errCode + ", 错误描述：" + errMsg);
        }

        return banmaToken;
    }

    /**
     * 验证上汽保险授权码
     * @param authCode
     * @return
     */
    public boolean validInsaicAuthCode(String authCode, String vin){
        String decAuthCode = "";
        String key = "bm:token:" + vin + ":" + authCode;
        try {
            decAuthCode = Cryptos.decryptWithTime(authCode);
        } catch (Exception ex) {
            ExceptionUtil.handleException(ex);
        }
        if (INSAIC_AUTH_CODE.equals(decAuthCode)) {
            BanmaToken banmaToken = new BanmaToken();
            banmaToken.setVin(vin);
            banmaToken.setAuthCode(authCode);
            banmaToken.setAccessToken("96104e02-3790-3fc1-9197-059fa69a4213");
            banmaToken.setExpireTime(DateUtil.addHour(new Date(), 2));
            int interval = (int) CommonUtil.getIntervalSecond(new Date(), banmaToken.getExpireTime());
            RedisClient.setex(key, interval, JsonMapper.nonDefaultMapper().toJson(banmaToken));
            return true;
        }
        return false;
    }
}
