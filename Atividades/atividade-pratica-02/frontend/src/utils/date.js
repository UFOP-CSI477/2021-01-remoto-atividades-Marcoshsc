const formatNumber = (number) => {
  return number < 10 ? `0${number}` : number.toString()
}

export const getFormattedDate = (date) => {
  return `${formatNumber(date.getDate())}/${formatNumber(date.getMonth() + 1)}/${formatNumber(date.getFullYear())}`
}