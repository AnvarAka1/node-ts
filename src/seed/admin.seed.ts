import { getRepository } from 'typeorm'
import { hash } from 'bcrypt'

import { User } from 'src/entity/User'
import { ADMIN_TYPE } from 'src/constants/roles'

export default async () => {
  const userRepository = getRepository(User)

  const adminUser = await userRepository.findOne({ role: ADMIN_TYPE })
  if (!adminUser) {
    const hashedPassword = await hash(process.env.ADMIN_PASSWORD!, 12)

    const newAdminUser = userRepository.create({
      email: 'admin@worklance.com',
      role: ADMIN_TYPE,
      password: hashedPassword,
      firstName: 'Anvar',
      lastName: 'Abdulsatarov',
      fullName: 'Anvar Abdulsatarov'
    })

    await userRepository.save(newAdminUser)
  }
}