const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let strategyGuide = data.toString().replace(/\r\n/g, "\n").split("\n");

  let totalScore1 = 0;
  let totalScore2 = 0;

  // A = Rock, B = Paper, C = Scissors
  // X = Rock, Y = Paper, Z = Scissors
  // X = 1, Y = 2, Z = 3,
  // Loss = 0, Draw = 3, Win = 6
  let value = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6,
  };

  let value2 = {
    "A X": 3,
    "A Y": 4,
    "A Z": 8,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 2,
    "C Y": 6,
    "C Z": 7,
  };

  for (let strategy of strategyGuide) {
    if (value[strategy]) totalScore1 += value[strategy];
    if (value2[strategy]) totalScore2 += value2[strategy];
  }

  console.log("Part 1:", totalScore1);
  console.log("Part 2:", totalScore2);
});
