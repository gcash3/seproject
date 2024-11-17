// src/components/landing-page/pricing-section.tsx
"use client"

import { Star } from 'lucide-react';

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Access to free courses",
      "Community support",
      "Basic AI tools",
      "Course previews"
    ]
  },
  {
    name: "Pro",
    price: "$29/month",
    features: [
      "All Basic features",
      "300+ Premium courses",
      "1-on-1 mentorship",
      "AI project reviews",
      "Career guidance"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99/month",
    features: [
      "All Pro features",
      "Custom learning paths",
      "Team collaboration",
      "API access",
      "Priority support"
    ]
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your AI learning journey. 
            All plans include access to our growing community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`
                p-8 rounded-2xl bg-white dark:bg-gray-800 border-2 
                ${plan.popular ? 'border-blue-600 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
                hover:shadow-xl transition-all duration-300 relative
                ${plan.popular ? 'scale-105 md:scale-110' : 'scale-100'}
              `}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm rounded-full">
                  Most Popular
                </span>
              )}
              
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && (
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`
                  w-full py-3 rounded-full transition-all duration-300
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}
                `}
              >
                {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>Prices in USD. VAT may apply.</p>
        </div>
      </div>
    </section>
  );
}