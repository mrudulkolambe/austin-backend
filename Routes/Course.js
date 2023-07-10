const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, updateCourses } = require('../Controllers/Course');
const isUser = require('../Middlewares/isUser');

router.post('/create', isUser, createCourse);

router.get('/', isUser, getAllCourses);

router.patch('/:_id', isUser, updateCourses);

module.exports = router;