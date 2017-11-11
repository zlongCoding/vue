package com.insaic.h5.controller;

import com.insaic.base.RequestResult;
import com.insaic.base.utils.StringUtil;
import com.insaic.ecs.model.wechat.WeChatSignMO;
import com.insaic.ecs.service.WeChatService;
import com.insaic.h5.utils.CommonExceptionUtil;
import com.insaic.h5.utils.Sign;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 微信controller
 *
 * @author wanghao
 * @create 2017-10-31 14:04
 */
@Api(value = "/weChat/", description = "微信服务API")
@RestController
@RequestMapping("/weChat/")
public class WeChatController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private WeChatService weChatService;

    @ApiOperation(value = "获取微信js-sdk 签名", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "sign", method = RequestMethod.POST)
    public RequestResult<WeChatSignMO> getSign(@RequestParam("url") String url) {

        if (StringUtils.isEmpty(url)) {
            return CommonExceptionUtil.handleException("", "获取微信js-sdk 签名", new IllegalArgumentException("URL 参数为空"));
        }

        Map<String, String> map = null;
        RequestResult<WeChatSignMO> result = new RequestResult<>();
        try {
            // 不包含#及其后面部分
            url = url.split("#")[0];

            // 获取 jsapi_ticket
            String ticket = weChatService.getTicket();

            // 获取 appId
            String appId = weChatService.getAppId();

            // 获得签名后的map
            map = Sign.sign(ticket, url);

            // 组装对象
            WeChatSignMO weChatSignMO = new WeChatSignMO();
            weChatSignMO.setNonceStr(map.get("nonceStr"));
            weChatSignMO.setSignature(map.get("signature"));
            weChatSignMO.setTimestamp(map.get("timestamp"));
            weChatSignMO.setAppId(appId);

            result.setResult(weChatSignMO);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "获取微信js-sdk 签名", e);
        }
        return result;
    }

    /**
    @ApiOperation(value = "因为前端没有页面，此接口仅开发用于回显微信code", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "code", method = {RequestMethod.POST, RequestMethod.GET})
    public RequestResult<String> getCode(String from, String code, String state) {
        RequestResult<String> result = new RequestResult();
        logger.info("from:{},code:{},state:{}", from, code, state);
        result.setResult(code);
        return result;
    }
    */
/**
    @ApiOperation(value = "检验手机验证码", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "checkSmsCode", method = {RequestMethod.POST})
    public RequestResult<String> checkSmsCode(String phone,String code, HttpServletRequest request) {
        RequestResult<String> result = new RequestResult();
        try {
            if (StringUtil.isBlank(phone) || phone.length() != 11) {
                result.addErrorMessage("999", "手机号格式不合法");
                return result;
            }
            if (StringUtil.isBlank(code) || phone.length() != 6) {
                result.addErrorMessage("999", "短信验证码不合法");
                return result;
            }

            String id = request.getSession().getId();

            String smsCode = weChatService.findSmsCode(phone, id);

            if (StringUtil.isBlank(smsCode)) {
                result.addErrorMessage("999", "短信验证码超时");
                return result;
            }
            if (!code.equals(smsCode)) {
                result.addErrorMessage("999", "短信验证码错误");
                return result;
            }
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "检验手机验证码", e);
        }
        return result;
    }
    */
}
