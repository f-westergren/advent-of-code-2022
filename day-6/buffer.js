const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let dataStream = data.toString().replace(/\r\n/g, "\n");

  const getMarker = (part) => {
    const num = part === 1 ? 4 : 14;
    let equal = true;
    let i = 0;

    while (equal) {
      let characters = dataStream.slice(i, i + num);
      let list = new Set(characters);
      if (list.size === characters.length) break;
      i++;
    }

    return i + num;
  };

  console.log(`Part 1 ${getMarker(1)}`);
  console.log(`Part 2 ${getMarker(2)}`);
});
