// src/app/dashboard/page.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Search, Filter, GraduationCap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { useAuth } from '@/hooks/use-auth';
import { courses as initialCourses } from '@/data/courses';

export default function DashboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get unique categories from courses data
  const categories = ["All", ...Array.from(new Set(initialCourses.map(course => course.category)))];

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/enrollments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setEnrolledCourses(data);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter courses based on search and category
  const filteredCourses = initialCourses.filter(course => {
    const matchesSearch = (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 bg-background">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey or explore new courses.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border border-input bg-background px-4 py-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {course.level}
                </Badge>
                {course.price === 0 && (
                  <Badge className="bg-green-500">Free</Badge>
                )}
              </div>
            </div>

            <CardContent className="flex flex-col flex-1 p-6">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <GraduationCap className="w-4 h-4 mr-1" />
                {course.instructor}
              </div>

              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground ml-1">({course.reviews})</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </p>
                  <Link href={`/dashboard/course/${course.id}`}>
                    <Button>
                      {course.price === 0 ? "Start Learning" : "View Course"}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No courses found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}