package com.insaic.h5.utils;

import com.insaic.base.RequestResult;
import com.insaic.base.exception.DubboTimeoutException;
import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.exception.SystemException;
import com.insaic.base.redis.RedisMessageQueueHandler;
import com.insaic.base.utils.SpringBeanLocator;

/**
 * 公共异常处理工具类
 * Created by jiyaqun on 2017-02-23.
 */
public class CommonExceptionUtil {

    // 关键业务功能出错时，将错误信息放入redis队列中，等待发送告警信息
    private final static String REDIS_EXCEPTION_LOG_KEY = "exception:log";

    public static <T> RequestResult<T> handleDubboException(String errorCode, String requestDesc, Exception ex){
        Exception e = ExceptionUtil.handleDubboException(ex);
        RequestResult<T> result = new RequestResult<>();
        if(e instanceof DubboTimeoutException){
            result.addErrorMessage("TimeOutException", requestDesc + "失败, 失败原因: 服务响应超时， 请稍候重试！");
        }else if(e instanceof SystemException){
            SystemException se = (SystemException) e;
            RedisMessageQueueHandler redisMessageQueueHandler = SpringBeanLocator.getBean(RedisMessageQueueHandler.class);
            redisMessageQueueHandler.push(REDIS_EXCEPTION_LOG_KEY,
                    ExceptionUtil.createExceptionLog(Constant.APP_NAME, requestDesc, e).toJson());
            result.addErrorMessage(errorCode, requestDesc + "失败，错误号" + se.getExceptionId());
        }else {
            result.addErrorMessage(errorCode, analyzeExceptionMessage(e.getMessage()));
        }
        return result;
    }

    public static <T> RequestResult<T> handleException(String errorCode, String requestDesc, Exception ex){
        Exception e = ExceptionUtil.handleException(ex);
        RequestResult<T> result = new RequestResult<>();
        if(e instanceof SystemException){
            SystemException se = (SystemException) e;
            RedisMessageQueueHandler redisMessageQueueHandler = SpringBeanLocator.getBean(RedisMessageQueueHandler.class);
            redisMessageQueueHandler.push(REDIS_EXCEPTION_LOG_KEY,
                    ExceptionUtil.createExceptionLog(Constant.APP_NAME, requestDesc, e).toJson());
            result.addErrorMessage(errorCode, requestDesc + "失败，错误号" + se.getExceptionId());
        }else {
            result.addErrorMessage(errorCode, analyzeExceptionMessage(e.getMessage()));
        }
        return result;
    }

    private static String analyzeExceptionMessage(String exceptionMessage){
        String errorMsg = exceptionMessage;
        // TODO: 2017-02-23 特殊异常信息分析
        switch (exceptionMessage){
            default:
                break;
        }
        return errorMsg;
    }
}
