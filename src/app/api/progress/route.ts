// src/app/api/progress/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Enrollment } from '@/models/enrollment';
import { verifyToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    const { courseId, lessonId, completed } = await req.json();

    await connectDB();

    const enrollment = await Enrollment.findOne({
      userId: decoded.userId,
      courseId,
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    if (completed) {
      // Add to completed lessons if not already completed
      if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
      }
    } else {
      // Remove from completed lessons
      enrollment.completedLessons = enrollment.completedLessons.filter(
        (id) => id.toString() !== lessonId
      );
    }

    // Update progress percentage
    const course = await Course.findById(courseId);
    const totalLessons = Object.keys(course.lessons).length;
    enrollment.progress = (enrollment.completedLessons.length / totalLessons) * 100;

    await enrollment.save();

    return NextResponse.json({
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
    });
  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    await connectDB();

    const enrollment = await Enrollment.findOne({
      userId: decoded.userId,
      courseId,
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Failed to get progress' },
      { status: 500 }
    );
  }
}