fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  let schematicArray = data.split('\n');
  
  processsSchematic(schematicArray);
});

function processsSchematic(schematicArray) {
  const schematicWidth = schematicArray[0].length;
  const schematicHeight = schematicArray.length;
  const schematicLocationTemplate = {
    "isSymbol": false,
    "isNumber": false,
    "numberId": null
  };
  const numberLocationTemplate = {
    "value": null,
    "checked": false,
  };

  let nextNumberId = 1;
  let schematicInfo = {};
  let schematicNumberInfo = {};

  for (let i = 0; i < schematicHeight; i++) {
    let numberString = '';
    let wasNumber = false;

    for (let j = 0; j < schematicWidth; j++) {
      const location = `${i},${j}`;

      if (!isNaN(schematicArray[i][j])) {
        wasNumber = true;
        numberString += schematicArray[i][j];

        let locationInfo = Object.assign({}, JSON.parse(JSON.stringify(schematicLocationTemplate)));
        locationInfo.isNumber = true;
        locationInfo.numberId = nextNumberId;

        let temp = {};
        temp[location] = JSON.parse(JSON.stringify(locationInfo));

        schematicInfo = Object.assign(schematicInfo, JSON.parse(JSON.stringify(temp)));
      } else {
        if (wasNumber) {
          let locationInfo = Object.assign({}, JSON.parse(JSON.stringify(numberLocationTemplate)));
          locationInfo.value = Number(numberString);

          let temp = {};
          temp[nextNumberId] = JSON.parse(JSON.stringify(locationInfo));

          schematicNumberInfo = Object.assign(schematicNumberInfo, JSON.parse(JSON.stringify(temp)));

          nextNumberId++;
          numberString = '';
          wasNumber = false;
        }

        if (schematicArray[i][j] === '.') {
          let locationInfo = Object.assign({}, JSON.parse(JSON.stringify(schematicLocationTemplate)));
          let temp = {};
          temp[location] = JSON.parse(JSON.stringify(locationInfo));

          schematicInfo = Object.assign(schematicInfo, JSON.parse(JSON.stringify(temp)));
        } else {
          let locationInfo = Object.assign({}, JSON.parse(JSON.stringify(schematicLocationTemplate)));
          locationInfo.isSymbol = true;

          let temp = {};
          temp[location] = JSON.parse(JSON.stringify(locationInfo));

          schematicInfo = Object.assign(schematicInfo, JSON.parse(JSON.stringify(temp)));
        }
      }
    }
    if (wasNumber) {
      let locationInfo = Object.assign({}, JSON.parse(JSON.stringify(numberLocationTemplate)));
      locationInfo.value = Number(numberString);

      let temp = {};
      temp[nextNumberId] = JSON.parse(JSON.stringify(locationInfo));

      schematicNumberInfo = Object.assign(schematicNumberInfo, JSON.parse(JSON.stringify(temp)));

      nextNumberId++;
      numberString = '';
      wasNumber = false;
    }
  }

  let sum = 0;

  for (let i = 0; i < schematicHeight; i++) {
    for (let j = 0; j < schematicWidth; j++) {
      if (!schematicInfo[`${i},${j}`].isNumber || schematicNumberInfo[schematicInfo[`${i},${j}`].numberId].checked)
        continue;

      if (
        (schematicInfo[`${i - 1},${j - 1}`]?.isSymbol === true) ||
        (schematicInfo[`${i - 1},${j}`]?.isSymbol === true) ||
        (schematicInfo[`${i - 1},${j + 1}`]?.isSymbol === true) ||
        // Check the items in the same row
        (schematicInfo[`${i},${j - 1}`]?.isSymbol === true) ||
        (schematicInfo[`${i},${j + 1}`]?.isSymbol === true) ||
        // Check the items in the row below
        (schematicInfo[`${i + 1},${j - 1}`]?.isSymbol === true) ||
        (schematicInfo[`${i + 1},${j}`]?.isSymbol === true) ||
        (schematicInfo[`${i + 1},${j + 1}`]?.isSymbol === true)
      ) {
        schematicNumberInfo[schematicInfo[`${i},${j}`].numberId].checked = true;
        sum += schematicNumberInfo[schematicInfo[`${i},${j}`].numberId].value;
      }
    }
  }

  console.log(`Part 1: ${sum}`);
}
