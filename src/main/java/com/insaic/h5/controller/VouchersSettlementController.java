package com.insaic.h5.controller;

import com.insaic.base.PageResult;
import com.insaic.base.RequestResult;
import com.insaic.base.context.UserProfile;
import com.insaic.base.exception.BusinessException;
import com.insaic.base.utils.Cryptos;
import com.insaic.common.code.entity.CodeEntry;
import com.insaic.ecs.model.settlement.*;
import com.insaic.ecs.model.vouchers.VouchersWriteoffMO;
import com.insaic.ecs.service.ECSettlementService;
import com.insaic.ecs.service.ECUserService;
import com.insaic.h5.logic.BasicDataHandler;
import com.insaic.h5.utils.CommonExceptionUtil;
import com.insaic.h5.utils.Constant;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by zhangyuqin on 2017/11/1 10:57
 */
@Api(value = "/vouchers/settlement", description = "卡券结算相关API")
@RestController
@RequestMapping("/vouchers/settlement")
public class VouchersSettlementController {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private ECUserService ecUserService;
    @Autowired
    private ECSettlementService ecSettlementService;
    @Autowired
    private BasicDataHandler basicDataHandler;

    @ApiOperation(value = "核销卡券并保存图片", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "writeOffAndSaveResource", method = RequestMethod.POST)
    public RequestResult<SettlementResourceMO> writeOffAndSaveResource(@RequestBody SettlementResourceMO settlementResourceMO) {
        RequestResult<SettlementResourceMO> requestResult = new RequestResult<>();
        try {
            VouchersWriteoffMO writeoffMO = ecUserService.writeOffVoucher(settlementResourceMO.getWriteCode());
            settlementResourceMO.setSettlementId(writeoffMO.getSettlementId());
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "核销卡券", e);
        }
        try {
            ecSettlementService.saveSettlementResource(settlementResourceMO);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "保存图片", e);
        }
        SettlementResourceMO resultMO = new SettlementResourceMO();
        resultMO.setSettlementId(settlementResourceMO.getSettlementId());
        requestResult.setResult(resultMO);
        return requestResult;
    }

    @ApiOperation(value = "提交审核", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "sendToApproval", method = RequestMethod.POST)
    public RequestResult sendToApproval(@RequestBody SettlementApprovalMO settlementApprovalMO) {
        RequestResult requestResult = new RequestResult();
        try {
            ecSettlementService.sendToApproval(settlementApprovalMO);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "提交审核", e);
        }
        return requestResult;
    }

    @ApiOperation(value = "订单(卡券结算)查询", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public RequestResult<SettlementListMO> querySettlementList(@RequestBody QuerySettlementCondition querySettlementCondition) {
        RequestResult<SettlementListMO> requestResult = new RequestResult<>();
        try {
            // 查询结算金额信息
            SettlementListMO settlementListMO = ecSettlementService.querySettlementAmountInfo();
            if (null != settlementListMO){
                // 查询结算列表
                PageResult<SettlementMO> pageResult = ecSettlementService.queryVouchersSettlementList(querySettlementCondition);
                if (null != pageResult){
                    settlementListMO.setContent(pageResult.getContent());
                    settlementListMO.setPageNumber(pageResult.getPageNumber());
                    settlementListMO.setPageSize(pageResult.getPageSize());
                    settlementListMO.setTotal(pageResult.getTotal());
                    settlementListMO.setTotalPage(pageResult.getTotalPage());
                }
            }
            requestResult.setResult(settlementListMO);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "订单(卡券结算)查询", e);
        }
        return requestResult;
    }

    @ApiOperation(value = "加载结算单信息", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "detail/{settlementId}", method = RequestMethod.POST)
    public RequestResult<SettlementMO> loadSettlementDetail(@PathVariable("settlementId")  Long settlementId) {
        RequestResult<SettlementMO> requestResult = new RequestResult<>();
        try {
            requestResult.setResult(ecSettlementService.loadVouchersSettlement(settlementId));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "加载结算单信息", e);
        }
        return requestResult;
    }

    @ApiOperation(value = "查询退回原因", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "returnReason/{settlementId}", method = RequestMethod.POST)
    public RequestResult<String> loadReturnReason(@PathVariable("settlementId")  Long settlementId) {
        RequestResult<String> requestResult = new RequestResult<>();
        try {
            requestResult.setResult(ecSettlementService.queryReturnReason(settlementId));
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "加载结算单信息", e);
        }
        return requestResult;
    }

    @ApiOperation(value = "经销商申诉", response = RequestResult.class, produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "appeal", method = RequestMethod.POST)
    public RequestResult appeal(@RequestBody SettlementAppealMO settlementAppealMO) {
        RequestResult requestResult = new RequestResult();
        try {
            ecSettlementService.appeal(settlementAppealMO);
        } catch (Exception e) {
            return CommonExceptionUtil.handleDubboException("", "经销商申诉", e);
        }
        return requestResult;
    }

    @ApiOperation(value = "加载图片")
    @RequestMapping(value = "image/{imageIndex}", method = RequestMethod.GET)
    public void loadImage(@PathVariable("imageIndex") String imageIndex, HttpServletResponse response) throws IOException {
        try {
            writeImage(getRealPath(imageIndex), response);
        } catch (Exception e) {
            logger.error("load image fail, imageIndex:" + imageIndex + ", error message:" + e.getMessage(), e);
        }
    }

    private void writeImage(String realPath, HttpServletResponse response) throws IOException {
        response.setContentType(checkAndGetContentType(realPath));
        BufferedInputStream bis = null;
        OutputStream os = null;
        try {
            bis = new BufferedInputStream(new FileInputStream(realPath));
            os = response.getOutputStream();
            byte[] data = new byte[8192];
            int len;
            while ((len = bis.read(data)) != -1) {
                os.write(data, 0, len);
            }
            os.flush();
        } finally {
            if (bis != null) {
                bis.close();
            }
            if (os != null) {
                os.close();
            }
        }
    }

    private String getRealPath(String imageIndex) {
        String realPath;
        try {
            realPath = Cryptos.decrypt(imageIndex);
        } catch (Exception e) {
            throw new BusinessException("参数非法");
        }
        if (StringUtils.isBlank(realPath)) {
            throw new BusinessException("无法获取图片路径");
        }
        return getImageBasePath() + "/" + UserProfile.getCurrentUser().getDealerCode() + realPath;
    }

    private String getImageBasePath() {
        String localImagePath = System.getProperty("local.debug.imagePath");
        if (StringUtils.isNotBlank(localImagePath)) {
            return localImagePath;
        }
        CodeEntry codeEntry = basicDataHandler.getCodeEntryByCategoryAndCode(
                Constant.CODE_CATEGORY_ANJIA_WEIXIN_DOWNLOAD_IMAGE, Constant.CODE_WX_FILE_PATH);
        return codeEntry.getValue();
    }

    private String checkAndGetContentType(String filename) {
        String ext = FilenameUtils.getExtension(filename).toLowerCase();
        switch (ext) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG_VALUE;
            case "gif":
                return MediaType.IMAGE_GIF_VALUE;
            case "png":
                return MediaType.IMAGE_PNG_VALUE;
            default:
                throw new BusinessException("不支持的图片格式");
        }
    }
}
