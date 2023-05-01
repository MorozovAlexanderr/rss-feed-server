import mongoose, { Schema } from 'mongoose';
import { Post, TPostModel } from '@/modules/post/post.types';

const postSchema = new Schema<Post, TPostModel>({
  resourceId: { type: String, required: false },
  title: String,
  creator: String,
  body: String,
  date: { type: Date, default: Date.now },
});

export const PostModel = mongoose.model<Post, TPostModel>('Post', postSchema);
