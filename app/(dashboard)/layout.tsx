'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dumbbell, Home, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push('/');
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Dumbbell className="h-6 w-6 text-red-600" />
            <span className="ml-2 text-xl font-bold text-white">FitTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            {user ? (
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer size-9 border-2 border-red-600">
                    <AvatarImage alt={user.name || ''} />
                    <AvatarFallback className="bg-red-600 text-white">
                      {user.email
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-zinc-900 border border-red-600/20 text-white">
                  <DropdownMenuItem className="cursor-pointer hover:bg-red-600/10 focus:bg-red-600/10">
                    <Link href="/dashboard" className="flex w-full items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <form action={handleSignOut} className="w-full">
                    <button type="submit" className="flex w-full">
                      <DropdownMenuItem className="w-full flex-1 cursor-pointer hover:bg-red-600/10 focus:bg-red-600/10">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white"
                  asChild
                >
                  <Link href="/sign-in">Log in</Link>
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  asChild
                >
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm">
            <Link
              href="/features"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              Pricing
            </Link>
            {!user && (
              <>
                <Link
                  href="/sign-in"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 text-base font-medium text-red-600 hover:text-red-500"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
    </div>
  );
}