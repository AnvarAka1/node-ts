import { Request, Response } from 'express'

import authService from '../services/auth.service'

const signUp = (req: Request, res: Response) => {
  const signUpResponse = authService.signUp(req)

  return res.status(200).json(signUpResponse)
}

const signIn = (req: Request, res: Response) => {
  const signInResponse = authService.signIn(req)

  return res.status(200).json(signInResponse)
}

export default { signUp, signIn }
