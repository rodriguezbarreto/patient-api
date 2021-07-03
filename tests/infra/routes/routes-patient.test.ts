import app from '../../../src/infra/config/app'

import request from 'supertest'

describe('Routes', () => {
  test('should return response into create', async () => {
    await request(app)
      .get('/v1/patient/create')
      .expect({ ok: 'ok' })
  })
})
