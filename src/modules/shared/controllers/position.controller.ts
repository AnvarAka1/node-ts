import { NextFunction, Request, Response } from 'express'

import positionService from '../services/position.service'

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await positionService.list(req)

    return res.status(200).json(results)
  } catch (error) {
    next(error)
  }
}

export default { list }
