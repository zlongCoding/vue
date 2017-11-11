package com.insaic.h5.controller;

import com.insaic.base.PageResult;
import com.insaic.base.RequestResult;
import com.insaic.base.context.ThreadLocalContext;
import com.insaic.ecs.service.AutoPolicyQueryService;
import com.insaic.h5.utils.CommonExceptionUtil;
import com.insaic.policy.model.AutoPolicyRequestMO;
import com.insaic.policy.model.DealerInfo;
import com.insaic.policy.model.h5.H5DealerRequestMO;
import com.insaic.policy.model.h5.H5PartnerOrderMO;
import com.insaic.policy.model.h5.H5PolicyDetailMO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


/**
 * H5车险公共数据API
 * Created by jiyaqun on 2017-08-09.
 */
@Api(value = "/auto/policy/", description = "车险保单查询API")
@RestController
@RequestMapping("/auto/policy/")
public class AutoPolicyQueryController {
    @Autowired
    private AutoPolicyQueryService autoPolicyQueryService;

    @RequestMapping(value = "vouchersNo/{orderNo}", method = RequestMethod.POST)
    @ResponseBody
    public RequestResult<String> findVouchersNoByOrder(@PathVariable("orderNo") String orderNo) {
        RequestResult<String> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, orderNo);

            requestResult.setResult(autoPolicyQueryService.findVouchersNoByOrder(orderNo));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "根据车险订单号获取卡券编号", e);
        }

        return requestResult;
    }

    /**
     * 根据服务包获取投保省市
     *
     * @return 服务包所选投保省市
     */
    @ApiOperation(value = "根据服务包获取投保省市", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "area/{vouchersNo}", method = RequestMethod.POST)
    public RequestResult<Map<String, Object>> queryProvinceAndCity(@PathVariable("vouchersNo") String vouchersNo) {
        RequestResult<Map<String, Object>> result = new RequestResult<>();
        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vouchersNo);

            result.setResult(autoPolicyQueryService.findProvinceAndCityByVouchersNo(vouchersNo));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "获取投保省市", e);
        }

        return result;
    }

    @ApiOperation(value = "获取车险可投保的经销商列表", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "dealer/{vouchersNo}", method = RequestMethod.POST)
    public RequestResult<List<DealerInfo>> queryDealerList(@PathVariable("vouchersNo") String vouchersNo){
        RequestResult<List<DealerInfo>> result = new RequestResult<>();

        try{
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vouchersNo);

            result.setResult(autoPolicyQueryService.queryDealerListByVouchersNo(vouchersNo));
        }catch (Exception e){
            return CommonExceptionUtil.handleDubboException("","获取车险可投保的经销商列表",e);
        }

        return result;
    }

    /**
     * 查询经销商省市及历史邮寄地址
     * @param orderNo
     * @return
     */
    @ApiOperation(value = "查询经销商省市及历史邮寄地址", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "delivery/{orderNo}", method = RequestMethod.POST)
    @ResponseBody
    public RequestResult<Map<String, Object>> getDelivery(@PathVariable("orderNo") String orderNo){
        RequestResult<Map<String, Object>> result = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, orderNo);

            result.setResult(autoPolicyQueryService.getDelivery(orderNo));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询邮寄地址", e);
        }

        return result;
    }


    /**
     * 根据VIN查询insaic车险订单列表
     *
     * @param autoPolicyRequestMO
     * @return 车险订单列表
     */
    @ApiOperation(value = "根据VIN查询insaic车险订单列表", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "query", method = RequestMethod.POST)
    @ResponseBody
    public RequestResult<PageResult<H5PartnerOrderMO>> queryAutoOrdersByVin(@RequestBody AutoPolicyRequestMO autoPolicyRequestMO) {
        RequestResult<PageResult<H5PartnerOrderMO>> requestResult = new RequestResult<>();

        try {
            if (autoPolicyRequestMO != null) {
                ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, autoPolicyRequestMO.getVin());
            }

            requestResult.setResult(autoPolicyQueryService.queryAutoOrderList(autoPolicyRequestMO));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "获取合作伙伴车险列表", e);
        }

        return requestResult;
    }

    @ApiOperation(value = "获取合作伙伴车险保单明细", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "detail/{orderNo}", method = RequestMethod.POST)
    public RequestResult<H5PolicyDetailMO> queryPolicyDetail(@PathVariable("orderNo") String orderNo) {
        RequestResult<H5PolicyDetailMO> result = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, orderNo);

            result.setResult(autoPolicyQueryService.queryPolicyListByOrderNo(orderNo));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "获取合作伙伴车险保单明细", e);
        }

        return result;
    }
}
