import React from 'react';
import { Moon, BookOpen, Users, LineChart, GraduationCap, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="870121065859-3tm8drudeglqo16s8leev4uf3ndks93k.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default App;
