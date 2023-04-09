const Complaint = require("../models/Complaint");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/User");
const Officer = require("../models/Officer");

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



  // if (complaint.officerID != officerId) {
  //   throw new UnauthenticatedError("not authorized to pass this task");
  // }

  await complaint.addFeedback(
    officer.name, officer.level, `Forwarded the complaint to the level ${newOfficerId.level} officer`
  );
  await complaint.addFeedback(
    newOfficerId.name, newOfficerId.level, `Complaint received by level ${newOfficerId.level} officer`
  );

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


  // console.log(complaint)

  res.status(StatusCodes.OK).json({ complaint });
};

module.exports = { getAllTasks, getTask, passTask, updateTask };

