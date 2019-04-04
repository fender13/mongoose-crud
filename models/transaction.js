const mongoose = require('mongoose')

const ENV = require('dotenv')
ENV.config()

const dbName = process.env.DB_NAME

mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const transactionSchema = new schema({
  member: { 
    type: schema.Types.ObjectId, 
    ref: 'Members' ,
    required: true
  },
  in_date: Date,
  out_date: Date,
  due_date: Date,
  fine: Number,
  booklist: [
    {
      type: schema.Types.ObjectId,
      ref: 'Books',
      require: true
    }
  ]
})

transactionSchema.post('findOneAndUpdate', function (result, next) {
  result.fine = (result.in_date - result.due_date) / (3600 * 24 * 1000) * 1000
  result.save()
  next();
})

const Transactions = mongoose.model('Transactions', transactionSchema)

module.exports = Transactions