const Joi = require("joi");

const register = Joi.object().keys({
  type: Joi.string().valid(
    "teacher",
    "parent",
    "education leader",
    "institution"
  ),
  firstName: Joi.string().min(2).required(),
  middleName: Joi.string().min(1).required(),
  lastName: Joi.string().min(2).required(),
  dob: Joi.string(),
  displayName: Joi.string().required(),
  professionalTitle: Joi.string().required(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  zipCode: Joi.string(),
  phoneNo: Joi.string().required(),
  email: Joi.string().required(),
  recoveryEmail: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const institutionRegister = Joi.object().keys({
  institutionName: Joi.string().min(2).required(),
  establishedDate: Joi.date().required(),
  branch: Joi.string().allow(null, ""),
  address: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),
  linkedIn: Joi.string().allow(null, ""),
  noOfEmployees: Joi.number().required(),
  noOfStudents: Joi.number().required(),
  academicYearStart: Joi.string()
    .valid(
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
      "December"
    )
    .required(),
  academicYearEnd: Joi.string()
    .valid(
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
      "December"
    )
    .required(),
  phoneNo: Joi.string().required(),
  email: Joi.string().required(),
  currentlyHiring: Joi.boolean().required(),
  password: Joi.string().min(6).required(),
});

const businessRegister = Joi.object().keys({
  businessName: Joi.string().required(),
  type: Joi.string().valid("Product", "Services").required(),
  industry: Joi.string().required(),
  zipCode: Joi.string().required(),
  address: Joi.string().required(),
  website: Joi.string(),
  linkedIn: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object().keys({
  accountType: Joi.string()
    .valid("Instructor", "Institution", "Business")
    .required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  register,
  institutionRegister,
  businessRegister,
  login,
};
