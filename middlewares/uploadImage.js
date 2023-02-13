const multer = require("multer");

const storage = multer.diskStorage({
  // limits: {
  //     fileSize: 10000
  // },
  destination: (req, file, cb) => {
    cb(null, "profileImages");
  },
  filename: (req, file, cb) => {
    // if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //     return cb( new Error('Please upload a valid image file'))
    //     }
    cb(null, file.originalname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
