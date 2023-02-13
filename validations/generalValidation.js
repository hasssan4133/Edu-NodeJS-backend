const Joi = require("joi");

const createMeeting = Joi.object().keys({
  meetingWith: Joi.string().required(),
  agenda: Joi.string().required(),
  description: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  startTime: Joi.date().required(),
});

module.exports = {
  createMeeting,
};
