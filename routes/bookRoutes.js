const router = require('express').Router()
const controller = require('../controllers/bookControllers')

// add new book
router.post('/', controller.addNewBooks)

// get all book
router.get('/', controller.getAllBooks)

// update a book
router.put('/:id', controller.updateBooks)

// delete a book
router.delete('/:id', controller.deleteBooks)

module.exports = router