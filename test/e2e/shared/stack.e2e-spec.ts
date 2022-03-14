import request from 'supertest'

import app from 'src/app'

describe('Stack list', function () {
  it('should return 4 stacks', async function () {
    const res = await request(app)
      .get('/v1/stacks/list/')
    expect(res.status).toEqual(200)
    return expect(res.body.results).toHaveLength(4)
  })
})
