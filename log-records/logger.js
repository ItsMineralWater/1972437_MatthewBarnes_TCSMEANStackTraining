let readline = require("readline-sync");
let fs = require("fs");


module.exports.storeLogs = function () {
    let records = JSON.parse(fs.readFileSync("logs.json").toString() || "[]");
    let t = readline.question("How many records do you want to store? ")

    for (let i = 0; i < t; i++) {
        let record = {};
        let fname = readline.question("Enter your first name: ")
        record.fname = fname;
        let lname = readline.question("Enter your last name: ")
        record.lname = lname;
        let gender = readline.question("Enter your gender: ")
        record.gender = gender;
        let email = readline.question("Enter your email: ")
        record.email = email;
        record.date = new Date().toJSON().split('T')[0];
        record.time = new Date().toJSON().split('T')[1].slice(0, -1);
        records.push(record);
    }
    fs.writeFileSync("logs.json", JSON.stringify(records, null, 2));
}