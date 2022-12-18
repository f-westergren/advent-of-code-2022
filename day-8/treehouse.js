const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let treeMap = data.toString().replace(/\r\n/g, "\n").split("\n");
  treeMap = treeMap.map((row) => row.split("").map((num) => parseInt(num)));

  const checkEast = (y, x, size, viewScore) => {
    let checkViewScore = typeof viewScore === "number";
    if (treeMap[y][x] === undefined) {
      if (checkViewScore) return viewScore;
      return true;
    }
    if (checkViewScore) viewScore++;
    if (treeMap[y][x] < size)
      return checkEast(y, x + 1, size, checkViewScore ? viewScore : undefined);
    if (checkViewScore) return viewScore;
    return false;
  };

  const checkWest = (y, x, size, viewScore) => {
    let checkViewScore = typeof viewScore === "number";
    if (treeMap[y][x] === undefined) {
      if (checkViewScore) return viewScore;
      return true;
    }

    if (checkViewScore) viewScore++;
    if (treeMap[y][x] < size)
      return checkWest(y, x - 1, size, checkViewScore ? viewScore : undefined);

    if (checkViewScore) return viewScore;
    return false;
  };

  const checkSouth = (y, x, size, viewScore) => {
    let checkViewScore = typeof viewScore === "number";
    if (treeMap[y] === undefined) {
      if (checkViewScore) return viewScore;
      return true;
    }

    if (checkViewScore) viewScore++;
    if (treeMap[y][x] < size)
      return checkSouth(y + 1, x, size, checkViewScore ? viewScore : undefined);
    if (checkViewScore) return viewScore;
    return false;
  };

  const checkNorth = (y, x, size, viewScore) => {
    let checkViewScore = typeof viewScore === "number";
    if (treeMap[y] === undefined) {
      if (checkViewScore) return viewScore;
      return true;
    }

    if (checkViewScore) viewScore++;
    if (treeMap[y][x] < size)
      return checkNorth(y - 1, x, size, checkViewScore ? viewScore : undefined);

    if (checkViewScore) return viewScore;
    return false;
  };

  const checkVisibility = (y, x, size) => {
    if (checkEast(y, x + 1, size)) return true;
    if (checkWest(y, x - 1, size)) return true;
    if (checkSouth(y + 1, x, size)) return true;
    if (checkNorth(y - 1, x, size)) return true;
    return false;
  };

  const calculateViewScore = (y, x, size) => {
    let viewScore;

    viewScore = checkEast(y, x + 1, size, 0);
    viewScore *= checkWest(y, x - 1, size, 0);
    viewScore *= checkSouth(y + 1, x, size, 0);
    viewScore *= checkNorth(y - 1, x, size, 0);

    if (viewScore > bestViewScore) {
      bestViewScore = viewScore;
    }
  };

  let totalSize = 0;
  let bestViewScore = 0;

  for (let y = 0; y < treeMap.length; y++) {
    for (let x = 0; x < treeMap[y].length; x++) {
      if (
        y === 0 ||
        x === 0 ||
        y === treeMap.length - 1 ||
        x === treeMap[0].length - 1
      ) {
        totalSize++;
      } else {
        calculateViewScore(y, x, treeMap[y][x]);
        if (checkVisibility(y, x, treeMap[y][x])) {
          totalSize++;
        }
      }
    }
  }

  console.log("Part 1:", totalSize);
  console.log("Part 2:", bestViewScore);
});
