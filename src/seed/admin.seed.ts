import { getRepository } from 'typeorm'
import { hash } from 'bcrypt'

import { User } from 'src/entity/User'
import { ADMIN_TYPE } from 'src/constants/roles'

import adminFixture from './fixtures/admin.fixture.json'

export default async (connectionName: string) => {
  const userRepository = getRepository(User, connectionName)

  const adminUser = await userRepository.findOne({ role: ADMIN_TYPE })
  if (!adminUser) {
    const hashedPassword = await hash(process.env.ADMIN_PASSWORD!, 12)

    const newAdminUser = userRepository.create({
      ...adminFixture,
      password: hashedPassword
    })

    await userRepository.save(newAdminUser)
  }
}
