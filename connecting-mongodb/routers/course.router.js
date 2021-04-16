const express = require("express");
const path = require("path")

const CourseController = require("../controllers/course.controller")

const router = express.Router();

router.get("/", (req, res) => res.sendFile(path.join(__dirname, '../pages', 'index.html')))
router.get("/list", CourseController.getCourses)
router.get("/store", CourseController.getStore)
router.post("/store", CourseController.postStore)
router.get("/update", CourseController.getUpdate)
router.post("/update", CourseController.postUpdate)
router.get("/delete", CourseController.getDelete)
router.post("/delete", CourseController.postDelete)



module.exports = router;