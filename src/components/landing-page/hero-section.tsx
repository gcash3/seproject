// src/components/landing-page/hero-section.tsx
"use client"

import { Sparkles, ChevronRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Free trial badge */}
          <div className="inline-block animate-bounce-slow">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4 mr-1" />
              14 Days Free Trial
            </span>
          </div>
          
          {/* Main heading */}
          <h1 className="mt-8 text-5xl md:text-6xl font-bold leading-tight tracking-tight animate-fade-in">
            Master the Future with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              AI Technology
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 animate-fade-in-delay">
            Join over 100,000 students mastering AI, Machine Learning, and Deep Learning. 
            Start your journey with industry experts today.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold">
              <span>Get Started</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">100K+</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">300+</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">AI Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">95%</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}