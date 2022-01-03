export const phoneFormatter = (number: string) => {
  const formatedNumber = `${number.slice(0, 3)} (${number.slice(
    3,
    6
  )}) ${number.slice(6, 9)}-${number.slice(9, number.length)}`

  return formatedNumber
}
