import { Router } from 'express'

import skillController from '../controllers/skill.controller'
import stackController from '../controllers/stack.controller'
import positionController from '../controllers/position.controller'

const router = Router()

router.get('/skills/list', skillController.list)
router.get('/skills/:id/detail', skillController.detail)
router.post('/skills/create', skillController.create)
router.put('/skills/:id/update', skillController.update)
router.delete('/skills/delete', skillController.deleteOne)

router.get('/stacks/list', stackController.list)
router.get('/stacks/:id/detail', stackController.detail)
router.post('/stacks/create', stackController.create)
router.put('/stacks/:id/update', stackController.update)
router.delete('/stacks/delete', stackController.deleteOne)

router.get('/positions/list', positionController.list)
router.get('/positions/:id/detail', positionController.detail)
router.post('/positions/create', positionController.create)
router.put('/positions/:id/update', positionController.update)
router.delete('/positions/delete', positionController.deleteOne)

export default router
