import { Request } from 'express'
import { getManager, getRepository, In } from 'typeorm'

import { Project } from 'src/entity/Project'
import { ProjectPrice } from 'src/entity/ProjectPrice'
import { Stack } from 'src/entity/Stack'
import { Skill } from 'src/entity/Skill'
import { PaymentMethod } from 'src/entity/PaymentMethod'
import { Client } from 'src/entity/Client'
import { getPaginatedList } from 'src/utils/pagination'

const myProjectList = async (req: Request) => {
  const userId = req.user.id
  const clientRepository = getRepository(Client)
  const clientEntity = await clientRepository
    .createQueryBuilder('client')
    .where('client.userId = :userId', { userId })
    .getOneOrFail()

  const projectQueryBuilder = getRepository(Project)
    .createQueryBuilder('project')
    .where('project.clientId = :clientId', { clientId: clientEntity.id })
    .andWhere('project.status = :projectStatus', { projectStatus: 'active' })

  const { results, count } = await getPaginatedList<Project>(projectQueryBuilder, req.query)

  return { results, count }
}

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

const projectCreate = async (req: Request<unknown, unknown, Project>) => {
  const {
    name,
    description,
    price,
    file,
    skills,
    additionalComment,
    overwork,
    stack,
    paymentMethods,
    reassessment,
    requirement,
  } = req.body

  const clientRepository = getRepository(Client)
  const projectRepository = getRepository(Project)
  const projectPriceRepository = getRepository(ProjectPrice)
  const skillRepository = getRepository(Skill)
  const stackRepository = getRepository(Stack)
  const paymentMethodsRepository = getRepository(PaymentMethod)

  const newProjectPrice = projectPriceRepository.create({
    price: price.price,
    currency: price.currency
  })

  const newPaymentMethods = paymentMethodsRepository.create({
    card: paymentMethods.card,
    cash: paymentMethods.cash,
    transfer: paymentMethods.transfer
  })

  const skillIds = skills.map(skill => skill.id)

  const clientEntity = await clientRepository
    .createQueryBuilder('client')
    .where('client.userId = :userId', { userId: req.user.id })
    .getOneOrFail()

  const [, projectCount] = await projectRepository
    .createQueryBuilder('project')
    .where('project.clientId = :clientId', { clientId: clientEntity.id })
    .andWhere('project.status = :projectStatus', { projectStatus: 'active' })
    .getManyAndCount()

  if (projectCount >= 3) {
    throw Error('Cannot create more than 3 active projects.')
  }

  const skillsEntity = await skillRepository.find({ id: In(skillIds) })
  const stackEntity = await stackRepository.findOne({ id: stack.id })

  await getManager().transaction(async transactionManager => {
    const priceEntity = await transactionManager.save(newProjectPrice)
    const paymentMethodsEntity = await transactionManager.save(newPaymentMethods)

    const project = projectRepository.create({
      name,
      file,
      description,
      requirement,
      reassessment,
      overwork,
      additionalComment,
      client: clientEntity,
      paymentMethods: paymentMethodsEntity,
      price: priceEntity,
      skills: skillsEntity,
      stack: stackEntity
    })

    await transactionManager.save(project)
  })
}

const projectUpdate = async (req: Request<{ id: string }, unknown, Project>) => {
  const id = parseInt(req.params.id)

  const {
    name,
    description,
    price,
    file,
    skills,
    additionalComment,
    overwork,
    stack,
    paymentMethods,
    reassessment,
    requirement,
  } = req.body

  const clientRepository = getRepository(Client)
  const projectRepository = getRepository(Project)
  const projectPriceRepository = getRepository(ProjectPrice)
  const skillRepository = getRepository(Skill)
  const stackRepository = getRepository(Stack)
  const paymentMethodsRepository = getRepository(PaymentMethod)

  const newProjectPrice = projectPriceRepository.create({
    price: price.price,
    currency: price.currency
  })

  const newPaymentMethods = paymentMethodsRepository.create({
    card: paymentMethods.card,
    cash: paymentMethods.cash,
    transfer: paymentMethods.transfer
  })

  const skillIds = skills.map(skill => skill.id)

  const clientEntity = await clientRepository.findOneOrFail({
    where: { user: { id: req.user.id } },
    relations: ['projects']
  })

  const skillsEntity = await skillRepository.find({ id: In(skillIds) })
  const stackEntity = await stackRepository.findOneOrFail({ id: stack.id })
  const projectEntity = await projectRepository.findOneOrFail({ id })

  await getManager().transaction(async transactionManager => {
    const priceEntity = await transactionManager.save(newProjectPrice)
    const paymentMethodsEntity = await transactionManager.save(newPaymentMethods)

    projectEntity.name = name
    projectEntity.file = file
    projectEntity.description = description
    projectEntity.requirement = requirement
    projectEntity.reassessment = reassessment
    projectEntity.overwork = overwork
    projectEntity.additionalComment = additionalComment
    projectEntity.client = clientEntity
    projectEntity.paymentMethods = paymentMethodsEntity
    projectEntity.price = priceEntity
    projectEntity.skills = skillsEntity
    projectEntity.stack = stackEntity

    await transactionManager.save(projectEntity)
  })
}

export default {
  projectList,
  projectDetail,
  projectCreate,
  projectUpdate,
  myProjectList
}
