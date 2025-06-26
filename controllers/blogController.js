const Blog=require('../models/Blog');

exports.createBlog=async(req,res)=>{
    const { title, content, tags, category } = req.body;
    try{
        const blog = await Blog.create({ title, content, tags, category, author: req.user.id });
        res.status(201).json(blog);
    }
    catch(error){
        res.status(500).json(error);
        console.log('error in creating blog');
    }
    
}

exports.blogHome=async(req,res)=>{
    try{
        const { page = 1, sort = 'latest' } = req.query;
        const limit = 6;
        const skip = (page - 1) * limit;
        const sortBy = sort === 'trending' ? { views: -1, likes: -1 } : { createdAt: -1 };
        // const blogs = await Blog.find().sort(sortBy).skip(skip).limit(limit).populate('author', 'name');
        const blogs = await Blog.find().sort(sortBy).skip(skip).limit(limit).populate('author', 'email');
        // const blogs = await Blog.find().sort(sortBy).skip(0).limit(page*limit).populate('author', 'email');
        res.json(blogs);
    }
    catch(error){
        res.status(500).json(error);
        console.log('error in finding blog');
    }
    
}

exports.blogDetails=async(req,res)=>{
    try{
        // const blog = await Blog.findById(req.params.id).populate('author', 'name');
        const blog = await Blog.findById(req.params.id).populate('author', 'email');
        blog.views++;
        await blog.save();
        // blog.views--;
        // await blog.save();
        res.json(blog);
    }
    catch(error){
        res.status(500).json(error);
        console.log('error in getting blog details');
    }

}


// import express from 'express';
// import Blog from '../models/Blog.js';
// import { protect, contentCreatorOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const { page = 1, sort = 'latest' } = req.query;
//   const limit = 6;
//   const skip = (page - 1) * limit;

//   const sortBy = sort === 'trending' ? { views: -1, likes: -1 } : { createdAt: -1 };
//   const blogs = await Blog.find().sort(sortBy).skip(skip).limit(limit).populate('author', 'name');
//   res.json(blogs);
// });

// router.get('/:id', async (req, res) => {
//   const blog = await Blog.findById(req.params.id).populate('author', 'name');
//   blog.views++;
//   await blog.save();
//   res.json(blog);
// });

// router.post('/', protect, contentCreatorOnly, async (req, res) => {
//   const { title, content, tags, category } = req.body;
//   const blog = await Blog.create({ title, content, tags, category, author: req.user.id });
//   res.status(201).json(blog);
// });

// export default router;