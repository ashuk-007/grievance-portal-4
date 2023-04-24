require('dotenv').config()

const connectDB = require('./db/connect')
const Admin = require('./models/Admin')
const Officer = require('./models/Officer')

const adminValues = require('./admin-values.json')
const Complaint = require('./models/Complaint')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // await Admin.deleteMany()
    // await Admin.create(adminValues)
    await Complaint.deleteMany();
    // await Officer.deleteMany()
    // await Officer.create(officerValues)
    // await Officer.updateMany(
    //   {
    //     avgRating: { $exists: false },
    //     ratings: { $exists: false }
    //   },
    //   {
    //     $set: {
    //       avgRating: null,
    //       ratings: [],
    //     }
    //   }
    // )
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()