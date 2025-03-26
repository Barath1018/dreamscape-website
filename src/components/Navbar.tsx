import React from 'react';
import { Moon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Moon className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">DreamScape</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 transition">Journal</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition">Community</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition">Resources</a>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}