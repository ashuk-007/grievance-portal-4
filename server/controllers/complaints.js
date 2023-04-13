const Complaint = require("../models/Complaint");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");
const Officer = require("../models/Officer");
const {
  roleAuthenticationMiddleware,
} = require("../middleware/roleAuthentication");
var nodemailer = require("nodemailer");
const accountSid = 'AC4109f98ba850a5476ba4581780d566ab';
const authToken = '125e8970acfa7234ca91f7e4b1032207';
const client = require('twilio')(accountSid, authToken);

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

  const officer = await Officer.findOne({ _id: complaint.officerID });

  if (officer) {
    officer.complaints = officer.complaints.filter((complaintId) => {
      return complaintId.toString() !== this._id.toString();
    });
    await officer.save();
  } else {
    console.log("no officer has the complaint");
  }

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

  await sendEmail(officer.email, complaint.subject, bod);

  res.status(StatusCodes.OK).json({ complaint });
};

const sendEmail = async (to, subject, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "grievanceportal25@gmail.com",
        pass: "xtovkwiqixktkimo",
      },
    });

    let info = await transporter.sendMail({
      from: ' "Grievance Portal" <grievanceportal25@gmail.com>',
      to: to,
      subject: `Reminder about unresolved grievance "${subject}"`,
      text: `Message from grievance portal: ${body}`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
};

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: '+15075162002',
      to: to
    });

    console.log('Message sent: %s', message.sid);
  } catch (err) {
    console.error(err);
  }
};


module.exports = {
  getAllComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  sendReminder,
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
