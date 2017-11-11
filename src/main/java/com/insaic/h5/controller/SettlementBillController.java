package com.insaic.h5.controller;

import com.insaic.base.PageResult;
import com.insaic.base.RequestResult;
import com.insaic.base.context.UserProfile;
import com.insaic.base.exception.BusinessException;
import com.insaic.base.utils.StringUtil;
import com.insaic.ecs.model.settlement.*;
import com.insaic.ecs.service.ECSettlementBillService;
import com.insaic.ecs.service.WeChatService;
import com.insaic.h5.utils.CommonExceptionUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 卡券核销结算账单相关API
 * Created By GaoJun on 9:23 2017/11/2
 */
@Api(value = "/vouchers/settlement/bill", description = "卡券结算账单相关API")
@RestController
@RequestMapping("/vouchers/settlement/bill/")
public class SettlementBillController {

    @Autowired
    private ECSettlementBillService ecSettlementBillService;

    @Autowired
    private WeChatService weChatService;


    @ApiOperation(value = "结算月度账单查询", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "monthlyList", method = RequestMethod.POST)
    public RequestResult<PageResult<SettlementMonthlyBillMO>> queryMonthlyBillList(@RequestBody QuerySettlementMonthlyBillCondition condition) {
        RequestResult<PageResult<SettlementMonthlyBillMO>> requestResult = new RequestResult<>();
        try {
            requestResult.setResult(ecSettlementBillService.queryMonthlyBillList(condition));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "结算账单查询", e);
        }
        return requestResult;
    }

    @ApiOperation(value = "查看结算账单明细", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public RequestResult<PageResult<SettlementBillMO>> queryBillList(@RequestBody QuerySettlementBillCondition condition) {
        RequestResult<PageResult<SettlementBillMO>> requestResult = new RequestResult<>();
        try {
            requestResult.setResult(ecSettlementBillService.querySettlementBillList(condition));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查看结算账单明细", e);
        }
        return requestResult;
    }

    @ApiOperation(value = "获取短信验证码", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "sendSmsCode", method = RequestMethod.POST)
    public RequestResult<String> sendSmsCode(HttpServletRequest request) {
        RequestResult<String> result = new RequestResult<>();
        try {
            String id = request.getSession().getId();

            UserProfile currentUser = UserProfile.getCurrentUser();

            if (currentUser == null || StringUtil.isBlank(currentUser.getMobile()) || currentUser.getMobile().length() != 11) {
                result.addErrorMessage("999","无当前操作权限");
                return result;
            }

            String phone = weChatService.sendSmsCode(currentUser.getMobile(), id);

            result.setResult(phone);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "获取短信验证码", e);
        }
        return result;
    }

    @ApiOperation(value = "确认结算", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "confirm", method = RequestMethod.POST)
    public RequestResult confirm(@RequestBody SettlementConfirmMO settlementConfirmMO, HttpServletRequest request) {
        try {
            boolean result = weChatService.checkSmsCode(UserProfile.getCurrentUser().getMobile(), request.getSession().getId(), settlementConfirmMO.getCheckCode());
            if (!result) {
                RequestResult requestResult = new RequestResult();
                requestResult.addErrorMessage("999","短信验证码错误");
                return requestResult;
            }
            return ecSettlementBillService.confirmMonthlyBill(settlementConfirmMO.getMonthlyBillId());
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "确认结算", e);
        }
    }

}
