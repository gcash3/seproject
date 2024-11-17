// src/types/api.ts
export interface ProgressUpdateRequest {
    courseId: string;
    moduleId: string;
    lessonId: string;
    progress: number;
    position?: number;
  }
  
  export interface ProgressResponse {
    success: boolean;
    progress: number;
    completed: boolean;
  }