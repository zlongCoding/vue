package com.insaic.h5.ehcache;

import com.insaic.base.exception.SystemException;
import com.insaic.base.utils.StringUtil;
import com.insaic.common.code.entity.CodeEntry;
import com.insaic.common.code.service.CodeEntryService;
import com.insaic.h5.utils.Constant;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 公共代码缓存管理
 * Created by jiyaqun on 2017-02-17.
 */
@Service
public class CodeEntryCacheManager implements BaseCacheManager {
    //日志
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final static String CODE_ENTRY_CACHE_NAME = "codeEntryEhCache";

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private CodeEntryService codeEntryService;

    @Override
    public Object getAllCaches(String key) {
        Cache cache = this.getCache();
        if(cache.get(key) == null){
            return null;
        }
        return cache.get(key).getObjectValue();
    }

    @Override
    public void setCache() {
        logger.info("start to loading common code cache......");
        Cache cache = this.getCache();
        List<String> categories = Constant.CACHE_CATEGORIES;
        categories.forEach(category ->this.setCacheByCategory(cache, category));
        logger.info("End to loading common code cache, cache size: " + cache.getSize() + ", "
            + cache.getMemoryStoreSize());
    }

    @Override
    public void setCache(Object key, Object value) {
        Cache cache = this.getCache();
        if(key != null && value != null){
            Element element = new Element(key, value);
            cache.put(element);
        }
    }

    @Override
    public void evict(String key) {
        Cache cache = this.getCache();
        if(cache.get(key) != null){
            cache.remove(key);
        }
    }

    @Override
    public void clear() {
        Cache cache = this.getCache();
        if(cache != null){
            cache.removeAll();
        }
    }

    private Cache getCache(){
        Cache cache = cacheManager.getCache(CODE_ENTRY_CACHE_NAME);
        if(cache == null){
            throw new SystemException("未获取到CommonCodeCache, 请检查EhCache的配置!");
        }
        return cache;
    }

    /**
     * 根据公共代码的分类设置公共代码缓存
     * @param category
     */
    private void setCacheByCategory(Cache cache, String category){
        if(cache == null){
            logger.error("cache is null, please check the config......");
            return;
        }
        List<CodeEntry> codeEntries = codeEntryService.findByCategory(category);
        if(CollectionUtils.isEmpty(codeEntries)){
            return;
        }
        codeEntries.forEach(codeEntry -> {
            if(StringUtil.isNotBlank(codeEntry.getCategory())
                    && StringUtil.isNotBlank(codeEntry.getCode())) {
                if(cache.get(codeEntry.getCategory()) == null) {
                    Map<String, CodeEntry> codeEntryMap = new HashMap<String, CodeEntry>();
                    codeEntryMap.put(codeEntry.getCode(), codeEntry);
                    Element element = new Element(codeEntry.getCategory(), codeEntryMap);
                    cache.put(element);
                }else {
                    Element element = cache.get(codeEntry.getCategory());
                    Map<String, CodeEntry> codeEntryMap = (Map<String, CodeEntry>) element.getObjectValue();
                    codeEntryMap.put(codeEntry.getCode(), codeEntry);
                }
            }
        });
    }
}
