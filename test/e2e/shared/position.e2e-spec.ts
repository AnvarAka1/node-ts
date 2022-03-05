import request from 'supertest'

import app from 'src/app'

describe('Position list', function () {
  beforeEach(() => {

  })

  it('should return 4 positions', function () {
    const res = request(app).get('/ping')
    res.expect(200)
    res.then(message => console.log(message))
  })
})
