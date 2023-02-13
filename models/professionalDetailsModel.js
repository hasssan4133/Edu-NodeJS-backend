var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var professionalDetailsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLinkedIn: {
    type: String,
  },
  employmentType: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
  },
  fromYear: {
    type: String,
    required: true,
  },
  toYear: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  currentlyWorking: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model(
  "professionaldetail",
  professionalDetailsSchema
);
