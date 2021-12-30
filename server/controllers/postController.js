import Post from '../models/postModel.js';

//* @route:  GET /api/posts
//* @dec:    Get all posts
//* @access: Public
export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    // limit of items to display on every page
    const LIMIT = 6;
    // get starting index of every page
    const startingIndex = (Number(page > 0 ? page : 1) - 1) * LIMIT;

    const totalPosts = await Post.countDocuments({});

    const posts = await Post.find()
      .sort('-createdAt')
      .limit(LIMIT)
      .skip(startingIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalPosts / LIMIT),
    });
  } catch (error) {
    res.status(404).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};

//* @route:  GET /api/posts/search
//* @dec:    Get all posts by search
//* @access: Public
export const getPostsBySearch = async (req, res) => {
  // console.log('req query: ', req.query);
  const { searchQuery, tags } = req.query;

  try {
    // i: not case sensetive - can be any uppercase or lowercase character
    const searchText = new RegExp(searchQuery, 'i');
    const foundPosts = await Post.find({
      $or: [
        { title: searchText },
        { message: searchText },
        { tags: { $in: tags.split(',') } },
      ],
    });
    res.status(200).json(foundPosts);
  } catch (error) {
    res.status(404).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};

//* @route:  GET /api/posts/:id
//* @dec:    Get one post by given id
//* @access: Public
export const getOnePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post)
      return res
        .status(404)
        .json({ alert: { status: 'fail', msg: 'Post not found!' } });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};

//* @route:  POST /api/posts
//* @dec:    Create a post
//* @access: Private
export const createPost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).send('No data provided!');

    let post = req.body;
    if (req.file) {
      post.selectedFile = req.file.filename;
    }
    const newPost = new Post({ ...post, creator: req.userId });
    await newPost.save();

    res.status(201).json({
      alert: {
        status: 'success',
        msg: 'Post created!',
      },
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};

//* @route: PATCH /api/posts/:id
//* @desc: Update a post
//* @access: Private
export const updatePost = async (req, res) => {
  // if body empty {} then;
  if (Object.keys(req.body).length === 0)
    return res.status(400).send('No data provided!');

  let post = req.body;
  if (req.file) {
    post.selectedFile = req.file.filename;
  }

  try {
    let updatedPost = await Post.findById(req.params.id);

    if (!updatedPost)
      return res
        .status(404)
        .json({ alert: { status: 'fail', msg: 'Post not found!' } });

    // Make sure user owns this post!
    if (updatedPost.creator !== req.userId)
      return res.status(401).json({
        alert: {
          status: 'fail',
          msg: 'User is not authorized for update!',
        },
      });

    // everything is ok;
    updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
      new: true,
    });

    res.status(201).json({
      alert: {
        status: 'success',
        msg: 'Post updated!',
      },
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};

//* @route: DELETE /api/posts/:id
//* @desc: Delete a post
//* @access: Private
export const deletePost = async (req, res) => {
  try {
    let postToDelete = await Post.findById(req.params.id);

    if (!postToDelete)
      return res.status(404).json({
        alert: {
          status: 'fail',
          msg: 'Post not found!',
        },
      });

    // Make sure user owns this post;
    if (postToDelete.creator !== req.userId) {
      return res.status(401).json({
        alert: {
          status: 'fail',
          msg: 'User is not authorized for delete!',
        },
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      alert: {
        status: 'success',
        msg: 'Post deleted!',
      },
    });
  } catch (error) {
    res.status(500).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};

//* @route: PATCH /api/posts/likePost/:id
//* @desc: Like a post
//* @access: Private
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.json({ alert: { status: 'fail', msg: 'Post not found!' } });

    // Make sure user cannot like own post
    // if (post.creator === req.userId)
    //   return res.status(401).json({
    //     alert: {
    //       status: 'fail',
    //       msg: 'You cannot like your own post!',
    //     },
    //   });

    // Check user liked the post before;
    const likedBefore = post.likes.includes(req.userId);

    let likedPost;

    if (likedBefore) {
      // dislike - remove id from likes array
      likedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.userId } },
        { new: true }
      );
    } else {
      // like - push id into likes array
      likedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: req.userId } },
        { new: true }
      );
    }

    res.status(201).json({
      alert: {
        status: 'success',
        msg: 'Like updated!',
      },
      updatedPost: likedPost,
    });
  } catch (error) {
    res.status(500).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};
