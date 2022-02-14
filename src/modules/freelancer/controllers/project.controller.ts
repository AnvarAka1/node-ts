import { NextFunction, Request, Response } from 'express'

import projectService from '../services/project.service'

const projectList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await projectService.projectList(req)
    return res.status(200).json(results)
  } catch (err) {
    next(err)
  }
}

const projectDetail = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.projectDetail(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const projectRequestSend = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.projectRequestSend(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const projectRequestCancel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.projectRequestCancel(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

export default {
  projectList,
  projectDetail,
  projectRequestSend,
  projectRequestCancel
}
