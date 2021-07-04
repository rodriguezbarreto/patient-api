type ResponseValidator = {
  message: string
}
export const fieldsValidator = (requiredFields: string[], data: any): ResponseValidator => {
  for (let i = 0; i < requiredFields.length; i++) {
    if (typeof data[requiredFields[i]] === 'undefined' || data[requiredFields[i]] === null) {
      return { message: `fields ${requiredFields[i]} is required` }
    }
  }
}
