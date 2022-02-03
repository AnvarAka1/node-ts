import { Router } from 'express'

import { isClient } from 'src/middlewares/isClient'
import { isFreelancer } from 'src/middlewares/isFreelancer'
import { isAuth } from 'src/middlewares/isAuth'
import { isAdmin } from 'src/middlewares/isAdmin'

import adminRoutes from './admin/routes'
import clientRoutes from './client/routes'
import freelancerRoutes from './freelancer/routes'
import authRoutes from './auth/routes'

const router = Router()

router.use('/admin', isAuth, isAdmin, adminRoutes)
router.use('/client', isAuth, isClient, clientRoutes)
router.use('/freelancer', isAuth, isFreelancer, freelancerRoutes)
router.use('/', authRoutes)

export default router
