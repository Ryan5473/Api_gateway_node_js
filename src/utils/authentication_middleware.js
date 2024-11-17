import verifyToken from './verify_token'

export default async function authenticationMiddleware(req, res, next, authConfig) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' })
  }

  const { user, error } = await verifyToken(token)

  if (error || !authConfig.roles.includes(user.role)) {
    return res.status(403).json({ error: 'Forbidden: Access denied' })
  }

  req.user = user
  next()
}
