// 配券页面所需的校验信息

const coupou1Validation = [
  {
    key: 'discount',
    rule: [{name: 'required', errMsg: '请填写折扣力度'}, {name: 'pattern', errMsg: '折扣仅允许填写数字', pattern: /[^\d.]/}, {name: 'discount-scope', errMsg: '折扣力度仅允许1.1~9.9折'}]
  },
  {
    key: 'useInstructions',
    rule: [{name: 'required', errMsg: '请在其他设置中填写券的使用说明'}]
  }
]

const coupou2Validation = [
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
    key: 'useInstructions',
    rule: [{name: 'required', errMsg: '请在其他设置中填写券的使用说明'}]
  }
]

const coupou3Validation = [
  {
    key: 'discount',
    rule: [{name: 'required', errMsg: '请填写折扣力度'}, {name: 'pattern', errMsg: '折扣仅允许填写数字', pattern: /[^\d.]/}, {name: 'discount-scope', errMsg: '折扣力度仅允许1.1~9.9折'}]
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

const coupou4Validation = [
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

export { coupou1Validation, coupou2Validation, coupou3Validation, coupou4Validation }
