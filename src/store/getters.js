/**
 * Created by gongyuqi on 2017/9/20.
 */

const getters = {
  vin: state => state.Home.Data.vin,
  authCode: state => state.Home.Data.authCode,
  orderNo: state => state.List.orderNo,
  vouchersNo: state => state.myService.vouchersNo
}

export default getters
