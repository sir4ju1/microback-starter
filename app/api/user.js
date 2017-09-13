import { RestGen, route, noauth, auth } from 'microback'
import User from 'model/user'

class UserApi extends RestGen {
  constructor () {
    super('user', User)
  }
  @route('post', 'auth/signup')
  @noauth()
  async signup (ctx) {
   try {
     let body = ctx.request.body
     body.password = auth.generateHash(body.password)
     const user = await User.create(body)
     ctx.body = { success: true, data: user }
   } catch (error) {
     ctx.body = { success: false, error }
   }
  }
  @route('post', 'auth/login')
  @noauth()
  async login (ctx) {
    const body = ctx.request.body
    const token = await auth.login(body, User)
    ctx.body = token
  }
}

export default UserApi
