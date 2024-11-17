// src/app/dashboard/courses/page.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Play, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { courseModules, Module } from '@/data/courseModules';

interface EnrolledCourse {
  _id: string;
  courseId: number; // Changed to number to match the courseModules keys
  moduleProgress: Array<{
    moduleId: string;
    completed: boolean;
    assessmentCompleted: boolean;
    videoProgress: number;
    lastWatchedPosition: number;
  }>;
  currentModule: string;
  overallProgress: number;
  lastAccessDate: string;
  courseDetails?: {
    title: string;
    description: string;
    image: string;
    instructor: string;
    duration: string;
  };
}

export default function EnrolledCourses() {
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

      if (res.ok) {
        const data = await res.json();
        setEnrolledCourses(data);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCourseModules = (courseId: number): Module[] => {
    return courseModules[courseId] || [];
  };

  const getCurrentModule = (courseId: number, currentModuleId: string): Module | undefined => {
    const modules = getCourseModules(courseId);
    return modules.find(m => m.id === currentModuleId);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No Enrolled Courses</h2>
        <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course!</p>
        <Link href="/dashboard">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((enrollment) => {
          const modules = getCourseModules(enrollment.courseId);
          const currentModule = getCurrentModule(enrollment.courseId, enrollment.currentModule);
          const courseDetails = enrollment.courseDetails;

          if (!modules.length || !courseDetails) return null;

          return (
            <Card key={enrollment._id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{courseDetails.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Overall Progress</span>
                    <span className="text-sm font-medium">{Math.round(enrollment.overallProgress)}%</span>
                  </div>
                  <Progress value={enrollment.overallProgress} />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Current Module</h4>
                    <p className="text-sm text-gray-500">{currentModule?.title}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Last accessed {new Date(enrollment.lastAccessDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link href={`/dashboard/course/${enrollment.courseId}/learn`}>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}