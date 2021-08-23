const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../client/public`);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const fileName = req.body.posterId + Date.now() + '.' + ext
        cb(null, `/uploads/posts/${fileName}`);
    },
});
const multerFilter = (req, file, cb) => {
    const mimetype = file.mimetype;
    console.log('mimetype', mimetype,)
    if (["image/jpg", "image/png", "image/jpeg"].includes(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("NOT jpg, png, jpeg "), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

router.get('/', postController.readPost);
router.post('/', upload.single("file"), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;