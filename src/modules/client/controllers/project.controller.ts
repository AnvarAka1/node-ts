import { NextFunction, Request, Response } from 'express'

import projectService from '../services/project.service'

const myProjectList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await projectService.myProjectList(req)
    return res.status(200).json(results)
  } catch (err) {
    next(err)
  }
}

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

const projectCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.projectCreate(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const projectUpdate = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.projectUpdate(req)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

export default {
  projectCreate,
  projectUpdate,
  projectList,
  projectDetail,
  myProjectList
}
