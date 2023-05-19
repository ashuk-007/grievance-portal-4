const Complaint = require("../models/Complaint");
const OfficerRatings = require("../models/OfficerRatings")
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const Officer = require("../models/Officer");
const {
  roleAuthenticationMiddleware,
} = require("../middleware/roleAuthentication");
var nodemailer = require("nodemailer");
// const accountSid = 'AC4109f98ba850a5476ba4581780d566ab';
// const authToken = '125e8970acfa7234ca91f7e4b1032207';
// const client = require('twilio')(accountSid, authToken);

const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ count: complaints.length, complaints });
};

const getComplaint = async (req, res) => {
  const {
    user: { userId },
    params: { id: complaintId },
  } = req;

  const complaint = await Complaint.findOne({
    _id: complaintId,
    createdBy: userId,
  });
  if (!complaint) {
    throw new NotFoundError("Complaint not found");
  }
  res.status(StatusCodes.OK).json({ complaint });
};

const reopenTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: complaintId },
  } = req;

  const complaint = await Complaint.findById(complaintId);
  const officer = await Officer.findById(complaint.officerID);

  // console.log(complaint)
  // console.log(userId)

  if (!complaint) {
    throw new NotFoundError("complaint not found");
  }
  if (complaint.status !== "resolved") {
    throw new BadRequestError("Complaint is already opened")
  }
  if (complaint.reopensCount >= 3) {
    throw new BadRequestError("Cannot reopen complaint more than 3 times")
  }

  if (complaint.createdBy != userId) {
    throw new UnauthenticatedError("not authorized to update this task");
  }

  if (req.body.status === complaint.status && !req.body.feedback) {
    throw new BadRequestError("Duplicate changes not allowed. Add valid feedback or change status.")
  }

  await complaint.updateStatus("pending");
  await complaint.addFeedback(
    officer.name,
    officer.level,
    "Complaint reopened by citizen."
  );

  await complaint.incrementReopens();

  const bod = `The complaint "${complaint.subject}" has been reopened by the citizen. Please resolve it as soon as possible!`;

  await sendEmail(officer.email, complaint.subject, bod, "Reopened Grievance");

  res.status(StatusCodes.OK).json({ complaint });
};

const createComplaint = async (req, res) => {
  req.body.createdBy = req.user.userId;


  const user = await User.findOne({ _id: req.user.userId });

  const officer = await Officer.findOne({
    district: user.district,
    level: 1,
    department: req.body.department,
  });

  if (!officer) {
    throw new NotFoundError("No officer in this district");
  }

  const complaint = await Complaint.create(req.body);
  await complaint.assignOfficer(officer._id);
  await complaint.assignEmail(user.email);
  await complaint.addFeedback(
    officer.name,
    officer.level,
    "Complaint received"
  );
  // await officer.addComplaint(complaint._id)

  // console.log(officer)
  res.status(StatusCodes.CREATED).json({ complaint });
};

const deleteComplaint = async (req, res) => {
  const {
    user: { userId },
    params: { id: complaintId },
  } = req;

  const complaint = await Complaint.findByIdAndRemove({
    _id: complaintId,
    createdBy: userId,
  });

  if (!complaint) {
    throw new NotFoundError("Complaint not found");
  }
  if (complaint.status === 'resolved') {
    throw new BadRequestError("Cannot delete a resolved complaint")
  }

  await Complaint.deleteOne({ _id: complaintId });
  res.status(StatusCodes.OK).json({ complaint });
};

const sendReminder = async (req, res) => {
  const {
    user: { userId },
    params: { id: complaintId },
  } = req;
  const complaint = await Complaint.findByIdAndUpdate(
    complaintId,
    { lastRemindedAt: Date.now() },
    { new: true, runValidators: true }
  );
  if (complaint.status === "resolved") {
    throw new BadRequestError("Complaint is already resolved");
  }

  const officer = await Officer.findOne({ _id: complaint.officerID });

  if (!officer) {
    throw new NotFoundError("No officer assigned to this complaint");
  }

  await complaint.addFeedback(
    officer.name,
    officer.level,
    "Reminder mail received by assigned officer."
  );

  const bod = `Gentle reminder regarding the complaint "${complaint.subject}". Please resolve it as soon as possible!`;

  await sendEmail(officer.email, complaint.subject, bod, "Reminder about Grievance");

  res.status(StatusCodes.OK).json({ complaint });
};

const rateOfficer = async (req, res) => {
  const {
    user: { userId },
    params: { id: complaintId },
  } = req;
  // console.log(req);
  const numberofstars = req.body.rating;
  const complaint = await Complaint.findOne({ _id: complaintId });

  if (complaint.status !== "resolved") {
    throw new BadRequestError("Can't give feedback unless complaint is resolved.");
  }
  if (complaint.isRated) {
    throw new BadRequestError("Complaint already rated.")
  }

  const officer = await Officer.findOne({ _id: complaint.officerID });


  const officerRating = await OfficerRatings.findOne({ OfficerId: complaint.officerID });

  // console.log(officerRating);
  await officerRating.addRating(numberofstars, complaintId, userId);
  await complaint.setRated(numberofstars);

  const bod = `You have been rated! \nComplaint subject : ${complaint.subject} \nRating : ${numberofstars}`;

  await sendEmail(officer.email, complaint.subject, bod, "You have been rated!");

  res.status(StatusCodes.OK).json({ officer });
};

const sendEmail = async (to, subject, body, head) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'grievanceportaliiita4@gmail.com',
        pass: 'bryoccqsbhkhnhah',
      },
    });

    let info = await transporter.sendMail({
      from: ' "Grievance Portal" <grievanceportal25@gmail.com>',
      to: to,
      subject: head,
      text: `Message from grievance portal: ${body}`,
    });

    console.log("Message sent: %s", info.messageId);
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


module.exports = {
  getAllComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  sendReminder,
  reopenTask,
  rateOfficer,
};

// const updateUserComplaint = async (req, res) => {
//     const {
//         body: { description },
//         user: { userId },
//         params: { id: complaintId },
//     } = req

//     if (description === '') {
//         throw new BadRequestError('Please fill in description')
//     }
//     const complaint = await Complaint.findByIdAndUpdate({ _id: complaintId, createdBy: userId }, req.body, { new: true, runValidators: true })
//     if (!complaint) {
//         throw new NotFoundError('complaint not found')
//     }
//     res.status(StatusCodes.OK).json({ complaint })
// }
