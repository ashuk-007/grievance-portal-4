require('dotenv').config()

const connectDB = require('./db/connect')
const Officer = require('./models/Officer')

const officerValues = require('./officer-values.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Officer.deleteMany()
    await Officer.create(officerValues)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()