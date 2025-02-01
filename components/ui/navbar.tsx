'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dumbbell, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-300 
          ${isScrolled ? 'bg-black/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold text-white">FitTrack</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Log in
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`
          fixed top-0 right-0 w-full h-screen bg-black z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}
      >
        <div className="pt-24 px-6 space-y-6">
          <a 
            href="#features" 
            className="block text-lg text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#pricing" 
            className="block text-lg text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <a 
            href="#about" 
            className="block text-lg text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <div className="space-y-4 pt-6">
            <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
              Log in
            </Button>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}