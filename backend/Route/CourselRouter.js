const express = require("express");
const router = express.Router();
const coursel = require("../Controller/CourselController");
const upload = require("../cloundinary/upload");


router.post("/add", upload.single("image"), coursel.addCoursel); 
router.get("/", coursel.getCoursels);
router.get("/:id",coursel. getCourselById); 
router.put("/:id", upload.single("image"), coursel.updateCoursel); 
router.delete("/:id", coursel.deleteCoursel); 
module.exports = router;