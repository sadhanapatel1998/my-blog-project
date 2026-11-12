
import mongoose, { Schema, Model } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  isPublished: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Admin",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
