import request from 'supertest'

import app from 'src/app'
import { Project } from 'src/entity/Project'

import { loadFixtures } from '../utils/loadFixtures'
import { generateJwtToken } from '../utils/auth'

const token = generateJwtToken({ id: 2, role: 'client' })

describe('Client profile', function () {
  beforeEach(async () => {
    await loadFixtures('client/fixtures/user/detail.yaml')
    await loadFixtures('client/fixtures/client/detail.yaml')
  })

  it('should return project list', async () => {
    await loadFixtures('client/fixtures/project/list.yaml')
    await loadFixtures('client/fixtures/project/project-price.yaml')
    await loadFixtures('client/fixtures/project/project-review.yaml')
    const projectListRes = await request(app)
      .get('/v1/client/projects/list/')
      .set('Authorization', `Bearer ${token}`)

    expect(projectListRes.status).toEqual(200)
    const results: Project[] = projectListRes.body.results

    expect(results).toHaveLength(3)
    expect(results[0].id).toEqual(1)
    expect(results[0].price.id).toEqual(1)
    expect(results[0].price.price).toEqual(20)
    expect(results[0].price.currency).toEqual('usd')
    expect(results[0].name).toEqual('Html css')
    expect(results[0].description).toEqual('Html project')
    expect(results[0].requirement).toEqual('Make the project')
    expect(results[0].paymentMethods.id).toEqual(1)
    expect(results[0].overwork).toEqual(true)
    expect(results[0].stack.id).toEqual(1)
    expect(results[0].skills).toHaveLength(2)
    expect(results[0].skills[0].id).toEqual(2)
    expect(results[0].status).toEqual('closed')
    expect(results[0].reassessment).toEqual('true')
    expect(results[0].file).toEqual('https://')
    expect(results[0].requestedFreelancer).toEqual(null)
    expect(results[0].candidates).toEqual(null)
    expect(results[0].freelancer).toEqual(null)
    expect(results[0].client.id).toEqual(1)
    expect(results[0].additionalComment).toEqual('Very simple')
    expect(results[0].review.id).toEqual('1')
    expect(results[0].review.stars).toEqual(4)
    expect(results[0].review.comment).toEqual('Was a great pleasure to work on this project!')
  })

  // it('should return project detail', async () => {
  //
  // })
  //
  // it('should create new project', async () => {
  //
  // })
  //
  // it('should update project', async () => {
  //
  // })
  //
  // it('should return client\'s project list', async () => {
  //
  // })
  //
  // it('should return 1 item in project list', async () => {
  //
  // })
  //
  // it('should throw error due to too many projects', async () => {
  //
  // })
})
