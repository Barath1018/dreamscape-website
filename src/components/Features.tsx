import React from 'react';
import { BookOpen, Users, LineChart, GraduationCap, MessageCircle, Brain } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Dream Analysis',
    description: 'Advanced natural language processing to provide personalized dream interpretations based on psychological theories.',
    icon: Brain
  },
  {
    name: 'Dream Journal',
    description: 'Record and track your dreams in a beautiful, intuitive interface designed for reflection and insight.',
    icon: BookOpen
  },
  {
    name: 'Community Sharing',
    description: 'Connect with fellow dreamers, share experiences, and gain diverse perspectives on dream interpretations.',
    icon: Users
  },
  {
    name: 'Pattern Recognition',
    description: 'Visualize recurring themes and symbols in your dreams through interactive charts and analytics.',
    icon: LineChart
  },
  {
    name: 'Educational Resources',
    description: 'Access comprehensive guides and articles about dream psychology and interpretation methods.',
    icon: GraduationCap
  },
  {
    name: 'Interactive Discussions',
    description: 'Engage in meaningful conversations about dreams and their significance in our lives.',
    icon: MessageCircle
  }
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Your Dreams
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover the powerful features that make DreamScape your perfect companion for dream exploration and understanding.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-[0px_4px_20px_#6C25FF] transition-transform" 
                style={{
                  transition: 'transform 0.3s ease-out',
                }}
                onMouseMove={(e) => {
                  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - left) / width - 0.5;
                  const y = (e.clientY - top) / height - 0.5;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                }}
              >
                <div className="absolute top-8 left-8">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="mt-12">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
