import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import uploadImage from '../middlewares/uploadImage.js';

import {
  getPosts,
  getPostsBySearch,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postController.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getOnePost);

router.post('/', verifyToken, uploadImage.single('selectedFile'), createPost);

router.patch(
  '/:id',
  verifyToken,
  uploadImage.single('selectedFile'),
  updatePost
);
router.delete('/:id', verifyToken, deletePost);

router.patch('/likePost/:id', verifyToken, likePost);

export default router;
