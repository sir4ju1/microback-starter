import mongoose from 'helper/mongoose'
import crypto from 'crypto'

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  middle_initial: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  phone: String,
  age: String,
  race: String,
  ter_id: String,
  user_photo: String,
  reference_email: [String],
  p411id: String,
  date: Date,
  rs2k: String,
  reference_photo: String,
  hour_price: String,
  couple: {
    type: Boolean,
    default: false
  },
  message: String,
  payment_card: String,
  payment_date: Date,
  payment_cvv: String,
  card_name: String,
  billing_address: String,
  billing_city: String,
  billing_state: String,
  billing_zipcode: [String]
})

userSchema.pre('save', async function (next) {
  if (this.password) {
    const secret = 'abcdefg'
    this.password = crypto.createHmac('sha256', secret)
      .update(this.password)
      .digest('hex')
  }
  return next(true)
})

const User = mongoose.model('User', userSchema)
User.ensureIndexes()

export default User
