import { Request } from 'express'
import { getRepository } from 'typeorm'

import { Skill } from 'src/entity/Skill'
import { getPaginatedList } from 'src/utils/pagination'

const list = async (req: Request) => {
  const skillQB = getRepository(Skill)
    .createQueryBuilder('skill')

  const { results, count } = await getPaginatedList<Skill>(skillQB, req.query)

  return { results, count }
}

export default { list }
