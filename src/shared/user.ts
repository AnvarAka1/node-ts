import { getRepository } from 'typeorm'

import { User } from 'src/entity/User'

const key = 'user'
export const getUser = (userId: number, selects: string[] = []) => {
  const newSelect = selects.map(select => `${key}.${select}`)

  return getRepository(User)
    .createQueryBuilder(key)
    .where(`${key}.id = :userId`, { userId })
    .addSelect(newSelect)
    .getOneOrFail()
}
