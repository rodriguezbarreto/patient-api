import app from '../../../src/infra/config/app'

import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    await request(app)
      .get('/v1/patient/create')
      .expect({ ok: 'ok' })
  })
})
