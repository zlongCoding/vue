package com.insaic.h5.controller;

import com.insaic.base.RequestResult;
import com.insaic.base.context.ThreadLocalContext;
import com.insaic.base.exception.BusinessException;
import com.insaic.base.utils.StringUtil;
import com.insaic.ecs.model.policy.PolicyRenewMO;
import com.insaic.ecs.model.policy.UserInputPolicyRenewMO;
import com.insaic.ecs.service.AutoPolicyService;
import com.insaic.ecs.service.BasicDataService;
import com.insaic.h5.logic.BasicDataHandler;
import com.insaic.h5.model.BanmaToken;
import com.insaic.h5.utils.CommonExceptionUtil;
import com.insaic.policy.model.DealerInfo;
import com.insaic.policy.model.h5.H5DealerRequestMO;
import com.insaic.policy.model.h5.H5VehicleAndOwnerInfoMO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 合作伙伴基础数据Controller
 * Created by jiyaqun on 2017-08-09.
 */
@Api(value = "/partner/auto/", description = "合作伙伴基础数据API")
@RestController
@RequestMapping("/partner/auto/")
public class PartnerBasicDataController {

    @Autowired
    private BasicDataHandler basicDataHandler;

    @Autowired
    private BasicDataService basicDataService;

    @Autowired
    private AutoPolicyService autoPolicyService;

    /**
     * 获取车险可投保省市列表
     * @return 可投保省份列表
     */
    @ApiOperation(value = "获取车险可投保省市列表", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "area", method = RequestMethod.POST)
    public RequestResult<List> queryAutoInsuredProvincesAndCities() {
        RequestResult<List> requestResult = new RequestResult<>();

        try{
            requestResult.setResult(basicDataHandler.queryAutoInsuredProvincesAndCities());
        }catch (Exception e){
            return CommonExceptionUtil.handleDubboException("","获取车险可投保省市列表",e);
        }

        return requestResult;
    }

    @ApiOperation(value = "获取车险经销商列表", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "dealer", method = RequestMethod.POST)
    public RequestResult<List<DealerInfo>> queryDealerList(@RequestBody H5DealerRequestMO dealerRequest){
        RequestResult<List<DealerInfo>> result = new RequestResult<>();

        try{
            result.setResult(basicDataService.queryDealerList(dealerRequest));
        }catch (Exception e){
            return CommonExceptionUtil.handleDubboException("","获取合作伙伴车险经销商列表",e);
        }

        return result;
    }


    @ApiOperation(value = "获取车辆人员信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "vehicle-person", method = RequestMethod.POST)
    public RequestResult<H5VehicleAndOwnerInfoMO> queryVehicleAndOwnerInfo(@RequestBody BanmaToken banmaToken){
        if (banmaToken == null || StringUtil.isBlank(banmaToken.getVin())) {
            return CommonExceptionUtil.handleException("", "获取车辆人员信息", new BusinessException("车架号不能为空"));
        }

        RequestResult<H5VehicleAndOwnerInfoMO> result = new RequestResult<>();

        try{
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, banmaToken.getVin());

            result.setResult(basicDataHandler.queryVehicleAndOwnerInfo(banmaToken.getVin(),banmaToken.getAuthCode()));
        }catch (Exception e){
            return CommonExceptionUtil.handleDubboException("", "获取车辆人员信息", e);
        }

        return result;
    }

    /**
     * 根据VIN查询车牌号
     * @param vin 车架号
     * @return
     */
    @ApiOperation(value = "根据VIN查询车牌号", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "queryLicenseNo/{vin}", method = RequestMethod.POST)
    public RequestResult<PolicyRenewMO> queryLicenseNo(@PathVariable("vin") String vin) {
        if (StringUtil.isBlank(vin)) {
            return CommonExceptionUtil.handleException("", "根据VIN查询车牌号", new BusinessException("车架号不能为空"));
        }

        RequestResult<PolicyRenewMO> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vin);

            requestResult.setResult(autoPolicyService.findAutoInsuranceByVin(vin));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "根据VIN查询车牌号", e);
        }

        return requestResult;
    }

    /**
     * 领取金马力前保存车牌号
     *
     * @return
     */
    @ApiOperation(value = "领取金马力前保存车牌号", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "saveLicenseNo", method = RequestMethod.POST)
    public RequestResult saveLicenseNo(@RequestBody UserInputPolicyRenewMO inputPolicyRenewMO) {
        if (inputPolicyRenewMO == null) {
            return CommonExceptionUtil
                    .handleException("", "领取金马力前保存车牌号", new BusinessException("请求参数不能为空"));
        }
        String vin = inputPolicyRenewMO.getVin();
        if (StringUtil.isBlank(vin)) {
            return CommonExceptionUtil
                    .handleException("", "领取金马力前保存车牌号", new BusinessException("车架号不能为空"));
        }
        String licenseNo = inputPolicyRenewMO.getLicenseNo();
        if (StringUtil.isBlank(licenseNo)) {
            return CommonExceptionUtil
                    .handleException("", "领取金马力前保存车牌号", new BusinessException("车牌号不能为空"));
        }

        RequestResult result = new RequestResult();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vin);

            autoPolicyService.updatePlateNoByVin(inputPolicyRenewMO);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "领取金马力前保存车牌号", e);
        }

        return result;
    }
}
