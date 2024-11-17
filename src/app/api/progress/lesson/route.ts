// src/app/api/progress/lesson/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Enrollment } from '@/models/enrollment';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

interface LessonProgress {
  lessonId: string;
  progress: number;
  completed: boolean;
  lastPosition?: number;
}

interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  assessmentCompleted: boolean;
  videoProgress: number;
  lastWatchedPosition: number;
  lessons: LessonProgress[];
}

interface ProgressRequestBody {
  courseId: string;
  moduleId: string;
  lessonId: string;
  progress: number;
  position?: number;
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token.value);
    const { courseId, moduleId, lessonId, progress, position }: ProgressRequestBody = await req.json();

    if (!courseId || !moduleId || !lessonId || progress === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const enrollment = await Enrollment.findOne({
      userId: new mongoose.Types.ObjectId(decoded.userId),
      courseId: new mongoose.Types.ObjectId(courseId)
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Find or create module progress
    let moduleProgress = enrollment.moduleProgress.find(
      (mp: ModuleProgress) => mp.moduleId === moduleId
    );

    if (!moduleProgress) {
      moduleProgress = {
        moduleId,
        completed: false,
        assessmentCompleted: false,
        videoProgress: 0,
        lastWatchedPosition: 0,
        lessons: []
      };
      enrollment.moduleProgress.push(moduleProgress);
    }

    // Find or create lesson progress
    let lessonProgress = moduleProgress.lessons.find(
      (lp: LessonProgress) => lp.lessonId === lessonId
    );

    if (lessonProgress) {
      // Update existing lesson progress
      lessonProgress.progress = Math.max(lessonProgress.progress, progress);
      if (position !== undefined) {
        lessonProgress.lastPosition = position;
      }
      lessonProgress.completed = progress >= 90;
    } else {
      // Create new lesson progress
      lessonProgress = {
        lessonId,
        progress,
        completed: progress >= 90,
        lastPosition: position
      };
      moduleProgress.lessons.push(lessonProgress);
    }

    // Update overall module progress with explicit types
    moduleProgress.videoProgress = Math.floor(
      moduleProgress.lessons.reduce((sum: number, lesson: LessonProgress) => {
        return sum + lesson.progress;
      }, 0) / moduleProgress.lessons.length
    );

    // Check if all lessons are completed
    const allLessonsCompleted = moduleProgress.lessons.length > 0 && 
      moduleProgress.lessons.every((lesson: LessonProgress): boolean => lesson.completed);

    if (allLessonsCompleted) {
      moduleProgress.completed = true;
    }

    // Update last access date
    enrollment.lastAccessDate = new Date();

    // Save changes
    await enrollment.save();

    return NextResponse.json({
      success: true,
      progress,
      completed: progress >= 90,
      moduleProgress: {
        completed: moduleProgress.completed,
        videoProgress: moduleProgress.videoProgress,
        assessmentCompleted: moduleProgress.assessmentCompleted
      }
    });

  } catch (error) {
    console.error('Lesson progress error:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson progress' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token.value);
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const moduleId = searchParams.get('moduleId');
    const lessonId = searchParams.get('lessonId');

    if (!courseId || !moduleId || !lessonId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    await connectDB();

    const enrollment = await Enrollment.findOne({
      userId: new mongoose.Types.ObjectId(decoded.userId),
      courseId: new mongoose.Types.ObjectId(courseId)
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    const moduleProgress = enrollment.moduleProgress.find(
      (mp: ModuleProgress) => mp.moduleId === moduleId
    );

    if (!moduleProgress) {
      return NextResponse.json({
        progress: 0,
        completed: false,
        lastPosition: 0
      });
    }

    const lessonProgress = moduleProgress.lessons.find(
      (lp: LessonProgress) => lp.lessonId === lessonId
    );

    return NextResponse.json({
      progress: lessonProgress?.progress || 0,
      completed: lessonProgress?.completed || false,
      lastPosition: lessonProgress?.lastPosition || 0,
      moduleProgress: {
        completed: moduleProgress.completed,
        videoProgress: moduleProgress.videoProgress,
        assessmentCompleted: moduleProgress.assessmentCompleted
      }
    });

  } catch (error) {
    console.error('Get lesson progress error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson progress' },
      { status: 500 }
    );
  }
}