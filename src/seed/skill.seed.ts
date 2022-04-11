import { getRepository } from 'typeorm'

import { Skill } from 'src/entity/Skill'

import skillFixture from './fixtures/skill.fixture.json'

export default async (connectionName: string) => {
  const skillRepository = getRepository(Skill, connectionName)

  const skill = await skillRepository.findOne()

  if (!skill) {
    const skills = skillFixture.map(item => skillRepository.create(item))

    await skillRepository.save(skills)
  }
}
