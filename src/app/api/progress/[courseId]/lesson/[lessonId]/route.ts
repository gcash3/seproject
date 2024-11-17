// src/app/api/progress/[courseId]/lesson/[lessonId]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyToken } from '@/lib/jwt';
import { Progress } from '@/models/progress';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    const { progress } = await req.json();

    await connectDB();

    await Progress.updateOne(
      {
        userId: decoded.userId,
        courseId: params.courseId,
        'lessons.lessonId': params.lessonId
      },
      {
        $set: { 'lessons.$.progress': progress },
        $currentDate: { 'lessons.$.lastAccessed': true }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update progress error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}