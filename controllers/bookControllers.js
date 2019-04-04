const model = require('../models/book')

class BookController {
  static addNewBooks(req, res) {
    const { isbn, title, author, category, stock } = req.body

    model.create({
      isbn: isbn,
      title: title,
      author: author,
      category: category,
      stock: stock
    })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static getAllBooks(req, res) {
    model.find()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static updateBooks(req, res) {
    const { isbn, title, author, category, stock } = req.body
    const getId = { _id: req.params.id }

    model.findByIdAndUpdate(getId, {
      isbn: isbn,
      title: title,
      author: author,
      category: category,
      stock: stock
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static deleteBooks(req, res) {
    const getId = { _id: req.params.id }

    model.findByIdAndDelete(getId)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }
}

module.exports = BookController