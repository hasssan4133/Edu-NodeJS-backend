const Joi = require("joi");

const updateUser = Joi.object().keys({
  type: Joi.string()
    .valid("teacher", "parent", "education leader", "institution")
    .optional(),
  firstName: Joi.string().min(2).optional(),
  middleName: Joi.string().min(1).optional(),
  lastName: Joi.string().min(2).optional(),
  dob: Joi.string().optional(),
  displayName: Joi.string().optional(),
  professionalTitle: Joi.string().optional(),
  country: Joi.string().optional(),
  address: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  phoneNo: Joi.string().optional(),
});

const educationalDetails = Joi.object().keys({
  institutionName: Joi.string().required(),
  courseTitle: Joi.string().required(),
  fromYear: Joi.string().required(),
  toYear: Joi.string().required(),
  project: Joi.string().required(),
  websiteLink: Joi.string().allow(null, ""),
  specializedSubjects: Joi.array().required(),
});

const professionalExperience = Joi.object().keys({
  companyName: Joi.string().required(),
  companyLinkedIn: Joi.string().allow(null, ""),
  employmentType: Joi.string().required(),
  jobTitle: Joi.string().required(),
  fromYear: Joi.string().required(),
  toYear: Joi.string().required(),
  responsibilities: Joi.string().required(),
  currentlyWorking: Joi.boolean().required(),
});

module.exports = {
  updateUser,
  educationalDetails,
  professionalExperience,
};
