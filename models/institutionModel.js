var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var institutionSchema = new Schema({
  institutionName: {
    type: String,
    required: true,
  },
  establishedDate: {
    type: Date,
    required: true,
  },
  branch: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinLocation: {
    type: {
      lat: Number,
      lng: Number,
    },
    default: null,
  },
  linkedIn: {
    type: String,
  },
  noOfEmployees: {
    type: Number,
    required: true,
  },
  noOfStudents: {
    type: Number,
    required: true,
  },
  academicYearStart: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
  academicYearEnd: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currentlyHiring: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
institutionSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      accountType: "Institution",
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = mongoose.model("institution", institutionSchema);
