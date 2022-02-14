import { Request } from 'express'
import { getRepository } from 'typeorm'

import { Project } from 'src/entity/Project'
import { getPaginatedList } from 'src/utils/pagination'
import { Freelancer } from 'src/entity/Freelancer'

const projectList = async (req: Request) => {
  const projectQueryBuilder = getRepository(Project)
    .createQueryBuilder('project')
    .where('project.status = :projectStatus', { projectStatus: 'active' })
  const { results, count } = await getPaginatedList<Project>(projectQueryBuilder, req.query)

  return { results, count }
}

const projectDetail = async (req: Request<{ id: string }>) => {
  const id = parseInt(req.params.id)

  const projectRepository = getRepository(Project)
  const project = await projectRepository.findOne({ id })

  if (!project) {
    throw Error()
  }

  return { result: project }
}

const projectRequestSend = async (req: Request<{ id: string }>) => {
  const userId = req.user.id
  const projectId = parseInt(req.params.id)

  const projectRepository = getRepository(Project)

  const freelancerEntity = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .where('freelancer.userId = :userId', { userId })
    .getOneOrFail()

  const candidateExists = await projectRepository
    .createQueryBuilder('project')
    .relation(Project, 'candidates')
    .of({ id: projectId })
    .loadOne()

  if (candidateExists) {
    throw Error('Already requested.')
  }

  await projectRepository
    .createQueryBuilder('project')
    .relation(Project, 'candidates')
    .of({ id: projectId })
    .add(freelancerEntity)

  return { result: { isRequested: true } }
}

const projectRequestCancel = async (req: Request<{ id: string }>) => {
  const userId = req.user.id
  const projectId = parseInt(req.params.id)

  const projectRepository = getRepository(Project)

  const freelancerEntity = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .where('freelancer.userId = :userId', { userId })
    .getOneOrFail()

  await projectRepository
    .createQueryBuilder('project')
    .relation(Project, 'candidates')
    .of({ id: projectId })
    .remove(freelancerEntity)

  return { result: { isRequested: false } }
}

export default {
  projectList,
  projectDetail,
  projectRequestSend,
  projectRequestCancel
}
