import { sign, verify } from 'jsonwebtoken'

export type JwtPayloadType = {
  id: number
  role: string
}

export const generateJwtToken = (payload: JwtPayloadType) => {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export const generateRefreshToken = (payload: JwtPayloadType) => {
  return sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '20d' })
}

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!)
}

export const getToken = (authorization?: string) => {
  if (!authorization) {
    throw Error('No authorization.')
  }

  return authorization.split(' ')[1]
}
