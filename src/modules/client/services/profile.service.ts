import { Request } from 'express'
import { getManager } from 'typeorm'
import bcrypt from 'bcrypt'
import { validateOrReject } from 'class-validator'

import { Client } from 'src/entity/Client'
import { getUser } from 'src/shared/user'
import { NewPasswordDTO } from 'src/types'

import { getProfile } from '../repositories/profile.repository'

const profileDetail = async (req: Request) => {
  const userId = req.user.id

  const result = await getProfile(userId)

  return { result }
}

const generalUpdate = async (req: Request<unknown, unknown, Client>) => {
  const userId = req.user.id
  const {
    user,
    position,
    companyName
  } = req.body

  const {
    firstName,
    lastName,
    avatar,
    description,
    age,
    phone,
  } = user
  const userEntity = await getUser(userId)
  const clientEntity = await getProfile(userId)

  clientEntity.companyName = companyName
  clientEntity.position.id = position.id

  userEntity.age = age
  userEntity.phone = phone
  userEntity.description = description
  userEntity.avatar = avatar
  userEntity.firstName = firstName
  userEntity.lastName = lastName
  userEntity.fullName = `${firstName} ${lastName}`

  await getManager().transaction(async transactionManager => {
    await validateOrReject(userEntity)
    await validateOrReject(clientEntity)
    await transactionManager.save(userEntity)
    await transactionManager.save(clientEntity)
  })

  return {}
}

const securityUpdate = async (req: Request<unknown, unknown, NewPasswordDTO>) => {
  const userId = req.user.id

  const {
    password,
    newPassword,
    confirmPassword
  } = req.body

  const user = await getUser(userId, ['password'])

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw Error('Current password is wrong.')
  }

  if (newPassword !== confirmPassword) {
    throw Error('Passwords do not match.')
  }

  user.password = await bcrypt.hash(newPassword, 12)

  await validateOrReject(user)
  await user.save()

  return { result: null }
}

export default {
  profileDetail,
  generalUpdate,
  securityUpdate
}
