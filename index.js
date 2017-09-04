'use strict'
import Koa from 'koa'
import cors from 'kcors'
import jwt from 'koa-jwt'

import api from './app'
import { config } from 'dotenv'
config()

const app = new Koa()
app.use(cors())

app.use(jwt({
  secret: process.env.SECUREKEY
}).unless({
  path: ['/api/user/login']
}))

api(app)

if (!module.parent) {
  app.listen(process.env.PORT, () => console.log(`Started on Port:${process.env.PORT}`))
}
export default app
