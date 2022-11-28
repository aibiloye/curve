const { Contract } = require("../models/ContractModel");
const { Track } = require("../models/TrackModel");
const { connectDB } = require("../config/db");
const mongoose = require("mongoose");

const errors = [];
const saveTracks = async (tracks) => {
  //Connect to mongoDB
  await connectDB();

  const existingContracts = await Contract.find();

  const contractNames = existingContracts.map((contract) => contract.Name);

  tracks.forEach(async (track, index) => {
    //Check if contract name exists and contract in existingContracts save contract ID to track
    if (contractNames.includes(track.Contract)) {
      let contract = existingContracts.find(
        (contract) => track.Contract === contract.Name
      );

      try {
        let newTrack = new Track({
          Title: track.Title,
          Version: track.Version,
          Artist: track.Artist,
          ISRC: track.ISRC,
          P_Line: track.P_Line,
          Aliases: track.Aliases,
          Contract_Id: contract._id,
        });

        await newTrack.save();
      } catch (err) {
        let errorMessage = `Error on line: ${
          index + 1
        }: Unable to save Track (${track.Title}). Database message: ${err}`;
        errors.push(errorMessage);
      }
    }

    //If contract name is provided and does not exist, return error message "Contract can't be found"
    if (track.Contract && !existingContracts.includes(track.Contract)) {
      let errorMessage = `Error on line: ${
        index + 1
      }: Contract can not be found. Contract name provided (${
        track.Contract
      }) does not exist in database.`;
      errors.push(errorMessage);
    }

    //If  no contract name provided and not in existing contracts, save track without association
    if (!track.Contract && !existingContracts.includes(track.Contract)) {
      try {
        let newTrack = new Track({
          Title: track.Title,
          Version: track.Version,
          Artist: track.Artist,
          ISRC: track.ISRC,
          P_Line: track.P_Line,
          Aliases: track.Aliases,
        });
        await newTrack.save();
      } catch (err) {
        let errorMessage = `Error on line: ${
          index + 1
        }: Unable to save Track (${track.Title}). Database message: ${err}`;
        errors.push(errorMessage);
      }
    }
  });
  mongoose.disconnect();
  console.log(errors);

  return {
    errors,
  };
};

module.exports = { saveTracks };
