export const formatRegionName = (address) => {
  switch ( address) {
  case 'Hanoi':
    return 'Hà Nội'
  case 'Da Nang':
    return 'Đà Nẵng'
  case 'Ho Chi Minh City':
    return 'TP Hồ Chí Minh'
  case 'Bà Rịa-Vũng Tàu':
    return 'Bà Rịa - Vũng Tàu'
  default :
    return address
  }

}