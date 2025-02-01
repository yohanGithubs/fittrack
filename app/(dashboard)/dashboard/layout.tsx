'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Dumbbell, 
  Settings, 
  LineChart, 
  Calendar,
  Pizza,
  User,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: LineChart, label: 'Overview' },
    { href: '/dashboard/workouts', icon: Dumbbell, label: 'Workouts' },
    { href: '/dashboard/nutrition', icon: Pizza, label: 'Nutrition' },
    { href: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-zinc-900/50 border-b border-zinc-800 p-4 backdrop-blur-sm">
        <div className="flex items-center">
          <Dumbbell className="h-6 w-6 text-red-600 mr-2" />
          <span className="font-medium">FitTrack</span>
        </div>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-zinc-900/50 border-r border-zinc-800 backdrop-blur-sm lg:block
            ${isSidebarOpen ? 'block' : 'hidden'}
            lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-zinc-800 hidden lg:flex items-center">
            <Dumbbell className="h-6 w-6 text-red-600 mr-2" />
            <span className="font-bold text-lg">FitTrack</span>
          </div>

          <nav className="h-full overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={`w-full justify-start mb-2 ${
                    pathname === item.href 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-zinc-900 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}