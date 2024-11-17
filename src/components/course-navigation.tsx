// src/components/course-navigation.tsx
import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, FileText } from 'lucide-react';
import Link from 'next/link';

interface LessonContent {
  type: string;
  title: string;
  content: {
    videoUrl: string;
    description: string;
  };
  resources: {
    title: string;
    type: string;
    url: string;
  }[];
  estimatedTime: string;
  difficulty: string;
  skills: string[];
}

interface CourseNavigationProps {
  lessons: { [key: string]: LessonContent };
  currentLesson?: string;
  courseId: string;
}

export function CourseNavigation({ lessons, currentLesson, courseId }: CourseNavigationProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-gray-900 dark:text-white"
        >
          <span className="font-semibold">Course Content</span>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
      
      {expanded && (
        <div className="flex-1 overflow-y-auto">
          {Object.entries(lessons).map(([lessonKey, lesson]) => (
            <Link
              key={lessonKey}
              href={`/dashboard/course/${courseId}/lesson/${encodeURIComponent(lessonKey)}`}
            >
              <div 
                className={`
                  p-4 flex items-start space-x-3 cursor-pointer
                  ${currentLesson === lessonKey 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                `}
              >
                {lesson.type === 'video' ? (
                  <Play className="w-4 h-4 mt-1 flex-shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {lesson.estimatedTime} • {lesson.difficulty}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}