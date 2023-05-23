const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, updateCourses } = require('../Controllers/Course')

router.post('/create', createCourse);

router.get('/', getAllCourses);

router.patch('/:_id', updateCourses);

module.exports = router;