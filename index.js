const fs = require("fs");

function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

const fun = () =>{

return new Promise ((resolve, reject) =>{


var result =[]

var buffer = new Buffer.alloc(1024);

const filesize  = fs.statSync("logfile").size;
// console.log(filesize);
var result= [];
fs.open("logfile", "r+", function (err, fd) {
    if (err) {
    return console.error(err);
  }

  // console.log("Reading the file");
  //   fs.read(fd, buffer, offset, length, position, callback)
  fs.read(fd, buffer, 0, 1024, filesize - 1024, function (err, bytes) {
    if (err) {
      console.log(err);
    }

    if (bytes > 0) {
      //   console.log(bytes);
      const arr = buffer.slice(0, bytes).toString();
      var str = "";
      const arrOfString = [];
      for (var i = bytes - 1; i >= 0; i--) {
        if (arr[i] == "\n") {
          var temp = reverseString(str);
          if (temp.length > 0) arrOfString.push(temp);
          str = "";
        } else {
          str += arr[i].toString();
        }
      }
      if (arrOfString.length >= 10) {
        const tenLine = arrOfString.slice(0, 10);
        // console.log(tenLine);
        result = tenLine
        resolve(result)
      }
    }
    // console.log(bytes + " bytes read");

    // Close the opened file.
    fs.close(fd, function (err) {
      if (err) {
        console.log(err);
        reject(err)
      }
      //   console.log("File closed successfully");
    });
  });
});

})

}
module.exports = fun