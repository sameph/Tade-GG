
import React, { useState, useEffect } from "react";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading time with progressive loading
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + (100 - prev) / 10;
        return Math.min(newValue, 99);
      });
    }, 100);

    // Simulate final loading completion
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] bg-gradient-to-br from-tadegg-cream to-tadegg-offWhite flex flex-col items-center justify-center",
        "transition-opacity duration-500",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative mb-2">
        <div className="animate-spin-slow">
          <Coffee size={70} className="text-tadegg-burgundy" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <span className="font-serif font-bold text-2xl text-tadegg-green animate-pulse">T</span> */}
        </div>
      </div>
      
      <h2 className="mt-4 font-serif text-2xl text-tadegg-brown animate-fade-in">Tadegg</h2>
      <p className="text-tadegg-brown/70 mt-2 animate-fade-in" style={{ animationDelay: "200ms" }}>Premium Ethiopian Coffee</p>
      
      <div className="mt-8 w-64 h-2 bg-tadegg-brown/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-tadegg-burgundy transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="mt-2 text-sm text-tadegg-brown/60 animate-fade-in" style={{ animationDelay: "400ms" }}>
        {Math.round(progress)}%
      </p>
    </div>
  );
};

export default Preloader;
