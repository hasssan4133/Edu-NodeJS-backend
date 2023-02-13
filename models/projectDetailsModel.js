var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectDetailsSchema = new Schema({
  institution_id: {
    type: Schema.Types.ObjectId,
    ref: "institution",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: {
      from: Number,
      to: Number,
    },
    required: true,
  },
  learningObjectives: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  collaborative: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("project", projectDetailsSchema);
