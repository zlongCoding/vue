let weiXinConfig = {
  Config: config => {
    window.wx.config({
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: ['startRecord', 'stopRecord', 'playVoice', 'onVoicePlayEnd', 'uploadVoice']
    })
  }
}
export default weiXinConfig
