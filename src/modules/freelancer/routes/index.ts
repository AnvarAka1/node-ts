import { Router } from 'express'

import projectController from '../controllers/project.controller'

const router = Router()

router.get('/profile/detail', () => {})
router.get('/profile/general/update', () => {})
router.get('/profile/security/update', () => {})

router.get('/freelancers/list', () => {})
router.get('/freelancers/:id/detail', () => {})

router.get('/projects/list', projectController.projectList)
router.get('/projects/:id/detail', projectController.projectDetail)
router.post('/projects/:id/request/send', projectController.projectRequestSend)
router.delete('/projects/:id/request/cancel', projectController.projectRequestCancel)

export default router
