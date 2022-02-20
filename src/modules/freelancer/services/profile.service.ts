import { Request } from 'express'
import { getManager, getRepository, TransactionManager } from 'typeorm'
import bcrypt from 'bcrypt'

import { Freelancer } from 'src/entity/Freelancer'
import { User } from 'src/entity/User'
import { NewPasswordDTO } from 'src/types'
import { Stack } from 'src/entity/Stack'
import { Portfolio } from 'src/entity/Portfolio'
import { FreelancerPrice } from 'src/entity/FreelancerPrice'
import { Skill } from 'src/entity/Skill'
import { PaymentMethod } from 'src/entity/PaymentMethod'

const profileDetail = async (req: Request) => {
  const userId = req.user.id
  const freelancer = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .leftJoinAndSelect('freelancer.user', 'user')
    .where('user.id = :userId', { userId })
    .getOneOrFail()

  return { result: freelancer }
}

const updateGeneral = async (req: Request<unknown, unknown, User & Freelancer>) => {
  const userId = req.user.id

  const {
    avatar,
    phone,
    firstName,
    lastName,
    description,
    stack,
    skills,
    portfolio,
    price,
    paymentMethods,
    overwork,
    age
  } = req.body

  const user = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.id = :userId', { userId })
    .getOneOrFail()

  user.firstName = firstName
  user.lastName = lastName
  user.description = description
  user.phone = phone
  user.avatar = avatar
  user.age = age

  const freelancer = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .where('freelancer.userId = :userId', { userId })
    .getOneOrFail()

  // const stack = await getRepository(Stack)
  //   .createQueryBuilder('stack')
  //   .where('stack.id = :stackId', { id: stack.id })
  //   .getOneOrFail()
  //
  // const skillIds = skills.map(skill => skill.id)
  //
  // const skills = await getRepository(Skill)
  //   .createQueryBuilder('skill')
  //   .where('skill.id IN (:...skillIds)', { skillIds })
  //   .getMany()
  //
  // const portfolioEntity = await getRepository(Portfolio)
  //   .createQueryBuilder('portfolio')
  //   .where('portfolio.id = :portfolioId', { portfolioId: freelancer.portfolio.id })
  //   .getOne()

  // const price = await getRepository(FreelancerPrice)
  //   .createQueryBuilder('price')
  //   .where('price.id = :priceId', { priceId: freelancer.price.id })
  //   .getOne()
  //
  // const paymentMethods = await getRepository(PaymentMethod)
  //   .createQueryBuilder('paymentMethod')
  //   .where('paymentMethods.id = :paymentMethodsId', { paymentMethodsId: freelancer.paymentMethods.id })
  //   .getOne()

  // const newPortfolio = new Portfolio()
  //
  // if (freelancer.portfolio) {
  //   newPortfolio.link = portfolio.link
  //   newPortfolio.github = portfolio.github
  //   newPortfolio.behance = portfolio.behance
  //   freelancer.portfolio = await newPortfolio.save()
  // }
  //
  // if (!freelancer.portfolio) {
  //
  // }
  // freelancer.portfolio = portfolio
  // console.log(freelancer.portfolio)
  //

  freelancer.portfolio.github = portfolio.github
  freelancer.portfolio.link = portfolio.link
  freelancer.portfolio.behance = portfolio.behance

  freelancer.overwork = overwork

  await getManager().transaction(async transactionManager => {
    await transactionManager
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where('user.id = :userId', { userId })
      .execute()

    await transactionManager
      .createQueryBuilder()
      .update(Freelancer)
      .set({
        overwork,
        portfolio: freelancer.portfolio
      })
      .where('freelancer.id = :freelancerId', { freelancerId: freelancer.id })
      .execute()
  })

  return {
  }
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
    .addSelect('password')
    .getOneOrFail()

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw Error('Current password is wrong.')
  }

  if (newPassword !== confirmPassword) {
    throw Error('Passwords do not match.')
  }

  user.password = await bcrypt.hash(newPassword, 12)

  await user.save()

  return { result: null }
}

export default {
  profileDetail,
  updateGeneral,
  updateSecurity
}
