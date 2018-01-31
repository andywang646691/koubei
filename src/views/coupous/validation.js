const discount1Validation = [
  {
    key: 'coupouName',
    rule: [{name: 'required', errMsg: '请填写券名称'}]
  },
  {
    key: 'store',
    rule: [{name: 'required', errMsg: '.请选择适用门店'}]
  },
  {
    key: 'pickerStartValue',
    associateKey: 'pickerEndValue',
    rule: [{name: 'date-compare', errMsg: '活动开始时间不能大于活动结束时间'}]
  },
  {
    key: 'brandName',
    rule: [{name: 'required', errMsg: '请填写品牌名称'}]
  },
  {
    key: 'logo',
    rule: [{name: 'required', errMsg: '请上传券LOGO'}]
  },
  {
    key: 'crowdType',
    rule: [{name: 'required', errMsg: '请选择领取人群'}]
  },
  {
    key: 'discount',
    rule: [{name: 'required', errMsg: '请填写折扣力度'}, {name: 'pattern', errMsg: '折扣仅允许填写数字', pattern: /[^\d.]/}]
  },
  {
    key: 'coupouExpired',
    rule: [{name: 'required', errMsg: '请选择券有效期'}]
  }
]

export { discount1Validation }
