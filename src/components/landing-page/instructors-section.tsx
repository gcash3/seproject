// src/components/landing-page/instructors-section.tsx
"use client"

import { Globe } from 'lucide-react';
import { instructors } from '@/data/instructors';

export default function InstructorsSection() {
  return (
    <section id="instructors" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Learn from the <span className="text-blue-600 dark:text-blue-400">Best</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our instructors are industry leaders and researchers from top tech companies and institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <div 
              key={instructor.id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="w-full h-64 object-cover bg-gray-100 dark:bg-gray-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{instructor.name}</h3>
                    <p className="text-blue-400">{instructor.role}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                    Specialization
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {instructor.specialization}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                    Key Achievements
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {instructor.achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3">
                  {instructor.bio}
                </p>
                
                <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">

                  <a 
                    href={instructor.social.twitter}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}