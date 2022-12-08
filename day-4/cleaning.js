const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let sections = data.toString().replace(/\r\n/g, "\n").split("\n");

  let totalCount = 0;
  let totalCount2 = 0;

  const checkOverlap = (ids) => {
    return (
      (ids[0][0] >= ids[1][0] && ids[0][1] <= ids[1][1]) ||
      (ids[1][0] >= ids[0][0] && ids[1][1] <= ids[0][1])
    );
  };

  const createList = (ids) => {
    let list = [];
    let i = 0;
    let start = false;
    while (i <= ids[1]) {
      if (i == ids[0] || start) {
        list.push(i);
        start = true;
      } else {
        list.push("");
      }
      i++;
    }

    return list;
  };

  for (ids of sections) {
    ids = ids.split(",");
    ids[0] = ids[0].split("-");
    ids[1] = ids[1].split("-");
    ids[0] = ids[0].map((id) => parseInt(id));
    ids[1] = ids[1].map((id) => parseInt(id));

    const firstList = createList(ids[0]);
    const secondList = createList(ids[1]);

    for (let i = 0; i < firstList.length; i++) {
      if (firstList[i] && firstList[i] === secondList[i]) {
        totalCount2 += 1;
        break;
      }
    }

    if (checkOverlap(ids)) totalCount += 1;
  }

  console.log("Part 1", totalCount);
  console.log("Part 2", totalCount2);
});
