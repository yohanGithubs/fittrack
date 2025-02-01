'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const terminalSteps = [
    'Loading FitTrack System...',
    'Initializing Workout Tracker 🏋️‍♂️',
    'Analyzing Previous Workouts...',
    'Calculating Nutrition Goals 🥗',
    'Setting up Progress Analytics 📊',
    'FitTrack Ready! Let\'s crush your goals! 💪',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalStep((prev) =>
        prev < terminalSteps.length - 1 ? prev + 1 : prev
      );
    }, 800); // Slightly slower for better readability

    return () => clearTimeout(timer);
  }, [terminalStep]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalSteps.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg shadow-2xl overflow-hidden bg-black/80 backdrop-blur-sm text-white font-mono text-sm relative border border-red-600/20">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="space-y-2">
          {terminalSteps.map((step, index) => (
            <div
              key={index}
              className={`
                ${index > terminalStep ? 'opacity-0' : 'opacity-100'}
                transition-opacity duration-500
                ${index === terminalStep ? 'text-red-500' : 'text-gray-300'}
              `}
            >
              <span className="text-red-500 mr-2">{'>'}</span> 
              {step}
              {index === terminalStep && (
                <span className="inline-block animate-pulse ml-1">_</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-red-600/20">
          <div className="text-xs text-gray-400">
            System Status: <span className="text-green-500">Active</span>
            <span className="float-right text-red-500">FitTrack v1.0</span>
          </div>
        </div>
      </div>
      {/* Add a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none"></div>
    </div>
  );
}