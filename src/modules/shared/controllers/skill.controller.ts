import { NextFunction, Request, Response } from 'express'

import skillService from '../services/skill.service'

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await skillService.list(req)

    return res.status(200).json(results)
  } catch (error) {
    next(error)
  }
}

export default { list }
