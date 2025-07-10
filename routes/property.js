const express=require('express');
const router=express.Router();
const propertyController=require('../controllers/propertyController');

router.post('/',propertyController.createProperty);
router.get('/',propertyController.propertyHome);
router.get('/:id',propertyController.propertyDetails);

module.exports=router;