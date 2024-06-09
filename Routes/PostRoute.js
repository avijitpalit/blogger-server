const PostController = require('../Controllers/PostController');
const router = require('express').Router();
const authenticateJWT = require('../Middlewares/AuthMiddleware');

router.post('/', authenticateJWT, PostController.createPost);
router.delete('/:id', authenticateJWT, PostController.deletePost);
router.get('/', authenticateJWT, PostController.getPosts);
router.get('/:id', authenticateJWT, PostController.getPost);

module.exports = router;