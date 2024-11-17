import { ROLES } from '../config'

const CUSTOMER_MICROSERVICE = {
  name: 'customers',

  auth: [
    {
      path: '/profile',
      methods: ['GET'],
      roles: [ROLES.USER],
    },
  ],

  proxy: {
    target: process.env.CUSTOMERS_MICROSERVICE_DOMAIN,
    changeOrigin: true,
  },
}

export default CUSTOMER_MICROSERVICE
