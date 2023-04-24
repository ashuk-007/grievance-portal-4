const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const crypto = require('crypto');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: [6, 'Password must be a minimum of 6 characters'],

    },
    district: {
        type: String,
        required: [true, 'Please provide district'],
        minLength: 3,
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone number'],
        minLength: [10, 'Phone number must be a minimum of 10 characters'],
    },
    age: {
        type: Number,
        required: [true, 'Please provide age'],
        min: [18, 'Age must be a minimum of 18 years'],
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'officer'],
        default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
})

UserSchema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.getName = function () {
    return this.name
}

UserSchema.methods.generatePasswordResetToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    return resetToken;
  };

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {

    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
}

module.exports = mongoose.model('User', UserSchema);