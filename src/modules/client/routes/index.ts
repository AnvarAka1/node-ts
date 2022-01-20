import { Router } from 'express'

const router = Router()

router.get('/freelancers/list')
router.get('/freelancers/:id/detail')
router.get('/freelancers/:id/projects/list')
router.post('/freelancers/:id/request-projects')
router.delete('/freelancers/:id/remove-projects')

router.post('/projects/create')
router.put('/projects/update')
router.get('/projects/list')

router.get('/my-projects/list')

export default router
