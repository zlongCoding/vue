package com.insaic.h5;

import com.alibaba.fastjson.JSON;
import com.insaic.base.RequestResult;
import com.insaic.base.context.ThreadLocalContext;
import com.insaic.base.context.UserProfile;
import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.mapper.JsonMapper;
import com.insaic.base.redis.RedisMessageQueueHandler;
import com.insaic.base.utils.SpringBeanLocator;
import com.insaic.base.utils.StringUtil;
import com.insaic.base.web.utils.HttpRequestUtil;
import com.insaic.common.security.entity.UserBindingEO;
import com.insaic.common.security.entity.UserEO;
import com.insaic.ecs.entity.user.ECUserEO;
import com.insaic.ecs.enums.ECBindUserAppType;
import com.insaic.ecs.model.user.ECBindUserMO;
import com.insaic.ecs.model.wechat.WeChatUserInfoMO;
import com.insaic.ecs.service.ECUserService;
import com.insaic.h5.logic.BanmaTokenHandler;
import com.insaic.h5.logic.WeChatTokenHandler;
import com.insaic.h5.model.BanmaToken;
import com.insaic.h5.model.WeChatToken;
import com.insaic.h5.utils.CommonUtil;
import com.insaic.h5.utils.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 授权认证过滤器
 * Created by jiyaqun on 2017-08-21.
 */
public class AuthenticationFilter implements Filter {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    // 关键业务功能出错时，将错误信息放入redis队列中，等待发送告警信息
    private final static String REDIS_EXCEPTION_LOG_KEY = "exception:log";
    private String httpScheme = "";
    private List<String> excludePathList = Collections.synchronizedList(new ArrayList<>());
    private List<String> excludeFileList = Collections.synchronizedList(new ArrayList<>());

    private ECUserService ecUserService;
    private BanmaTokenHandler banmaTokenHandler;
    private RedisMessageQueueHandler redisMessageQueueHandler;
    private WeChatTokenHandler weChatTokenHandler;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        ecUserService = SpringBeanLocator.getBean(ECUserService.class);
        banmaTokenHandler = SpringBeanLocator.getBean(BanmaTokenHandler.class);
        redisMessageQueueHandler = SpringBeanLocator.getBean(RedisMessageQueueHandler.class);
        weChatTokenHandler = SpringBeanLocator.getBean(WeChatTokenHandler.class);
        String excludePath = filterConfig.getInitParameter("excludePath");
        if (StringUtil.isNotBlank(excludePath)) {
            String[] excludeFile = excludePath.split(",");
            for (int i = 0; i < excludeFile.length; i++) {
                String file = excludeFile[i];
                this.excludePathList.add(file);
            }
        }
        String excludeFile = filterConfig.getInitParameter("excludeFile");
        if (StringUtil.isNotBlank(excludeFile)) {
            String[] excludeType = excludeFile.split(",");
            for (int i = 0; i < excludeType.length; i++) {
                String file = excludeType[i];
                this.excludeFileList.add(file.toUpperCase());
            }
        }
        String profile = System.getProperties().getProperty("spring.profiles.active");
        if ("development".equals(profile)) {
            httpScheme = "http";
        } else {
            httpScheme = filterConfig.getInitParameter("httpScheme");
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        long start = System.currentTimeMillis();

        String requestUrl = request.getRequestURL().toString();
        String fileType = CommonUtil.getFileTypeByURL(requestUrl);
        if (StringUtil.isNotBlank(request.getQueryString())) {
            logger.info("queryString: {}......", request.getQueryString());
            requestUrl += "?" + request.getQueryString();
        }

        //不需要身份验证的直接跳过
        for (String excludePath : excludePathList) {
            if (requestUrl.contains(excludePath)) {
                filterChain.doFilter(servletRequest, servletResponse);
                printLog(start, requestUrl);
                return;
            }
        }
        if (excludeFileList.contains(fileType)) {
            filterChain.doFilter(servletRequest, servletResponse);
            printLog(start, requestUrl);
            return;
        }

        // 清空ThreadLocal中的缓存信息，因为在应用服务器上是以线程池的方式存在的
        ThreadLocalContext.getContext().clear();

        // 斑马验证入口
        if (requestUrl.contains("/auth/banma")) {
            this.authenticateByBanMa(request, response);
        }
        // 微信验证入口
        else if (requestUrl.contains("/auth/weChat")) {
            this.authenticateByWeChat(request, response);
        }
        // 非验证页面，继续验证是否已登
        else {
            // 目前暂时写死用户 权限全放开
            UserProfile currentUser = new UserProfile();
            currentUser.setUserCode("NIKe");
            currentUser.setUserName("NIKe");
            currentUser.setMobile("15800939677");
            currentUser.setDealerCode("BK20007");
            currentUser.setManufactory("SGM");
            currentUser.setBrandCode("BUICK");
            currentUser.setProvince("370000");
            currentUser.setCity("370100");
            currentUser.setCurrentUser();
            request.getSession().setAttribute(UserProfile.USER_PROFILE_KEY, JsonMapper.nonDefaultMapper().toJson(currentUser));

            String ua = request.getHeader("user-agent").toLowerCase();

            boolean validation = false;
            // 是微信浏览器
            if (ua.indexOf("micromessenger") > 0) {
                validation = true;
            }

            // 微信浏览器过来的请求
            if (validation) {
//                Object openId = request.getSession().getAttribute(Constant.WECHAT_SESSION_OPENID);
//                if (openId == null) {
//                    // 没有openId信息需要重新认证
//                    weChatAutoError(request, response);
//                    return;
//                }

                String userProfileInfo = (String) request.getSession().getAttribute(UserProfile.USER_PROFILE_KEY);
                if (StringUtil.isBlank(userProfileInfo)) {
                    // 没有获取到用户信息需要重新认证
                    weChatAutoError(request, response);
                    return;
                }

                // 用户已登录入，设置当前用户信息
                UserProfile userProfile = UserProfile.fromJson(userProfileInfo);
                userProfile.setCurrentUser();
            }
            // 非微信浏览器过来的请求
            else {
                String userProfileInfo = (String) request.getSession().getAttribute(UserProfile.USER_PROFILE_KEY);
                if (StringUtil.isBlank(userProfileInfo)) {
                    //目前非斑马直接都返回无权限访问的页面，有其他接入方式接入再进行其他接入方式的校验
                    this.redirectToNoPrivilegePages(request, response);
                    return;
                }

                // 用户已登录入，设置当前用户信息
                UserProfile userProfile = UserProfile.fromJson(userProfileInfo);
                userProfile.setCurrentUser();
            }

            filterChain.doFilter(servletRequest, servletResponse);
            this.printLog(start, requestUrl);
        }
    }

