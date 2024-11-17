// src/data/courses.ts
export type Course = {
    id: number;
    title: string;
    instructor: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    previewVideo: string;
    category: string;
    duration: string;
    level: string;
    description: string;
    learningOutcomes: string[];
    prerequisites: string[];
    syllabus: {
      week: number;
      title: string;
      content: string[];
    }[];
    tools: string[];
    certificationType: string;
  };
  
  export const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Artificial Intelligence",
      instructor: "Dr. Sarah Chen",
      price: 0.00,
      rating: 4.8,
      reviews: 342,
      image: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewVideo: "https://www.youtube.com/embed/JMUxmLyrhSk",
      category: "AI Fundamentals",
      duration: "10 weeks",
      level: "Beginner",
      description: "A comprehensive introduction to AI concepts, machine learning basics, and practical applications. Learn the foundations of artificial intelligence and start your journey in AI.",
      learningOutcomes: [
        "Understand core AI concepts and terminology",
        "Build simple machine learning models",
        "Apply AI to real-world problems",
        "Evaluate AI systems and their performance"
      ],
      prerequisites: [
        "Basic Python programming",
        "High school mathematics",
        "No prior AI knowledge required"
      ],
      syllabus: [
        {
          week: 1,
          title: "Introduction to AI",
          content: ["What is AI?", "History of AI", "Types of AI", "AI Applications"]
        },
        {
          week: 2,
          title: "Machine Learning Basics",
          content: ["Supervised Learning", "Unsupervised Learning", "Model Training", "Evaluation Metrics"]
        }
      ],
      tools: ["Python", "Jupyter Notebooks", "Scikit-learn", "TensorFlow"],
      certificationType: "Professional Certificate"
    },
    {
      id: 2,
      title: "Deep Learning Specialization",
      instructor: "Prof. James Wilson",
      price: 0.00,
      rating: 4.9,
      reviews: 567,
      image: "https://media.istockphoto.com/id/2054876919/photo/big-data-analytics-with-ai-technology-data-analyst-analyzing-and-visualizing-complex.webp?s=2048x2048&w=is&k=20&c=yocxY3v1ctirKqayVAMvumA0eWumHiEpKmNyv2T8cC0=",
      previewVideo: "https://www.youtube.com/embed/aircAruvnKk",
      category: "Deep Learning",
      duration: "12 weeks",
      level: "Intermediate",
      description: "Master deep learning fundamentals and build real-world neural networks. Dive deep into neural architectures and advanced concepts.",
      learningOutcomes: [
        "Build and train deep neural networks",
        "Implement CNN and RNN architectures",
        "Optimize neural network performance",
        "Deploy models to production"
      ],
      prerequisites: [
        "Strong Python programming skills",
        "Basic machine learning knowledge",
        "Linear algebra and calculus"
      ],
      syllabus: [
        {
          week: 1,
          title: "Neural Networks Fundamentals",
          content: ["Neurons and Layers", "Activation Functions", "Forward/Backward Propagation", "Gradient Descent"]
        },
        {
          week: 2,
          title: "Convolutional Neural Networks",
          content: ["CNN Architecture", "Convolution Operations", "Pooling Layers", "Image Recognition"]
        }
      ],
      tools: ["PyTorch", "TensorFlow", "Google Colab", "NVIDIA CUDA"],
      certificationType: "Specialization Certificate"
    },
    {
      id: 3,
      title: "Natural Language Processing Mastery",
      instructor: "Dr. Emily Rodriguez",
      price: 129.99,
      rating: 4.7,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewVideo: "https://www.youtube.com/embed/CMrHM8a3hqw",
      category: "NLP",
      duration: "8 weeks",
      level: "Advanced",
      description: "Learn cutting-edge NLP techniques and build language processing applications using transformers and advanced models.",
      learningOutcomes: [
        "Implement text processing pipelines",
        "Build transformer-based models",
        "Create chatbots and language generators",
        "Fine-tune pre-trained models"
      ],
      prerequisites: [
        "Advanced Python programming",
        "Deep learning fundamentals",
        "Basic linguistics knowledge"
      ],
      syllabus: [
        {
          week: 1,
          title: "Text Processing Fundamentals",
          content: ["Tokenization", "Text Cleaning", "Feature Extraction", "Word Embeddings"]
        },
        {
          week: 2,
          title: "Transformer Architecture",
          content: ["Attention Mechanism", "Self-Attention", "Encoder-Decoder", "BERT and GPT"]
        }
      ],
      tools: ["Hugging Face", "SpaCy", "NLTK", "TensorFlow"],
      certificationType: "Expert Certificate"
    },
    {
      id: 4,
      title: "Computer Vision and Image Recognition",
      instructor: "Dr. Lisa Anderson",
      price: 139.99,
      rating: 4.8,
      reviews: 356,
      image: "https://plus.unsplash.com/premium_photo-1682689792780-426b0057c9b0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewVideo: "https://www.youtube.com/embed/OcycT1Jwp5g",
      category: "Computer Vision",
      duration: "10 weeks",
      level: "Intermediate",
      description: "Master computer vision techniques and build advanced image recognition systems using modern deep learning approaches.",
      learningOutcomes: [
        "Implement image processing pipelines",
        "Build object detection systems",
        "Create image segmentation models",
        "Deploy computer vision applications"
      ],
      prerequisites: [
        "Python programming",
        "Basic deep learning knowledge",
        "Linear algebra fundamentals"
      ],
      syllabus: [
        {
          week: 1,
          title: "Image Processing Basics",
          content: ["Digital Image Fundamentals", "Image Transformations", "Feature Detection", "Edge Detection"]
        },
        {
          week: 2,
          title: "Deep Learning for Vision",
          content: ["CNN Architectures", "Transfer Learning", "Object Detection", "Image Segmentation"]
        }
      ],
      tools: ["OpenCV", "PyTorch", "TensorFlow", "YOLO"],
      certificationType: "Professional Certificate"
    },
    {
      id: 5,
      title: "Reinforcement Learning",
      instructor: "Prof. David Kim",
      price: 159.99,
      rating: 4.9,
      reviews: 278,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewVideo: "https://www.youtube.com/embed/Mut_u40Sqz4",
      category: "Reinforcement Learning",
      duration: "11 weeks",
      level: "Advanced",
      description: "Learn advanced reinforcement learning techniques and build intelligent agents for complex decision-making tasks.",
      learningOutcomes: [
        "Understand RL frameworks",
        "Implement Q-learning algorithms",
        "Build deep RL systems",
        "Create game-playing agents"
      ],
      prerequisites: [
        "Strong programming skills",
        "Probability and statistics",
        "Deep learning fundamentals"
      ],
      syllabus: [
        {
          week: 1,
          title: "RL Foundations",
          content: ["Markov Decision Processes", "Value Functions", "Policy Iteration", "Q-Learning"]
        },
        {
          week: 2,
          title: "Deep RL",
          content: ["DQN", "Policy Gradients", "Actor-Critic Methods", "PPO"]
        }
      ],
      tools: ["OpenAI Gym", "PyTorch", "TensorFlow", "Stable Baselines"],
      certificationType: "Expert Certificate"
    }
  ];