require('dotenv').config()

const connectDB = require('./db/connect')
const Admin = require('./models/Admin')

const adminValues = require('./admin-values.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Admin.deleteMany()
    await Admin.create(adminValues)
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