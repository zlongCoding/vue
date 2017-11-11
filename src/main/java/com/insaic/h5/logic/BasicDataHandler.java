package com.insaic.h5.logic;

import com.insaic.base.exception.BusinessException;
import com.insaic.base.exception.ExceptionUtil;
import com.insaic.base.utils.StringUtil;
import com.insaic.common.code.entity.CodeEntry;
import com.insaic.common.code.service.CodeEntryService;
import com.insaic.ecs.model.policy.PolicyRenewMO;
import com.insaic.ecs.service.AutoPolicyQueryService;
import com.insaic.ecs.service.AutoPolicyService;
import com.insaic.h5.ehcache.CodeEntryCacheManager;
import com.insaic.h5.model.BanmaToken;
import com.insaic.h5.utils.CommonUtil;
import com.insaic.h5.utils.Constant;
import com.insaic.integration.model.OwnerAndVehicleInfoRequest;
import com.insaic.integration.model.OwnerAndVehicleInfoResponse;
import com.insaic.integration.service.OwnerAndVehicleInfoService;
import com.insaic.policy.entity.OrderEO;
import com.insaic.policy.model.KeyValueMO;
import com.insaic.policy.model.h5.H5VehicleAndOwnerInfoMO;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanliangzhong on 2017/8/10.
 */
