import { getManager, getRepository } from 'typeorm'
import { Request } from 'express'

import { Freelancer } from 'src/entity/Freelancer'
import { getPaginatedList } from 'src/utils/pagination'
import { Project } from 'src/entity/Project'
import { Client } from 'src/entity/Client'

const freelancerList = async (req: Request) => {
  const listQB = getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .leftJoinAndSelect('freelancer.user', 'user')

  const { results, count } = await getPaginatedList(listQB, req.query)

  return { results, count }
}

const freelancerDetail = async (req: Request<{ id: string }>) => {
  const freelancerId = parseInt(req.params.id)

  const result = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .leftJoinAndSelect('freelancer.user', 'user')
    .where('freelancer.id = :freelancerId', { freelancerId })
    .getOneOrFail()

  return { result }
}

const projectList = async (req: Request<{ id: string }>) => {
  const freelancerId = parseInt(req.params.id)

  const freelancerProjects = getRepository(Project)
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.freelancer', 'freelancer')
    .where('freelancer.id = :freelancerId', { freelancerId })

  const { results, count } = await getPaginatedList(freelancerProjects, req.query)

  return { results, count }
}

const projectRequestSend = async (req: Request<{ id: string }, unknown, { projects: [{ id: number }] }>) => {
  const userId = req.user.id
  const freelancerId = parseInt(req.params.id)

  const projectIds = req.body.projects.map(project => project.id)

  const freelancer = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .where('freelancer.id = :freelancerId', { freelancerId })
    .getOneOrFail()

  const client = await getRepository(Client)
    .createQueryBuilder('client')
    .leftJoinAndSelect('client.user', 'user')
    .where('user.id = :userId', { userId })
    .getOneOrFail()

  const projectsWithFreelancer = await getRepository(Project)
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.requestedFreelancer', 'requestedFreelancer')
    .leftJoinAndSelect('project.client', 'client')
    .where('client.id = :clientId', { clientId: client.id })
    .andWhere('requestedFreelancer.id = :freelancerId', { freelancerId })
    .getMany()

  const projectsForFreelancer = await getRepository(Project)
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.requestedFreelancer', 'requestedFreelancer')
    .where('project.id IN (:...projectIds)', { projectIds })
    .getMany()

  await getManager().transaction(async transactionManager => {
    for (const project of projectsWithFreelancer) {
      await transactionManager
        .createQueryBuilder()
        .relation(Project, 'requestedFreelancer')
        .of(project)
        .set(null)
    }

    for (const project of projectsForFreelancer) {
      await transactionManager
        .createQueryBuilder()
        .relation(Project, 'requestedFreelancer')
        .of(project)
        .set(freelancer)
    }
  })

  return {}
}

export default {
  freelancerList,
  freelancerDetail,
  projectList,
  projectRequestSend
}
