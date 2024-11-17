import createProxyMiddlewareForService from './create_proxy_middleware'
import MICROSERVICES from '../microservices'

export default function setupProxies(app, apiPrefix = '/api/v1/') {
  MICROSERVICES.forEach((service) => {
    createProxyMiddlewareForService(app, service, apiPrefix)
  })
}
