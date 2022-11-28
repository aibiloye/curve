const testCase = require("mocha").describe;
var assertions = require("mocha").it;
const chai = require("chai");
const expect = chai.expect;

const { processData } = require("../utils/processData");
const { createContract } = require("../utils/createContract");
const { saveTracks } = require("../utils/saveTracks");
const { tracksData } = require("./tracksData");

testCase("ProcessData()", () => {
  assertions("Should process 3 rows of data when a path is provided", () => {
    const data = processData("test/tracksDataTest.xlsx");
    expect(data.length).to.equal(3);
  });

  assertions("Should throw an error if no path is provided", () => {
    // const data = ;
    expect(() => {
      processData();
    }).to.throw("Provide a filePath value to the processData function");
  });
});

testCase("createContract()", () => {
  assertions(
    "Should create a new contract when a contract name is provided",
    (done) => {
      const contract_id = createContract("Test contract");
      expect(contract_id).not.equal(undefined);
      done();
    }
  );
});

testCase("saveTracks()", () => {
  assertions("Should return an array of errors", async () => {
    const tracks = await saveTracks(tracksData);
    expect(tracks.errors.length).to.equal(2);
    expect(tracks.errors[0]).equal(
      "Error on line: 2: Contract can not be found. Contract name provided (Contract 2) does not exist in database."
    );
  });
});
