// var nodemailer = require('nodemailer');

// const sendEmail = async (to, subject, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: 'grievanceportaliiita@gmail.com',
//         pass: 'grievanceportal',
//       },
//     });

//     let info = await transporter.sendMail({
//       from: ' "Grievance Portal" <grievanceportaliiita@gmail.com>',
//       to: to,
//       subject: `New Update about your grievance ${subject}`,
//       text: `New Update About your grievance ${subject},
//       Update: ${body}`
//     });

//     console.log('Message sent: %s', info.messageId);
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = {sendEmail}