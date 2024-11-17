// src/lib/prerequisites.ts
import { courseModules } from '@/data/courseModules';
import { ModuleProgress } from '@/types/enrollment';

export function canAccessModule(
  courseId: number,
  moduleId: string,
  moduleProgress: ModuleProgress[]
): { canAccess: boolean; missingPrerequisites: string[] } {
  const course = courseModules[courseId];
  if (!course) {
    return { canAccess: false, missingPrerequisites: [] };
  }

  const module = course.find(m => m.id === moduleId);
  if (!module) {
    return { canAccess: false, missingPrerequisites: [] };
  }

  const completedModules = moduleProgress
    .filter(mp => mp.completed && mp.assessmentCompleted)
    .map(mp => mp.moduleId);

  const missingPrerequisites = module.prerequisiteModules.filter(
    prereqId => !completedModules.includes(prereqId)
  );

  return {
    canAccess: missingPrerequisites.length === 0,
    missingPrerequisites
  };
}

export function getPrerequisiteNames(courseId: number, prerequisites: string[]): string[] {
  const course = courseModules[courseId];
  if (!course) return [];

  return prerequisites.map(prereqId => {
    const module = course.find(m => m.id === prereqId);
    return module ? module.title : prereqId;
  });
}