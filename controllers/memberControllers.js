const model = require('../models/member')

class MemberController {
  static addNewMember(req, res) {
    const { name, address, zipcode, email, phone } = req.body

    model.create({
      name: name,
      address: address,
      zipcode: zipcode,
      email: email,
      phone: phone
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

  static getAllMember(req, res) {
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

  static updateMemberData(req, res) {
    const { name, address, zipcode, email, phone } = req.body
    const getId = { _id: req.params.id }

    model.findByIdAndUpdate(getId, {
      name: name,
      address: address,
      zipcode: zipcode,
      email: email,
      phone: phone
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

  static deleteMember(req, res) {
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

module.exports = MemberController