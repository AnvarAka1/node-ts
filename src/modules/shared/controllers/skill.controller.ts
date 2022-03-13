import { NextFunction, Request, Response } from 'express'

import skillService from '../services/skill.service'

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await skillService.list(req)

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export default { list }
