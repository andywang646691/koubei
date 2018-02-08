// 配券页面所需的校验信息

const discount1Validation = [
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
    key: 'discount',
    rule: [{name: 'required', errMsg: '请填写折扣力度'}, {name: 'pattern', errMsg: '折扣仅允许填写数字', pattern: /[^\d.]/}, {name: 'discount-scope', errMsg: '折扣力度仅允许1.1~9.9折'}]
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

const discount2Validation = [
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
    key: 'coupouExpired',
    rule: [{name: 'required', errMsg: '请选择券有效期'}]
  },
  {
    key: 'useInstructions',
    rule: [{name: 'required', errMsg: '请在其他设置中填写券的使用说明'}]
  }
]

const discount3Validation = [
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
    key: 'discount',
    rule: [{name: 'required', errMsg: '请填写折扣力度'}, {name: 'pattern', errMsg: '折扣仅允许填写数字', pattern: /[^\d.]/}, {name: 'discount-scope', errMsg: '折扣力度仅允许1.1~9.9折'}]
  },
  {
    key: 'coupouExpired',
    rule: [{name: 'required', errMsg: '请选择券有效期'}]
  },
  {
    key: 'useInstructions',
    rule: [{name: 'required', errMsg: '请在其他设置中填写券的使用说明'}]
  },
  {
    key: 'gdName',
    rule: [{name: 'required', errMsg: '请填写商品名称'}]
  },
  {
    key: 'gdCode',
    rule: [{name: 'required', errMsg: '请填写商品编码'}]
  },
  {
    key: 'gdDetail',
    rule: [{name: 'required', errMsg: '请填写商品详情'}]
  }
]

const discount4Validation = [
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
    key: 'coupouExpired',
    rule: [{name: 'required', errMsg: '请选择券有效期'}]
  },
  {
    key: 'useInstructions',
    rule: [{name: 'required', errMsg: '请在其他设置中填写券的使用说明'}]
  },
  {
    key: 'gdName',
    rule: [{name: 'required', errMsg: '请填写商品名称'}]
  },
  {
    key: 'gdCode',
    rule: [{name: 'required', errMsg: '请填写商品编码'}]
  },
  {
    key: 'gdDetail',
    rule: [{name: 'required', errMsg: '请填写商品详情'}]
  }
]

export { discount1Validation, discount2Validation, discount3Validation, discount4Validation }
