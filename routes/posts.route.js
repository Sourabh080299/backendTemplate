const express = require('express');
const router = express.Router();
const {allPosts, savePost , postById, removePostById, updateTitleById} = require('../controllers/posts.controller');
const verify = require('../middleware/auth').tokenVerification;
router.get('/', verify, allPosts);
router.post('/', verify, savePost);
router.get('/:postId', verify, postById);
router.delete('/:postId', verify, removePostById);
router.patch('/:postId', verify, updateTitleById);

module.exports = router;