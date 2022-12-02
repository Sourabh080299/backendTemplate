const express = require('express');
const post = require('../models/index').Posts;
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
         const posts = await post.find();
         res.send(posts);
    }
    catch (err) {
         res.json({message:"done"});
    }
})
router.post('/',async (req,res)=>{
    const myPost = new post({
        title : req.body.title,
        description : req.body.description,
    })
    try {
       const savedPost = await myPost.save();
       res.send(savedPost);
    }
    catch (err) {
       res.send({message: err}); 
    }
})
module.exports = router;