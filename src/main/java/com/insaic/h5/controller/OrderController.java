package com.insaic.h5.controller;

import com.insaic.base.PageResult;
import com.insaic.base.RequestResult;
import com.insaic.base.context.ThreadLocalContext;
import com.insaic.base.context.UserProfile;
import com.insaic.base.exception.BusinessException;
import com.insaic.base.utils.StringUtil;
import com.insaic.ecs.model.order.*;
import com.insaic.ecs.service.ECOrderService;
import com.insaic.h5.utils.CommonExceptionUtil;
import com.insaic.integration.model.SyncValuePackageOrderInfoResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * 订单管理服务
 * Created by pengfarui on 2017/9/18.
 */
@Api(value = "/order/", description = "订单管理服务API")
@RestController
@RequestMapping("/order/")
public class OrderController {

    @Autowired
    private ECOrderService ecOrderService;

    /**
     * 查询当前用户是否已成功购了服务包
     * @param vin 车架号
     * @return 是否已购买
     */
    @ApiOperation(value = "查询当前用户是否已成功购了服务包", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "hasBought/{vin}", method = RequestMethod.POST)
    public RequestResult<Boolean> hasBought(@PathVariable("vin") String vin) {
        if (StringUtil.isBlank(vin)) {
            return CommonExceptionUtil.handleException("", "查询我的已购买服务包", new BusinessException("车架号不能为空"));
        }

        UserProfile currentUser = UserProfile.getCurrentUser();
        if (currentUser == null || !StringUtils.equals("BM" + vin, currentUser.getUserCode())) {
            return CommonExceptionUtil.handleException("", "查询我的已购买服务包", new BusinessException("无当前操作权限"));
        }

        RequestResult<Boolean> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vin);

