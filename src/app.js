import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import setupProxies from './proxies'

const app = express()

app.use(morgan('common'))
app.use(cors())
app.use(helmet())
app.use(compression())

setupProxies(app)

export default app
