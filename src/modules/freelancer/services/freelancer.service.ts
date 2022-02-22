import { Request } from 'express'
import { getRepository } from 'typeorm'

import { getPaginatedList } from 'src/utils/pagination'
import { Freelancer } from 'src/entity/Freelancer'

const freelancerList = async (req: Request) => {
  const listQB = getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .leftJoinAndSelect('freelancer.user', 'user')

  const { results, count } = await getPaginatedList(listQB, req.query)

  return { results, count }
}

const freelancerDetail = async (req: Request<{ id: string }>) => {
  const freelancerId = parseInt(req.params.id)

  const result = await getRepository(Freelancer)
    .createQueryBuilder('freelancer')
    .leftJoinAndSelect('freelancer.user', 'user')
    .where('freelancer.id = :freelancerId', { freelancerId })
    .getOneOrFail()

  return { result }
}

export default {
  freelancerList,
  freelancerDetail
}
