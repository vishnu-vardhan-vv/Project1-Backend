const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const adminController=require('../controllers/adminController');

router.get('/contacts',adminController.getContact);

module.exports = router;
