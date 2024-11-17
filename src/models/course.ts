// src/models/course.ts
import mongoose, { Document, Schema } from 'mongoose';

interface Lesson {
  title: string;
  type: 'video';
  content: {
    videoUrl: string;
    description: string;
  };
  resources: {
    title: string;
    type: string;
    url: string;
  }[];
  estimatedTime: string;
  difficulty: string;
  skills: string[];
}

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  previewVideo: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  learningOutcomes: string[];
  prerequisites: string[];
  syllabus: {
    week: number;
    title: string;
    content: string[];
  }[];
  tools: string[];
  certificationType: string;
  lessons: { [key: string]: Lesson };
  createdAt: Date;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String, required: true },
  previewVideo: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  learningOutcomes: [{ type: String }],
  prerequisites: [{ type: String }],
  syllabus: [{
    week: Number,
    title: String,
    content: [String]
  }],
  tools: [{ type: String }],
  certificationType: { type: String },
  lessons: {
    type: Map,
    of: {
      type: {
        type: String,
        enum: ['video'],
        required: true
      },
      title: String,
      content: {
        videoUrl: String,
        description: String
      },
      resources: [{
        title: String,
        type: String,
        url: String
      }],
      estimatedTime: String,
      difficulty: String,
      skills: [String]
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);