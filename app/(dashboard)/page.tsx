import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell, Timer, ChartBar, Flame } from 'lucide-react';
import { Terminal } from './terminal';
import { FeatureCard, StatCard } from '@/components/cards';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Gradient Overlay */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image with Gradient */}
        <div 
          className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'multiply'
          }}
        />
        
        {/* Red Accent Line */}
        <div className="absolute top-0 left-0 w-2 h-32 bg-red-600" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <span className="inline-block px-4 py-1 mb-4 bg-red-600 text-white text-sm font-semibold rounded-full">
                TRACK YOUR PROGRESS
              </span>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6">
                TRAIN.
                <span className="block text-red-600">TRACK.</span>
                <span className="block">TRANSFORM.</span>
              </h1>
              <p className="mt-3 text-gray-300 text-xl">
                Your ultimate fitness companion. Track calories, workouts, and progress - all in one powerful app.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full text-lg px-8 py-6 inline-flex items-center justify-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="mt-12 relative lg:mt-0 lg:col-span-6">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-red-600/20 p-4">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Dark Theme */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">UNLEASH YOUR POTENTIAL</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Flame className="h-8 w-8 text-red-600" />}
              title="Calorie Tracking"
              description="Track your daily calories and macros with precision. Stay on top of your nutrition goals."
            />
            <FeatureCard 
              icon={<Dumbbell className="h-8 w-8 text-red-600" />}
              title="Workout Logs"
              description="Record your workouts, sets, reps, and PRs. Watch your strength grow over time."
            />
            <FeatureCard 
              icon={<ChartBar className="h-8 w-8 text-red-600" />}
              title="Progress Analytics"
              description="Visual insights into your fitness journey. Track your improvements with detailed charts."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10K+" label="Active Users" />
            <StatCard number="500K+" label="Workouts Logged" />
            <StatCard number="1M+" label="Meals Tracked" />
            <StatCard number="95%" label="User Satisfaction" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">START YOUR FITNESS JOURNEY TODAY</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are transforming their lives with our tracking tools.
          </p>
          <Button className="bg-black hover:bg-gray-900 text-white rounded-full text-xl px-12 py-6">
            Get Started Free
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-black border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">FitTrack</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-gray-400">
              © 2024 FitTrack. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}