const express = require("express");

const CourseController = require("../controllers/course.controller")

const router = express.Router();

router.get("/", (req, res) => res.sendFile("/index.html"))
router.get("/list", CourseController.getCourses)
router.get("/store", CourseController.getStore)
router.post("/store", CourseController.postStore)
router.get("/update", CourseController.getUpdate)
router.post("/update", CourseController.postUpdate)
router.get("/delete", CourseController.getDelete)
router.post("/delete", CourseController.postDelete)



module.exports = router;