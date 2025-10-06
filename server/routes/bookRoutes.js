const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');

// Protect all routes
router.use(auth);

router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
