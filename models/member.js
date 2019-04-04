const mongoose = require('mongoose')

const ENV = require('dotenv')
ENV.config()

const dbName = process.env.DB_NAME

mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

let MemberSchema = new schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require:true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    require: true,
    minlength: 11,
    maxlength: 13
  }
})

MemberSchema.path('email').validate(function (value, respond) {
  return mongoose
    .model('Members')
    .collection
    .countDocuments({ email: value })
    .then(function (count) {
        if (count > 0) {
            return false
        }
    })
    .catch(function (err) {
        throw err
    })
}, 'Email already exists!!')

var Members = mongoose.model('Members', MemberSchema)

module.exports = Members