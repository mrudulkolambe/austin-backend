const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses } = require('../Controllers/Course')

router.post('/create', createCourse);

router.get('/', getAllCourses);

module.exports = router;