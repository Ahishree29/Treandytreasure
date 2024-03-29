const asyncHandler = require("express-async-handler");
const State = require("../models/stateModel");

const updateState = asyncHandler(async (req, res) => {
  const { items } = req.body;

  try {
    await State.findOneAndUpdate(
      {},
      { $set: { state: items } },
      { upsert: true }
    );
    res.status(200).json({ message: "State saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getState = asyncHandler(async (req, res) => {
  try {
    const storedState = await State.findOne();
    res.status(200).json({ state: storedState ? storedState.state : null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getStateOnId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; 
    const storedState = await State.findOne({}); 
    if (!storedState) {
      return res.status(400).json({ error: "No state found" });
    }

   
    const item = storedState.state.find(
      (product) => product._id.toString() === id
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }


    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { updateState, getState, getStateOnId };
