const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let calories = data.toString().replace(/\r\n/g, "\n").split("\n");

  let totalCalories = 0;
  let allCalories = [];

  for (let cal of calories) {
    if (cal === "") {
      allCalories.push(totalCalories);
      totalCalories = 0;
    } else {
      totalCalories += parseInt(cal);
    }
  }

  allCalories.sort((a, b) => b - a);

  console.log("Part 1:", allCalories[0]);
  console.log("Part 2", allCalories[0] + allCalories[1] + allCalories[2]);
});
