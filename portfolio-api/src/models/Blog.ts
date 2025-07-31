import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  slug: { type: String, required: true, unique: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);