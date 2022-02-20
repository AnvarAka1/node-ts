import { NextFunction, Request, Response } from 'express'

import profileService from '../services/profile.service'

const profileDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await profileService.profileDetail(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const updateGeneral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await profileService.updateGeneral(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const updateSecurity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await profileService.updateSecurity(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

export default {
  profileDetail,
  updateGeneral,
  updateSecurity
}
