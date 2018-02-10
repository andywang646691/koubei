const activity1Validation = [
  {
    key: 'coupouName',
    rule: [{name: 'required', errMsg: '请填写券名称'}]
  },
  {
    key: 'shops',
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
    key: 'worthValue',
    rule: [{name: 'required', errMsg: '请填写优惠金额'}]
  },
  {
    key: 'lowestLimit',
    associateKey: 'worthValue',
    rule: [{name: 'required', errMsg: '请填写最低消费'}, {name: 'amt-compare', errMsg: '优惠金额不能大于最低消费'}]
  },
  {
    key: 'highestDiscountLimit',
    rule: [{name: 'required', errMsg: '请填写最高优惠金额'}]
  },
  {
    key: 'coupouExpired',
    rule: [{name: 'required', errMsg: '请选择券有效期'}]
  },
  {
    key: 'useInstructions',
    rule: [{name: 'required', errMsg: '请在其他设置中填写券的使用说明'}]
  }
]

const activity2Validation = [
  {
    key: 'activeName',
    rule: [{name: 'required', errMsg: '请填写活动名称'}]
  },
  {
    key: 'shops',
    rule: [{name: 'required', errMsg: '请选择适用门店'}]
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
    key: 'promoTools',
    rule: [{name: 'promoTools', errMsg: '请填写奖品信息'}]
  }
]

export { activity1Validation, activity2Validation }
