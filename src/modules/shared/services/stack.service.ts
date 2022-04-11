import { Request } from 'express'
import { getRepository } from 'typeorm'

import { getPaginatedList } from 'src/utils/pagination'
import { Stack } from 'src/entity/Stack'

const list = async (req: Request) => {
  const stackQB = getRepository(Stack)
    .createQueryBuilder('stack')

  const { results, count } = await getPaginatedList<Stack>(stackQB, req.query)

  return { results, count }
}

export default { list }
