const { Contract } = require("../models/ContractModel");
const { connectDB } = require("../config/db");
const mongoose = require("mongoose");

const createContract = async (contractName = null) => {
  if (contractName != null) {
    //Connect to mongoDB
    await connectDB();
    try {
      const contract = new Contract({ Name: contractName });
      const createdContract = await contract.save();
      mongoose.disconnect();
      return createdContract._id;
    } catch (err) {
      throw new Error(err);
    }
  } else {
    throw new Error("Provide a contract name to the createContract function");
  }
};

module.exports = { createContract };
