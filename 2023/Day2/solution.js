fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  let gameArray = data.split("\n");

  processGames(gameArray);
  processGames2(gameArray);
});

function processGames(gameArray) {
  const redCubeCount = 12;
  const greenCubeCount = 13;
  const blueCubeCount = 14;
  const totalCubeCount = redCubeCount + greenCubeCount + blueCubeCount;

  const colorNameDict = {
    red: redCubeCount,
    green: greenCubeCount,
    blue: blueCubeCount,
  };

  let sum = 0;
  for (let i = 0; i < gameArray.length; i++) {
    const gameSplit = gameArray[i].split(":");
    const gameNumber = gameSplit[0].split(" ")[1];

    const setSplit = gameSplit[1].split(";");
    let setValid = true;

    for (let j = 0; j < setSplit.length; j++) {
      const colorSplit = setSplit[j].split(",");
      let totalForSet = 0;

      for (let k = 0; k < colorSplit.length; k++) {
        const colorStringSplit = colorSplit[k].trim().split(" ");

        if (colorStringSplit[0] > colorNameDict[colorStringSplit[1]]) {
          setValid = false;
        } else {
          totalForSet += Number(colorStringSplit[0]);
        }
      }

      if (totalForSet > totalCubeCount) {
        setValid = false;
      }
    }

    if (setValid) {
      sum += Number(gameNumber);
    }
  }

  console.log(`Part 1: ${sum}`);
}

function processGames2(gameArray) {
  let powerSum = 0;
  for (let i = 0; i < gameArray.length; i++) {
    const gameSplit = gameArray[i].split(":");
    const setSplit = gameSplit[1].split(";");

    let colorNameDict = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (let j = 0; j < setSplit.length; j++) {
      const colorSplit = setSplit[j].split(",");

      for (let k = 0; k < colorSplit.length; k++) {
        const colorStringSplit = colorSplit[k].trim().split(" ");

        if (Number(colorStringSplit[0]) > colorNameDict[colorStringSplit[1]]) {
          colorNameDict[colorStringSplit[1]] = Number(colorStringSplit[0]);
        }
      }
    }

    powerSum +=
      colorNameDict["red"] * colorNameDict["green"] * colorNameDict["blue"];
  }

  console.log(`Part 2: ${powerSum}`);
}
