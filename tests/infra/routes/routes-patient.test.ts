import app from '../../../src/infra/config/app'

import request from 'supertest'

describe('Routes', () => {
  test('should return response into create', async () => {
    await request(app)
      .get('/v1/patient/create')
      .send({
        name: 'name',
        phone: '48123456789',
        birthDate: '28/03/50',
        height: 175,
        weight: 80
      })
      .expect({
        success: true,
        statusCode: 200,
        data: 'any',
        error: 'any'
      })
  })
})
