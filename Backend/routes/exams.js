const express = require('express');
const router = express.Router();
const { 
  createExam, 
  getCompanyExams, 
  getStudentExams, 
  updateExam, 
  deleteExam,
  getExamById
} = require('../controllers/examController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   POST /api/exams
// @desc    Create new exam (Company only)
router.post('/', createExam);

// @route   GET /api/exams/company/:companyId
// @desc    Get all exams for a company
router.get('/company/:companyId', getCompanyExams);

// @route   GET /api/exams/student/:studentId
// @desc    Get all exams for a student
router.get('/student/:studentId', getStudentExams);

// @route   GET /api/exams/:id
// @desc    Get single exam by ID
router.get('/:id', getExamById);

// @route   PUT /api/exams/:id
// @desc    Update exam (Company only)
router.put('/:id', updateExam);

// @route   DELETE /api/exams/:id
// @desc    Delete exam (Company only)
router.delete('/:id', deleteExam);

module.exports = router;
