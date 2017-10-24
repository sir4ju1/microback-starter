import { RestGen, route, noauth, auth } from 'microback'
import User from 'model/user'
import sharp from 'sharp'
import path from 'path'
import uuid from 'uuid'
import { config } from 'dotenv'

config()

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
    ctx.body = { success: true, data: token }
  }
  /**
   * Generally we save uploaded image to a location which is serveed
   * by fast static content delivery server e.g. ngninx, GWAN etc
   */
  @route('post', 'image/upload')
  @noauth()
  async upload (ctx) {
    const body = ctx.request.body
    const imagePath = body.files.image.path
    const imageUniqueName = uuid()
    // Generate Thumbnail of uploaded Image
    await sharp(imagePath)
      .resize(100)
      .png()
      .toFile(path.join(process.env.IMAGEPATH, `${imageUniqueName}_sm.png`))
    // Generate 500px of uploaded Image
    await sharp(imagePath)
      .resize(500)
      .png()
      .toFile(path.join(process.env.IMAGEPATH, `${imageUniqueName}_lg.png`))
    ctx.body = { success: true }
  }
}

export default UserApi
