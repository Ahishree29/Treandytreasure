const mongoose = require("mongoose");
const dburl = "mongodb://localhost:27017/trendytreasure";

module.exports = () => {
  return mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
