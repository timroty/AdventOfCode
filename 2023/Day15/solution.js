const utils = require("../utils");

(async () => {
  const file_data = await utils.readFile();

  console.log(`Part 1 Solution: ${computeHashSum_1(file_data)}`);
})();

function computeHashSum_1(data) {
  const split_strings = data.split(',');
  let total_value = 0;

  for (let i = 0; i < split_strings.length; i ++){
    const characters = split_strings[i];

    let current_value = 0;

    for (let j = 0; j < characters.length; j ++){
      current_value += characters.charCodeAt(j);
      current_value *= 17;
      current_value = current_value % 256;
    }

    total_value += current_value;
  }

  return total_value;
}

exports.computeHashSum_1 = computeHashSum_1;