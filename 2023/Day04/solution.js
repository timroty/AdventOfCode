const utils = require("../utils");

(async () => {
  const file_data = await utils.readFile();

  console.log(`Part 1 Solution: ${processWinningNumbers_1(file_data)}`);
  console.log(`Part 2 Solution: ${processWinningNumbers_2(file_data)}`);
})();

function processWinningNumbers_1(data) {
  const lines = data.split("\n");

  let total_points = 0;

  for (let i = 0; i < lines.length; i++) {
    const all_numbers = lines[i].split(":")[1].trim();
    const split_numbers = all_numbers.split("|");
    const winning_numbers = new Set(
      split_numbers[0].trim().replace(/\s+/g, " ").split(" ")
    );
    const card_numbers = split_numbers[1]
      .trim()
      .replace(/\s+/g, " ")
      .split(" ");

    let points = 0;
    for (let j = 0; j < card_numbers.length; j++) {
      if (winning_numbers.has(card_numbers[j])) {
        points++;
      }
    }

    total_points += points == 0 ? 0 : Math.pow(2, Math.max(points - 1, 0));
  }

  return total_points;
}

// Could combine one and two very easily, but oh well
function processWinningNumbers_2(data) {
  const lines = data.split("\n");

  const count_array = new Array(lines.length).fill(1);

  for (let i = 0; i < lines.length; i++) {
    const all_numbers = lines[i].split(":")[1].trim();
    const split_numbers = all_numbers.split("|");
    const winning_numbers = new Set(
      split_numbers[0].trim().replace(/\s+/g, " ").split(" ")
    );
    const card_numbers = split_numbers[1]
      .trim()
      .replace(/\s+/g, " ")
      .split(" ");

    let winning_card_count = 0;
    for (let j = 0; j < card_numbers.length; j++) {
      if (winning_numbers.has(card_numbers[j])) {
        winning_card_count++;
      }
    }

    for (let j = 1; j <= winning_card_count; j++) {
      count_array[i + j] += count_array[i];
    }
  }

  return count_array.reduce((a, b) => a + b, 0);
}

exports.processWinningNumbers_1 = processWinningNumbers_1;
exports.processWinningNumbers_2 = processWinningNumbers_2;
