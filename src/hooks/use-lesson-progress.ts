// src/hooks/use-lesson-progress.ts
import { useState, useCallback } from 'react';

interface LessonProgress {
  lessonId: string;
  progress: number;
  completed: boolean;
  lastPosition?: number;
}

interface ModuleCompletionStatus {
  completed: boolean;
  totalLessons: number;
  completedLessons: number;
}

export function useLessonProgress() {
  const [lessonProgressMap, setLessonProgressMap] = useState<Map<string, LessonProgress>>(new Map());

  const updateLessonProgress = useCallback(async (
    courseId: string,
    moduleId: string,
    lessonId: string,
    progress: number,
    position?: number
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/progress/lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId,
          moduleId,
          lessonId,
          progress,
          position
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update lesson progress');
      }

      setLessonProgressMap(prev => {
        const newMap = new Map(prev);
        newMap.set(lessonId, {
          lessonId,
          progress,
          completed: progress >= 90,
          lastPosition: position
        });
        return newMap;
      });

      return response.json();
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      throw error;
    }
  }, []);

  const checkModuleCompletion = useCallback((
    moduleId: string,
    lessons: { id: string }[]
  ): ModuleCompletionStatus => {
    const completedLessons = lessons.filter(lesson => 
      lessonProgressMap.get(lesson.id)?.completed
    ).length;

    return {
      completed: completedLessons === lessons.length,
      totalLessons: lessons.length,
      completedLessons
    };
  }, [lessonProgressMap]);

  const getLessonProgress = useCallback((lessonId: string): LessonProgress | undefined => {
    return lessonProgressMap.get(lessonId);
  }, [lessonProgressMap]);

  return {
    updateLessonProgress,
    checkModuleCompletion,
    getLessonProgress
  };
}