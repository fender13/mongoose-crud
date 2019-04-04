const mongoose = require('mongoose')

const ENV = require('dotenv')
ENV.config()

const dbName = process.env.DB_NAME

mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

let BookSchema = new schema({
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
})

BookSchema.path('title').validate(function (value, respond) {
  return mongoose
    .model('Books')
    .collection
    .countDocuments({ title: value })
    .then(function (count) {
        if (count > 0) {
            return false
        }
    })
    .catch(function (err) {
        throw err
    })
}, 'Book already exists!!')

var Books = mongoose.model('Books', BookSchema)

module.exports = Books