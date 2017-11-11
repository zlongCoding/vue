package com.insaic.h5.controller;

import com.insaic.base.RequestResult;
import com.insaic.base.context.ThreadLocalContext;
import com.insaic.ecs.model.user.UserVouchersDetailMO;
import com.insaic.ecs.model.vouchers.VouchersWriteoffMO;
import com.insaic.ecs.service.ECUserService;
import com.insaic.h5.utils.CommonExceptionUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by liuwanquan on 2017/9/18.
 */
@Api(value = "/vouchers/", description = "卡券管理服务API")
@RestController
@RequestMapping("/vouchers/")
public class VouchersController {

    @Autowired
    private ECUserService ecUserService;

    /**
     * 查询兑换券详细信息
     * @param vouchersNo 卡券编号
     * @return 兑换券详细信息
     */
    @ApiOperation(value = "查询兑换券详细信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "voucherDetail/{vouchersNo}", method = RequestMethod.POST)
    public RequestResult<UserVouchersDetailMO> queryVoucherDetail(@PathVariable("vouchersNo") String vouchersNo) {
        RequestResult<UserVouchersDetailMO> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, vouchersNo);

            requestResult.setResult(ecUserService.queryVoucherDetail(vouchersNo));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询兑换券详细信息", e);
        }

        return requestResult;
    }

    /**
     * 查询车险卡券编号
     * @param orderNo 外部订单编号
     * @return 车险卡券编号
     */
    @ApiOperation(value = "查询车险卡券编号", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "autoVouchersNo/{orderNo}", method = RequestMethod.POST)
    public RequestResult<Map> queryAutoVouchersNo(@PathVariable("orderNo") String orderNo) {
        RequestResult<Map> requestResult = new RequestResult<>();

        try {
            ThreadLocalContext.getContext().set(ThreadLocalContext.BUSINESS_NO_KEY, orderNo);
            Map resultMap = ecUserService.queryAutoVouchersNo(orderNo);
            boolean success = (Boolean) resultMap.get("success");
            for(int i=0;i<3&&!success;i++){
                Thread.sleep(2000);
                resultMap = ecUserService.queryAutoVouchersNo(orderNo);
                success = (Boolean) resultMap.get("success");
                if(success){
                    break;
                }
            }
            requestResult.setResult(resultMap);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询车险卡券编号", e);
        }

        return requestResult;
    }

    @ApiOperation(value = "查询卡券核销信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "validVouchersWriteoff/{param}", method = RequestMethod.POST)
    public RequestResult<VouchersWriteoffMO> queryValidVoucherWriteoff(@PathVariable("param") String param) {
        RequestResult<VouchersWriteoffMO> requestResult = new RequestResult<>();
        try {
            requestResult.setResult(ecUserService.queryValidVoucherWriteoff(param));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询卡券核销信息", e);
        }
        return requestResult;
    }

}
