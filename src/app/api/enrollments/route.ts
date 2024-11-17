// src/app/api/enrollments/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Enrollment } from '@/models/enrollment';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import { courseModules } from '@/data/courseModules';

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
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Convert courseId to number
    const courseIdNumber = Number(courseId);
    
    // Validate that the course exists in our courseModules
    const courseExists = courseModules[courseIdNumber];
    if (!courseExists) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId: new mongoose.Types.ObjectId(decoded.userId),
      courseId: courseIdNumber
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Initialize module progress for all modules in the course
    const initialModuleProgress = courseModules[courseIdNumber].map(module => ({
      moduleId: module.id,
      completed: false,
      assessmentCompleted: false,
      videoProgress: 0,
      lastWatchedPosition: 0,
      lessons: []
    }));

    // Create new enrollment
    const enrollment = await Enrollment.create({
      userId: new mongoose.Types.ObjectId(decoded.userId),
      courseId: courseIdNumber,
      moduleProgress: initialModuleProgress,
      currentModule: courseModules[courseIdNumber][0].id,
      overallProgress: 0,
      isCompleted: false,
      enrollmentDate: new Date(),
      lastAccessDate: new Date()
    });

    return NextResponse.json({
      success: true,
      enrollment
    });

  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
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
    await connectDB();

    const enrollments = await Enrollment.find({
      userId: new mongoose.Types.ObjectId(decoded.userId)
    });

    // Enhance enrollments with course details
    const enhancedEnrollments = enrollments.map(enrollment => {
      const courseDetails = courseModules[enrollment.courseId];
      return {
        ...enrollment.toObject(),
        courseDetails: courseDetails ? {
          title: courseDetails[0]?.title,
          description: courseDetails[0]?.description,
        } : null
      };
    });

    return NextResponse.json(enhancedEnrollments);

  } catch (error) {
    console.error('Get enrollments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}