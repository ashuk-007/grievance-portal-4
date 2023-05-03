require('dotenv').config()
const districts = require('./districts').districtArray
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
    for (const i in districts) {
      email = districts[i].replace(/ /g, '').toLowerCase() + "admin@gmail.com";
      adminName = districts[i] + " Admin";
      password = "password"
      distr = districts[i]

      await Admin.create({
        name: adminName,
        email: email,
        password: password,
        district: distr,
      })
      console.log(adminName, email, password, distr)
    }
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

    // await Complaint.deleteMany();
    // console.log("complaints deleted")
    // await OfficerRatings.updateMany({}, { avgRating: null, ratings: [] });
    // console.log("officer ratings updated")
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