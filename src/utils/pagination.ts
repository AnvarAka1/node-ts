import { SelectQueryBuilder } from 'typeorm'

type QueryType = {
  limit?: string
  page?: string
  count?: string
}

const LIMIT = '10'

export const getPaginatedList = async <T>(queryBuilder: SelectQueryBuilder<T>, query: QueryType) => {
  const { page = '1', limit = LIMIT } = query

  const intLimit = parseInt(limit)
  const intPage = parseInt(page)

  const skip = (intPage - 1) * intLimit

  const [results, count] = await queryBuilder
    .skip(skip)
    .take(intLimit)
    .getManyAndCount()

  return { results, count }
}
