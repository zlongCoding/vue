package com.insaic.h5.controller;

import com.insaic.base.RequestResult;
import com.insaic.base.context.ThreadLocalContext;
import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.utils.StringUtil;
import com.insaic.ecs.service.AutoPolicyService;
import com.insaic.h5.utils.CommonExceptionUtil;
import com.insaic.policy.model.h5.H5CalcRequestMO;
import com.insaic.policy.model.h5.H5CalcResponseMO;
import com.insaic.policy.model.h5.H5SubmitRequestMO;
import com.insaic.policy.model.h5.H5SubmitResponseMO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * H5车险出单API
 * Created by jiyaqun on 2017-08-09.
 */
@Api(value = "/auto/policy/", description = "车险出单API")
@RestController
@RequestMapping("/auto/policy/")
public class AutoPolicyInsuredController {

    @Autowired
    private AutoPolicyService autoPolicyService;

    @ApiOperation(value = "车险保费计算", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "calculate", method = RequestMethod.POST)
    @ResponseBody
    public RequestResult<H5CalcResponseMO> calculatePremium(@RequestBody H5CalcRequestMO calcRequestMO) {
        RequestResult<H5CalcResponseMO> requestResult = new RequestResult<>();

        try {
            String businessNo = "";
            if (StringUtil.isNotBlank(calcRequestMO.getOrderNo())) {
                businessNo = calcRequestMO.getOrderNo();
            } else if (calcRequestMO.getVehicle() != null
                    && StringUtil.isNotBlank(calcRequestMO.getVehicle().getVin())) {
                businessNo = calcRequestMO.getVehicle().getVin();
            }

            if (StringUtil.isNotBlank(businessNo)) {
                //noinspection deprecation
                ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, businessNo);
            }

            requestResult.setResult(autoPolicyService.calculatePremium(calcRequestMO));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "报价", e);
        }

        return requestResult;
    }

    @ApiOperation(value = "车险保单提交", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "submit", method = RequestMethod.POST)
    @ResponseBody
    public RequestResult<H5SubmitResponseMO> submitPolicy(@RequestBody H5SubmitRequestMO submitRequestMO) {
        RequestResult<H5SubmitResponseMO> requestResult = new RequestResult<>();

        try {
            if(StringUtil.isNotBlank(submitRequestMO.getOrderNo())) {
                //noinspection deprecation
                ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, submitRequestMO.getOrderNo());
            }

            requestResult.setResult(autoPolicyService.submitPolicy(submitRequestMO));
        } catch (Exception e) {
            //noinspection ThrowableResultOfMethodCallIgnored
            ExceptionUtil.handleDubboException(e);
            //提交失败返回前端失败状态，前端处理跳转页面而不提示异常
            H5SubmitResponseMO h5SubmitResponseMO = new H5SubmitResponseMO();
            h5SubmitResponseMO.setOrderNo(submitRequestMO.getOrderNo());
            h5SubmitResponseMO.setOrderStatus("FAILED");
            requestResult.setResult(h5SubmitResponseMO);
        }

        return requestResult;
    }

    @ApiOperation(value = "删除订单", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "delete/{orderNo}", method = RequestMethod.POST)
    @ResponseBody
    public RequestResult deleteOrder(@PathVariable("orderNo") String orderNo) {
        RequestResult requestResult;
        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, orderNo);
            requestResult = autoPolicyService.deleteOrder(orderNo);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "删除订单", e);
        }
        return requestResult;
    }

}
