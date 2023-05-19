const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/')
var nodemailer = require('nodemailer');
// const Blacklist  = require('../models/Blacklist')

const register = async (req, res) => {

    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

}

const login = async (req, res) => {
    //send the response
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    // Check if user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('User not found');
    }
  
    // Generate a password reset token and expiry time
    const resetToken = user.generatePasswordResetToken();
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  
    // Save the updated user with password reset token and expiry time
    await user.save();
  
    // Create a nodemailer transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'grievanceportaliiita4@gmail.com',
          pass: 'bryoccqsbhkhnhah',
        },
    });
  
    // Compose the email message with the password reset link
    // const resetUrl = `${req.protocol}://${req.headers.host}/api/v1/auth/reset-password/${resetToken}`;
    const message = {
      from: 'grievanceportaliiita4@gmail.com', // Your Gmail email address
      to: email,
      subject: 'Password reset request',
      html: `
        <p>Hello,</p>
        <p>You have requested a password reset for your account. Please use the following reset token to change your password:</p>
        <h5>${resetToken}</h5>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this reset, please ignore this email and your password will remain unchanged.</p>
        <p>Thank you.</p>
      `,
    };
  
    // Send the email message
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
        throw new Error('Failed to send password reset email');
      } else {
        console.log(info);
        res.status(StatusCodes.OK).json({ message: 'Password reset email sent' });
      }
    });
  };

const resetPassword = async (req, res) => {
    try {
      // const { password } = req.body;
      // const {resetToken} = req.params;
      const user = await User.findOne({ passwordResetToken: req.body.token, passwordResetExpires: { $gt: Date.now() } });
      if (!user) {
        throw new BadRequestError('Invalid or expired reset token');
      }
      user.password = req.body.password;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await user.save();
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Something went wrong' });
    }
  };


module.exports = { login, register, forgotPassword, resetPassword }

