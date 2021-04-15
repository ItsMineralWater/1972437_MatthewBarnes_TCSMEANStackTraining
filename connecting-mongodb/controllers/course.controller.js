const CourseModel = require("../models/course.model");
const path = require("path");

const getCourses = (req, res) => {
    CourseModel.find({}, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

const getStore = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages', 'add.html'));
}

const postStore = (req, res) => {
    const newCourse = new CourseModel({ _id: req.body._id, cname: req.body.cname, desc: req.body.desc, amount: req.body.amount })
    newCourse.save((err) => {
        if (err) {
            console.error(err);
        }
    })
    res.redirect("/");
}

const getUpdate = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages', 'update.html'));
}

const postUpdate = (req, res) => {
    console.log(req.body)
    CourseModel.updateOne({ _id: req.body._id }, { amount: req.body.amount }, (err, data) => { if(err) { console.error(err) } })
    res.redirect("/");
}

const getDelete = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages', 'delete.html'));
}

const postDelete = (req, res) => {
    CourseModel.deleteOne({ _id: req.body._id }, (err, data) => {
        res.redirect("/");
    })
}

module.exports = { getCourses, getStore, postStore, getUpdate, postUpdate, getDelete, postDelete }