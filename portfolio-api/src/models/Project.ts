import mongoose, { Schema, Document } from 'mongoose';

// Define the shape of a single media item
export interface IMedia extends Document {
  url: string;
  type: 'image' | 'video';
}

const MediaSchema: Schema = new Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true, default: 'image' }
});

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  media: IMedia[]; // Changed from imageUrl and mediaType
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  liveUrl: { type: String },
  repoUrl: { type: String },
  media: [MediaSchema], 
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
