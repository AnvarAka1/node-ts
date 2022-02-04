import { getRepository, In, getManager } from 'typeorm'
import { Request } from 'express'
import { hash, compare } from 'bcrypt'

import { User } from 'src/entity/User'
import { Freelancer } from 'src/entity/Freelancer'
import { Client } from 'src/entity/Client'
import { ClientType, FreelancerType, UserType } from 'src/types'
import { CLIENT_TYPE, FREELANCER_TYPE } from 'src/constants/roles'
import { Stack } from 'src/entity/Stack'
import { Skill } from 'src/entity/Skill'
import { Position } from 'src/entity/Position'
import { generateJwtToken } from 'src/libs/jwt'
import { PaymentMethod } from 'src/entity/PaymentMethod'

export const signUp = async (req: Request<unknown, unknown, UserType & FreelancerType & ClientType>) => {
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

  try {
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

    if (role === FREELANCER_TYPE) {
      const { stack, skills } = req.body

      const freelancerRepository = getRepository(Freelancer)
      const stackRepository = getRepository(Stack)
      const skillRepository = getRepository(Skill)
      const paymentMethodRepository = getRepository(PaymentMethod)

      const paymentMethods = paymentMethodRepository.create({
        cash: true,
        card: false,
        transfer: false
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

        const freelancer = freelancerRepository.create({
          stack: stackEntity,
          skills: skillsEntity,
          overwork: false,
          rating: 0,
          status: 'active',
          paymentMethods,
          user
        })

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

        await transactionManager.save(client)
      })
    }
  } finally {
  }

  return {}
}

export const signIn = async (req: Request<unknown, unknown, UserType>) => {
  const { email, password } = req.body
  const userRepository = getRepository(User)
  try {
    const user = await userRepository.findOne({ email })
    if (!user) {
      throw Error('Invalid email or password.')
    }

    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch) {
      throw Error('Invalid email or password.')
    }

    const payload = { userId: user.id, role: user.role }
    const token = generateJwtToken(payload)

    return { token }
  } finally {
  }
}

export default { signUp, signIn }