            requestResult.setResult(ecOrderService.queryUserHasBought(currentUser.getUserCode()));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询我的已购买服务包", e);
        }

        return requestResult;
    }

    /**
     * 校验购买权限
     *
     * @param vin 车架号
     * @param productCode 产品代码
     * @return
     */
    @ApiOperation(value = "校验购买权限", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "valid-buy/{vin}/{productCode}", method = RequestMethod.POST)
    public RequestResult<ECOrderBuyPermissionMO> validBuyPermissions(@PathVariable("vin") String vin,
                                             @PathVariable("productCode") String productCode) {
        if (StringUtil.isBlank(vin)) {
            return CommonExceptionUtil.handleException("", "校验购买权限", new BusinessException("车架号不能为空"));
        } else if (StringUtil.isBlank(productCode)) {
            return CommonExceptionUtil.handleException("", "校验购买权限", new BusinessException("商品代码不能为空"));
        }

        UserProfile currentUser = UserProfile.getCurrentUser();
        if (currentUser == null || !StringUtils.equals("BM" + vin, currentUser.getUserCode())) {
            return CommonExceptionUtil.handleException("", "校验购买权限", new BusinessException("无当前操作权限"));
        }

        RequestResult<ECOrderBuyPermissionMO> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vin);

            requestResult.setResult(ecOrderService.validBuyPermissions(currentUser.getUserCode(), vin, productCode));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "校验购买权限", e);
        }

        return requestResult;
    }

    /**
     * 计算订单金额
     *
     * @return
     */
    @ApiOperation(value = "计算订单金额", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "calc-order-amount", method = RequestMethod.POST)
    public RequestResult<ECOrderAmountMO> calculateOrderAmount(@RequestBody ECOrderMO ecOrderMO) {
        if (null == ecOrderMO) {
            return CommonExceptionUtil.handleException("", "计算订单金额", new BusinessException("请求对象为空！"));
        }
        else if (StringUtil.isBlank(ecOrderMO.getVin())) {
            return CommonExceptionUtil.handleException("", "计算订单金额", new BusinessException("VIN码不能为空！"));
        }

        RequestResult<ECOrderAmountMO> result = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, ecOrderMO.getVin());

            result.setResult(ecOrderService.calcOrderAmount(ecOrderMO));
        } catch (Exception ex) {
            return CommonExceptionUtil.handleDubboException("", "计算订单金额", ex);
        }

        return result;
    }

    /**
     * 提交订单信息
     *
     * @return
     */
    @ApiOperation(value = "提交服务包购买订单", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "submit", method = RequestMethod.POST)
    public RequestResult<ECOrderSubmitResponseMO> submit(@RequestBody ECOrderMO ecOrderMO) {
        if (null == ecOrderMO) {
            return CommonExceptionUtil.handleException("", "提交服务包购买订单", new BusinessException("请求对象为空！"));
        }
        else if (StringUtil.isBlank(ecOrderMO.getVin())) {
            return CommonExceptionUtil.handleException("", "提交服务包购买订单", new BusinessException("VIN码不能为空！"));
        }

        RequestResult<ECOrderSubmitResponseMO> result = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, ecOrderMO.getVin());

            result.setResult(ecOrderService.submit(ecOrderMO));
        } catch (Exception ex) {
            return CommonExceptionUtil.handleDubboException("", "提交服务包购买订单", ex);
        }

        return result;
    }

    /**
     * 计算订单退款金额
     *
     * @return
     */
    @ApiOperation(value = "计算退款金额", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "calc-order-refund", method = RequestMethod.POST)
    public RequestResult<ECOrderRefundMO> calculateOrderRefundAmount(
            @RequestBody ECOrderRefundApplicationMO ecOrderRefundApplicationMO) {
        if (null == ecOrderRefundApplicationMO) {
            return CommonExceptionUtil.handleDubboException("", "计算退款金额", new BusinessException("请求对象为空！"));
        }

        // 订单号
        String orderNo = ecOrderRefundApplicationMO.getEcOrderNo();
        if (StringUtil.isBlank(orderNo)) {
            return CommonExceptionUtil.handleDubboException("", "计算退款金额", new BusinessException("订单号不允许为空！"));
        }

        RequestResult<ECOrderRefundMO> result = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY,
                    ecOrderRefundApplicationMO.getEcOrderNo());

            result.setResult(ecOrderService.calcOrderRefundAmount(ecOrderRefundApplicationMO));
        } catch (Exception ex) {
            return CommonExceptionUtil.handleDubboException("", "计算退款金额", ex);
        }

        return result;
    }

    /**
     * 退款
     *
     * @return
     */
    @ApiOperation(value = "退款", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "refund", method = RequestMethod.POST)
    public RequestResult<ECOrderRefundMO> refund(@RequestBody ECOrderRefundApplicationMO ecOrderRefundApplicationMO) {
        if (null == ecOrderRefundApplicationMO) {
            return CommonExceptionUtil.handleDubboException("", "计算退款金额", new BusinessException("请求对象为空！"));
        }

        // 订单号
        String orderNo = ecOrderRefundApplicationMO.getEcOrderNo();
        if (StringUtil.isBlank(orderNo)) {
            return CommonExceptionUtil.handleDubboException("", "计算退款金额", new BusinessException("订单号不允许为空！"));
        }

        RequestResult<ECOrderRefundMO> result = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY,
                    ecOrderRefundApplicationMO.getEcOrderNo());

            result.setResult(ecOrderService.refund(ecOrderRefundApplicationMO));
        } catch (Exception ex) {
            return CommonExceptionUtil.handleDubboException("", "退款", ex);
        }

        return result;
    }

    /**
     * 查询订单兑换券列表信息
     * @return
     */
    @ApiOperation(value = "查询订单兑换券列表信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "vouchersList", method = RequestMethod.POST)
    public RequestResult<PageResult<OrderVouchersMO>> queryOrderVouchersList(@RequestBody QueryOrderVouchersCondition condition) {
        RequestResult<PageResult<OrderVouchersMO>> requestResult = new RequestResult<>();

        try {
            requestResult.setResult(ecOrderService.queryOrderVouchersList(condition));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询订单兑换券列表信息", e);
        }

        return requestResult;
    }
}
