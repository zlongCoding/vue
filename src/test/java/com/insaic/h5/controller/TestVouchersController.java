package com.insaic.h5.controller;

import com.insaic.base.RequestResult;
import com.insaic.base.mapper.JsonMapper;
import com.insaic.base.utils.Cryptos;
import com.insaic.base.utils.HttpUtils;
import com.insaic.base.utils.QRCodeUtil;
import com.insaic.ecs.model.vouchers.GenerateQRCodeMO;
import com.insaic.ecs.model.vouchers.VouchersWriteoffMO;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by liuwanquan on 2017/9/18.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@ActiveProfiles("development")
public class TestVouchersController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private VouchersController vouchersController;

    @Test
    public void generateQRCode() {
        // TODO 测试
        String content = "http://fanyi.baidu.com/?#zh/en/"+"你是一只大乌龟";
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("G:/qrcode/hehe.jpg");
            QRCodeUtil.encode(content,fos);
            logger.error(String.format("生成二维码成功：success ===>>%s", content));
        } catch (Exception e) {
            logger.error(String.format("生成二维码失败：result ===>>%s",e.getMessage()));
            logger.error(String.format("生成二维码失败：content ===>>%s", content));
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Test
    public void testQueryVoucherWriteoff() {
        GenerateQRCodeMO generateQRCodeMO = new GenerateQRCodeMO();
        generateQRCodeMO.setVouchersNo("VC1700005356");
        generateQRCodeMO.setUserCode("BMLSJA0000000000490");
        generateQRCodeMO.setWriteCode("VC1700005356-1");

        try {
            String param = Cryptos.encrypt(JsonMapper.nonEmptyMapper().toJson(generateQRCodeMO));
            RequestResult<VouchersWriteoffMO> result = vouchersController.queryValidVoucherWriteoff(param);
            logger.info("\nqueryVouchersWriteoff result ===== >>:\n" + JsonMapper.nonEmptyMapper().toJson(result) + "\n");
            Assert.assertTrue(true);
        } catch (Exception e) {
            logger.error("testQueryVoucherWriteoff fail.", e);
            Assert.assertTrue(false);
        }
    }

}
