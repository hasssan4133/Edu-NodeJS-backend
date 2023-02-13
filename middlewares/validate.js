const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: error.details[0].message });
  }
  return next();
};

module.exports = validate;
