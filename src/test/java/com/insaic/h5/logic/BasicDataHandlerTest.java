package com.insaic.h5.logic;

import com.insaic.base.mapper.JsonMapper;
import com.insaic.base.utils.SpringBeanLocator;
import com.insaic.common.code.entity.CodeEntry;
import com.insaic.integration.model.OwnerAndVehicleInfoRequest;
import com.insaic.integration.model.OwnerAndVehicleInfoResponse;
import com.insaic.integration.service.OwnerAndVehicleInfoService;
import com.insaic.policy.service.AutoPolicyService;
import com.insaic.rps.model.PaymentConfirmResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Calendar;
import java.util.List;

/**
 * Created by jiyaqun on 2017-08-11.
 */
@SuppressWarnings("SpringJavaAutowiringInspection")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
@ActiveProfiles("test")
public class BasicDataHandlerTest {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private BasicDataHandler basicDataHandler;

    @Autowired
    private OwnerAndVehicleInfoService ownerAndVehicleInfoService;

    @Autowired
    private AutoPolicyService autoPolicyService;

    @Test
    public void codeEntryCacheTest(){
//        long startTime = Calendar.getInstance().getTimeInMillis();
//        List<CodeEntry> codeEntries= basicDataHandler.getCacheCodeEntryByCategoryAndCode("BM_DISTRICT_CONFIG","370000");
//        long endTime = Calendar.getInstance().getTimeInMillis();
//        logger.info("1:BM_DISTRICT_CONFIG的查询结果：{}, 实际耗时：{}", JsonMapper.nonDefaultMapper().toJson(codeEntries),(endTime-startTime));
//
//        List<CodeEntry> codeEntries1= basicDataHandler.getCacheCodeEntryByCategoryAndCode("BM_DISTRICT_CONFIG","440000");
//        long endTime1 = Calendar.getInstance().getTimeInMillis();
//        logger.info("2:BM_DISTRICT_CONFIG的查询结果：{}, 实际耗时：{}", JsonMapper.nonDefaultMapper().toJson(codeEntries1),(endTime1-endTime));

//        startTime = Calendar.getInstance().getTimeInMillis();
//        Map<String, CodeEntry> entryMap = basicDateHandler.getCacheCodeEntryMapByCategory("BM_DISTRICT_CONFIG");
//        endTime = Calendar.getInstance().getTimeInMillis();
//        logger.info("1:BM_DISTRICT_CONFIG的查询结果：{}, 实际耗时：{}", JsonMapper.nonDefaultMapper().toJson(entryMap),(endTime-startTime));

//        Map<String, CodeEntry> entryMap1 = basicDateHandler.getCacheCodeEntryMapByCategory("BM_DISTRICT_CONFIG");
//        endTime1 = Calendar.getInstance().getTimeInMillis();
//        logger.info("2:BM_DISTRICT_CONFIG的查询结果：{}, 实际耗时：{}", JsonMapper.nonDefaultMapper().toJson(entryMap1),(endTime-startTime));


        //List<CodeEntry> codeEntries2 = basicDateHandler.getCacheCodeEntryListByCategory("BM_DISTRICT_CONFIG");
        //logger.info("3:BM_DISTRICT_CONFIG的查询结果：{}, 实际耗时：{}", JsonMapper.nonDefaultMapper().toJson(codeEntries2),(endTime-startTime));
    }

    @Test
    public void getVehicleAndPersonTest(){
        String vin = "LSJW24G62ES000001";
        String accessToken = "34ea4ae5-f30f-3ee4-b7ca-a5cea6a8ad9d";
        OwnerAndVehicleInfoRequest ownerAndVehicleInfoRequest = new OwnerAndVehicleInfoRequest();
        ownerAndVehicleInfoRequest.setVin(vin);
        ownerAndVehicleInfoRequest.setAuthToken(accessToken);
        //调用SIS接口获取车人信息
        OwnerAndVehicleInfoResponse ownerAndVehicleInfoResponse = ownerAndVehicleInfoService.getOwnerAndVehicleInfo(ownerAndVehicleInfoRequest);
    }

    @Test
    public void policyConfirmTest(){
        PaymentConfirmResponse resp = autoPolicyService.paymentConfirm("SC1700034008");
        logger.info("支付确认结果：{}", resp);
    }
}
