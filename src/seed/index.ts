import adminSeed from './admin.seed'
import stackSeed from './stack.seed'
import positionSeed from './position.seed'
import skillSeed from './skill.seed'

export default async (connectionName = 'default') => {
  try {
    await adminSeed(connectionName)
    await stackSeed(connectionName)
    await positionSeed(connectionName)
    await skillSeed(connectionName)
  } finally {}
}
