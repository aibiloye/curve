const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { createContract } = require("./utils/createContract");
const { processData } = require("./utils/processData");
const { saveTracks } = require("./utils/saveTracks");
dotenv.config();

arguments = process.argv;
const fileFlag = "-file";
let path;

if (arguments.includes(fileFlag)) {
  let pathIndex = arguments.findIndex((arg) => fileFlag === arg) + 1;

  if (arguments[pathIndex]) {
    path = arguments[pathIndex];
  } else {
    console.log(
      "Error: No file path supplied. If you use the file flag (-file), you must supply a file path"
    );
    process.exit();
  }
} else {
  //Set default path
  path = "./data/Track Import Test.xlsx";
  console.log(`Default path file path used: ${path}`);
}

// Create Contract 1
createContract("Contract 1");

// Process spreadsheet
const tracksData = processData(path);

// Save tracks to MongoDB
saveTracks(tracksData);
