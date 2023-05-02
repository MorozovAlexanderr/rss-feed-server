import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Post, TPostModel } from '@/modules/post/post.types';

const postSchema = new Schema<Post>({
  resourceId: { type: String, required: false },
  title: String,
  creator: String,
  body: String,
  date: { type: Date, default: Date.now },
});

postSchema.plugin(mongoosePaginate);

export const PostModel = mongoose.model<Post, TPostModel>('Post', postSchema);
