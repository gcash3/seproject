// src/app/dashboard/course/[courseId]/page.tsx
"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';
import { Lock, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { courses } from '@/data/courses';

interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  assessmentCompleted: boolean;
  videoProgress: number;
}

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courseData = courses.find(c => c.id.toString() === params.courseId);
    if (courseData) {
      setCourse(courseData);
      checkEnrollmentStatus();
    }
  }, [params.courseId]);

  const checkEnrollmentStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/enrollments/check/${params.courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setIsEnrolled(data.isEnrolled);
        if (data.isEnrolled) {
          setEnrollmentId(data.enrollmentId);
          fetchModuleProgress(data.enrollmentId);
        }
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleProgress = async (enrollmentId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/enrollments/${enrollmentId}/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setModuleProgress(data.moduleProgress);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleEnroll = async () => {
    if (course.price > 0) {
      setShowPricingDialog(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: params.courseId
        })
      });

      if (!res.ok) throw new Error('Failed to enroll');

      toast({
        title: "Successfully enrolled!",
        description: "You can now start learning. Good luck!",
      });

      router.push('/dashboard/courses');
    } catch (error) {
      toast({
        title: "Enrollment failed",
        description: "There was an error enrolling in the course. Please try again.",
        variant: "destructive",
      });
    }
    setShowEnrollDialog(false);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!course) {
    return <div className="p-8 text-center">Course not found</div>;
  }

  const overallProgress = moduleProgress.length > 0
    ? (moduleProgress.filter(m => m.completed).length / moduleProgress.length) * 100
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{course.level}</span>
          </div>
        </div>
      </div>

      {isEnrolled && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <Progress value={overallProgress} className="mb-2" />
          <p className="text-sm text-gray-500">{Math.round(overallProgress)}% Complete</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="prose dark:prose-invert max-w-none">
            <h2>About this course</h2>
            <p>{course.description}</p>

            <h3>What you'll learn</h3>
            <ul>
              {course.learningOutcomes.map((outcome: string, index: number) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>

            <h3>Prerequisites</h3>
            <ul>
              {course.prerequisites.map((prereq: string, index: number) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="sticky top-8">
            <div className="bg-card rounded-lg shadow-lg p-6 border">
              <div className="mb-6">
                <img 
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="text-3xl font-bold mb-4">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </div>
              </div>

              {!isEnrolled ? (
                <Button 
                  className="w-full mb-4"
                  onClick={() => setShowEnrollDialog(true)}
                >
                  {course.price === 0 ? 'Enroll Now' : 'Get Started'}
                </Button>
              ) : (
                <Button 
                  className="w-full mb-4"
                  onClick={() => router.push(`/dashboard/course/${params.courseId}/learn`)}
                >
                  Continue Learning
                </Button>
              )}

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  <span>{course.certificationType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll in {course.title}</DialogTitle>
            <DialogDescription>
              You're about to start your learning journey. Ready to begin?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEnrollDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnroll}>
              Confirm Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pricing Dialog */}
      <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Premium Course</DialogTitle>
            <DialogDescription>
              This is a premium course priced at ${course.price}. Please contact our support team to learn about payment options and potential discounts.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPricingDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowPricingDialog(false);
              // Add support contact logic here
            }}>
              Contact Support
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}