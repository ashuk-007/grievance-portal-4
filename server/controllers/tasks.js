const Complaint = require("../models/Complaint");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/User");
const Officer = require("../models/Officer");
var nodemailer = require('nodemailer');
const { config } = require("dotenv");
// const { findById } = require("../models/User");
// const accountSid = 'AC4109f98ba850a5476ba4581780d566ab';
// const authToken = process.env.TWILIO_AUTH;
// const client = require('twilio')(accountSid, authToken);
require('dotenv').config();

const getAllTasks = async (req, res) => {
  // console.log(req.officer);
  //{ officerID: req.officer.officerId }
  const tasks = await Complaint.find({ officerID: req.officer.officerId }).sort(
    "createdAt"
  );
  // console.log(tasks)
  res.status(StatusCodes.OK).json({ count: tasks.length, tasks });
};

const getTask = async (req, res) => {
  const {
    params: { id: complaintId },
  } = req;

  const complaint = await Complaint.findOne({ _id: complaintId });
  if (!complaint) {
    throw new NotFoundError("Complaint not found");
  }
  res.status(StatusCodes.OK).json({ complaint });
};


const passTask = async (req, res) => {
  const {
    body: { forwardedTo },
    officer: { officerId },
    params: { id: complaintId },
  } = req;

  // if (req.body.level === "") {
  //   throw new BadRequestError("Please provide a level");
  // }

  const officer = await Officer.findOne({ _id: officerId });
  const compl = await Complaint.findOne({ _id: complaintId })
  if (!compl) {
    throw new NotFoundError("complaint not found");
  }

  if (compl.officerID != officerId) {
    throw new UnauthenticatedError("not authorized to update this task");
  }
  if (compl.status === "resolved") {
    throw new BadRequestError("Complaint already resolved. It can't be passed.")
  }



  const newOfficerId = await Officer.findOne({
    level: (officer.level + 1),
    department: officer.department,
    district: officer.district,
  });
  // console.log(newOfficerId)

  if (!newOfficerId) {
    throw new NotFoundError(
      `no higher ${officer.department} officer in the district`
    );
  }

  const complaint = await Complaint.findByIdAndUpdate(
    complaintId,
    { officerID: newOfficerId.id },
    { new: true, runValidators: true }
  );



  // console.log(officer.name, officer.level)
  // console.log(newOfficerId.name, newOfficerId.level)
  // if (complaint.officerID != officerId) {
  //   throw new UnauthenticatedError("not authorized to pass this task");
  // }

  await complaint.addFeedback(
    officer.name, officer.level, `Forwarded the complaint to the level ${newOfficerId.level} officer`
  );
  await complaint.addFeedback(
    newOfficerId.name, newOfficerId.level, `Complaint received by level ${newOfficerId.level} officer`
  );


  const body = `Complaint transferred to the level ${newOfficerId.level} officer`

  const user = await User.findOne({ _id: complaint.createdBy })
  await sendEmail(user.email, complaint.subject, body)
  // const userPhone = "+91" + user.phone.toString();
  // const userPhone = "+91" + user.phone.toString();
  // console.log(userPhone)
  // await sendSMS(userPhone, body)
  // await sendSMS(userPhone, body)
  // console.log(complaint)

  res.status(StatusCodes.OK).json({ complaint });
};

const updateTask = async (req, res) => {
  const {
    body: { feedback },
    officer: { officerId },
    params: { id: complaintId },
  } = req;

  if (req.body.feedback === "" && req.body.status === "" || !req.body.feedback && !req.body.status) {
    throw new BadRequestError("Please provide valid task changes");
  }

  const officer = await Officer.findOne({ _id: officerId });

  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new NotFoundError("complaint not found");
  }
  if (complaint.status === "resolved") {
    throw new BadRequestError("Complaint already resolved. No more updations allowed.")
  }

  if (complaint.officerID != officerId) {
    throw new UnauthenticatedError("not authorized to update this task");
  }

  if (req.body.status === complaint.status && !req.body.feedback) {
    throw new BadRequestError("Duplicate changes not allowed. Add valid feedback or change status.")
  }

  // console.log(req.body.status)
  // console.log(req.body.feedback)

  if (req.body.status) {
    await complaint.updateStatus(req.body.status);

  }

  if (req.body.feedback) {
    await complaint.addFeedback(officer.name, officer.level, req.body.feedback);

  } else {
    await complaint.addFeedback(officer.name, officer.level, `Status updated.`);

  }

  const bod = `Status updated about your grievance "${complaint.subject}"`
  const user = await User.findOne({ _id: complaint.createdBy })
  await sendEmail(user.email, complaint.subject, bod)
  const userPhone = "+91" + user.phone.toString();
  // console.log(userPhone)
  // await sendSMS(userPhone, bod)


  // console.log(complaint)

  res.status(StatusCodes.OK).json({ complaint });
};

const sendEmail = async (to, subject, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'grievanceportaliiita4@gmail.com',
        pass: 'bryoccqsbhkhnhah',
      },
    });

    let info = await transporter.sendMail({
      from: ' "Grievance Portal" <grievanceportaliiita@gmail.com>',
      to: to,
      subject: `New Update about your grievance "${subject}"`,
      text: `Update: ${body}`
    });

    console.log('Message sent: %s', info.messageId);
  } catch (err) {
    console.error(err);
  }
};

// const sendSMS = async (to, body) => {
//   try {
//     const message = await client.messages.create({
//       body: body,
//       from: '+15075162002',
//       to: to
//     });

//     console.log('Message sent: %s', message.sid);
//   } catch (err) {
//     console.error(err);
//   }
// };


module.exports = { getAllTasks, getTask, passTask, updateTask };

