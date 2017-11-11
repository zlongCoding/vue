let config = {
  certificateType: {
    ID_CARD: '身份证',
    PASSPORT: '护照'
  },
  company: {
    picc: '人保财险',
    cpic: '太保财险',
    gpic: '国寿财险',
    paic: '平安财险',
    cicp: '联合财险',
    ccic: '大地财险',
    taic: '天安保险',
    yaic: '永安财险',
    ygbx: '阳光财险',
    abic: '安邦财险',
    tpic: '太平保险',
    zkic: '紫金财险',
    other: '其他'
  },
  serverList: {
    白金安驾: 'server_two',
    金安驾: 'server_two',
    黑金安驾: 'server_one'
  },
  detailState: {
    CALC: '待投保',
    INSURE: '待核保',
    TOBEPAID: '待支付',
    PAID: '待生效',
    EFFECT: '生效',
    ENSURING: '保障中',
    EXPIRE: '已过期',
    DELETE: '删除'
  },
  insureState: {
    INSURE: '投保',
    NOINSURE: '不投保'
  },
  INSURANCE: {
    ALL: '交强险+商业险',
    COMPREHENSIVE: '商业',
    COMPULSORY: '交强'
  },
  deleteButtonShow: {
    CALC: true,
    INSURE: true,
    TOBEPAID: false,
    PAID: false,
    EFFECT: false,
    ENSURING: false,
    EXPIRE: true,
    DELETE: false
  },
  deleteTextShow: {
    CALC: '删除',
    TOBEPAID: '取消订单',
    INSURE: '取消订单',
    EXPIRE: '删除'
  },
  submitTextShow: {
    CALC: '投保',
    INSURE: '查看详情',
    TOBEPAID: '支付',
    PAID: '查看详情',
    EFFECT: '查看详情',
    EXPIRE: '查看详情',
    ENSURING: '查看详情'
  },
  companyPhone: {
    // picc: '95518',
    cpic: '95500',
    gpic: '95519',
    // paic: '95511',
    // cicp: '联合财险',
    // ccic: '95590',
    // taic: '天安保险',
    // yaic: '永安财险',
    ygbx: '95510'
    // abic: '安邦财险',
    // tpic: '95589',
    // zkic: '紫金财险',
    // other: '其他'
  },
  callPhone: {
    // picc: '95518',
    cpic: 'tel:95500',
    gpic: 'tel:95519',
    // paic: '95511',
    // cicp: '联合财险',
    // ccic: '95590',
    // taic: '天安保险',
    // yaic: '永安财险',
    ygbx: 'tel:95510'
    // abic: '安邦财险',
    // tpic: '95589',
    // zkic: '紫金财险',
    // other: '其他'
  },
  insuranceKind: {
    ALL: '交强险+商业险',
    COMPREHENSIVE: '商业险',
    COMPULSORY: '交强险'
  },
  serviceStatus: {
    VALID: '有效',
    INVALID: '失效',
    REFUNDED: '已退款'
  }
}
export default config
