// src/types/lesson.ts
export interface Resource {
    title: string;
    type: string;
    url: string;
  }
  
  export interface Assessment {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
  export interface Lesson {
    type: 'video';
    title: string;
    content: {
      videoUrl: string;
      description: string;
    };
    resources: Resource[];
    estimatedTime: string;
    difficulty: string;
    skills: string[];
    assessment: Assessment[];
  }
  
  export interface Module {
    id: string;
    title: string;
    lessons: {
      [key: string]: Lesson;
    };
  }
  
  export interface CourseContent {
    [key: string]: Module[];
  }
  
  export const courseContents: CourseContent = {
    // Your course content here
  };
  
  export function getModule(courseId: string, moduleId: string): Module | undefined {
    return courseContents[courseId]?.find((module: Module) => module.id === moduleId);
  }
  
  export function getLesson(courseId: string, moduleId: string, lessonId: string): Lesson | undefined {
    const module = getModule(courseId, moduleId);
    return module?.lessons[lessonId];
  }
  
  export function getAssessment(courseId: string, moduleId: string, lessonId: string): Assessment[] | undefined {
    const lesson = getLesson(courseId, moduleId, lessonId);
    return lesson?.assessment;
  }