export const decodeCredential = (token) =>
  decodeURIComponent(
    atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  )

export const convertToSelectOption = (obj) => {
  let keyArr = Object.keys(obj)
  return keyArr.map((key) => {
    return { text: obj[key], value: key }
  })
}
