const fs = require("fs");
module.exports = {
    save: (data) => {
        fs.appendFileSync('./logfile', data, (err)=>{

        })        
    }
}