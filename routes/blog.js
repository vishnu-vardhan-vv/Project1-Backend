const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogController');
const {protect,contentCreatorOnly}=require('../middleware/authMiddleware');

router.post('/',protect,contentCreatorOnly,blogController.createBlog);
router.get('/',blogController.blogHome);
router.get('/:id',blogController.blogDetails);

module.exports= router;


