import { Router } from 'express'

export default (router: Router): void => {
  router.get('/patient/create', (req, res) => {
    return res.status(200).send({ ok: 'ok' })
  })
}
