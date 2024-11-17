// src/models/enrollment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface LessonProgress {
  lessonId: string;
  progress: number;
  completed: boolean;
  lastPosition?: number;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  assessmentCompleted: boolean;
  videoProgress: number;
  lastWatchedPosition: number;
  lessons: LessonProgress[];
}

export interface IEnrollment extends Document {
  userId: Schema.Types.ObjectId;
  courseId: number; // Changed to number to match our course IDs
  enrollmentDate: Date;
  lastAccessDate: Date;
  completionDate?: Date;
  overallProgress: number;
  moduleProgress: ModuleProgress[];
  currentModule: string;
  isCompleted: boolean;
  certificate?: {
    issued: boolean;
    issueDate?: Date;
    certificateNumber?: string;
  };
}

const enrollmentSchema = new Schema<IEnrollment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: Number, // Changed to Number type
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  lastAccessDate: {
    type: Date,
    default: Date.now
  },
  completionDate: Date,
  overallProgress: {
    type: Number,
    default: 0
  },
  moduleProgress: [{
    moduleId: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    assessmentCompleted: {
      type: Boolean,
      default: false
    },
    videoProgress: {
      type: Number,
      default: 0
    },
    lastWatchedPosition: {
      type: Number,
      default: 0
    },
    lessons: [{
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
      lastPosition: Number
    }]
  }],
  currentModule: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    issueDate: Date,
    certificateNumber: String
  }
});

export const Enrollment = mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);