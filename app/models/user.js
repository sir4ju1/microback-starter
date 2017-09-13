import { model } from 'microback'

export default model({
  name: 'User',
  schema: {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true
    },
    password: String

  }
})
