const Joi = require("joi");

const updateInstitution = Joi.object().keys({
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

const projectDetails = Joi.object().keys({
  title: Joi.string().required(),
  subject: Joi.string().required(),
  ageGroup: Joi.object().required(),
  learningObjectives: Joi.string().required(),
  duration: Joi.number().required(),
  description: Joi.string().required(),
  collaborative: Joi.boolean().required(),
});

module.exports = {
  updateInstitution,
  projectDetails,
};
