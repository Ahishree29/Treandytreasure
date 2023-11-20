const mongoose = require("mongoose");
const loginschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("login_collection", loginschema);
