
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface TransitionEffectProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-up' | 'slide-in' | 'blur-in';
  delay?: number;
}

const TransitionEffect: React.FC<TransitionEffectProps> = ({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-up': 'animate-fade-up',
    'slide-in': 'animate-slide-in',
    'blur-in': 'animate-blur-in',
  };

  return (
    <div
      className={cn(
        'transition-gpu',
        isVisible ? animationClasses[animation] : 'opacity-0',
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export default TransitionEffect;
