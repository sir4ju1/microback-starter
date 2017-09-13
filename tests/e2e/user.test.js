import test from 'ava'
import { agent } from 'supertest'
import { server } from 'microback'
import User from 'model/user'
const request = agent(server())
var token = ''
// test.before('get token', async (t) => {
//   // await User.create({ email: 'admin@email.com', password: '123456' })
//   const res = await request
//     .post('/api/user/auth/login')
//     .send({ email: 'admin@email.com', password: '123456' })
//   token = res.body.token
// })
test('create user', async (t) => {
  var res = await request
    .post('/api/user/auth/signup')
    .send({ email: 'user@email.com', password: '123456' })
    t.is(200, res.status)
    t.is(true, res.body.success)
})
// test.after('delete user', async (t) => {
//   await User.deleteOne({ email: 'user@email.com' })
// })
