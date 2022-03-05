import { getRepository } from 'typeorm'

import { Position } from 'src/entity/Position'

import positionFixture from './fixtures/position.fixture.json'

export default async (connectionName: string) => {
  const positionRepository = getRepository(Position, connectionName)

  const position = await positionRepository.findOne()

  if (!position) {
    const positions = positionFixture.map(item => positionRepository.create(item))

    await positionRepository.save(positions)
  }
}
