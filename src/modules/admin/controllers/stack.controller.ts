import { NextFunction, Request, Response } from 'express'

import stackService from '../services/stack.service'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await stackService.create(req)

    return res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
}

const list = () => {}

const detail = () => {}

const update = () => {}

const deleteOne = () => {}

export default {
  list,
  detail,
  create,
  update,
  deleteOne
}
