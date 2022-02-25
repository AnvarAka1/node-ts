import { Router } from 'express'

import projectController from '../controllers/project.controller'
import freelancerController from '../controllers/freelancer.controller'

const router = Router()

router.get('/freelancers/list', freelancerController.freelancerList)
router.get('/freelancers/:id/detail', freelancerController.freelancerDetail)
router.get('/freelancers/:id/projects/list', freelancerController.projectList)
router.post('/freelancers/:id/request-projects/send', freelancerController.projectRequestSend)

router.post('/projects/create', projectController.projectCreate)
router.put('/projects/:id/update', projectController.projectUpdate)
router.get('/projects/list', projectController.projectList)
router.get('/projects/:id/detail', projectController.projectDetail)

router.get('/my-projects/list', projectController.myProjectList)

export default router
