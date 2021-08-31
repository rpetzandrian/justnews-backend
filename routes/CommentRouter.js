const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
const { userwithId } = require('../helpers/Verify');

router.get('/:post_id', commentController.getAllComments);

router.post('/:user_id', userwithId, commentController.addNewComments);

router.patch('/:user_id/:id', userwithId, commentController.updateComments);

router.delete('/:user_id/:id', userwithId, commentController.deleteComments);

module.exports = router;