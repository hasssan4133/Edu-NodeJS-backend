var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  type: {
    type: String,
    enum: ["teacher", "parent", "education leader", "institution"],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    required: false,
  },
  dob: {
    type: Date,
  },
  displayName: {
    type: String,
    required: true,
  },
  professionalTitle: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  recoveryEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  forgotPasswordCode: {
    type: Number,
  },
  changePasswordCode: {
    type: Number,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      accountType: "Instructor",
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = mongoose.model("user", userSchema);
