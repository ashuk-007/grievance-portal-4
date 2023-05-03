const mongoose = require("mongoose");
const Officer = require("./Officer");
const User = require("./User");
const { number } = require("joi");

const OfficerRatingsSchema = new mongoose.Schema(
    {
        OfficerId: {
            type: mongoose.Types.ObjectId,
            ref: 'Officer',
        },
        avgRating: {
            type: Number,
            default: null,
            required: false,
        },
        ratings: [
            {
                numberofstars: {
                    type: Number,
                    required: true,
                },
                complaintId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Complaint',
                },
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
            }

        ],

        //
    },
    { timestamps: true }
);

// ComplaintSchema.methods.sendMail = async function (officer) {

// }

OfficerRatingsSchema.methods.addRating = async function (numberofstars, complaintId, userId) {

    numberofstars = Number(numberofstars);
    console.log({ numberofstars, complaintId, userId });
    this.ratings.push({ numberofstars, complaintId, userId });
    let oldavg;


    if (!this.avgRating) oldavg = 0;
    else oldavg = this.avgRating;

    let n = this.ratings.length;
    let newavg = (oldavg * (n - 1) + numberofstars) / n;
    this.avgRating = newavg;
    console.log(typeof n, typeof numberofstars, typeof oldavg, typeof newavg);

    await this.save();
};


module.exports = mongoose.model("OfficerRatings", OfficerRatingsSchema);
