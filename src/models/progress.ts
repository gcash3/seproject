// src/models/progress.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ILessonProgress {
  lessonId: string;
  progress: number;
  completed: boolean;
  lastAccessed: Date;
}

interface IAssessmentProgress {
  assessmentId: string;
  attempts: number;
  bestScore: number;
  passed: boolean;
  lastAttempt: Date;
}

export interface IProgress extends Document {
  userId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  lessons: ILessonProgress[];
  completedAssessments: string[];
  overallProgress: number;
  startedAt: Date;
  lastAccessed: Date;
  completed: boolean;
  completedAt?: Date;
}

const progressSchema = new Schema<IProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lessons: [{
    lessonId: String,
    progress: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    }
  }],
  completedAssessments: [String],
  overallProgress: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date
});

export const Progress = mongoose.models.Progress || mongoose.model<IProgress>('Progress', progressSchema);