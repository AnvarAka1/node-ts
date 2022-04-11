import { NextFunction, Request, Response } from 'express'

import stackService from '../services/stack.service'

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await stackService.list(req)

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export default { list }
