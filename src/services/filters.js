import is from 'is-type'
function formatCrowdType (type) {
  switch (type) {
    case '': return '全体用户'
    case 'STUDENT': return '大学生用户'
    case 'NEW_MEMBER_PROMO': return '新客专享'
  }
}

function boolTransform (value) {
  if (is.boolean(value)) {
    return value ? '是' : '否'
  }
  if (is.string(value)) {
    let valueNum = Number(value)
    if (is.number(valueNum) && !isNaN(valueNum)) {
      return valueNum ? '是' : '否'
    } else {
      return value === 'Y' ? '是' : '否'
    }
  }
  throw new Error('请输入正确的值')
}

function dictFormat (value) {
  if (!value) return ''
  switch (value) {
    case 'DIRECT_SEND': return '需要用户领取'
    case 'REAL_TIME_SEND': return '不需要用户领取'
    case 'IMMEDIATELY': return '领取后立即生效'
    case 'DELAY': return '次日生效'
    case 'USE_NO_LIMIT': return '不限制'
    case 'USE_ON_CURRENT_PAY_CHANNEL': return '仅限储值卡付款可享'
    case 'NOT_ALLOWED_USE': return '储值卡付款时不可享'
  }
}
export { formatCrowdType, boolTransform, dictFormat }
