import { sign } from 'jsonwebtoken'

export const getJwtToken = (userId: number) => {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export const getRefreshToken = (userId: number) => {
  return sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '20d' })
}