    @Override
    public void destroy() {
        this.excludePathList.clear();
        this.excludeFileList.clear();
    }

    /**
     * 斑马授权认证
     *
     * @param request  Http请求
     * @param response Http响应
     * @return 是否认证通过
     */
    private void authenticateByBanMa(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String json = HttpRequestUtil.readJsonFromRequest(request);
        String ip = HttpRequestUtil.getClientIp(request);
        logger.info("斑马认证请求：{}, 请求IP:{}, 请求sessionId:{}", json, ip, request.getSession().getId());

        if (StringUtil.isBlank(json)) {
            this.redirectToNoPrivilegePages(request, response);
            return;
        }

        BanmaToken banmaToken = JsonMapper.nonDefaultMapper().fromJson(json, BanmaToken.class);
        if (banmaToken == null) {
            this.redirectToNoPrivilegePages(request, response);
            return;
        }

        String authCode = banmaToken.getAuthCode();
        String vin = banmaToken.getVin();
        if (StringUtil.isBlank(authCode) || StringUtil.isBlank(vin)) {
            this.redirectToNoPrivilegePages(request, response);
            return;
        }

        // 内部测试验证不通过
        if (authCode.startsWith(Constant.INSAIC_ENCODE_AUTHCODE_HEAD)
                && !banmaTokenHandler.validInsaicAuthCode(authCode, vin)) {
            this.redirectToNoPrivilegePages(request, response);
            return;
        }
        // 调用斑马认证接口
        else {
            BanmaToken banmaTokenRes = null;
            try {
                banmaTokenRes = banmaTokenHandler.getBanMaToken(authCode, vin);
            } catch (Exception ex) {
                Exception e = ExceptionUtil.handleException(ex);
                //斑马授权异常错误信息通过邮件发送，不直接提示用户
                redisMessageQueueHandler.push(REDIS_EXCEPTION_LOG_KEY,
                        ExceptionUtil.createExceptionLog("h5-web", "获取斑马授权认证", e).toJson());
            }

            // 斑马认证失败
            if (banmaTokenRes == null || StringUtil.isBlank(banmaTokenRes.getAccessToken())) {
                this.redirectToNoPrivilegePages(request, response);
                return;
            }
        }

        // 绑定用户信息
        ECUserEO ecUserEO = null;
        try {
            ecUserEO = bindBanmaAppUser(vin);
        } catch (Exception ex) {
            Exception e = ExceptionUtil.handleException(ex);
            redisMessageQueueHandler.push(REDIS_EXCEPTION_LOG_KEY,
                    ExceptionUtil.createExceptionLog("h5-web", "绑定斑马APP用户", e).toJson());
        }

        // 绑定用户失败
        if (ecUserEO == null) {
            this.redirectToNoPrivilegePages(request, response);
            return;
        }

        UserProfile currentUser = new UserProfile();
        currentUser.setUserCode(ecUserEO.getUserCode());
        currentUser.setUserName(ecUserEO.getUserName());
        currentUser.setMobile(ecUserEO.getMobile());
        currentUser.setCurrentUser();

        request.getSession().setAttribute(UserProfile.USER_PROFILE_KEY, JsonMapper.nonDefaultMapper().toJson(currentUser));

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        RequestResult<String> result = new RequestResult<>();
        result.setResult("SUCCESS");
        writer.println(JSON.toJSONString(result));
        writer.flush();
        writer.close();
    }

