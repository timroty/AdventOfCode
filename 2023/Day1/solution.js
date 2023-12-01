fs = require("fs");

let calibrationArray;

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  calibrationArray = data.split("\n");

  //processCalibrationsPart1();
  processCalibrationsPart2();
});

function processCalibrationsPart1() {
  let sum = 0;
  for (let i = 0; i < calibrationArray.length; i++) {
    let leftPointer = null;
    let rightPointer = null;

    for (let j = 0; j < calibrationArray[i].length; j++) {
      if (!isNaN(calibrationArray[i][j])) {
        leftPointer = j;
        break;
      }
    }

    for (let j = calibrationArray[i].length - 1; j >= 0; j--) {
      if (!isNaN(calibrationArray[i][j])) {
        rightPointer = j;
        break;
      }
    }

    let concattedNumber =
      calibrationArray[i][leftPointer] + calibrationArray[i][rightPointer];
    sum += Number(concattedNumber);
  }

  console.log(sum);
}

function processCalibrationsPart2() {
  let sum = 0;

  const digitWordArray = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  for (let i = 0; i < calibrationArray.length; i++) {
    let leftPointer = null;
    let leftNumber = null;
    let rightPointer = null;
    let rightNumber = null;

    // Left Number
    for (let j = 0; j < calibrationArray[i].length; j++) {
      if (!isNaN(calibrationArray[i][j])) {
        leftPointer = j;
        break;
      }
    }

    for (let j = 0; j < digitWordArray.length; j++) {
      const stringSearchResult = calibrationArray[i].indexOf(digitWordArray[j]);
      if (
        stringSearchResult != -1 &&
        (stringSearchResult < leftPointer || leftPointer == null)
      ) {
        leftNumber = String(j + 1);
        leftPointer = stringSearchResult;
      }
    }

    // Right Number
    for (let j = calibrationArray[i].length - 1; j >= 0; j--) {
      if (!isNaN(calibrationArray[i][j])) {
        rightPointer = j;
        break;
      }
    }

    for (let j = 0; j < digitWordArray.length; j++) {
      const stringSearchResult = calibrationArray[i].lastIndexOf(
        digitWordArray[j]
      );
      if (
        stringSearchResult != -1 &&
        (stringSearchResult > rightPointer || rightPointer == null)
      ) {
        rightNumber = String(j + 1);
        rightPointer = stringSearchResult;
      }
    }

    const leftValue =
      leftNumber === null ? calibrationArray[i][leftPointer] : leftNumber;
    const rightValue =
      rightNumber === null ? calibrationArray[i][rightPointer] : rightNumber;

    let concattedNumber = leftValue + rightValue;
    sum += Number(concattedNumber);
  }

  console.log(sum);
}
