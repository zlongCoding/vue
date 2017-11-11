package com.insaic.h5.controller;


import com.insaic.base.RequestResult;
import com.insaic.base.context.ThreadLocalContext;
import com.insaic.base.exception.BusinessException;
import com.insaic.base.utils.StringUtil;
import com.insaic.ecs.model.ubi.GoldHorsepowerMO;
import com.insaic.ecs.model.ubi.LotteryMO;
import com.insaic.ecs.service.UBIService;
import com.insaic.h5.utils.CommonExceptionUtil;
import com.insaic.policy.entity.enumeration.UdpResultCodeEnum;
import com.insaic.udp.model.*;
import com.insaic.udp.service.IDrivingBehaviorService;
import com.insaic.udp.service.IUbiService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * 用户驾驶行为及金马力服务接口
 * Created by Carlo.yan on 2017/8/21.
 */
@Api(value = "/ubi/", description = "用户驾驶行为及金马力服务API")
@RestController
@RequestMapping("/ubi/")
public class UbiController {

    @Autowired
    private UBIService ubiService;

    @Autowired
    private IUbiService iUbiService;

    @Autowired
    private IDrivingBehaviorService iDrivingBehaviorService;

    /**
     * 查询我的金马力余额
     *
     * @param ubiSumInput 查询条件
     * @return 我的金马力余额
     */
    @ApiOperation(value = "查询我的金马力余额", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "balance", method = RequestMethod.POST)
    public RequestResult<GoldHorsepowerMO> getCumInfo(@RequestBody UbiSumInput ubiSumInput) {
        if (null == ubiSumInput || StringUtil.isBlank(ubiSumInput.getVin())) {
            return CommonExceptionUtil.handleException("", "查询我的金马力", new BusinessException("VIN码不允许为空！"));
        }

        RequestResult<GoldHorsepowerMO> result = new RequestResult<>();
        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, ubiSumInput.getVin());

