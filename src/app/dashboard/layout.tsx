// src/app/dashboard/layout.tsx
"use client"

import { useState, useEffect } from 'react';
import { Home, BookOpen, ClipboardList, BarChart2, User, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useTheme } from "next-themes";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
  }, [user, router]);

  const menuItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/courses" },
    { icon: ClipboardList, label: "Assessment", href: "/dashboard/assessment" },
    { icon: BarChart2, label: "Progress", href: "/dashboard/progress" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/signin');
  };

  if (!mounted || !user) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                AI Academy
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="p-4">
            <Input
              type="text"
              placeholder="Search courses..."
              className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href}>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    pathname === href 
                      ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-center mb-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (theme === 'dark' ? (
                <Sun className="h-4 w-4 mr-2" />
              ) : (
                <Moon className="h-4 w-4 mr-2" />
              ))}
              {mounted && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
            </Button>

            {/* Logout Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Top bar */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="h-full px-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {menuItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Need Help?
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}