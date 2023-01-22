const post = require('../models/index').Posts;

const allPosts = async (req,res)=>{
    try {
         const posts = await post.find();
         res.send(posts);
    }
    catch (err) {
         res.status(400).json({message: err});
    }
};

const savePost = async (req,res)=>{
    const myPost = post({
        title : req.body.title,
        description : req.body.description,
    })
    try {
       const savedPost = await myPost.save();
       res.send(savedPost);
    }
    catch (err) {
       res.status(400).send({message: err}); 
    }
};

const postById = async (req,res)=>{
    try{
        const myPost = await post.findById(req.params.postId);
        res.json(myPost);
    }
    catch (err) {
        res.status(400).json({message: err});
    }
};

const removePostById = async (req,res)=>{
    try{
        const removedPost = await post.remove({_id : req.params.postId});
        res.send(removedPost);
    }
    catch (err) {
        res.status(400).json({message: err});
    }
};

const updateTitleById = async (req,res)=>{
    try{
        const updatedPost = await post.updateOne({_id : req.params.postId},{$set : {title : req.body.title}});
        res.send(updatedPost);
    }
    catch (err) {
        res.status(400).json({message: err});
    }
};

module.exports = {
    allPosts,
    savePost,
    postById,
    removePostById,
    updateTitleById,
}