import crypto from 'crypto'
import { RestGen, route } from 'helper/restgen'
import jwt from 'jsonwebtoken'
import User from 'model/user'
import 'helper/env'
class UserRest extends RestGen {
  constructor () {
    super('user', User)
  }
  @route('post', 'login')
  async login (ctx) {
    try {
      let body = ctx.request.body
      const secret = 'abcdefg'
      body.password = crypto.createHmac('sha256', secret)
        .update(body.password)
        .digest('hex')
      const user = await User.findOne({ email: body.email, password: body.password }).exec()
      const token = jwt.sign({ id: user._id }, process.env.SECUREKEY)
      ctx.body = { success: true, token }
    } catch (error) {
      ctx.body = { success: false, error }
    }
  }
}
export default UserRest
