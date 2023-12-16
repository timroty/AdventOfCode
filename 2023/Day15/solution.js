const utils = require("../utils");

(async () => {
  const file_data = await utils.readFile();

  console.log(`Part 1 Solution: ${computeHashSum_1(file_data)}`);
  console.log(`Part 2 Solution: ${computeHashSum_2(file_data)}`);
})();

function computeHashSum_1(data) {
  const split_strings = data.split(',');
  let total_value = 0;

  for (let i = 0; i < split_strings.length; i++) {
    const characters = split_strings[i];
    let current_value = 0;

    for (let j = 0; j < characters.length; j++) {
      current_value = calculateHash(current_value, characters.charCodeAt(j));
    }

    total_value += current_value;
  }

  return total_value;
}

function computeHashSum_2(data) {
  const split_strings = data.split(',');
  let boxes = new Array(256);
  for (let i = 0; i < boxes.length; i++) {
    boxes[i] = [];
  }

  // Create boxes
  for (let i = 0; i < split_strings.length; i++) {
    const characters = split_strings[i];
    let current_value = 0;

    if (characters.endsWith('-')) {
      const letters = characters.substring(0, characters.length-1);
      for (let j = 0; j < letters.length; j++) {  
        current_value = calculateHash(current_value, letters.charCodeAt(j));
      }

      boxes[current_value] = boxes[current_value].filter(item => Object.keys(item)[0] !== letters);
    } else {
      const equal_split = characters.split('=');
      const letters = equal_split[0];
      for (let j = 0; j < letters.length; j++) {
        current_value = calculateHash(current_value, letters.charCodeAt(j));
      }

      let box = boxes[current_value].filter(item => Object.keys(item)[0] === letters);
      if (!box.length){
        const obj = {};
        obj[letters] = equal_split[1];
        boxes[current_value].push(obj);
      } else {
        box[0][letters] = equal_split[1];
      }
    }

  }
  
  // Calculate sum total
  let total_sum = 0;
  for (let i = 0; i < boxes.length; i ++){
    let box_val = i + 1;

    for (let j = 0; j < boxes[i].length; j ++){
      let slot_val = j + 1;
      let focal_length = Object.values(boxes[i][j])[0];

      total_sum += (box_val * slot_val * focal_length);
    }
  }
  return total_sum;
}

function calculateHash(current_value, char_code){
  current_value += char_code;
  current_value *= 17;
  current_value = current_value % 256;

  return current_value;
} 

exports.computeHashSum_1 = computeHashSum_1;
exports.computeHashSum_2 = computeHashSum_2;