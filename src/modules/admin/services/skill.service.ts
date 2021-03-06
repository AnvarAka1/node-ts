import { Request } from 'express'
import { getRepository } from 'typeorm'

import { Skill } from 'src/entity/Skill'

const create = async (req: Request<unknown, unknown, Skill>) => {
  const { name } = req.body
  try {
    if (!name) {
      throw Error('Name is required')
    }
    const skillRepository = getRepository(Skill)
    const skill = skillRepository.create({ name })
    const result = await skillRepository.save(skill)

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
