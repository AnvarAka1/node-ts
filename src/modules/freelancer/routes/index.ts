import { Router } from 'express'

import profileController from '../controllers/profile.controller'
import projectController from '../controllers/project.controller'
import freelancerController from '../controllers/freelancer.controller'

const router = Router()

router.get('/profile/detail', profileController.profileDetail)
router.put('/profile/general/update', profileController.updateGeneral)
router.put('/profile/security/update', profileController.updateSecurity)

router.get('/freelancers/list', freelancerController.freelancerList)
router.get('/freelancers/:id/detail', freelancerController.freelancerDetail)

router.get('/projects/list', projectController.projectList)
router.get('/projects/:id/detail', projectController.projectDetail)
router.post('/projects/:id/request/send', projectController.projectRequestSend)
router.delete('/projects/:id/request/cancel', projectController.projectRequestCancel)

export default router
