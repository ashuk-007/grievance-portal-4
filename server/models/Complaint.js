const mongoose = require("mongoose");
const Officer = require("./Officer");

const ComplaintSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Please provide subject"],
      maxLength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxLength: 500,
    },
    department: {
      type: String,
      required: [true, "Please provide department"],
      enum: ["Health", "Education", "Transport", "Pension", "other"],
    },
    status: {
      type: String,
      enum: ["in process", "resolved", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
    },
    officerID: {
      type: mongoose.Types.ObjectId,
      ref: "Officer",
    },
    actionHistory: [
      {
        time: {
          type: Date,
          default: Date.now(),
        },
        // officerID: {
        //   type: mongoose.Types.ObjectId,
        //   ref: "Officer",
        //   required: [true, "Please provide officer id for action history"],
        // },
        officerName: {
          type: String,
          required: [true, "Please provide officer name for action history"],
        },
        officerLevel: {
          type: Number,
          required: [true, "Please provide officer level for action history"],
        },
        feedback: {
          type: String,
          required: [true, "Please provide feedback for action history"],
        },
      },
    ],
    lastRemindedAt: {
      type: Date,
      default: 2022 - 01 - 01,
    }
    //
  },
  { timestamps: true }
);

// ComplaintSchema.methods.sendMail = async function (officer) {

// }

ComplaintSchema.methods.assignOfficer = async function (officer) {
  this.officerID = officer;
  await this.save();
};
ComplaintSchema.methods.addFeedback = async function (officerName, officerLevel, feedback) {
  this.actionHistory.push({ officerName, officerLevel, feedback });
  await this.save();
};

ComplaintSchema.methods.updateStatus = async function (status) {
  this.status = status;
  await this.save();
};

module.exports = mongoose.model("Complaint", ComplaintSchema);
