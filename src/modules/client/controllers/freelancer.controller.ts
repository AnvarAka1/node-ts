import { NextFunction, Request, Response } from 'express'

import freelancerService from '../services/freelancer.service'

const freelancerList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await freelancerService.freelancerList(req)
    return res.status(200).json(results)
  } catch (err) {
    next(err)
  }
}

const freelancerDetail = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await freelancerService.freelancerDetail(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const projectList = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const results = await freelancerService.projectList(req)
    return res.status(200).json(results)
  } catch (err) {
    next(err)
  }
}

const projectRequestSend = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await freelancerService.projectRequestSend(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

export default {
  freelancerList,
  freelancerDetail,
  projectList,
  projectRequestSend
}
