const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

const OfficerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    department: {
            type: String,
            required: [true,'pls provide department'],
            enum: ['Health', 'Education', 'Transport', 'Pension', 'other'],
    },
    level: {
            type: Number,
            required: [true,'pls provide level'],
            enum: [1,2,3]
    },
    email: {
            type: String,
            required: [true,'pls provide email'],
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
            ],
            unique: true,
    },
    password: {
            type: String,
            required: [true,'pls provide password'],
            minLength: 6,
    },
    district: {
            type: String,
            required: [true, 'pls provide district'],
            minLength: 3,
    },
    complaints: [{
            type: mongoose.Types.ObjectId,
            ref: 'Complaint',
            required: false
    }]
})

OfficerSchema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

})

OfficerSchema.methods.getName = function () {
    return this.name
}

OfficerSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

OfficerSchema.methods.addComplaint = async function (complaint) {
    this.complaints.push(complaint)
}

OfficerSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('Officer', OfficerSchema)