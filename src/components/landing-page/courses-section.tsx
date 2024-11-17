// src/components/landing-page/courses-section.tsx
"use client"

import { useState } from 'react';
import { Play, Star, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { courses } from '@/data/courses';

const categories = [
  "All",
  "AI Fundamentals",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Reinforcement Learning",
  "AI Ethics",
  "Generative AI"
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCourseDetailsOpen, setIsCourseDetailsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(course => {
    const matchCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchLevel && matchSearch;
  });

  return (
    <section id="courses" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Popular <span className="text-blue-600 dark:text-blue-400">AI Courses</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn from industry experts and master the latest AI technologies with our comprehensive course library.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsVideoOpen(true);
                    }}
                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.duration}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  by {course.instructor}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                      ({course.reviews})
                    </span>
                  </div>
                  <span className="text-lg font-bold">${course.price}</span>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsCourseDetailsOpen(true);
                    }}
                    className="w-full py-2 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Preview Dialog */}
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className="sm:max-w-[800px] bg-gray-900 border-gray-800">
            <DialogTitle className="text-lg font-semibold text-white">
              {selectedCourse?.title || 'Course Preview'}
            </DialogTitle>
            {selectedCourse && (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedCourse.previewVideo}
                  title={selectedCourse.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Course Details Dialog */}
        <Dialog open={isCourseDetailsOpen} onOpenChange={setIsCourseDetailsOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogTitle>Course Details</DialogTitle>
            {selectedCourse && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                
                <div className="flex items-center space-x-4">
                  <span className="text-blue-600 dark:text-blue-400">{selectedCourse.category}</span>
                  <span>•</span>
                  <span>{selectedCourse.level}</span>
                  <span>•</span>
                  <span>{selectedCourse.duration}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                  {selectedCourse.description}
                </p>

                <div>
                  <h3 className="font-bold text-lg mb-2">Learning Outcomes</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedCourse.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Prerequisites</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedCourse.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Course Syllabus</h3>
                  <div className="space-y-4">
                    {selectedCourse.syllabus.map((week) => (
                      <div key={week.week} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <h4 className="font-bold">Week {week.week}: {week.title}</h4>
                        <ul className="list-disc pl-5 mt-2">
                          {week.content.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              

<div>
  <h3 className="font-bold text-lg mb-2">Tools & Technologies</h3>
  <div className="flex flex-wrap gap-2">
    {selectedCourse.tools.map((tool, index) => (
      <span 
        key={index}
        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm"
      >
        {tool}
      </span>
    ))}
  </div>
</div>

<div>
  <h3 className="font-bold text-lg mb-2">Certification</h3>
  <p className="text-gray-600 dark:text-gray-300">
    {selectedCourse.certificationType}
  </p>
</div>

<div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 gap-4">
  <div>
    <span className="text-3xl font-bold">${selectedCourse.price}</span>
    <span className="text-gray-600 dark:text-gray-400 ml-2">One-time payment</span>
  </div>
  <div className="flex gap-4 w-full sm:w-auto">
    <button 
      onClick={() => setIsVideoOpen(true)}
      className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-1 sm:flex-none"
    >
      Watch Preview
    </button>
    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none">
      Enroll Now
    </button>
  </div>
</div>
</div>
)}
</DialogContent>
</Dialog>
</div>
</section>
);
}