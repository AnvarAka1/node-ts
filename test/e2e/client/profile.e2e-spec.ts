import request from 'supertest'

import app from 'src/app'

import { loadFixtures } from '../utils/loadFixtures'
import { generateJwtToken } from '../utils/auth'

const token = generateJwtToken({ id: 2, role: 'client' })

describe('Client profile', function () {
  it('should show client profile detail', async () => {
    await loadFixtures('./test/e2e/client/fixtures/user/detail.yaml')
    await loadFixtures('./test/e2e/client/fixtures/client/detail.yaml')

    const res = await request(app)
      .get('/v1/client/profile/detail')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
  })
})
