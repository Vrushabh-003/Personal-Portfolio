// portfolio-api/src/models/Leadership.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadership extends Document {
  role: string;
  organization: string;
  description: string;
  certificateUrl?: string; 
  displayOrder: number;
}

const LeadershipSchema: Schema = new Schema({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  description: { type: String, required: true },
  certificateUrl: { type: String }, 
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<ILeadership>('Leadership', LeadershipSchema);