const fs = require("fs");

for (var i = 0; i < 100; i++) {
  fs.appendFileSync("logfile", "some random data " + i + "\n");
}