    private ECUserEO bindBanmaAppUser(String vin) {
        ECBindUserMO ecBindUserMO = new ECBindUserMO();
        ecBindUserMO.setAppType(ECBindUserAppType.BANMAAPP.getCode());
        ecBindUserMO.setAppUserId(vin);
        return ecUserService.bindUser(ecBindUserMO);
    }

    /**
     * 跳转至无权限访问页面
     *
     * @param request  Http请求
     * @param response Http响应
     * @throws IOException IO异常
     */
    private void redirectToNoPrivilegePages(HttpServletRequest request, HttpServletResponse response) throws IOException {
        logger.info("无权限访问URL：{}, method:{}", request.getRequestURL().toString(), request.getMethod());
        //非Get的请求，如果无权限访问直接返回空
        if (!Constant.HTTP_METHOD_GET.equals(request.getMethod())) {
            response.setContentType("application/json;charset=utf-8");
            response.setCharacterEncoding("utf-8");
            PrintWriter writer = response.getWriter();
            RequestResult result = new RequestResult();
            result.addWarningMessage("403", "你没有权限访问此API...");
            logger.info("URL:{}, SessionId:{}, 没有权限访问此API...", request.getRequestURL(), request.getSession().getId());
            writer.println(JSON.toJSONString(result));
            writer.flush();
            writer.close();
            return;
        }
        if (StringUtil.isBlank(httpScheme)) {
            httpScheme = request.getScheme();
        }
        String baseUrl = httpScheme + "://" + request.getServerName();
        Integer serverPort = request.getServerPort();
        if (serverPort == null || !serverPort.equals(80)) {
            baseUrl += ":" + request.getServerPort();
        }
        if (!baseUrl.endsWith("/")) {
            baseUrl += "/";
        }
        logger.info("Redirect to URL: {}...........", baseUrl + "banma/access");
        response.sendRedirect(baseUrl + "banma/access");
    }

    /**
     * 打印日志
     *
     * @param start      请求开始时间
     * @param requestUrl 请求URL
     */
    private void printLog(long start, String requestUrl) {
        long end = System.currentTimeMillis();
        logger.info("URL: {}, use time: {} ms.............", requestUrl, (end - start));
    }

    private void authenticateByWeChat(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String json = HttpRequestUtil.readJsonFromRequest(request);
        String ip = HttpRequestUtil.getClientIp(request);
        logger.info("微信认证请求：{}, 请求IP:{}, 请求sessionId:{}", json, ip, request.getSession().getId());

        if (StringUtil.isBlank(json)) {
            weChatAutoError(request, response);
            return;
        }

        WeChatToken chatToken = JsonMapper.nonDefaultMapper().fromJson(json, WeChatToken.class);
        if (chatToken == null || StringUtil.isBlank(chatToken.getCode())) {
            weChatAutoError(request, response);
            return;
        }
        // 调用微信 Auth2.0 接口认证
        String openId = null;
        try {
            openId = weChatTokenHandler.getOpenId(chatToken.getCode());
        } catch (Exception e) {
            weChatAutoError(request, response);
            return;
        }

        if (StringUtil.isBlank(openId)) {
            weChatAutoError(request, response);
            return;
        }

        // 将 微信认证后 openId 存储在 session 中
        request.getSession().setAttribute(Constant.WECHAT_SESSION_OPENID, openId);

        // 查询用户绑定信息
        UserBindingEO userBinding = weChatTokenHandler.findUserBinding(openId, null);

        // 未绑定经销商账户
        if (userBinding == null) {
            weChatNotBindError(request, response);
            return;
        }

        // 获得经销商账户明细
        UserEO userEO = weChatTokenHandler.findByUserId(userBinding.getUserId());

        UserProfile currentUser = new UserProfile();
        currentUser.setUserCode(userEO.getUserCode());
        currentUser.setUserName(userEO.getUserName());
        currentUser.setMobile(userEO.getMobile());
        currentUser.setDealerCode(userEO.getDealerCode());
        currentUser.setCurrentUser();

        // 在session中存储授权账户
        request.getSession().setAttribute(UserProfile.USER_PROFILE_KEY, JsonMapper.nonDefaultMapper().toJson(currentUser));

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        RequestResult<String> result = new RequestResult<>();
        result.setResult("SUCCESS");
        writer.println(JSON.toJSONString(result));
        writer.flush();
    }

    private void weChatAutoError(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        RequestResult result = new RequestResult();
        result.addWarningMessage(Constant.WECHAT_AUTH_ERROR, "微信授权认证失败");
        logger.info("URL:{}, SessionId:{}, 微信授权认证失败...", request.getRequestURL(), request.getSession().getId());
        writer.println(JSON.toJSONString(result));
        writer.flush();
        writer.close();
    }

    private void weChatNotBindError(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        RequestResult result = new RequestResult();
        result.addWarningMessage(Constant.WECHAT_UN_BIND, "微信账号未绑定经销商账户");
        logger.info("URL:{}, SessionId:{}, 微信账号未绑定经销商账户...", request.getRequestURL(), request.getSession().getId());
        writer.println(JSON.toJSONString(result));
        writer.flush();
        writer.close();
    }
}
