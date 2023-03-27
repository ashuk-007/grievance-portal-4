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
}, { timestamps: true })

module.exports = mongoose.model('Complaint', ComplaintSchema)
