import { Router } from 'express'

import authController from '../controllers/auth.controller'

const router = Router()

router.post('/sign-in', authController.signUp)
router.post('/sign-up', authController.signIn)

export default router
