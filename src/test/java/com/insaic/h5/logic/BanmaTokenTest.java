package com.insaic.h5.logic;

import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.mapper.JsonMapper;
import com.insaic.base.utils.Cryptos;
import com.insaic.base.utils.SpringBeanLocator;
import com.insaic.integration.model.GetTokenRequest;
import com.insaic.integration.model.GetTokenResponse;
import com.insaic.integration.service.OwnerAndVehicleInfoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;

/**
 * Created by jiyaqun on 2017-08-28.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
@ActiveProfiles("development")
public class BanmaTokenTest {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private OwnerAndVehicleInfoService ownerAndVehicleInfoService;
    @Test
    public void getTokenTest(){
//        GetTokenRequest getTokenRequest = new GetTokenRequest();
//        getTokenRequest.setAuthCode("b2784288-3239-34d6-8f33-351567f7aa2d");
//        GetTokenResponse getTokenResponse = null;
//        try {
//            getTokenResponse = ownerAndVehicleInfoService.getToken(getTokenRequest);
//        }catch (Exception ex){
//            throw ExceptionUtil.handleDubboException(ex);
//        }
//        logger.info("Get Token Result: {}", JsonMapper.nonDefaultMapper().toJson(getTokenResponse));

    }

    public static void main(String... args) {
        String authCode = Cryptos.encryptWithTime("insaic-h5-2017");
        System.out.println("最新的授权码为:" + authCode);
    }

}
