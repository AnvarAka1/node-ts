import { Router } from 'express'

import skillController from '../controllers/skill.controller'
import stackController from '../controllers/stack.controller'
import positionController from '../controllers/position.controller'

const router = Router()

router.get('/skills/list', skillController.list)
router.get('/stacks/list', stackController.list)
router.get('/positions/list', positionController.list)

export default router
