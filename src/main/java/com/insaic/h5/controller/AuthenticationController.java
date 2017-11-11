package com.insaic.h5.controller;

import com.insaic.base.RequestResult;
import com.insaic.base.context.UserProfile;
import com.insaic.base.exception.BusinessException;
import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.mapper.JsonMapper;
import com.insaic.base.utils.StringUtil;
import com.insaic.base.web.utils.CaptchaUtil;
import com.insaic.base.web.utils.HttpRequestUtil;
import com.insaic.common.security.entity.UserBindingEO;
import com.insaic.common.security.entity.UserEO;
import com.insaic.common.security.enums.ErrorCodeEnum;
import com.insaic.common.security.service.SecurityService;
import com.insaic.h5.model.UserLoginInfo;
import com.insaic.h5.utils.Constant;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.OutputStream;
import java.util.Date;

/**
 * 授权认证Controller
 * Created by jiyaqun on 2017-09-06.
 */
@Api(value = "/auth/", description = "授权认证API")
@RestController
@RequestMapping("/auth/")
public class AuthenticationController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SecurityService securityService;

    /**
     * 获取验证码
     */
    @RequestMapping(value = "captcha", method = RequestMethod.GET)
    public void getCaptchaImage(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("image/jpeg");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.addHeader("Pragma", "no-cache");
        OutputStream out;
        try {
            out = response.getOutputStream();
            HttpSession session = request.getSession();
            String captcha = CaptchaUtil.generateCapth(out);
            if (session != null) {
                session.setAttribute(Constant.SESSION_KEY_CAPTCHA, captcha);
            }
        } catch (Exception ex) {
            ExceptionUtil.handleException(ex);
        }
    }

    /**
     * 经销商用户登录
     *
     * @param userLoginInfo 用户登录信息
     */
    @ApiOperation(value = "经销商用户登录接口", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "dealerLogin", method = RequestMethod.POST)
    public RequestResult<String> dealerLogin(@RequestBody UserLoginInfo userLoginInfo, HttpServletRequest request) {
        logger.info("经销商用户登录信息：{}", JsonMapper.nonEmptyMapper().toJson(userLoginInfo));
        RequestResult<String> requestResult = new RequestResult<>();
        try {
            String userCode = userLoginInfo.getUserCode();

            if (StringUtil.isBlank(userCode)) {
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, "用户名不能为空");
                return requestResult;
            }

            String password = userLoginInfo.getPassword();

            if (StringUtil.isBlank(password)) {
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, "密码不能为空");
                return requestResult;
            }

            // 获得 ip 地址
            String ip = HttpRequestUtil.getClientIp(request);
            // 获得 session id
            String sessionId = request.getSession().getId();

            // 获取微信授权后用户openId
//            String openId = (String) request.getSession().getAttribute(Constant.WECHAT_SESSION_OPENID);
// TODO 暂时不用验证码
//            // 获取session中 真实验证码
//            String captcha_real = (String) request.getSession().getAttribute(Constant.SESSION_KEY_CAPTCHA);
//
//            // 验证码是否正确
//            String captcha = userLoginInfo.getCaptcha();
//
//            // 真实验证码 为空 or 验证码 为空 or 两者不相等 则验证码错误
//            if (StringUtil.isBlank(captcha_real) || StringUtil.isNotBlank(captcha) || !captcha_real.equals(captcha)) {
//                requestResult.addErrorMessage(Constant.WECHAT_CAPTCHA_ERROR, "验证码不正确");
//                return requestResult;
//            }

            String openId = "openId+"+new Date().getTime();
            if (StringUtil.isNotBlank(openId)) {
                // 验证用户名 和 密码
                String login = securityService.login(userCode, password, sessionId, ip, "dim");

                // 空字符串代表成功
                if (StringUtil.isBlank(login)) {
                    // 绑定用户
                    UserBindingEO userBinding = securityService.bindWeichartUser(openId, null, userCode);

                    // 获取用户详情
                    UserEO userEO = securityService.findByUserId(userBinding.getUserId());

                    UserProfile currentUser = new UserProfile();
//                    currentUser.setUserCode(userEO.getUserCode());
//                    currentUser.setUserName(userEO.getUserName());
//                    currentUser.setMobile(userEO.getMobile());
//                    currentUser.setDealerCode(userEO.getDealerCode());
                    currentUser.setUserCode("NIKe");
                    currentUser.setUserName("NIKe");
                    currentUser.setMobile("15800939677");
                    currentUser.setDealerCode("BK20007");
                    currentUser.setCurrentUser();

                    // 在session中存储授权账户
                    request.getSession().setAttribute(UserProfile.USER_PROFILE_KEY, JsonMapper.nonDefaultMapper().toJson(currentUser));
                }
                else {
                    // 处理登录失败
                    processLoginError(requestResult, login);
                }
            } else {
                requestResult.addErrorMessage(Constant.WECHAT_TIME_OUT, "微信认证超时");
                return requestResult;
            }
        } catch (Exception e) {
            logger.error("经销商登录接口报错 error:{}", e.getMessage());
            requestResult.addErrorMessage("999", "经销商用户登录错误");
            return requestResult;
        }
        return requestResult;
    }

    private void processLoginError(RequestResult<String> requestResult, String login) {
        switch (ErrorCodeEnum.getByCode(login)) {
            case ERROR_USER_NOT_EMPTY:
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, ErrorCodeEnum.ERROR_USER_NOT_EMPTY.getDesc());
                break;
            case ERROR_PASSWORD_NOT_EMPTY:
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, ErrorCodeEnum.ERROR_PASSWORD_NOT_EMPTY.getDesc());
                break;
            case ERROR_USER_NOT_FOUND:
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, ErrorCodeEnum.ERROR_USER_NOT_FOUND.getDesc());
                break;
            case ERROR_MODIFY_PASSWORD:
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, ErrorCodeEnum.ERROR_MODIFY_PASSWORD.getDesc());
                break;
            case ERROR_ACCOUNT_LOCKED:
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, ErrorCodeEnum.ERROR_ACCOUNT_LOCKED.getDesc());
                break;
            case ERROR_USER_PASSWORD:
                requestResult.addErrorMessage(Constant.WECHAT_LOGIN_ERROR, ErrorCodeEnum.ERROR_USER_PASSWORD.getDesc());
                break;
            default:
                throw new BusinessException("系统异常");
        }
    }
}
