import { Request } from 'express'
import { getManager, getRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import { validateOrReject } from 'class-validator'

import { Freelancer } from 'src/entity/Freelancer'
import { User } from 'src/entity/User'
import { NewPasswordDTO } from 'src/types'
import { Portfolio } from 'src/entity/Portfolio'
import { FreelancerPrice } from 'src/entity/FreelancerPrice'
import { Skill } from 'src/entity/Skill'
import { FreelancerPaymentMethod } from 'src/entity/FreelancerPaymentMethod'

const profileDetail = async (req: Request) => {
  const userId = req.user.id
  const freelancer = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .leftJoinAndSelect('freelancer.user', 'user')
    .leftJoinAndSelect('freelancer.skills', 'skills')
    .leftJoinAndSelect('freelancer.stack', 'stack')
    .leftJoinAndSelect('freelancer.price', 'price')
    .leftJoinAndSelect('freelancer.portfolio', 'portfolio')
    .leftJoinAndSelect('freelancer.paymentMethods', 'paymentMethods')
    .where('user.id = :userId', { userId })
    .getOneOrFail()

  return { result: freelancer }
}

const updateGeneral = async (req: Request<unknown, unknown, Freelancer>) => {
  const userId = req.user.id

  const {
    user,
    stack,
    skills,
    portfolio,
    price,
    paymentMethods,
    overwork
  } = req.body

  const {
    avatar,
    phone,
    firstName,
    lastName,
    age,
    description
  } = user

  const userEntity = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.id = :userId', { userId })
    .getOneOrFail()

  userEntity.firstName = firstName
  userEntity.lastName = lastName
  userEntity.description = description
  userEntity.phone = phone
  userEntity.avatar = avatar
  userEntity.age = age

  const freelancer = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .leftJoinAndSelect('freelancer.user', 'user')
    .leftJoinAndSelect('freelancer.skills', 'skills')
    .leftJoinAndSelect('freelancer.stack', 'stack')
    .leftJoinAndSelect('freelancer.price', 'price')
    .leftJoinAndSelect('freelancer.portfolio', 'portfolio')
    .leftJoinAndSelect('freelancer.paymentMethods', 'paymentMethods')
    .where('freelancer.userId = :userId', { userId })
    .getOneOrFail()

  const skillIds = skills.map(skill => skill.id)
  const skillEntity = await getRepository(Skill)
    .createQueryBuilder('skill')
    .where('skill.id IN (:...skillIds)', { skillIds })
    .getMany()

  const portfolioEntity = await getRepository(Portfolio)
    .createQueryBuilder('portfolio')
    .where('portfolio.id = :portfolioId', { portfolioId: freelancer.portfolio.id })
    .getOneOrFail()

  const priceEntity = await getRepository(FreelancerPrice)
    .createQueryBuilder('freelancerPrice')
    .where('freelancerPrice.id = :priceId', { priceId: freelancer.price.id })
    .getOneOrFail()

  const paymentMethodsEntity = await getRepository(FreelancerPaymentMethod)
    .createQueryBuilder('paymentMethods')
    .where('paymentMethods.id = :paymentMethodsId', { paymentMethodsId: freelancer.paymentMethods.id })
    .getOneOrFail()

  freelancer.stack.id = stack.id
  freelancer.skills = skillEntity

  portfolioEntity.link = portfolio.link
  portfolioEntity.github = portfolio.github
  portfolioEntity.behance = portfolio.behance

  priceEntity.price = price.price
  priceEntity.currency = price.currency

  paymentMethodsEntity.cash = paymentMethods.cash
  paymentMethodsEntity.card = paymentMethods.card
  paymentMethodsEntity.transfer = paymentMethods.transfer

  freelancer.overwork = overwork

  const result = await getManager().transaction(async transactionManager => {
    await validateOrReject(userEntity)
    await validateOrReject(portfolioEntity)
    await validateOrReject(paymentMethodsEntity)
    await validateOrReject(priceEntity)
    await transactionManager.save(userEntity)
    await transactionManager.save(portfolioEntity)
    await transactionManager.save(paymentMethodsEntity)
    await transactionManager.save(priceEntity)

    await validateOrReject(freelancer)
    return await transactionManager.save(freelancer)
  })

  return { result }
}

const updateSecurity = async (req: Request<unknown, unknown, NewPasswordDTO>) => {
  const userId = req.user.id

  const {
    password,
    newPassword,
    confirmPassword
  } = req.body

  const user = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.id = :userId', { userId })
    .addSelect('user.password')
    .getOneOrFail()

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
  updateGeneral,
  updateSecurity
}
