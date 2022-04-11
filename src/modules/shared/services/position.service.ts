import { Request } from 'express'
import { getRepository } from 'typeorm'

import { Position } from 'src/entity/Position'
import { getPaginatedList } from 'src/utils/pagination'

const list = async (req: Request) => {
  const positionQB = getRepository(Position)
    .createQueryBuilder('position')
  const { results, count } = await getPaginatedList<Position>(positionQB, req.query)

  return { results, count }
}

export default { list }
