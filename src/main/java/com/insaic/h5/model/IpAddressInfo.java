package com.insaic.h5.model;

import java.io.Serializable;

/**
 * Created by jiyaqun on 2017-09-21.
 */
public class IpAddressInfo implements Serializable {
    private static final long serialVersionUID = 1250472925562007600L;

    /** IP */
    private String ip;
    /** 运营商ID */
    private String ips_id;
    /** 运营商 */
    private String isp;
    /** 国家ID */
    private String country_id;
    /** 国家 */
    private String country;
    /** 地区ID */
    private String area_id;
    /** 地区 */
    private String area;
    /** 省份ID */
    private String region_id;
    /** 省份 */
    private String region;
    /** 市ID */
    private String city_id;
    /** 市 */
    private String city;
    /** 县ID */
    private String county;
    /** 县 */
    private String county_id;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getIps_id() {
        return ips_id;
    }

    public void setIps_id(String ips_id) {
        this.ips_id = ips_id;
    }

    public String getIsp() {
        return isp;
    }

    public void setIsp(String isp) {
        this.isp = isp;
    }

    public String getCountry_id() {
        return country_id;
    }

    public void setCountry_id(String country_id) {
        this.country_id = country_id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getArea_id() {
        return area_id;
    }

    public void setArea_id(String area_id) {
        this.area_id = area_id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getRegion_id() {
        return region_id;
    }

    public void setRegion_id(String region_id) {
        this.region_id = region_id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity_id() {
        return city_id;
    }

    public void setCity_id(String city_id) {
        this.city_id = city_id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getCounty_id() {
        return county_id;
    }

    public void setCounty_id(String county_id) {
        this.county_id = county_id;
    }
}
