import { Router } from 'express'

const router = Router()

router.get('/profile/detail', () => {})
router.get('/profile/general/update', () => {})
router.get('/profile/security/update', () => {})

router.get('/freelancers/list', () => {})
router.get('/freelancers/:id/detail', () => {})

router.get('/projects/list', () => {})
router.get('/projects/:id/detail', () => {})
router.get('/projects/request/send', () => {})
router.get('/projects/request/cancel', () => {})

export default router
