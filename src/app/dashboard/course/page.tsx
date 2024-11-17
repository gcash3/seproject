// src/app/dashboard/courses/page.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, LockIcon } from 'lucide-react';
import Link from 'next/link';

interface EnrolledCourse {
  _id: string;
  courseId: {
    _id: string;
    title: string;
    description: string;
    image: string;
  };
  progress: number;
  completedLessons: string[];
  completedAssessments: {
    moduleId: string;
    score: number;
    completedAt: Date;
  }[];
  lastAccessedModule: string;
}

export default function EnrolledCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/enrollments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch enrollments');

      const data = await res.json();
      setEnrolledCourses(data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No Courses Yet</h2>
        <p className="text-muted-foreground mb-6">
          You haven't enrolled in any courses yet. Start learning by exploring our course catalog.
        </p>
        <Link href="/dashboard">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((enrollment) => (
          <Card key={enrollment._id}>
            <div className="relative">
              <img
                src={enrollment.courseId.image}
                alt={enrollment.courseId.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Link href={`/dashboard/course/${enrollment.courseId._id}/learn`}>
                  <Button variant="secondary">Continue Learning</Button>
                </Link>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                {enrollment.courseId.title}
              </h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{Math.round(enrollment.progress)}%</span>
                </div>
                <Progress value={enrollment.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                {/* Next up section */}
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-1">Next up:</div>
                  <div className="flex items-center text-sm">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    <span>{enrollment.lastAccessedModule || "Start course"}</span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    <span>{enrollment.completedLessons.length} completed</span>
                  </div>
                  <div className="flex items-center">
                    <LockIcon className="w-4 h-4 mr-1" />
                    <span>{enrollment.completedAssessments.length} assessments</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}