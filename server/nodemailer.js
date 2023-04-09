var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'grievanceportaliiita@gmail.com',
        pass: 'grievanceportal'
    }
});

var mailOptions = {
    from: 'grievanceportaliiita@gmail.com',
    to: 'utsav19october@gmail.com',
    subject: 'Update Regarding your complaint',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});