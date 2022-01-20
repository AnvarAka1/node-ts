import { Router } from 'express'

import clientRoutes from './client/routes'
import freelancerRoutes from './freelancer/routes'
import authRoutes from './auth/routes'

const router = Router()

router.use('/client', clientRoutes)
router.use('/freelancer', freelancerRoutes)
router.use('/', authRoutes)

export default router
