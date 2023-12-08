const utils = require("../utils");

const STARTING_KEY = "AAA";
const ENDING_KEY = "ZZZ";
const STARTING_END_LETTER = "A";
const ENDING_END_LETTER = "Z";

(async () => {
  const file_data = await utils.readFile();

  processsGraph_1(file_data);
  processsGraph_2(file_data);
})();

function processsGraph_1(data) {
  let split_rows = data.split("\n");

  let instructions = split_rows[0];

  const network_graph = {};

  for (let i = 2; i < split_rows.length; i++) {
    let line = split_rows[i];
    line = line.replace(/\s/g, "");

    const key = line.split("=")[0];
    const values = line.split("=")[1].replace(/[()]/g, "");

    const left = values.split(",")[0];
    const right = values.split(",")[1];
    network_graph[key] = {
      L: left,
      R: right,
    };
  }

  let index = 0;
  let steps = 0;
  let key = STARTING_KEY;

  while (true) {
    if (key === ENDING_KEY) break;

    key = network_graph[key][instructions[index]];

    steps++;
    index++;

    if (index > instructions.length - 1) index = 0;
  }

  console.log(`Part 1 Solution: ${steps}`);
}

function processsGraph_2(data) {
  let split_rows = data.split("\n");

  let instructions = split_rows[0];

  const start_nodes = [];
  const network_graph = {};

  for (let i = 2; i < split_rows.length; i++) {
    let line = split_rows[i];
    line = line.replace(/\s/g, "");

    const key = line.split("=")[0];
    if (key.endsWith(STARTING_END_LETTER)) start_nodes.push(key);

    const values = line.split("=")[1].replace(/[()]/g, "");

    const left = values.split(",")[0];
    const right = values.split(",")[1];
    network_graph[key] = {
      L: left,
      R: right,
    };
  }

  const step_nodes = [];

  for (let i = 0; i < start_nodes.length; i++) {
    let current_key = start_nodes[i];
    let index = 0;
    let steps = 0;

    while (!current_key.endsWith(ENDING_END_LETTER)) {
      current_key = network_graph[current_key][instructions[index]];

      steps++;
      index++;

      if (index > instructions.length - 1) index = 0;
    }

    step_nodes.push(steps);
  }

  console.log(`Part 2 Solution: ${leastCommonMultiple(step_nodes)}`);
}

// Adjusted from https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
function leastCommonMultiple(values) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  values.sort();

  var multiple = values[0];
  values.forEach(function (n) {
    multiple = lcm(multiple, n);
  });

  return multiple;
}
