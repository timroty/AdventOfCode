fs = require("fs/promises");

const INPUT_FILENAME = "input.txt";

async function readFile(file_name = INPUT_FILENAME) {
  return await fs.readFile(file_name, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
  });
}

exports.readFile = readFile;
