const express = require("express");
const {
  updateState,
  getState,
  getStateOnId,
} = require("../controllers/stateController");
const router = express.Router();
router.route("/").post(updateState);
router.route("/").get(getState);
router.route("/:id").post(getStateOnId);
module.exports = router;
