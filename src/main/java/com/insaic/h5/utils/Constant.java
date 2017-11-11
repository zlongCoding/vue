package com.insaic.h5.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yanliangzhong on 2017/8/10.
 */
public class Constant {

    /**
     * 应用名称
     */
    public static final String APP_NAME = "h5-web";

    /**
     * 图片验证码的Session key
     */
    public static final String SESSION_KEY_CAPTCHA = "H5-WEB-CAPTCHA";

    /**公共代码 - 行政区划 */
    public static String CODE_CATEGORY_DISTRICT = "District";

    /**公共代码 - 斑马开通省配置**/
    public static String CODE_CATEGORY_BM_DISTRICT_CONFIG = "BM_DISTRICT_CONFIG";

    /**公共代码 - 车牌对应的省市配置**/
    public static String CODE_CATEGORY_PLATE_NO_DISTRICT_MAPPING = "PLATE_NO_DISTRICT_MAPPING";

    /**安驾行微信同步下载图片配置*/
    public static final String CODE_CATEGORY_ANJIA_WEIXIN_DOWNLOAD_IMAGE ="ANJIA_WEIXIN_DOWNLOAD_IMAGE";

    /** 缓存的公共代码分类 */
    public static final List<String> CACHE_CATEGORIES = new ArrayList<>();
    static {
        CACHE_CATEGORIES.add(CODE_CATEGORY_DISTRICT);
        CACHE_CATEGORIES.add(CODE_CATEGORY_BM_DISTRICT_CONFIG);
        CACHE_CATEGORIES.add(CODE_CATEGORY_PLATE_NO_DISTRICT_MAPPING);
        CACHE_CATEGORIES.add(CODE_CATEGORY_ANJIA_WEIXIN_DOWNLOAD_IMAGE);
    }

    /** Http method get */
    public static final String HTTP_METHOD_GET = "GET";

    /** 上汽保险特殊AUTH_CODE开头*/
    public static final String INSAIC_ENCODE_AUTHCODE_HEAD = "9hTCeWENMuZ8cu3Qqzxqy";

    /**
     * 微信 openid
     */
    public static final String WECHAT_SESSION_OPENID = "WeChat_Session_OpenId";

    /**
     * 微信绑定用户信息
     */
    public static final String WECHAT_BIND_USER_INFO = "WeChatBindUserInfo";

    /**
     * 微信认证错误
     */
    public static final String WECHAT_AUTH_ERROR = "991";

    /**
     * 微信用户未绑定
     */
    public static final String WECHAT_UN_BIND = "992";

    /**
     * 经销商登录 - 超时
     */
    public static final String WECHAT_TIME_OUT = "403";

    /**
     * 经销商登录 - 验证码错误
     */
    public static final String WECHAT_CAPTCHA_ERROR = "993";
    /**
     * 经销商登录 - 登录error
     */
    public static final String WECHAT_LOGIN_ERROR = "994";

    /**微信NFS图片存储路径*/
    public static final String CODE_WX_FILE_PATH="WX_FILE_PATH";
}
