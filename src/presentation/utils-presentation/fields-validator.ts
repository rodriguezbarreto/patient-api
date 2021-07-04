
export const fieldsValidator = (requiredFields: string[], data: any): string => {
  for (let i = 0; i < requiredFields.length; i++) {
    if (typeof data[requiredFields[i]] === 'undefined' || data[requiredFields[i]] === null) {
      return `fields ${requiredFields[i]} is required`
    }
  }
}
