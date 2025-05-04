const formatCurency = (value: number) => {
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
}

export default formatCurency