import { getRepository } from 'typeorm'

import { Stack } from 'src/entity/Stack'

import stackFixture from './fixtures/stack.fixture.json'

export default async (connectionName: string) => {
  const stackRepository = getRepository(Stack, connectionName)

  const stack = await stackRepository.findOne()

  if (!stack) {
    const stacks = stackFixture.map(item => stackRepository.create(item))

    await stackRepository.save(stacks)
  }
}
