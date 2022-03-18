import fs from 'fs'
import path from 'path'

import { Connection, getConnection } from 'typeorm'
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver
} from 'typeorm-fixtures-cli'
import yaml from 'js-yaml'

export const loadYaml = (yamlPath: string) => {
  return yaml.load(fs.readFileSync(yamlPath).toString())
}

export const loadFixtures = async (fixturesPath: string): Promise<void> => {
  const connection: Connection = getConnection()

  const loader = new Loader()
  loader.load(path.resolve(fixturesPath))

  const resolver = new Resolver()
  const fixtures = resolver.resolve(loader.fixtureConfigs)

  const builder = new Builder(connection, new Parser())

  for (const fixture of fixturesIterator(fixtures)) {
    const repository = connection.getRepository(fixture.entity)
    const entity = await builder.build(fixture)
    await repository.save(entity)
  }
}
