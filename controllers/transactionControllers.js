const transaction = require('../models/transaction')
const book = require('../models/book')

class TransactionRouter {
  static addNew(req, res) {
    // year/month/day
    const member = req.body.member
    const in_date = null
    const out_date = new Date(req.body.out_date)
    const due_date = new Date(req.body.due_date)
    const booklist = req.body.booklist
    const fine = 0

    transaction.create({
      member: member,
      in_date: in_date,
      out_date: out_date,
      due_date: due_date,
      booklist: booklist,
      fine: fine
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

  static getAll(req, res) {
    transaction.find()
      .populate('member')
      .populate('booklist')
      .then((data) => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static update(req, res) {
    // year/month/day
    const getDate = new Date(req.body.in_date)
    const setDate = { $set: { in_date: getDate }}
    const getId = { _id: req.params.id }
    
    transaction.findByIdAndUpdate( getId, setDate , { new: true })
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static delete(req, res) {
    const id = req.params.id
    const getId = { _id: id }
    transaction.findOneAndDelete(getId)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }
}

module.exports = TransactionRouter