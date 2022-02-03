import { NextFunction, Request, Response } from 'express'

import { FREELANCER_TYPE } from 'src/constants/roles'

export const isFreelancer = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req

  if (user.role !== FREELANCER_TYPE) {
    throw Error('Wrong role.')
  }

  next()
}
