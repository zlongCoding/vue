package com.insaic.h5.ehcache;

import com.insaic.base.utils.SpringBeanLocator;
import com.insaic.base.web.listener.WebApplicationStartupListener;

import javax.servlet.ServletContextEvent;

public class BaseCacheListener extends WebApplicationStartupListener {


	@Override
	public void doInitialization(ServletContextEvent sce) {
		CodeEntryCacheManager commonCodeCacheManager = SpringBeanLocator.getBean(CodeEntryCacheManager.class);
		commonCodeCacheManager.setCache();
	}

}
