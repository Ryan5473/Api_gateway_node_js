import { createProxyMiddleware } from 'http-proxy-middleware'
import { pathToRegexp } from 'path-to-regexp'
import { rateLimit } from 'express-rate-limit'  // Import the rate-limiting package
import authenticationMiddleware from '../utils/authentication_middleware'

export default function createProxyMiddlewareForService(app, route, apiPrefix) {
  const { name, auth, rateLimit: rateLimitOptions, proxy } = route

  const middlewares = []

  // Authentication Middleware
  if (auth) {
    middlewares.push((req, res, next) => {
      const authConfig = auth.find(
        (item) =>
          pathToRegexp(item.path).exec(req.path) &&
          item.methods.includes(req.method)
      )

      if (!authConfig) return next()

      return authenticationMiddleware(req, res, next, authConfig)
    })
  }

  // Rate-Limiting Middleware
  if (rateLimitOptions) {
    const rateLimiter = rateLimit(rateLimitOptions)
    middlewares.push(rateLimiter)  // Add the rate limiting middleware to the middlewares stack
  }

  // Proxy Middleware
  const proxyMiddleware = createProxyMiddleware(proxy)

  // Apply middlewares and proxy to the route
  app.use(apiPrefix + name, ...middlewares, proxyMiddleware)
}
    