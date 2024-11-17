// src/models/assessment.ts
import mongoose, { Document, Schema } from 'mongoose';

// For storing assessment attempts
export interface IAssessmentAttempt extends Document {
  userId: Schema.Types.ObjectId;
  courseId: string;
  moduleId: string;
  lessonId: string;
  answers: number[];
  score: number;
  timeSpent: number;
  passed: boolean;
  timestamp: Date;
}

const assessmentAttemptSchema = new Schema<IAssessmentAttempt>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  moduleId: {
    type: String,
    required: true
  },
  lessonId: {
    type: String,
    required: true
  },
  answers: [{
    type: Number,
    required: true
  }],
  score: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// For tracking video progress
export interface IVideoProgress extends Document {
  userId: Schema.Types.ObjectId;
  courseId: string;
  moduleId: string;
  lessonId: string;
  progress: number;
  completed: boolean;
  lastPosition: number;
  lastAccessed: Date;
}

const videoProgressSchema = new Schema<IVideoProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  moduleId: {
    type: String,
    required: true
  },
  lessonId: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  lastPosition: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
});

export const AssessmentAttempt = mongoose.models.AssessmentAttempt || 
  mongoose.model<IAssessmentAttempt>('AssessmentAttempt', assessmentAttemptSchema);

export const VideoProgress = mongoose.models.VideoProgress || 
  mongoose.model<IVideoProgress>('VideoProgress', videoProgressSchema);