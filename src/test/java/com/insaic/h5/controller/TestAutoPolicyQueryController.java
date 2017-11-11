package com.insaic.h5.controller;

import com.alibaba.fastjson.JSON;
import com.insaic.base.RequestResult;
import com.insaic.policy.model.AutoPolicyRequestMO;
import com.insaic.policy.model.h5.H5CoverageRequestMO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by Carlo.yan on 2017/8/15.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@ActiveProfiles("development")
public class TestAutoPolicyQueryController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AutoPolicyQueryController autoPolicyQueryController;


    /**
     * 订单列表查询接口
     */
    @Test
    public void testQueryOrderList() {
        AutoPolicyRequestMO autoPolicyRequestMO = new AutoPolicyRequestMO();
        autoPolicyRequestMO.setVin("LS317823811978372");
        autoPolicyRequestMO.setPage("0");
        autoPolicyRequestMO.setSize("20");
        RequestResult result = autoPolicyQueryController.queryAutoOrdersByVin(autoPolicyRequestMO);
        logger.info("返回结果：{}", JSON.toJSONString(result));
    }

//    /**
//     * 子险列表查询接口
//     */
//    @Test
//    public void testQueryCoveragePackage() {
//        H5CoverageRequestMO h5CoverageRequestMO = new H5CoverageRequestMO();
//        RequestResult result = autoPolicyQueryController.queryCoveragePackage(h5CoverageRequestMO);
//        logger.info("返回结果：{}", JSON.toJSONString(result));
//    }

//    /**
//     * 查询保障中的保险公司代码
//     */
//    @Test
//    public void testQueryEffectInsurerByVin() {
//        RequestResult result = autoPolicyQueryController.queryEffectInsurerByVin("LS876323453453234");
//        logger.info("返回结果：{}", JSON.toJSONString(result));
//    }
}
