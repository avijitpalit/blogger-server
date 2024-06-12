const PostController = require('../Controllers/PostController');
const router = require('express').Router();
const authenticateJWT = require('../Middlewares/AuthMiddleware');
const path = require('path')

const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log('here');
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

// GET
router.get('/get-all', PostController.getPosts);
router.get('/get/:id', PostController.getPost);
router.get('/get-posts-by-author/', authenticateJWT, PostController.getPostsByAuthor);
router.get('/get-posts-by-author/:userId', authenticateJWT, PostController.getPostsByAuthor);

// POST
router.post('/create', [authenticateJWT, upload.single('thumb')], PostController.createPost);

// DELETE
router.delete('/delete/:id', authenticateJWT, PostController.deletePost);

// TEST
router.post('/upload-file', [authenticateJWT, upload.single('thumb')], PostController.uploadTest);

module.exports = router;