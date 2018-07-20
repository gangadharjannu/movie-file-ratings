
const fs = require('fs');
const path = require('path');

const testFolder = './';
fs.readdir(testFolder, (err, files) => {
debugger;
  files.forEach(file => {
    console.log(file);
  });
fs.writeFile("E:/a.json", JSON.stringify(files,null,2), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
})