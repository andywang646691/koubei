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

export { discount1Validation }
