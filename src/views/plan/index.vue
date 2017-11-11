<template>
  <div id="plan">
    <div class="plan">
      <h3>经济选
        <span>(老司机的选择，划算)</span>
        <button>修改投保方案</button>
      </h3>
      <ul>
        <li>
          <h4>
            <b>交强险</b> <span>投保</span>
          </h4>
        </li>
        <li>
          <h4>
            <b>商业险</b> <span>投保</span>
          </h4>
          <table>
            <tbody>
              <tr>
                <td>车损险</td>
                <td></td>
                <td><span>不计免赔</span></td>
              </tr>
              <tr>
                <td>第三者责任险</td>
                <td>100万</td>
                <td><span>不计免赔</span></td>
              </tr>
              <tr>
                <td>司机责任险</td>
                <td>10万</td>
                <td><span>不计免赔</span></td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Controller from '@/controller/plan/'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/plan/index.scss"
</style>
