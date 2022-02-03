import { Request } from 'express'
import { getRepository } from 'typeorm'

import { Position } from 'src/entity/Position'

const create = async (req: Request<unknown, unknown, Position>) => {
  const { name } = req.body
  try {
    if (!name) {
      throw Error('Name is required')
    }
    const positionRepository = getRepository(Position)

    const position = positionRepository.create({ name })

    return positionRepository.save(position)
  } finally {}
}

export default {
  // list,
  // detail,
  create,
  // update,
  // remove
}
