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

function processWinningNumbers_2(data) {
  const lines = data.split("\n");

  const memo_table = {};
  const queue = [...Array(lines.length).keys()];

  let queue_shift = queue.shift();

  while (!isNaN(queue_shift)) {
    const winner_count = getWinnerCount(queue_shift);

    for (let j = 1; j <= winner_count; j++) {
      queue.push(Number(queue_shift + j));
    }

    queue_shift = queue.shift();
  }

  // Ideally I don't loop over again ... but I've
  // spent too long on the problem today
  let sum = 0;
  for (const [card] of Object.entries(memo_table)) {
    sum += memo_table[card].times;
  }

  return sum;

  // Helper Function
  function getWinnerCount(input_number) {
    if (memo_table[input_number]) {
      memo_table[input_number].times = memo_table[input_number].times + 1;
      return memo_table[input_number].winners;
    }

    const all_numbers = lines[input_number].split(":")[1].trim();
    const split_numbers = all_numbers.split("|");
    const winning_numbers = new Set(
      split_numbers[0].trim().replace(/\s+/g, " ").split(" ")
    );
    const card_numbers = split_numbers[1]
      .trim()
      .replace(/\s+/g, " ")
      .split(" ");

    let number_of_winners = 0;
    for (let j = 0; j < card_numbers.length; j++) {
      if (winning_numbers.has(card_numbers[j])) {
        number_of_winners++;
      }
    }

    memo_table[input_number] = { winners: number_of_winners };
    memo_table[input_number].times = 1;
    return number_of_winners;
  }
}

exports.processWinningNumbers_1 = processWinningNumbers_1;
exports.processWinningNumbers_2 = processWinningNumbers_2;
