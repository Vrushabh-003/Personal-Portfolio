// src/models/Experience.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string[];
  certificateUrl?: string; 
}

const ExperienceSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: [{ type: String, required: true }],
  certificateUrl: { type: String }, // Add this line
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);