"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Lock, 
  Play, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  BookOpen,
  ArrowRight,
  ArrowLeft 
} from 'lucide-react';
import { courseModules } from '@/data/courseModules';
import { VideoPlayer } from '@/components/video-player';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';
import { ModuleProgress, LessonProgress } from '@/types/enrollment';

interface Module {
  id: string;
  title: string;
  description: string;
  prerequisiteModules: string[];
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text';
  content: {
    videoUrl?: string;
    description: string;
  };
}

export default function LessonViewer() {
  const params = useParams();
  const router = useRouter();
  
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAssessment, setShowAssessment] = useState(false);
  const [nextModuleAvailable, setNextModuleAvailable] = useState(false);

  const getCourseId = (): number | null => {
    const id = parseInt(params.courseId as string, 10);
    return isNaN(id) ? null : id;
  };

  useEffect(() => {
    fetchProgress();
  }, [params.courseId]);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const courseId = getCourseId();
      
      if (!token || courseId === null) {
        throw new Error('Invalid course ID or missing token');
      }

      const res = await fetch(`/api/enrollments/${courseId}/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch progress');

      const data = await res.json();
      setModuleProgress(data.moduleProgress);
      
      const modules = courseModules[courseId];
      if (!modules) throw new Error('Course not found');

      const foundModule = modules.find((m: Module) => m.id === data.currentModule);
      
      if (foundModule) {
        setCurrentModule(foundModule);
        setCurrentLesson(foundModule.lessons[0]);
        checkNextModuleAvailability(foundModule, data.moduleProgress);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
      setError('Failed to load course progress');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (moduleId: string, lessonId: string, progress: number) => {
    try {
      const token = localStorage.getItem('token');
      const courseId = getCourseId();
      
      if (!token || courseId === null) {
        throw new Error('Invalid course ID or missing token');
      }

      await fetch(`/api/enrollments/${courseId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          moduleId,
          lessonId,
          progress
        })
      });

      setModuleProgress(prev => {
        const newProgress = [...prev];
        const moduleIndex = newProgress.findIndex(m => m.moduleId === moduleId);
        
        if (moduleIndex !== -1) {
          newProgress[moduleIndex].videoProgress = Math.max(
            newProgress[moduleIndex].videoProgress,
            progress
          );

          if (progress >= 90 && currentModule) {
            const allLessonsCompleted = currentModule.lessons.every(lesson => {
              const lessonProgress = newProgress[moduleIndex].lessons.find(
                lp => lp.lessonId === lesson.id
              );
              return lessonProgress?.completed;
            });

            if (allLessonsCompleted) {
              newProgress[moduleIndex].completed = true;
              checkNextModuleAvailability(currentModule, newProgress);
            }
          }
        }
        return newProgress;
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive"
      });
    }
  };

  const handleVideoProgress = (progress: number) => {
    if (!currentModule || !currentLesson) return;
    updateProgress(currentModule.id, currentLesson.id, progress);
  };

  const handleVideoComplete = () => {
    if (!currentModule || !currentLesson) return;
    updateProgress(currentModule.id, currentLesson.id, 100);
  };

  const isModuleLocked = (module: Module): boolean => {
    if (!module.prerequisiteModules.length) return false;
    
    return !module.prerequisiteModules.every(prereqId => {
      const progress = moduleProgress.find(p => p.moduleId === prereqId);
      return progress?.completed && progress?.assessmentCompleted;
    });
  };

  const checkNextModuleAvailability = (module: Module, progress: ModuleProgress[]) => {
    const courseId = getCourseId();
    if (courseId === null) return;

    const modules = courseModules[courseId];
    if (!modules) return;

    const currentIndex = modules.findIndex((m: Module) => m.id === module.id);
    const nextModule = modules[currentIndex + 1];

    if (nextModule) {
      const currentProgress = progress.find(p => p.moduleId === module.id);
      setNextModuleAvailable(
        Boolean(currentProgress?.completed && 
        currentProgress?.assessmentCompleted &&
        !isModuleLocked(nextModule))
      );
    } else {
      setNextModuleAvailable(false);
    }
  };

  const navigateToNextLesson = () => {
    if (!currentModule || !currentLesson) return;
    
    const courseId = getCourseId();
    if (courseId === null) return;

    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLesson(currentModule.lessons[currentLessonIndex + 1]);
    } else if (nextModuleAvailable) {
      const modules = courseModules[courseId];
      if (!modules) return;
      
      const currentModuleIndex = modules.findIndex((m: Module) => m.id === currentModule.id);
      const nextModule = modules[currentModuleIndex + 1];
      
      if (nextModule) {
        setCurrentModule(nextModule);
        setCurrentLesson(nextModule.lessons[0]);
      }
    } else {
      const progress = moduleProgress.find(p => p.moduleId === currentModule.id);
      if (progress?.completed && !progress?.assessmentCompleted) {
        setShowAssessment(true);
      }
    }
  };

  const navigateToPreviousLesson = () => {
    if (!currentModule || !currentLesson) return;

    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    if (currentLessonIndex > 0) {
      setCurrentLesson(currentModule.lessons[currentLessonIndex - 1]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Module Navigation */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-800 overflow-y-auto bg-white dark:bg-gray-900">
        {(() => {
          const courseId = getCourseId();
          return courseId !== null && courseModules[courseId]?.map((module: Module) => {
            const progress = moduleProgress.find(p => p.moduleId === module.id);
            const locked = isModuleLocked(module);

            return (
              <div key={module.id} className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{module.title}</h3>
                  {locked ? (
                    <Lock className="w-4 h-4 text-gray-400" />
                  ) : progress?.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : null}
                </div>

                <Progress 
                  value={progress?.videoProgress || 0} 
                  className="mb-2"
                />

                {locked && (
                  <p className="text-sm text-red-500">
                    Complete previous modules first
                  </p>
                )}

                {!locked && (
                  <div className="space-y-2">
                    {module.lessons.map((lessonItem) => (
                      <Button
                        key={lessonItem.id}
                        variant={currentLesson?.id === lessonItem.id ? "default" : "ghost"}
                        className="w-full justify-start text-sm"
                        onClick={() => {
                          setCurrentModule(module);
                          setCurrentLesson(lessonItem);
                        }}
                      >
                        {lessonItem.type === 'video' ? (
                          <Play className="w-4 h-4 mr-2" />
                        ) : (
                          <FileText className="w-4 h-4 mr-2" />
                        )}
                        {lessonItem.title}
                      </Button>
                    ))}

                    {progress?.completed && !progress?.assessmentCompleted && (
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm text-orange-500 border-orange-500"
                        onClick={() => setShowAssessment(true)}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Take Assessment
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          });
        })()}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 overflow-y-auto">
          {currentLesson?.type === 'video' ? (
            <div className="aspect-video bg-black">
              <VideoPlayer
                src={currentLesson.content.videoUrl}
                onProgress={handleVideoProgress}
                onComplete={handleVideoComplete}
              />
            </div>
          ) : (
            <div 
              className="p-8 prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson?.content.description || '' }}
            />
          )}

          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">{currentLesson?.title}</h2>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentLesson?.content.description || '' }}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={navigateToPreviousLesson}
                disabled={!currentLesson || currentModule?.lessons[0].id === currentLesson.id}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>

              <Button
                onClick={navigateToNextLesson}
                disabled={!currentLesson || (!nextModuleAvailable && 
                  currentLesson.id === currentModule?.lessons[currentModule.lessons.length - 1].id)}
              >
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog 
        open={showAssessment} 
        onOpenChange={(value: boolean) => setShowAssessment(value)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Module Assessment</DialogTitle>
            <DialogDescription>
              Complete this assessment to proceed to the next module.
            </DialogDescription>
          </DialogHeader>
          {/* Assessment component will be implemented next */}
        </DialogContent>
      </Dialog>
    </div>
  );
}