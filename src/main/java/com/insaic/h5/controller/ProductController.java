package com.insaic.h5.controller;

import com.insaic.base.PageResult;
import com.insaic.base.RequestResult;
import com.insaic.ecs.model.product.ListedProductMO;
import com.insaic.ecs.model.product.ProductDetailMO;
import com.insaic.ecs.model.product.QueryListedProductCondition;
import com.insaic.ecs.service.ECProductService;
import com.insaic.h5.utils.CommonExceptionUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * 商品管理服务
 * Created by pengfarui on 2017/9/18.
 */
@Api(value = "/product/", description = "商品管理服务API")
@RestController
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    private ECProductService ecProductService;

    /**
     * 查询已上架商品列表
     * @return 已上架商品列表
     */
    @ApiOperation(value = "查询已上架商品列表", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "sellProductList", method = RequestMethod.POST)
    public RequestResult<PageResult<ListedProductMO>> querySellProductList(@RequestBody QueryListedProductCondition condition) {
        RequestResult<PageResult<ListedProductMO>> requestResult = new RequestResult<>();

        try {
            requestResult.setResult(ecProductService.queryListedProductList(condition));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询已上架商品列表", e);
        }

        return requestResult;
    }

    /**
     * 查询商品详细信息
     * @param productCode
     * @return 车险订单列表
     */
    @ApiOperation(value = "查询商品详细信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "productDetail/{productCode}", method = RequestMethod.POST)
    public RequestResult<ProductDetailMO> queryProductDetail(@PathVariable("productCode") String productCode) {
        RequestResult<ProductDetailMO> requestResult = new RequestResult<>();

        try {
            requestResult.setResult(ecProductService.queryProductDetail(productCode));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "查询商品详细信息", e);
        }

        return requestResult;
    }
}
