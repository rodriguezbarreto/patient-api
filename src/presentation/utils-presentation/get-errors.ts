type ErrorCustom = {
  statusCode: number
  data: string
}

const errorList: ErrorCustom[] = [
  {
    statusCode: 500,
    data: 'Internal Server Error'
  },
  {
    statusCode: 400,
    data: 'Bad Request'
  },
  {
    statusCode: 401,
    data: 'Unauthorized'
  },
  {
    statusCode: 403,
    data: 'Access Denied'
  }
]

export const getErrors = (statusCode: number): string => {
  const payload = errorList.map((err) => {
    if (err.statusCode === statusCode) return err
  })

  return payload[0].data
}
