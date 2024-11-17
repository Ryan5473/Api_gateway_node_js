// src/microservices/inventory.microservice.js
import { ROLES } from '../config'

const INVENTORY_MICROSERVICE = {
  name: 'inventory',

  // Define routes and roles that need authentication
  auth: [
    {
      path: '/stock',
      methods: ['GET', 'POST', 'PATCH'],
      roles: [ROLES.ADMIN],
    },
  ],

  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Allow 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },

  // Proxy configuration for microservice
  proxy: {
    target: process.env.INVENTORY_MICROSERVICE_DOMAIN,
    changeOrigin: true,
  },
}

export default INVENTORY_MICROSERVICE
