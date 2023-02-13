var bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  hash: (password) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
  },
  compare: (password, hash) => {
    const verify = bcrypt.compareSync(password, hash);
    return verify;
  },
};
