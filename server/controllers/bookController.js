const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'title and author are required' });
    }
    const book = await Book.create({ title, author, publishedYear, user: req.user.id });
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Book.find({ user: req.user.id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Book.countDocuments({ user: req.user.id }),
    ]);

    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    // Only set provided fields to avoid overwriting with undefined
    const update = {};
    if (typeof title !== 'undefined') update.title = title;
    if (typeof author !== 'undefined') update.author = author;
    if (typeof publishedYear !== 'undefined') update.publishedYear = publishedYear;

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      update,
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
