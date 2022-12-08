const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let contents = data.toString().replace(/\r\n/g, "\n").split("\n");
  let totalCount = 0;
  let totalCount2 = 0;

  let backpacks = [];

  for (let items of contents) {
    let firstCompartment = items.slice(0, items.length / 2);
    let secondCompartment = items.slice(items.length / 2, items.length);

    for (let item of firstCompartment) {
      if (secondCompartment.includes(item)) {
        totalCount +=
          item.toUpperCase() == item
            ? item.charCodeAt() - 38
            : item.charCodeAt() - 96;
        break;
      }
    }
  }

  for (let backpack of contents) {
    backpacks.push(backpack);
    if (backpacks.length === 3) {
      for (let item of backpacks[0].split("")) {
        if (backpacks[1].includes(item) && backpacks[2].includes(item)) {
          totalCount2 +=
            item.toUpperCase() == item
              ? item.charCodeAt() - 38
              : item.charCodeAt() - 96;
          backpacks = [];
          break;
        }
      }
    }
  }

  console.log("Part 1", totalCount);
  console.log("Part 2", totalCount2);
});
