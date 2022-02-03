import { NextFunction, Request, Response } from 'express'

import { getToken, verifyToken } from 'src/libs/jwt'

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  const token = getToken(authorization)

  const payload = verifyToken(token)
  if (typeof payload === 'string') {
    throw Error('Invalid token.')
  }

  req.user = payload as { id: number; role: string; }
  next()
}
