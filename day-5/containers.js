const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let procedure = data
    .toString()
    .replace(/    /g, "0")
    .replace(/\r\n/g, "\n")
    .split("\n");

  let drawing;

  const addEmptyRow = () =>
    drawing.push(Array.from("0".repeat(drawing[0].length)));

  const createDrawing = () => {
    drawing = [];
    for (let i = procedure.length - 1; i >= 0; i--) {
      let row = procedure[i];
      if (!row.startsWith("move")) {
        row = row.split("");
        row = row.filter((x) => x !== " ");
        if (row[0] == 1 || !row[0]) {
          continue;
        }
        row.unshift("0");
        row = row.filter((x) => /[a-zA-Z0-9]/.test(x));
        drawing.push(row);
      }
    }
  };

  const moveContainer = (num, rowFrom, rowTo, part) => {
    let container = [];
    while (num > 0) {
      for (let i = drawing.length - 1; i >= 0; i--) {
        if (drawing[i][rowFrom] !== "0") {
          container.push(drawing[i][rowFrom]);
          drawing[i][rowFrom] = "0";
          break;
        }
      }
      num--;
    }

    let i = container.length;

    while (i > 0) {
      for (let i = 0; i < drawing.length - 1; i++) {
        if (drawing[i][rowTo] === "0") {
          drawing[i][rowTo] = part === 1 ? container.shift() : container.pop();
          break;
        }
      }
      i--;
    }
  };

  const getSecretMessage = (part) => {
    createDrawing();
    for (let i = 0; i < 75; i++) {
      addEmptyRow();
    }

    for (move of procedure) {
      if (move.startsWith("move")) {
        move = move.split(" ").filter((x) => /[0-9]/.test(x));
        moveContainer(move[0], move[1], move[2], part);
      }
    }
    let secretMessage = "";

    for (j = 0; j < drawing[0].length; j++) {
      for (i = drawing.length - 1; i >= 0; i--) {
        if (drawing[i][j] !== "0") {
          secretMessage += drawing[i][j];
          break;
        }
      }
    }
    return secretMessage;
  };

  console.log("Part 1", getSecretMessage(1));
  console.log("Part 2", getSecretMessage(2));
});
