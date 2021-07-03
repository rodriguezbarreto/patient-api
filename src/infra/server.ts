import app from '../infra/config/app'

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})
