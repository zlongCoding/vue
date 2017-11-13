<template>
  <div id="login">
    <h4>经销商登陆</h4>
    <ul>
      <li>
        <label>经销商代码</label>
        <p><input type="text" v-model="Req.userCode" id="userCode" placeholder="请输入经销商代码" @input="updateForm"  /></p>
      </li>
      <li>
        <label>密码</label>
        <p><input type="password" v-model="Req.password" id="password" placeholder="请输入密码" @input="updateForm"  /></p>
      </li>
      <li class="captcha">
        <label>验证码</label>
        <p><input type="text" v-model="Req.captcha" maxlength="4" id="captcha" placeholder="请输入验证码" @input="updateForm"  />
          <img :src="data.captchaPath" @click="refreshCaptcha" />
        </p>
      </li>
    </ul>
    <button class="_button" :disabled="!(Req.userCode && Req.password && Req.captcha.length > 4) || data.isLoading" @click="submit">{{data.isLoading ? '登陆中...' : '登陆'}}</button>
  </div>
</template>

<script>
import Controller from './handle'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/login/index.scss"
</style>
