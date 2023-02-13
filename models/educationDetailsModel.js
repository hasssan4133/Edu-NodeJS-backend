var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var educationalDetailsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  institutionName: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  fromYear: {
    type: String,
    required: true,
  },
  toYear: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  websiteLink: {
    type: String,
    default: null,
  },
  specializedSubjects: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("educationaldetail", educationalDetailsSchema);
