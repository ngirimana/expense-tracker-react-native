export const getFormattedDate = (date) => {
    return `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
}
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}