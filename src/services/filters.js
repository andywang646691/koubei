function formatCrowdType (type) {
  switch (type) {
    case 'ALL': return '全体用户'
    case 'STUDENT': return '大学生用户'
    case 'NEW_MEMBER_PROMO': return '新客专享'
  }
}

export { formatCrowdType }
