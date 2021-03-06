import { getManager, getRepository, In } from 'typeorm'
import { Request } from 'express'
import { compare, hash } from 'bcrypt'
import { validateOrReject } from 'class-validator'

import { User } from 'src/entity/User'
import { Freelancer } from 'src/entity/Freelancer'
import { Client } from 'src/entity/Client'
import { CLIENT_TYPE, FREELANCER_TYPE } from 'src/constants/roles'
import { Stack } from 'src/entity/Stack'
import { Skill } from 'src/entity/Skill'
import { Position } from 'src/entity/Position'
import { generateJwtToken } from 'src/libs/jwt'
import { FreelancerPaymentMethod } from 'src/entity/FreelancerPaymentMethod'
import { Portfolio } from 'src/entity/Portfolio'
import { FreelancerPrice } from 'src/entity/FreelancerPrice'

export const signUp = async (req: Request<unknown, unknown, User & Freelancer & Client>) => {
  const userRepository = getRepository(User)

  const {
    email,
    password,
    role,
    description,
    firstName,
    lastName,
    phone
  } = req.body

  const existingUser = await userRepository.findOne({ email })

  if (existingUser) {
    throw Error('User already exists.')
  }

  const hashedPassword = await hash(password, 12)

  const user = userRepository.create({
    email,
    password: hashedPassword,
    role,
    description,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    phone
  })

  await validateOrReject(user)
  if (role === FREELANCER_TYPE) {
    const { stack, skills } = req.body

    const freelancerRepository = getRepository(Freelancer)
    const stackRepository = getRepository(Stack)
    const skillRepository = getRepository(Skill)
    const freelancerPaymentMethodRepository = getRepository(FreelancerPaymentMethod)
    const portfolioRepository = getRepository(Portfolio)
    const priceRepository = getRepository(FreelancerPrice)
    const paymentMethods = freelancerPaymentMethodRepository.create({
      cash: true,
      card: false,
      transfer: false
    })
    const portfolio = portfolioRepository.create({
      behance: '',
      link: '',
      github: ''
    })
    const price = priceRepository.create({
      price: 0,
      currency: 'usd'
    })

    const stackEntity = await stackRepository.findOne({ id: stack.id })

    const skillIds = skills.map(skill => skill.id)
    const skillsEntity = await skillRepository.find({ where: { id: In(skillIds) } })

    if (!skillsEntity || !stackEntity) {
      throw Error()
    }

    await getManager().transaction(async transactionManager => {
      await transactionManager.save(user)
      await transactionManager.save(paymentMethods)
      await transactionManager.save(portfolio)
      await transactionManager.save(price)

      const freelancer = freelancerRepository.create({
        stack: stackEntity,
        skills: skillsEntity,
        overwork: false,
        rating: 0,
        status: 'active',
        paymentMethods,
        portfolio,
        price,
        user
      })

      await validateOrReject(freelancer)
      await transactionManager.save(freelancer)
    })
  }

  if (role === CLIENT_TYPE) {
    const { position, companyName } = req.body

    const clientRepository = getRepository(Client)
    const positionRepository = getRepository(Position)

    const positionEntity = await positionRepository.findOne({ id: position.id })

    if (!positionEntity) {
      throw Error()
    }

    await getManager().transaction(async transactionManager => {
      await transactionManager.save(user)

      const client = clientRepository.create({
        companyName,
        position: positionEntity,
        user
      })

      await validateOrReject(client)
      await transactionManager.save(client)
    })
  }

  return {}
}

export const signIn = async (req: Request<unknown, unknown, User>) => {
  const { email, password } = req.body
  const userRepository = getRepository(User)
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password')
    .getOneOrFail()

  const isPasswordMatch = await compare(password, user.password)
  if (!isPasswordMatch) {
    throw Error('Invalid email or password.')
  }

  const payload = { id: user.id, role: user.role }
  const token = generateJwtToken(payload)

  return { token }
}

export default { signUp, signIn }
