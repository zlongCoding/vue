package com.insaic.h5.ehcache;

/**
 * 基础缓存管理接口
 * Created by jiyaqun on 2017-02-20.
 */

public interface BaseCacheManager {

    /**
     * 根据KEY获取所有缓存
     * @param key key
     * @return 所有缓存
     */
    Object getAllCaches(String key);

    /**
     * 设置缓存
     */
    void setCache();

    /**
     * 根据KEY&VALUE设置缓存
     * @param key
     * @param value
     */
    void setCache(Object key, Object value);

    /**
     * 根据KEY移除缓存
     * @param key
     */
    void evict(String key);

    /**
     * 清除所有缓存
     */
    void clear();
}
