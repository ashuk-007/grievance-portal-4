const mongoose = require('mongoose')

const ComplaintSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please provide subject'],
        maxLength: 50
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxLength: 500
    },
    department: {
        type: String,
        required: [true, 'Please provide department'],
        enum: ['Health', 'Education', 'Transport', 'Pension', 'other'],
    },
    status: {
        type: String,
        enum: ['in process', 'resolved', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user id']
    },
    // officer: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Officer',
    //     required: [true, 'Please provide officer id'],
    // }
    //
}, { timestamps: true })

// ComplaintSchema.pre('save', async function(next) {
//     try {
//         const user = await User.findOne({_id: req.user.userId})
        
//         const officer = await Officer.findOne({district: user.district, level: 1, department: req.body.department})
        
//         if (!officer){
//             console.log('no officer in the district')
//         }

//         if (officer) {
//             officer.complaints.push(this._id);
//             await officer.save();
//         }

//         console.log(officer)

//         next();
//     } 
//     catch (error) {
//         console.log('could not add the complaint')
//     }
//   })

module.exports = mongoose.model('Complaint', ComplaintSchema)
