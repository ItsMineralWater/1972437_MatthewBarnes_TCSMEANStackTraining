const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
    console.log("Client connected")

    socket.on("chat message", (msg) => {
        console.log(`Message from ${msg.name}: ${msg.message}`);
    })
})

http.listen(port, () => console.log(`Listening on port ${port}...`));