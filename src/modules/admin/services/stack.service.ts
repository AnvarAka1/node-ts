import { Request } from 'express'
import { getRepository } from 'typeorm'

import { Stack } from 'src/entity/Stack'

const create = async (req: Request<unknown, unknown, Stack>) => {
  const { name } = req.body
  try {
    if (!name) {
      throw Error('Name is required')
    }
    const stackRepository = getRepository(Stack)
    const stack = stackRepository.create({ name })
    const result = await stackRepository.save(stack)

    return { result }
  } finally {}
}

export default {
  // list,
  // detail,
  create,
  // update,
  // remove
}
