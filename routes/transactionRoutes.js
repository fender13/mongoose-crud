const router = require('express').Router()
const controller = require('../controllers/transactionControllers')

// list all Transaction
router.get('/', controller.getAll)

// add transaction
router.post('/', controller.addNew)

// update transaction
router.put('/:id', controller.update)

// delete transaction
router.delete('/:id', controller.delete)

module.exports = router