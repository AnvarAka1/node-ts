import { NextFunction, Request, Response } from 'express'

import authService from '../services/auth.service'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signUpResponse = await authService.signUp(req)

    return res.status(200).json(signUpResponse)
  } catch (err) {
    next(err)
  }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signInResponse = await authService.signIn(req)

    return res.status(200).json(signInResponse)
  } catch (err) {
    next(err)
  }
}

export default { signUp, signIn }