            result.setResult(ubiService.queryBalance(ubiSumInput));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询我的金马力", e);
        }
        return result;
    }

    /**
     * 查询指定日的驾驶速递信息
     *
     * @param drivingBehaviorInput 查询条件
     * @return 指定日的驾驶速递信息
     */
    @ApiOperation(value = "查询指定日的驾驶速递信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "day-driving-behavior", method = RequestMethod.POST)
    public RequestResult<DayDrivingBehaviorOutput> dayDrivingBehavior(@RequestBody DrivingBehaviorInput drivingBehaviorInput) {
        if (null == drivingBehaviorInput || StringUtil.isBlank(drivingBehaviorInput.getVin())) {
            return CommonExceptionUtil.handleException("", "查询指定日的驾驶速递信息", new BusinessException("VIN码不允许为空！"));
        }

        RequestResult<DayDrivingBehaviorOutput> requestResult = new RequestResult<>();
        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, drivingBehaviorInput.getVin());

            DayDrivingBehaviorOutput dayDrivingBehaviorOutput = iDrivingBehaviorService.dayDrivingBehavior(drivingBehaviorInput);
            if (null == dayDrivingBehaviorOutput) {
                requestResult.addWarningMessage("", "系统异常");
            }
            else if (!UdpResultCodeEnum.SUCCESS.getCode().equals(dayDrivingBehaviorOutput.getResultCode())) {
                requestResult.addWarningMessage("", this.getErrorMessage(dayDrivingBehaviorOutput.getResultCode()));
            }

            requestResult.setResult(dayDrivingBehaviorOutput);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询指定日的驾驶速递信息", e);
        }

        return requestResult;
    }

    /**
     * 查询金马力消费账单信息
     *
     * @param premiumRecordInput 查询条件
     * @return 查询金马力消费账单信息
     */
    @ApiOperation(value = "查询金马力消费账单信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "premium-record", method = RequestMethod.POST)
    public RequestResult<PremiumRecordInsaicOutput> getPremiumRecord(@RequestBody PremiumRecordInsaicInput premiumRecordInput) {
        if (null == premiumRecordInput || StringUtil.isBlank(premiumRecordInput.getVin())) {
            return CommonExceptionUtil.handleException("", "查询金马力消费账单信息", new BusinessException("VIN码不允许为空！"));
        }

        RequestResult<PremiumRecordInsaicOutput> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, premiumRecordInput.getVin());

            if (null != premiumRecordInput.getPageNo()) {
                premiumRecordInput.setPageNo(premiumRecordInput.getPageNo() + 1);
            }

            PremiumRecordInsaicOutput premiumRecordOutput = iUbiService.getPremiumRecordInsaic(premiumRecordInput);

            if (null == premiumRecordOutput) {
                requestResult.addWarningMessage("", "系统异常");
            }
            else if (!UdpResultCodeEnum.SUCCESS.getCode().equals(premiumRecordOutput.getResultCode())) {
                requestResult.addWarningMessage("", this.getErrorMessage(premiumRecordOutput.getResultCode()));
            }

            requestResult.setResult(premiumRecordOutput);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询金马力消费账单信息", e);
        }

        return requestResult;
    }

    /**
     * 计算刮奖的金马力
     *
     * @param vin 车架号
     * @return 刮奖结果
     */
    @ApiOperation(value = "计算刮奖的金马力", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "Lottery/{vin}", method = RequestMethod.POST)
    public RequestResult<LotteryMO> getInitLottery(@PathVariable("vin") String vin) {
        if (StringUtil.isBlank(vin)) {
            return CommonExceptionUtil.handleException("", "刮取金马力", new BusinessException("VIN码不允许为空"));
        }

        RequestResult<LotteryMO> result = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vin);

            result.setResult(ubiService.scratchForGoldenHorsePower(vin));
        } catch (Exception ex) {
            return CommonExceptionUtil.handleDubboException("", "刮取金马力", ex);
        }

        return result;
    }

    /**
     * 根据VIN获取驾驶行为标签信息
     * @param vin
     * @return
     */
    @ApiOperation(value = "根据VIN获取驾驶行为标签信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "trip-label/{vin}", method = RequestMethod.POST)
    public RequestResult<UbiTripLabelOutput> getUbiTripLabelInfoByVin(@PathVariable("vin") String vin) {
        if (StringUtil.isBlank(vin)) {
            return CommonExceptionUtil.handleException("", "根据VIN获取驾驶行为标签信息", new BusinessException("VIN码不允许为空"));
        }

        RequestResult<UbiTripLabelOutput> requestResult = new RequestResult<>();

        try {
            requestResult.setResult(ubiService.getUbiTripLabelInfoByVin(vin));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "根据VIN获取驾驶行为标签信息", e);
        }

        return requestResult;
    }

    /**
     * 查询指定日行程驾驶行为信息
     *
     * @param drivingBehaviorInput 查询条件
     * @return 指定日行程驾驶行为信息
     */
    @ApiOperation(value = "查询指定日行程驾驶行为信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "trip-driving-behavior", method = RequestMethod.POST)
    public RequestResult<TripDrivingBehaviorOutput> tripDrivingBehavior(@RequestBody DrivingBehaviorInput drivingBehaviorInput) {
        if (null == drivingBehaviorInput || StringUtil.isBlank(drivingBehaviorInput.getVin())) {
            return CommonExceptionUtil.handleException("", "", new BusinessException("VIN码不允许为空！"));
        }

        RequestResult<TripDrivingBehaviorOutput> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, drivingBehaviorInput.getVin());

            TripDrivingBehaviorOutput tripDrivingBehaviorOutput = iDrivingBehaviorService.tripDrivingBehavior(drivingBehaviorInput);
            if (null == tripDrivingBehaviorOutput) {
                requestResult.addWarningMessage("", "系统异常");
            }
            else if (!UdpResultCodeEnum.SUCCESS.getCode().equals(tripDrivingBehaviorOutput.getResultCode())) {
                requestResult.addWarningMessage("", this.getErrorMessage(tripDrivingBehaviorOutput.getResultCode()));
            }

            requestResult.setResult(tripDrivingBehaviorOutput);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询指定日行程驾驶行为信息", e);
        }

        return requestResult;
    }

    private String getErrorMessage(String errorCode) {
        if (UdpResultCodeEnum.SYSTEM_FAILED.getCode().equals(errorCode)) {
            return UdpResultCodeEnum.SYSTEM_FAILED.getMessage();
        } else if (UdpResultCodeEnum.BUSINESS_FAILED.getCode().equals(errorCode)) {
            return UdpResultCodeEnum.BUSINESS_FAILED.getMessage();
        } else if (UdpResultCodeEnum.DIFFERENT_MODEL.getCode().equals(errorCode)) {
            return UdpResultCodeEnum.DIFFERENT_MODEL.getMessage();
        } else if (UdpResultCodeEnum.REPEAT_INSURANCE.getCode().equals(errorCode)) {
            return UdpResultCodeEnum.REPEAT_INSURANCE.getMessage();
        } else if (UdpResultCodeEnum.WARNING.getCode().equals(errorCode)) {
            return "";
        } else {
            return "接口异常";
        }
    }
}
