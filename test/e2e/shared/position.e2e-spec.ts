import request from 'supertest'

import app from 'src/app'

describe('Position list', function () {
  it('should return 6 positions', async function () {
    const res = await request(app)
      .get('/v1/positions/list/')

    expect(res.status).toEqual(200)
    return expect(res.body.results).toHaveLength(6)
  })
})
