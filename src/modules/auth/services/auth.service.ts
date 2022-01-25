import { getRepository, In } from 'typeorm'
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

      const stackEntity = await stackRepository.findOne({ id: stack.id })

      const skillIds = skills.map(skill => skill.id)
      const skillsEntity = await skillRepository.find({ where: { id: In(skillIds) } })

      if (!skillsEntity || !stackEntity) {
        throw Error('Internal server error.')
      }

      const freelancer = freelancerRepository.create({
        stack: stackEntity,
        skills: skillsEntity,
        user
      })

      await userRepository.save(user)
      await freelancerRepository.save(freelancer)
    }

    if (role === CLIENT_TYPE) {
      const { position, companyName } = req.body

      const clientRepository = getRepository(Client)
      const positionRepository = getRepository(Position)

      const positionEntity = await positionRepository.findOne({ id: position.id })

      if (!positionEntity) {
        throw Error('Internal server error.')
      }

      const client = clientRepository.create({
        companyName,
        position: positionEntity,
        user
      })

      client.companyName = companyName

      await userRepository.save(user)
      await clientRepository.save(client)
    }
  } finally {}

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
  } finally {}

  return { token: '' }
}

export default { signUp, signIn }
