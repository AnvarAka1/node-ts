import { sign } from 'jsonwebtoken'

import { JwtPayloadType } from 'src/libs/jwt'

export const generateJwtToken = (payload: JwtPayloadType) => {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}
