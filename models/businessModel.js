var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var businessSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Product", "Services"],
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
businessSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      accountType: "Business",
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = mongoose.model("business", businessSchema);
