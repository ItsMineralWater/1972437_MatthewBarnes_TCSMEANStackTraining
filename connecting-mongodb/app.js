const express = require("express");
const mongoose = require("mongoose");

const port = 8000;
const mongourl = "mongodb://localhost:27017/meanstack"; //database url
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database connection
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//link to router module
var CourseRouter = require("./routers/course.router");
app.use("/", CourseRouter);


app.listen(port, () => console.log(`Server listening on port ${port}`));