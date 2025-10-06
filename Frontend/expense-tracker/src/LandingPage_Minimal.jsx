import React from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowRight, Sparkles } from "lucide-react";
import heroIllustration from "./assets/images/Landing-illustaration.png";
import DarkVeil from "./components/DarkVeil";
import SplitText from "./components/SplitText";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="text-white bg-[#060010] h-screen overflow-hidden" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      {/* Navbar - Fixed */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              ExpenseTracker
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-all"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen Fixed */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dark Veil Animated Background */}
        <DarkVeil />
        
        <div className="relative w-full max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
            <span className="text-white">Master Your Money With</span>
            <br />
            <SplitText 
              text="EFFORTLESS CONTROL" 
              className="text-white"
            />
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Track every rupee, visualize your spending patterns, and build better financial habits. Your all-in-one personal finance companion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="group bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 font-bold text-lg flex items-center justify-center gap-3"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-5 rounded-2xl border-2 border-purple-400/50 bg-transparent text-white hover:bg-purple-500/10 hover:border-purple-400 transition-all font-semibold text-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
