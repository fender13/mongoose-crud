const router = require('express').Router()
const controller = require('../controllers/memberControllers')

// add new member 
router.post('/', controller.addNewMember)

// get all members
router.get('/', controller.getAllMember)

// update member
router.put('/:id', controller.updateMemberData)

// delete member
router.delete('/:id', controller.deleteMember)

module.exports = router