import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  date: Date;
  imageUrl?: string;
}

const AchievementSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);