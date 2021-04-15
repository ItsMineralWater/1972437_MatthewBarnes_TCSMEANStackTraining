const mongoose = require("mongoose")
const fs = require("fs");

//Connect to database
mongoose.Promise = global.Promise;
const uri = "mongodb://localhost:27017/meanstack"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//read call data to object array
const callData = JSON.parse(fs.readFileSync("call_data.json").toString());

//inserting call data to database
let db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => {

    //most numerical data is saved as strings in the file
    const CallSchema = mongoose.Schema({
        _id: Number,
        source: String,
        destination: String,
        sourceLocation: String,
        destinationLocation: String,
        callDuration: String,
        roaming: String,
        callCharge: String
    })
    const CallModel = mongoose.model("", CallSchema, "Calls");
    
    //insert all at once
    CallModel.insertMany(callData, (err, res) => {
        if (!err) {
            console.log("Record inserted: " + res);
        } else {
            console.error(err);
        }
        mongoose.disconnect();
    })
})