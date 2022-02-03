import adminSeed from './admin.seed'

export default async () => {
  try {
    await adminSeed()
  } finally {}
}
