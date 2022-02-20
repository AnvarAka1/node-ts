import adminSeed from './admin.seed'
import stackSeed from './stack.seed'
import positionSeed from './position.seed'
import skillSeed from './skill.seed'

export default async () => {
  try {
    await adminSeed()
    await stackSeed()
    await positionSeed()
    await skillSeed()
  } finally {}
}
