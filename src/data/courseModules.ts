// src/data/courseModules.ts
interface VideoContent {
    videoUrl: string;
    description: string;
    duration: string;
  }
  
  export interface Lesson {
    id: string;
    title: string;
    type: 'video';
    content: VideoContent;
    resources: Array<{
      title: string;
      type: string;
      url: string;
    }>;
    estimatedTime: string;
    difficulty: string;
    skills: string[];
  }
  
  export interface Module {
    id: string;
    title: string;
    description: string;
    prerequisiteModules: string[];
    lessons: Lesson[];
    assessment?: Assessment;
  }
  
  export interface Assessment {
    id: string;
    title: string;
    questions: Array<{
      id: string;
      text: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
    passingScore: number;
    timeLimit: number;
  }
  
  export const courseModules: Record<number, Module[]> = {
    1: [ // AI Fundamentals
      {
        id: "ai-basics",
        title: "Introduction to AI",
        description: "Fundamental concepts of Artificial Intelligence",
        prerequisiteModules: [],
        lessons: [
          {
            id: "ai-intro",
            title: "What is Artificial Intelligence?",
            type: "video",
            content: {
              videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
              description: "Introduction to the core concepts of AI...",
              duration: "15:00"
            },
            resources: [
              {
                title: "AI Basics PDF",
                type: "pdf",
                url: "/resources/ai-basics.pdf"
              }
            ],
            estimatedTime: "20 minutes",
            difficulty: "Beginner",
            skills: ["Basic Understanding", "Terminology"]
          }
          // Add more lessons...
        ]
      }
    ],
    2: [ // Deep Learning
      {
        id: "dl-basics",
        title: "Deep Learning Fundamentals",
        description: "Understanding Neural Networks",
        prerequisiteModules: ["ai-basics"],
        lessons: [
          {
            id: "neural-networks-intro",
            title: "Introduction to Neural Networks",
            type: "video",
            content: {
              videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
              description: "Basic concepts of neural networks...",
              duration: "20:00"
            },
            resources: [
              {
                title: "Neural Networks Guide",
                type: "pdf",
                url: "/resources/neural-networks.pdf"
              }
            ],
            estimatedTime: "25 minutes",
            difficulty: "Intermediate",
            skills: ["Python", "Mathematics"]
          }
        ]
      }
    ],
    3: [ // NLP
      {
        id: "nlp-basics",
        title: "Natural Language Processing",
        description: "Basics of NLP and text processing",
        prerequisiteModules: ["dl-basics"],
        lessons: [
          {
            id: "nlp-intro",
            title: "Introduction to NLP",
            type: "video",
            content: {
              videoUrl: "https://www.youtube.com/embed/CMrHM8a3hqw",
              description: "Fundamentals of natural language processing...",
              duration: "25:00"
            },
            resources: [
              {
                title: "NLP Guide",
                type: "pdf",
                url: "/resources/nlp-basics.pdf"
              }
            ],
            estimatedTime: "30 minutes",
            difficulty: "Advanced",
            skills: ["Python", "Linguistics"]
          }
        ]
      }
    ],
    4: [ // Computer Vision
      {
        id: "cv-basics",
        title: "Computer Vision Fundamentals",
        description: "Introduction to image processing and recognition",
        prerequisiteModules: ["dl-basics"],
        lessons: [
          {
            id: "cv-intro",
            title: "Introduction to Computer Vision",
            type: "video",
            content: {
              videoUrl: "https://www.youtube.com/embed/OcycT1Jwp5g",
              description: "Basic concepts of computer vision...",
              duration: "22:00"
            },
            resources: [
              {
                title: "CV Basics",
                type: "pdf",
                url: "/resources/cv-basics.pdf"
              }
            ],
            estimatedTime: "25 minutes",
            difficulty: "Intermediate",
            skills: ["Python", "OpenCV"]
          }
        ]
      }
    ],
    5: [ // Reinforcement Learning
      {
        id: "rl-basics",
        title: "Reinforcement Learning",
        description: "Introduction to RL concepts",
        prerequisiteModules: ["dl-basics"],
        lessons: [
          {
            id: "rl-intro",
            title: "Introduction to Reinforcement Learning",
            type: "video",
            content: {
              videoUrl: "https://www.youtube.com/embed/Mut_u40Sqz4",
              description: "Basic concepts of reinforcement learning...",
              duration: "28:00"
            },
            resources: [
              {
                title: "RL Guide",
                type: "pdf",
                url: "/resources/rl-basics.pdf"
              }
            ],
            estimatedTime: "35 minutes",
            difficulty: "Advanced",
            skills: ["Python", "Probability"]
          }
        ]
      }
    ]
  };
  
  // Helper function to check prerequisites
  export function checkPrerequisites(courseId: number, moduleId: string, completedModules: string[]): boolean {
    const course = courseModules[courseId];
    if (!course) return false;
  
    const module = course.find(m => m.id === moduleId);
    if (!module) return false;
  
    return module.prerequisiteModules.every(prereqId => completedModules.includes(prereqId));
  }
  
  // Helper function to get module details
  export function getModuleDetails(courseId: number, moduleId: string) {
    const course = courseModules[courseId];
    if (!course) return null;
  
    return course.find(m => m.id === moduleId) || null;
  }