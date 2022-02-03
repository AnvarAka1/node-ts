import { NextFunction, Request, Response } from 'express'

import { CLIENT_TYPE } from 'src/constants/roles'

export const isClient = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req

  if (user.role !== CLIENT_TYPE) {
    throw Error('Wrong role.')
  }

  next()
}
