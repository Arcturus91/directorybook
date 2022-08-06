const router = require('express').Router();

const {getAllContacts,createContact,getContactById,editContact, deleteContact} = require("../controllers/contact.controller")

router.get('/getallcontacts',getAllContacts)
router.post('/createcontact',createContact)
router.get('/:id',getContactById)
router.patch('/edit/:id',editContact)
router.delete('/delete/:id',deleteContact)

/* router.post('create-contact',createContact) */

module.exports = router