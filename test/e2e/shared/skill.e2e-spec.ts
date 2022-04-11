import request from 'supertest'

import app from 'src/app'

describe('Skill list', function () {
  it('should return 6 skills', async function () {
    const res = await request(app)
      .get('/v1/skills/list/')
    expect(res.status).toEqual(200)
    return expect(res.body.results).toHaveLength(6)
  })
})
