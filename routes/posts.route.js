const express = require('express');
const router = express.Router();
const {allPosts, savePost , postById, removePostById, updateTitleById} = require('../controllers/posts.controller');
router.get('/', allPosts);
router.post('/', savePost);
router.get('/:postId',postById);
router.delete('/:postId',removePostById);
router.patch('/:postId',updateTitleById);

module.exports = router;