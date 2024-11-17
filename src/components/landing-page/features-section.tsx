// src/components/landing-page/features-section.tsx
import { BookOpen, Users, GraduationCap } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "300+ AI Courses",
    description: "Comprehensive curriculum covering Machine Learning, Deep Learning, and more"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Instructors",
    description: "Learn from industry leaders and AI researchers"
  },
  {
    icon: <GraduationCap className="h-6 w-6" />, // Changed from Certificate to GraduationCap
    title: "Certificates",
    description: "Earn recognized certificates upon course completion"
  }
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}