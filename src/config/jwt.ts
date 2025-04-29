export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'secret123',
    expiresIn: '1d'
  }
  