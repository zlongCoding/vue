package com.insaic.h5.controller;

import com.alibaba.fastjson.JSON;
import com.insaic.base.RequestResult;
import com.insaic.h5.model.BanmaToken;
import com.insaic.policy.model.h5.H5DealerRequestMO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by yanliangzhong on 2017/8/10.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@ActiveProfiles("development")
public class TestBasicDateController {


    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PartnerBasicDataController partnerBasicDataController;

    @Test
    public void testQueryAutoInsuredProvinces(){
//        RequestResult result = partnerBasicDataController.queryAutoInsuredProvinces();
//        logger.info("返回结果：{}", JSON.toJSONString(result));
    }

    @Test
    public void testQueryAutoInsuredProvincesAndCities(){
        RequestResult result = partnerBasicDataController.queryAutoInsuredProvincesAndCities();
        logger.info("返回结果：{}", JSON.toJSONString(result));
    }

//    /**
//     * 获取合作伙伴车险可选保险公司列表
//     */
//    @Test
//    public void queryAutoInsurances(){
//        RequestResult result = partnerBasicDataController.queryAutoInsurances("370000", "BK20006", "");
//        logger.info("返回结果：{}", JSON.toJSONString(result));
//    }

    @Test
    public void testQueryDealerList(){
        H5DealerRequestMO dealerRequest = new H5DealerRequestMO();
        dealerRequest.setProvince("370000");
        RequestResult result = partnerBasicDataController.queryDealerList(dealerRequest);
        logger.info("返回结果：{}", JSON.toJSONString(result));
    }

    @Test
    public void testQueryVehicleAndOwnerInfo(){
        BanmaToken banmaToken = new BanmaToken();
        banmaToken.setVin("LSJA0000000000542");
        banmaToken.setAuthCode("12b982c5-77a2-3575-940c-ffbfcb94ba59");
        RequestResult result = partnerBasicDataController.queryVehicleAndOwnerInfo(banmaToken);
        logger.info("返回结果：{}", JSON.toJSONString(result));
    }

}
