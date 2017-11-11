package com.insaic.h5.controller;

import com.alibaba.fastjson.JSON;
import com.insaic.base.RequestResult;
import com.insaic.udp.model.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by Carlo.yan on 2017/8/21.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@ActiveProfiles("development")
public class TestUbiController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UbiController ubiController;


    /**
     * 根据车辆识别码(vin)查询车辆保费余额
     *
     * @return 车辆余额信息
     */
    @Test
    public void testGetCumInfo() {
        UbiSumInput ubiSumInput = new UbiSumInput();
        ubiSumInput.setVin("LSJA24W94GS000687");
        RequestResult requestResult = ubiController.getCumInfo(ubiSumInput);
        logger.info("车辆余额信息是{}", JSON.toJSONString(requestResult));
    }

    /**
     * 根据车辆识别码（vin）、日期（yyyyMMdd）查询某日驾驶行为分析
     *
     * @return 某日驾驶行为分析
     */
    @Test
    public void testDayDrivingBehavior() {
        DrivingBehaviorInput drivingBehaviorInput = new DrivingBehaviorInput();
        drivingBehaviorInput.setVin("LSJA24W94GS000687");
        drivingBehaviorInput.setDate("20170616");
        RequestResult requestResult = ubiController.dayDrivingBehavior(drivingBehaviorInput);
        logger.info("某日驾驶行为分析是{}", JSON.toJSONString(requestResult));
    }

    /**
     * 根据车辆识别码（vin）、日期（yyyyMMdd）查询某日行程驾驶行为分析
     *
     * @return 某日行程驾驶行为分析
     */
    @Test
    public void testTripDrivingBehavior() {
        DrivingBehaviorInput drivingBehaviorInput = new DrivingBehaviorInput();
        drivingBehaviorInput.setVin("LSJA24W94GS000687");
        drivingBehaviorInput.setDate("20170616");
        RequestResult requestResult = ubiController.tripDrivingBehavior(drivingBehaviorInput);
        logger.info("某日行程驾驶行为分析是{}", JSON.toJSONString(requestResult));
    }

    /**
     * 根据车辆识别码(vin)、第几页(pageNo)、每页显示条数（pageNum）查询保费账单信息
     *
     * @return 查询时间段内每天保费扣减信息
     */ @Test
    public void testGetPremiumRecord() {
        PremiumRecordInsaicInput premiumRecordInput = new PremiumRecordInsaicInput();
        premiumRecordInput.setVin("LSJA24W94GS000687");
        premiumRecordInput.setPageNo(0);
        premiumRecordInput.setPageNum(10);
        RequestResult requestResult = ubiController.getPremiumRecord(premiumRecordInput);
        logger.info("查询时间段内每天保费扣减信息是{}", JSON.toJSONString(requestResult));
    }

}
