const reader = require("xlsx");

const processData = (filePath = null) => {
  if (filePath != null) {
    const file = reader.readFile(filePath);
    let tracks = [];
    let data = [];
    const temp = reader.utils.sheet_to_json(file.Sheets.Sheet1);
    temp.forEach((row) => data.push(row));
    // Remove guidance row
    data.splice(0, 1);

    //   Split aliases and update tracks array
    data.forEach((row) => {
      let aliasesArray = row.Aliases.replace(" ", "").split(";");
      row.Aliases = aliasesArray;
      tracks.push(row);
    });

    return tracks;
  } else {
    throw new Error("Provide a filePath value to the processData function");
  }
};

module.exports = { processData };
