export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 4
  }).format(number)
}