@Component
public class BasicDataHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CodeEntryService codeEntryService;

    @Autowired
    private OwnerAndVehicleInfoService ownerAndVehicleInfoService;

    @Autowired
    private AutoPolicyQueryService policyQueryService;

    @Autowired
    private AutoPolicyService autoPolicyService;

    @Autowired
    private CodeEntryCacheManager codeEntryCacheManager;

    @Autowired
    private BanmaTokenHandler banmaTokenHandler;

    public List<CodeEntry> getCacheCodeEntryByCategory(String category){
        List<CodeEntry> codeEntries = null;
        String key = "CODE_ENTRY_LIST_" + category;
        if(codeEntryCacheManager.getAllCaches(key) != null){
            codeEntries = (List<CodeEntry>)codeEntryCacheManager.getAllCaches(key);
        }else {
            try {
                logger.info("CODE-ENTRY-LIST-{} no cache .........", category);
                codeEntries = codeEntryService.findByCategory(category);
            } catch (Exception ex) {
                throw ExceptionUtil.handleDubboException(ex);
            }
            if(CollectionUtils.isNotEmpty(codeEntries)){
                codeEntryCacheManager.setCache(key, codeEntries);
            }
        }
        return codeEntries;
    }

    /**
     * 根据公共代码category获取缓存的公共代码
     * @param category 公共代码分类
     * @return 公共代码MAP
     */
    public Map<String, CodeEntry> getCodeEntryMapByCategory(String category){
        Map<String, CodeEntry> codeEntryMap = new HashMap<>();
        List<CodeEntry> codeEntries = this.getCacheCodeEntryByCategory(category);
        if(CollectionUtils.isEmpty(codeEntries)){
            return null;
        }
        codeEntries.forEach(codeEntry -> {
            if (StringUtil.isNotBlank(codeEntry.getCode())) {
                codeEntryMap.put(codeEntry.getCode(), codeEntry);
            }
        });
        return codeEntryMap;
    }

    public CodeEntry getCodeEntryByCategoryAndCode(String category, String code) {
        Map<String, CodeEntry> codeEntryMap = getCodeEntryMapByCategory(category);
        if (MapUtils.isNotEmpty(codeEntryMap)) {
            return codeEntryMap.get(code);
        } else {
            return null;
        }
    }

    /**
     * 根据省获取城市列表
     * @param province 省
     * @return 城市列表公共代码
     */
    public List<CodeEntry> getCitiesByProvinces(String province){
        List<CodeEntry> codeEntries = null;
        String key = "CODE_ENTRY_CITIES_" + province;
        if(codeEntryCacheManager.getAllCaches(key) != null){
            codeEntries = (List<CodeEntry>)codeEntryCacheManager.getAllCaches(key);
        }else {
            try {
                logger.info("CODE_ENTRY_CITIES_{} no cache .........", province);
                codeEntries = codeEntryService.getCityByProvinces(province);
            } catch (Exception ex) {
                throw ExceptionUtil.handleDubboException(ex);
            }
            if(CollectionUtils.isNotEmpty(codeEntries)){
                codeEntryCacheManager.setCache(key, codeEntries);
            }
        }
        return codeEntries;
    }

    /**
     * 调用SIS查询斑马车辆人员信息
     * @param vin
     * @return
     */
    public H5VehicleAndOwnerInfoMO queryVehicleAndOwnerInfo(String vin, String authCode) {
        H5VehicleAndOwnerInfoMO vehicleAndOwnerInfoMO = new H5VehicleAndOwnerInfoMO();

        logger.info("获取车辆人员信息参数VIN码：{},authCode:{}", vin, authCode);
        if (StringUtil.isBlank(vin)) {
            throw new BusinessException("查询车辆人员信息VIN码不能为空");
        }
        if (StringUtil.isBlank(authCode)) {
            throw new BusinessException("查询车辆人员信息授权码不能为空");
        }
        BanmaToken banmaToken = banmaTokenHandler.getBanMaToken(authCode, vin);
        if (null == banmaToken || StringUtil.isBlank(banmaToken.getAccessToken())) {
            throw new BusinessException("查询车辆人员信息Token不能为空");
        }

        //调用SIS接口获取车人信息
        try {
            OwnerAndVehicleInfoRequest ownerAndVehicleInfoRequest = new OwnerAndVehicleInfoRequest();
            ownerAndVehicleInfoRequest.setVin(vin);
            ownerAndVehicleInfoRequest.setAuthToken(banmaToken.getAccessToken());

            OwnerAndVehicleInfoResponse ownerAndVehicleInfoResponse = ownerAndVehicleInfoService
                    .getOwnerAndVehicleInfo(ownerAndVehicleInfoRequest);
            if (null != ownerAndVehicleInfoResponse) {
                vehicleAndOwnerInfoMO.setVin(ownerAndVehicleInfoResponse.getVin());
                vehicleAndOwnerInfoMO.setLicenseNo(ownerAndVehicleInfoResponse.getLicence());
                vehicleAndOwnerInfoMO.setModelName(ownerAndVehicleInfoResponse.getTypeName());
                vehicleAndOwnerInfoMO.setCity(ownerAndVehicleInfoResponse.getDealerCityCode());
                vehicleAndOwnerInfoMO.setDealerCode(ownerAndVehicleInfoResponse.getDealerCode());
                vehicleAndOwnerInfoMO.setEngineNo(ownerAndVehicleInfoResponse.getEngineId());
                vehicleAndOwnerInfoMO.setOwnerName(ownerAndVehicleInfoResponse.getOwnerName());
                vehicleAndOwnerInfoMO.setOwnerMobile(ownerAndVehicleInfoResponse.getOwnerMoblie());
                vehicleAndOwnerInfoMO.setCertificateNo(ownerAndVehicleInfoResponse.getIdCardNo());
                vehicleAndOwnerInfoMO.setCertificateType(ownerAndVehicleInfoResponse.getIdCardType());
            } else {
                vehicleAndOwnerInfoMO.setVin(vin);
            }
        } catch (Exception ex) {
            //noinspection ThrowableResultOfMethodCallIgnored
            ExceptionUtil.handleDubboException(ex);
        }

        //若查询历史数据存在车牌号与初登日期，则以历史查询信息为主
        try {
            H5VehicleAndOwnerInfoMO h5VehicleAndOwnerInfoMO = policyQueryService.queryQuoteLicenseNoAndRegisterDate(vin, OrderEO.SourceSystemEnum.UBI.getCode());
            if (null != h5VehicleAndOwnerInfoMO && null != h5VehicleAndOwnerInfoMO.getRegisterDate()) {
                vehicleAndOwnerInfoMO.setRegisterDate(h5VehicleAndOwnerInfoMO.getRegisterDate());
            }
        } catch (Exception ex) {
            //noinspection ThrowableResultOfMethodCallIgnored
            ExceptionUtil.handleDubboException(ex);
        }

        // 查询NCD，获取交强险起保日期
        PolicyRenewMO policyRenewMO = autoPolicyService.findAutoInsuranceByVin(banmaToken.getVin());
        if (policyRenewMO == null) {
            logger.error("获取解析后的车辆({})保险数据失败，服务端未有数据返回", banmaToken.getVin());
            throw new BusinessException("未查询到当前车辆人员信息");
        }
        if (StringUtil.isBlank(policyRenewMO.getPlateNo())) {
            logger.error("获取解析后的车辆({})保险数据失败，车牌号为空", banmaToken.getVin());
            throw new BusinessException("未查询到当前车辆的车牌号信息");
        }
        // 车牌号
        vehicleAndOwnerInfoMO.setLicenseNo(policyRenewMO.getPlateNo());
        // 交强险起期
        if (policyRenewMO.getLastCtpEndDate() != null) {
            vehicleAndOwnerInfoMO.setHaveCtpStartDate(true);
            vehicleAndOwnerInfoMO.setCtpStartDate(policyRenewMO.getLastCtpEndDate());
        } else {
            vehicleAndOwnerInfoMO.setHaveCtpStartDate(false);
        }
        // 首次行驶日期
        vehicleAndOwnerInfoMO.setFirstDriveTime(policyRenewMO.getFirstDriveTime());

        return vehicleAndOwnerInfoMO;
    }

    /**
     * 获取车险可投保省市列表
     * @return
     */
    public List queryAutoInsuredProvincesAndCities(){
        List<Map> provinceCityList = new ArrayList<>();
        List<CodeEntry> bmDistrictList = this.getCacheCodeEntryByCategory(Constant.CODE_CATEGORY_BM_DISTRICT_CONFIG);
        if(CollectionUtils.isNotEmpty(bmDistrictList)){
            bmDistrictList.sort((c1,c2) -> c1.getCode().compareTo(c2.getCode()));
            List<String> provinceList = new ArrayList<>();
            for(CodeEntry provinEntity : bmDistrictList){
                provinceList.add(provinEntity.getCode());
            }
            List<CodeEntry> districtList = this.getCitiesByProvinces(StringUtil.joinListBySymbol(provinceList, ","));
            for(CodeEntry provinEntity : bmDistrictList){
                Map<String,Object> provinceCityMap = new HashMap<>();
                KeyValueMO province = new KeyValueMO();
                province.setKey(provinEntity.getCode());
                province.setValue(provinEntity.getName());
                provinceCityMap.put("province",province);

                List<KeyValueMO> cityList = new ArrayList<>();
                //获取过滤的城市
                List<String> bmFilterCities = CommonUtil.getPropertyToStringArray(provinEntity);
                for(CodeEntry district : districtList){
                    if(!provinEntity.getCode().equals(district.getProperty1()) || bmFilterCities.contains(district.getCode())){
                        continue;
                    }
                    KeyValueMO cityMO = new KeyValueMO();
                    cityMO.setKey(district.getCode());
                    cityMO.setValue(district.getName());
                    cityList.add(cityMO);
                }
                //如果城市为空，则与省一样显示
                if(CollectionUtils.isEmpty(cityList)){
                    KeyValueMO cityMO = new KeyValueMO();
                    cityMO.setValue(province.getValue());
                    cityList.add(cityMO);
                    provinceCityMap.put("city",cityList);
                }else{
                    cityList.sort((c1, c2) -> c1.getKey().compareTo(c2.getKey()));
                    provinceCityMap.put("city", cityList);
                }
                provinceCityList.add(provinceCityMap);
            }
        }
        return provinceCityList;
    }

}
