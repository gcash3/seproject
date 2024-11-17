// src/components/landing-page/cta-section.tsx
"use client"

import { Sparkles, ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute h-32 w-32 rounded-full bg-white/10 -top-16 -left-16 animate-float"></div>
        <div className="absolute h-24 w-24 rounded-full bg-white/10 top-1/2 -right-12 animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-1" />
              14-day free trial
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your AI Journey Today
          </h2>
          
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students already learning AI and Machine Learning. 
            No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 font-semibold">
              <span>Start Learning Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-white hover:bg-white/10 transition-colors">
              Talk to Sales
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold">100K+</div>
              <div className="text-blue-100">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-blue-100">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-blue-100">Student Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}