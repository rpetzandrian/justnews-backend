const router = require('express').Router();
const postController = require('../controllers/PostController');
const { uploadCover } = require('../helpers/Upload');
const { userwithId, useroradminVerify } = require('../helpers/Verify');

router.get('/', postController.getAllPosts);

router.get('/category', postController.getAllPostsByCategory);

router.post('/', uploadCover, postController.addNewPosts);

router.get('/:slug', postController.getPostBySlug);

router.patch('/likes/:user_id/:id', postController.likes);

router.delete('/unlikes/:user_id/:id', postController.unlikes);

router.patch('/save/:user_id/:id', postController.save);

router.delete('/unsave/:user_id/:id', postController.unsave);

router.patch('/watchs/:id', postController.watchs);

router.patch('/:user_id/:id', useroradminVerify, uploadCover, postController.updatePosts)

router.delete('/:user_id/:id', userwithId, postController.deletePosts);


module.exports = router;