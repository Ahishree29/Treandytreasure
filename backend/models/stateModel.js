const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  state: [Object],
});
const State = mongoose.model("State", stateSchema);
module.exports = State;
