require('dotenv').config()
var ObjectId = require('mongodb').ObjectID;

const connectDB = require('./db/connect')
const Admin = require('./models/Admin')
const Officer = require('./models/Officer')

const adminValues = require('./admin-values.json')
const Complaint = require('./models/Complaint')
const OfficerRatings = require('./models/OfficerRatings')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // await Admin.deleteMany()
    // await Admin.create(adminValues)
    // const officers = await Officer.find({ district: 'Gwalior' });
    // let i = 0;
    // const data = [];

    // while (i < officers.length) {
    //   console.log(officers[i]._id);
    //   await OfficerRatings.replaceOne(
    //     { OfficerId: officers[i]._id },
    //     {
    //       OfficerId: officers[i]._id,
    //       avgRating: null,
    //       ratings: []
    //     },
    //     { upsert: true }

    //   )
    //   i++;
    // }
    // console.log("data created.");

    await Complaint.deleteMany();
    // await OfficerRatings.deleteMany()
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
    //console.log(data);
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()