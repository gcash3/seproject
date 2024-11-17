// src/data/lessonContents.ts


interface Assessment {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Module {
  id: string;
  title: string;
  lessons: {
    [key: string]: {
      type: 'video';
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
      assessment: Assessment[];
    };
  };
}

export const courseContents: { [key: string]: Module[] } = {
  "1": [ // Introduction to AI Course
    {
      id: "module-1",
      title: "Foundations of AI",
      lessons: {
        "intro-to-ai": {
          type: "video",
          title: "Introduction to Artificial Intelligence",
          content: {
            videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
            description: `
              <h2 class="text-2xl font-bold mb-4">Introduction to Artificial Intelligence</h2>
              <p class="mb-4">This comprehensive introduction covers the fundamental concepts of AI, its history, and its impact on modern technology.</p>
              
              <h3 class="text-xl font-semibold mb-3">Key Topics</h3>
              <ul class="list-disc pl-6 mb-4">
                <li>What is Artificial Intelligence?</li>
                <li>History and Evolution of AI</li>
                <li>Types of AI Systems</li>
                <li>Applications in Real World</li>
                <li>Current State of AI Technology</li>
                <li>Future Prospects and Challenges</li>
              </ul>
            `
          },
          resources: [
            {
              title: "AI Foundations Slides",
              type: "pdf",
              url: "/resources/ai-foundations.pdf"
            },
            {
              title: "AI History Timeline",
              type: "pdf",
              url: "/resources/ai-timeline.pdf"
            },
            {
              title: "AI Applications Case Studies",
              type: "pdf",
              url: "/resources/ai-cases.pdf"
            },
            {
              title: "AI Industry Report 2024",
              type: "pdf",
              url: "/resources/ai-industry-report.pdf"
            }
          ],
          estimatedTime: "45 minutes",
          difficulty: "Beginner",
          skills: ["None required"],
          assessment: [
            {
              id: "ai-intro-1",
              question: "What is the primary goal of Artificial Intelligence?",
              options: [
                "To replace human workers entirely",
                "To create machines that can simulate human intelligence",
                "To make computers faster",
                "To store more data"
              ],
              correctAnswer: 1,
              explanation: "AI aims to create systems that can simulate human intelligence and decision-making processes."
            },
            {
              id: "ai-intro-2",
              question: "Which of these is NOT a type of AI system?",
              options: [
                "Narrow AI",
                "General AI",
                "Super AI",
                "Natural AI"
              ],
              correctAnswer: 3,
              explanation: "'Natural AI' is not a recognized type of AI system. The main types are Narrow AI (ANI), General AI (AGI), and Super AI (ASI)."
            },
            {
              id: "ai-intro-3",
              question: "When did the field of AI formally begin?",
              options: [
                "1943",
                "1956",
                "1969",
                "1981"
              ],
              correctAnswer: 1,
              explanation: "The field of AI was formally founded at the Dartmouth Conference in 1956, where the term 'Artificial Intelligence' was coined."
            },
            {
              id: "ai-intro-4",
              question: "Which of these is a characteristic of narrow AI?",
              options: [
                "It can perform any intellectual task that a human can",
                "It is designed for a specific task",
                "It has consciousness",
                "It can improve itself indefinitely"
              ],
              correctAnswer: 1,
              explanation: "Narrow AI (ANI) is designed to perform specific tasks and cannot generalize beyond its training."
            }
          ]
        },
        "ai-ethics": {
          type: "video",
          title: "Ethics in AI",
          content: {
            videoUrl: "https://www.youtube.com/embed/ethics-video-id",
            description: `
              <h2 class="text-2xl font-bold mb-4">Ethics in Artificial Intelligence</h2>
              <p class="mb-4">Understanding the ethical implications of AI development and deployment is crucial for responsible innovation.</p>
              
              <h3 class="text-xl font-semibold mb-3">Core Ethics Principles</h3>
              <ul class="list-disc pl-6 mb-4">
                <li>Transparency</li>
                <li>Fairness</li>
                <li>Privacy</li>
                <li>Accountability</li>
                <li>Safety and Security</li>
                <li>Human-Centered Design</li>
                <li>Social Impact Assessment</li>
              </ul>
            `
          },
          resources: [
            {
              title: "AI Ethics Guidelines",
              type: "pdf",
              url: "/resources/ai-ethics-guide.pdf"
            },
            {
              title: "Case Studies in AI Ethics",
              type: "pdf",
              url: "/resources/ethics-cases.pdf"
            },
            {
              title: "AI Bias Research Paper",
              type: "pdf",
              url: "/resources/ai-bias-research.pdf"
            },
            {
              title: "Ethics Framework Template",
              type: "document",
              url: "/resources/ethics-framework.docx"
            }
          ],
          estimatedTime: "60 minutes",
          difficulty: "Beginner",
          skills: ["Critical Thinking"],
          assessment: [
            {
              id: "ethics-1",
              question: "What is algorithmic bias?",
              options: [
                "A programming error in AI systems",
                "When AI systems reflect human prejudices in their decisions",
                "A mathematical formula for AI decision making",
                "A type of computer virus"
              ],
              correctAnswer: 1,
              explanation: "Algorithmic bias occurs when AI systems reflect and amplify human prejudices present in their training data."
            },
            {
              id: "ethics-2",
              question: "What is the principle of AI transparency?",
              options: [
                "Making all AI code open source",
                "Being able to explain how AI makes decisions",
                "Using clear programming languages",
                "Publishing all training data"
              ],
              correctAnswer: 1,
              explanation: "AI transparency refers to the ability to explain and understand how AI systems make their decisions."
            },
            {
              id: "ethics-3",
              question: "Which is a key consideration in AI privacy?",
              options: [
                "Making AI systems faster",
                "Protecting user data and consent",
                "Using the latest technology",
                "Reducing system costs"
              ],
              correctAnswer: 1,
              explanation: "Privacy in AI focuses on protecting user data, obtaining proper consent, and ensuring responsible data handling."
            }
          ]
        },
        "ai-applications": {
          type: "video",
          title: "Real-World AI Applications",
          content: {
            videoUrl: "https://www.youtube.com/embed/applications-video-id",
            description: `
              <h2 class="text-2xl font-bold mb-4">Real-World Applications of AI</h2>
              <p class="mb-4">Explore how AI is transforming various industries and creating new possibilities.</p>
              
              <h3 class="text-xl font-semibold mb-3">Application Areas</h3>
              <ul class="list-disc pl-6 mb-4">
                <li>Healthcare and Medicine</li>
                <li>Finance and Banking</li>
                <li>Transportation</li>
                <li>Manufacturing</li>
                <li>Education</li>
                <li>Entertainment</li>
                <li>Environmental Protection</li>
              </ul>
            `
          },
          resources: [
            {
              title: "Industry Use Cases",
              type: "pdf",
              url: "/resources/ai-use-cases.pdf"
            },
            {
              title: "Implementation Guide",
              type: "pdf",
              url: "/resources/implementation-guide.pdf"
            },
            {
              title: "Success Stories",
              type: "pdf",
              url: "/resources/success-stories.pdf"
            }
          ],
          estimatedTime: "50 minutes",
          difficulty: "Beginner",
          skills: ["Basic Business Understanding"],
          assessment: [
            {
              id: "apps-1",
              question: "Which sector has seen the most AI adoption?",
              options: [
                "Agriculture",
                "Finance",
                "Education",
                "Entertainment"
              ],
              correctAnswer: 1,
              explanation: "The finance sector has been one of the earliest and most extensive adopters of AI technology."
            }
          ]
        }
      }
    },
    {
      id: "module-2",
      title: "Machine Learning Basics",
      lessons: {
        "intro-to-ml": {
          type: "video",
          title: "Introduction to Machine Learning",
          content: {
            videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
            description: `
              <h2 class="text-2xl font-bold mb-4">Introduction to Machine Learning</h2>
              <p class="mb-4">Learn the foundational concepts of machine learning and its applications.</p>
              
              <h3 class="text-xl font-semibold mb-3">Key Concepts</h3>
              <ul class="list-disc pl-6 mb-4">
                <li>What is Machine Learning?</li>
                <li>Types of Machine Learning</li>
                <li>The ML Development Process</li>
                <li>Common Applications</li>
                <li>Data Preparation</li>
                <li>Model Training</li>
                <li>Evaluation Metrics</li>
              </ul>
            `
          },
          resources: [
            {
              title: "ML Fundamentals Guide",
              type: "pdf",
              url: "/resources/ml-fundamentals.pdf"
            },
            {
              title: "Python for ML Setup",
              type: "pdf",
              url: "/resources/python-ml-setup.pdf"
            },
            {
              title: "Basic ML Examples",
              type: "code",
              url: "/resources/ml-examples.ipynb"
            },
            {
              title: "ML Algorithms Cheatsheet",
              type: "pdf",
              url: "/resources/ml-algorithms.pdf"
            },
            {
              title: "Data Preprocessing Guide",
              type: "pdf",
              url: "/resources/data-preprocessing.pdf"
            }
          ],
          estimatedTime: "75 minutes",
          difficulty: "Beginner",
          skills: ["Basic Python", "Basic Math"],
          assessment: [
            {
              id: "ml-intro-1",
              question: "Which of these is a type of machine learning?",
              options: [
                "Progressive learning",
                "Supervised learning",
                "Intuitive learning",
                "Natural learning"
              ],
              correctAnswer: 1,
              explanation: "Supervised learning is one of the three main types of machine learning, along with unsupervised learning and reinforcement learning."
            },
            {
              id: "ml-intro-2",
              question: "What is the primary goal of supervised learning?",
              options: [
                "To find patterns in unlabeled data",
                "To learn from labeled examples to make predictions",
                "To learn through trial and error",
                "To copy human learning patterns"
              ],
              correctAnswer: 1,
              explanation: "Supervised learning uses labeled training data to learn patterns and make predictions on new, unseen data."
            },
            {
              id: "ml-intro-3",
              question: "What is a training dataset?",
              options: [
                "A set of computer programs",
                "A collection of data used to teach the model",
                "A type of neural network",
                "A programming language"
              ],
              correctAnswer: 1,
              explanation: "A training dataset is a collection of examples used to teach a machine learning model patterns and relationships."
            }
          ]
        },
        "supervised-learning": {
          type: "video",
          title: "Supervised Learning Deep Dive",
          content: {
            videoUrl: "https://www.youtube.com/embed/supervised-learning",
            description: `
              <h2 class="text-2xl font-bold mb-4">Supervised Learning</h2>
              <p class="mb-4">A detailed look at supervised learning algorithms and their applications.</p>
              
              <h3 class="text-xl font-semibold mb-3">Topics Covered</h3>
              <ul class="list-disc pl-6 mb-4">
                <li>Classification vs Regression</li>
                <li>Common Algorithms</li>
                <li>Model Selection</li>
                <li>Feature Engineering</li>
                <li>Model Evaluation</li>
              </ul>
            `
          },
          resources: [
            {
              title: "Supervised Learning Guide",
              type: "pdf",
              url: "/resources/supervised-learning.pdf"
            },
            {
              title: "Practice Dataset",
              type: "csv",
              url: "/resources/practice-data.csv"
            }
          ],
          estimatedTime: "90 minutes",
          difficulty: "Intermediate",
          skills: ["Python", "Statistics", "Linear Algebra"],
          assessment: [
            {
              id: "sup-1",
              question: "What is classification?",
              options: [
                "Predicting continuous values",
                "Categorizing data into classes",
                "Clustering similar items",
                "Finding anomalies"
              ],
              correctAnswer: 1,
              explanation: "Classification is the task of categorizing input data into predefined classes or categories."
            }
          ]
        }
      }
    }
  ]
};

// Keeping the existing interfaces...
export interface AssessmentProgress {
  moduleId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: Date;
}

export interface VideoProgress {
  lessonId: string;
  progress: number; // Percentage watched
  completed: boolean;
  lastPosition: number; // Time in seconds
  lastAccessed: Date;
}

export interface ResourceAccess {
  resourceId: string;
  accessed: boolean;
  downloadedAt: Date[];
}