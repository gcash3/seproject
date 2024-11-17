// src/data/instructors.ts
export type Instructor = {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    specialization: string;
    achievements: string[];
    courses: string[];
    social: {
      linkedin: string;
      twitter: string;
      github: string;
    };
  };
  
  export const instructors: Instructor[] = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "AI Research Scientist",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=Nolan",
      bio: "Former Google AI researcher with 15+ years of experience in machine learning and deep learning. Led multiple successful AI projects and published numerous research papers.",
      specialization: "Deep Learning, Neural Networks",
      achievements: [
        "PhD in Computer Science from Stanford",
        "20+ Research Papers in Top AI Conferences",
        "Former Lead at Google AI Research",
        "AI Innovation Award 2023"
      ],
      courses: [
        "Introduction to AI",
        "Deep Learning Fundamentals",
        "Neural Network Architectures"
      ],
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        github: "https://github.com/sarahchen"
      }
    },
    {
      id: 2,
      name: "Prof. James Wilson",
      role: "ML Engineering Lead",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=Amaya",
      bio: "Ex-Tesla AI team lead specializing in computer vision and autonomous systems. Passionate about bridging the gap between theory and practical applications.",
      specialization: "Computer Vision, Autonomous Systems",
      achievements: [
        "MS in Robotics from MIT",
        "15+ Patents in AI and Robotics",
        "Former Tesla Autopilot Team Lead",
        "Technical Advisor for AI Startups"
      ],
      courses: [
        "Computer Vision Applications",
        "Autonomous Systems Design",
        "Advanced Machine Learning"
      ],
      social: {
        linkedin: "https://linkedin.com/in/jameswilson",
        twitter: "https://twitter.com/jameswilson",
        github: "https://github.com/jameswilson"
      }
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "NLP Expert",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=Oliver",
      bio: "Leading researcher in natural language processing with a focus on transformer architectures and multilingual models. PhD from MIT with 10+ years of industry experience.",
      specialization: "NLP, Transformers",
      achievements: [
        "PhD in NLP from MIT",
        "Lead Author of BERT-Multi",
        "Distinguished Researcher Award",
        "100+ Citations in NLP Research"
      ],
      courses: [
        "Natural Language Processing",
        "Advanced Transformers",
        "Multilingual AI Systems"
      ],
      social: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        twitter: "https://twitter.com/emilyrodriguez",
        github: "https://github.com/emilyrodriguez"
      }
    },
    {
      id: 4,
      name: "Dr. Michael Chang",
      role: "AI Ethics Researcher",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=Emery",
      bio: "Specialized in AI ethics and responsible AI development. Advocates for transparent and fair AI systems. Regular contributor to major AI ethics conferences.",
      specialization: "AI Ethics, Responsible AI",
      achievements: [
        "PhD in AI Ethics",
        "Author of 'Ethical AI Framework'",
        "UN AI Advisory Board Member",
        "Tech Ethics Leadership Award"
      ],
      courses: [
        "AI Ethics and Governance",
        "Responsible AI Development",
        "Fair Machine Learning"
      ],
      social: {
        linkedin: "https://linkedin.com/in/michaelchang",
        twitter: "https://twitter.com/michaelchang",
        github: "https://github.com/michaelchang"
      }
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      role: "Computer Vision Specialist",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=Mackenzie",
      bio: "Expert in computer vision and image processing with extensive experience in both academia and industry. Passionate about making CV accessible to everyone.",
      specialization: "Computer Vision, Image Processing",
      achievements: [
        "PhD in Computer Vision",
        "Principal Research Scientist at Adobe",
        "Computer Vision Innovation Award",
        "50+ Patents in Image Processing"
      ],
      courses: [
        "Computer Vision Fundamentals",
        "Advanced Image Processing",
        "Real-time Object Detection"
      ],
      social: {
        linkedin: "https://linkedin.com/in/lisaanderson",
        twitter: "https://twitter.com/lisaanderson",
        github: "https://github.com/lisaanderson"
      }
    }
  ];