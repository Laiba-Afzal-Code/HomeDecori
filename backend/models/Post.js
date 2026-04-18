import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String, // filename or URL
    },

    /* FIX: category as STRING */
    category: {
      type: String,
      required: true,
      index: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    backlink: {
      type: String,
    },

    metaTitle: {
      type: String,
    },

    metaDesc: {
      type: String,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

/* Auto-generate slug ONLY if not provided */
postSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  // next();
});

export default mongoose.model("Post", postSchema);
