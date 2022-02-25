import { getRepository } from 'typeorm'

import { Client } from 'src/entity/Client'

export const getProfile = (userId: number) =>
  getRepository(Client)
    .createQueryBuilder('client')
    .leftJoinAndSelect('client.user', 'user')
    .leftJoinAndSelect('client.position', 'position')
    .where('user.id = :userId', { userId })
    .getOneOrFail()
