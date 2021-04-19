const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose")
const port = 8000;
const mongourl = "mongodb://localhost:27017/meanstack";

mongoose.Promise = global.Promise;
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

let MessageSchema = mongoose.Schema({
    name: String,
    message: String
});
let MessageModel = mongoose.model("", MessageSchema, "Message");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
    console.log("Client connected")

    socket.on("chat message", (msg) => {
        const newMsg = new MessageModel({ name: msg.name, message: msg.message })
        newMsg.save((err) => {if (err) { console.error(err); } })
        console.log(`Message from ${msg.name}: ${msg.message}`);
        io.emit("write message", msg)
    })
})

http.listen(port, () => console.log(`Listening on port ${port}...`));