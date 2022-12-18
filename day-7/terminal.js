const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let input = data.toString().replace(/\r\n/g, "\n").split("\n");

  const createNestedObject = function (base, keys, value) {
    // If a value is given, remove the last key and keep it for later:
    const lastKey = arguments.length === 3 ? keys.pop() : false;

    // Walk the hierarchy, creating new objects where needed.
    // If the lastKey was removed, then the last object is not set yet:
    for (let i = 0; i < keys.length; i++) {
      base = base[keys[i]] = base[keys[i]] || {};
    }

    // If a value was given, set it to the last name:
    if (lastKey) base = base[lastKey] = value;

    // Return the last object in the hierarchy:
    return base;
  };

  const addFolderSize = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        addFolderSize(obj[key]);
      } else {
        obj["folderSize"] = obj["folderSize"] + obj[key] || obj[key];
      }
      if (typeof obj[key] === "object" && obj[key]["folderSize"] !== null) {
        obj["folderSize"] =
          obj["folderSize"] + obj[key]["folderSize"] || obj[key]["folderSize"];
      }
    });
  };

  let totalSize = 0;
  const calculateTotalSize = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        calculateTotalSize(obj[key]);
      } else {
        if (key === "folderSize" && obj[key] <= 100000) {
          totalSize += obj[key];
        }
      }
    });
  };

  let sizeToDelete;
  const findFileToDelete = (obj, unusedSpace, spaceNeeded) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        findFileToDelete(obj[key], unusedSpace, spaceNeeded);
      } else {
        if (key === "folderSize") {
          let spaceLeft = unusedSpace + obj[key];
          if (spaceLeft > spaceNeeded) {
            if (!sizeToDelete) sizeToDelete = obj[key];
            else if (sizeToDelete > obj[key]) sizeToDelete = obj[key];
          }
        }
      }
    });
  };

  let path = [];
  let directory = {};

  for (cmd of input) {
    if (cmd.startsWith("$")) {
      // We can skip ls and cmd / as they don't really do anything
      if (cmd === "$ ls" || cmd === "$ cd /") {
        continue;
        // It's a command, check what to do
      } else if (cmd.startsWith("$ cd")) {
        let dir = cmd.split(" ")[2];
        if (dir === "..") {
          path.pop();
        } else {
          path.push(dir);
        }
      }
    } else if (cmd.startsWith("dir")) {
      let dir = cmd.split(" ")[1];
      createNestedObject(directory, [...path, dir]);
    } else {
      let fileSize = parseInt(cmd.split(" ")[0]);
      let fileName = cmd.split(" ")[1];
      createNestedObject(directory, [...path, fileName], fileSize);
    }
  }

  addFolderSize(directory);
  calculateTotalSize(directory);

  const unusedSpace = 70000000 - directory["folderSize"];
  findFileToDelete(directory, unusedSpace, 30000000);

  console.log("Part 1", totalSize);
  console.log("Part 2", sizeToDelete);
});
