// src/types/enrollment.ts
import { Schema } from 'mongoose';

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

export interface Enrollment {
  _id: string;
  userId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  moduleProgress: ModuleProgress[];
  currentModule: string;
  lastAccessDate: Date;
  enrollmentDate: Date;
  completionDate?: Date;
}