const mongoose = require("mongoose");
const dburl = process.env.DBurl;

module.exports = () => {
  return mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
