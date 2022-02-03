import { NextFunction, Request, Response } from 'express'

import { ADMIN_TYPE } from 'src/constants/roles'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req

  if (user.role !== ADMIN_TYPE) {
    throw Error('Wrong role.')
  }

  next()
}
