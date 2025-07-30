import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl: string;
  mediaType: 'image' | 'video';
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  liveUrl: { type: String },
  repoUrl: { type: String },
  imageUrl: { type: String },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);