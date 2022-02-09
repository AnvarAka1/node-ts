import { Router } from 'express'

import projectController from '../controllers/project.controller'

const router = Router()

router.get('/freelancers/list')
router.get('/freelancers/:id/detail')
router.get('/freelancers/:id/projects/list')
router.post('/freelancers/:id/request-projects')
router.delete('/freelancers/:id/remove-projects')

router.post('/projects/create', projectController.projectCreate)
router.put('/projects/:id/update', projectController.projectUpdate)
router.get('/projects/list', projectController.projectList)
router.get('/projects/:id/detail', projectController.projectDetail)

router.get('/my-projects/list', projectController.myProjectList)

export default router
