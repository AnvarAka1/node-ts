import { getRepository } from 'typeorm'

import { Skill } from 'src/entity/Skill'

import skillFixture from './fixtures/skill.fixture.json'

export default async () => {
  const skillRepository = getRepository(Skill)

  const skill = await skillRepository.findOne()

  if (!skill) {
    const skills = skillFixture.map(item => skillRepository.create(item))

    await skillRepository.save(skills)
  }
}
