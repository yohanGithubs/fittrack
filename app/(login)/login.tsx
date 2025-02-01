'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' },
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="flex justify-center">
          <div className="bg-red-600/10 p-4 rounded-full backdrop-blur-sm border border-red-600/20">
            <Dumbbell className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {mode === 'signin'
            ? 'Welcome Back!'
            : 'Start Your Fitness Journey'}
        </h2>
        <p className="mt-2 text-center text-gray-400">
          {mode === 'signin'
            ? 'Continue your fitness journey'
            : 'Create an account to track your progress'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="bg-zinc-900/50 backdrop-blur-sm py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-red-600/20">
          <form className="space-y-6" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={state.email}
                  required
                  maxLength={50}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-black border border-zinc-800 placeholder-gray-500 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    mode === 'signin' ? 'current-password' : 'new-password'
                  }
                  defaultValue={state.password}
                  required
                  minLength={8}
                  maxLength={100}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-black border border-zinc-800 placeholder-gray-500 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {state?.error && (
              <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {state.error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : mode === 'signin' ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900/50 text-gray-400">
                  {mode === 'signin'
                    ? 'New to FitTrack?'
                    : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                  redirect ? `?redirect=${redirect}` : ''
                }${priceId ? `&priceId=${priceId}` : ''}`}
                className="w-full flex justify-center py-2 px-4 border border-zinc-800 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-black hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                {mode === 'signin'
                  ? 'Create an account'
                  : 'Sign in to existing account'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}