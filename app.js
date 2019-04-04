const express = require('express')
const app =  express()
const cors = require('cors')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT)

const bookRoutes = require('./routes/bookRoutes')
const memberRoutes = require('./routes/memberRoutes')
const transactionRoutes= require('./routes/transactionRoutes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/books', bookRoutes)
app.use('/members', memberRoutes)
app.use('/transactions', transactionRoutes)

app.listen(port, () => {
  console.log('SERVER IS ON AND IS LISTEN TO', port)
})