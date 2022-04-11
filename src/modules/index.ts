import { Router } from 'express'

import routes from './routes'

const router = Router()

router.use('/v1', routes)

/**
 *  Ping pong
 **/
/*
router.get('/ping', function (req: Request, res: Response, next: NextFunction) {
  return res.status(200).send({ message: 'pong' })
})
 */

export default router
