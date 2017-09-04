import mongoose from 'mongoose'
import 'helper/env'

mongoose.connect(process.env.MONGODB, {
  useMongoClient: true
})
mongoose.Promise = Promise

export default mongoose
