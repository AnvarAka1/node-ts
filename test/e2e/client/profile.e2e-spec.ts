import request from 'supertest'

import app from 'src/app'

import { loadFixtures } from '../utils/loadFixtures'
import { generateJwtToken } from '../utils/auth'

const token = generateJwtToken({ id: 2, role: 'client' })

describe('Client profile', function () {
  beforeEach(async () => {
    await loadFixtures('client/fixtures/user/detail.yaml')
    await loadFixtures('client/fixtures/client/detail.yaml')
  })

  it('should show client profile detail', async () => {
    const res = await request(app)
      .get('/v1/client/profile/detail')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)

    const result = res.body.result
    expect(result.user.role).toEqual('client')
    expect(result.user.email).toEqual('client@gmail.com')
    expect(result.user.avatar).toEqual('hello.jpg')
    expect(result.user.firstName).toEqual('Client')
    expect(result.user.lastName).toEqual('Clientovich')
    expect(result.user.phone).toEqual('+123')
    expect(result.user.description).toEqual('')
    expect(result.user.age).toEqual(25)
    expect(result.companyName).toEqual('Good company')
    expect(result.position.id).toEqual(1)
  })

  it('should update general info about client', async () => {
    const updateRes = await request(app)
      .put('/v1/client/profile/general/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: {
          firstName: 'Updated first name',
          lastName: 'Updated last name',
          avatar: 'updated avatar',
          description: 'updated description',
          age: 222,
          phone: '+998933765289'
        },
        position: {
          id: 2
        },
        companyName: 'New company'
      })

    expect(updateRes.status).toEqual(200)

    const result = updateRes.body.result
    expect(result.user.role).toEqual('client')
    expect(result.user.email).toEqual('client@gmail.com')
    expect(result.user.avatar).toEqual('updated avatar')
    expect(result.user.firstName).toEqual('Updated first name')
    expect(result.user.lastName).toEqual('Updated last name')
    expect(result.user.phone).toEqual('+998933765289')
    expect(result.user.description).toEqual('updated description')
    expect(result.user.age).toEqual(222)
    expect(result.companyName).toEqual('New company')
    expect(result.position.id).toEqual(2)
  })

  it('should update client\'s password', async () => {
    const updateRes = await request(app)
      .put('/v1/client/profile/security/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: '123321',
        newPassword: '321123',
        confirmPassword: '321123'
      })

    expect(updateRes.status).toEqual(200)
  })

  it('should throw error for passwords not match', async () => {
    const updateRes = await request(app)
      .put('/v1/client/profile/security/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: '123321',
        newPassword: '321123',
        confirmPassword: '123321'
      })

    expect(updateRes.status).toEqual(500)
    expect(updateRes.body.error).toEqual('Passwords do not match.')
  })

  it('should throw error for incorrect password', async () => {
    const updateRes = await request(app)
      .put('/v1/client/profile/security/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: '312321',
        newPassword: '321123',
        confirmPassword: '321123'
      })

    expect(updateRes.status).toEqual(500)
    expect(updateRes.body.error).toEqual('Current password is wrong.')
  })
})
