import Post from "../models/Post.js";
import slugify from "slugify";

/* =======================
   CREATE POST
======================= */
export const createPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      category,
      status,
      tags,
      backlink,
      metaTitle,
      metaDesc,
    } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;
    const post = await Post.create({
      title,
      slug: slug || slugify(title, { lower: true, strict: true }),
      content,
      category,
      status: status || "draft",
      tags: tags ? tags.split(",") : [],
      backlink,
      metaTitle,
      metaDesc,
      author: req.user._id,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   UPDATE POST
======================= */
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Author or Admin only
    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      title,
      slug,
      content,
      category,
      status,
      tags,
      backlink,
      metaTitle,
      metaDesc,
    } = req.body;

    // Update fields
    post.title = title || post.title;
    post.slug =
      slug ||
      (title ? slugify(title, { lower: true, strict: true }) : post.slug);
    post.content = content || post.content;
    post.category = category || post.category;
    post.status = status || post.status;
    post.tags = tags ? tags.split(",") : post.tags;
    post.backlink = backlink || post.backlink;
    post.metaTitle = metaTitle || post.metaTitle;
    post.metaDesc = metaDesc || post.metaDesc;

    // Handle new image
    if (req.file) {
      // Use HTTPS if your server supports it
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      post.image = imageUrl; // <--- assign to post.image
    }

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({ message: error.message });
  }
};


/* =======================
   GET ALL POSTS (ADMIN)
======================= */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search api
export const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};

/* =======================
   GET POST BY SLUG
======================= */
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "author",
      "name"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   LATEST POSTS
======================= */
export const getLatestPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;

    const posts = await Post.find({ author: authorId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   ADD COMMENT
======================= */
// export const addComment = async (req, res) => {
//   try {
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ message: "Comment text is required" });
//     }

//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.comments.push({
//       user: req.user._id,
//       text,
//     });

//     await post.save();

//     res.status(201).json({
//       message: "Comment added",
//       comments: post.comments,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

/* =======================
   POSTS BY CATEGORY
======================= */
export const getPostsByCate = async (req, res) => {
  try {
    const posts = await Post.find({
      category: req.params.category,
      status: "published",
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// postController.js
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   DELETE POST
======================= */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
