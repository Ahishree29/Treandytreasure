const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");

const addAddress = asyncHandler(async (req, res) => {
  const {
    name,
    mobileNum,
    pinCode,
    address,
    town,
    city,
    state,
    environment,
    isSelected,
  } = req.body;

  try {
    if (
      !name &&
      !mobileNum &&
      !pinCode &&
      !address &&
      !town &&
      !city &&
      !state &&
      !environment &&
      !isSelected
    ) {
      res.status(400).json("fields are missing");
      return;
    }
    const newaddress = {
      userId: req.user._id,
      name: name,
      mobileNum: mobileNum,
      pinCode: pinCode,
      address: address,
      town: town,
      city: city,
      state: state,
      environment: environment,
    };
    const createAddress = await Address.create(newaddress);
    res.status(200).json(createAddress);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
const getAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await Address.find({ userId });

    res.status(200).json(result);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
const updateaddress = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const {
    name,
    mobileNum,
    pinCode,
    address,
    town,
    city,
    state,
    environment,
    isSelected,
  } = req.body;

  try {
    const updatedAddress = {
     
      name: name,
      mobileNum: mobileNum,
      pinCode: pinCode,
      address: address,
      town: town,
      city: city,
      state: state,
      environment: environment,
      isSelected: isSelected, 
    };
    const updated = await Address.findOneAndUpdate(
      { _id: id },
      updatedAddress,
      { new: true }
    ); 

    res.status(200).json(updated); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Something went wrong" });
  }
});

const selectaddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user._id;
  try {
    await Address.updateMany({ userId }, { $set: { isSelected: false } }); 
    const updateAddress = await Address.findOneAndUpdate(
      { _id: addressId },
      { $set: { isSelected: true } },
      { new: true }
    );
    res.status(200).json(updateAddress);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Something went wrong" });
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  try {
    const address = await Address.findOneAndDelete({ _id: addressId });
    res.status(200).json(address);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
const getSelectedAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await Address.find({ userId, isSelected: true });

    res.status(200).json(result);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = {
  addAddress,
  getAddress,
  updateaddress,
  selectaddress,
  deleteAddress,
  getSelectedAddress,
};
