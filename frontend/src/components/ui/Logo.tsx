
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md', 
  className,
  animated = false
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  // Text color based on variant
  const textColor = variant === 'white' ? 'text-white' : 'text-holden-dark';

  // Animation classes
  const animationClasses = animated ? 'transition-all duration-500 hover:scale-105' : '';

  return (
    <Link to="/" className={cn("flex items-center", animationClasses, className)}>
      <div className="relative flex items-center">
        {/* Logo Icon - Circle with arrow */}
        <svg 
          className={cn(sizeClasses[size], "mr-2")} 
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Incomplete Circle */}
          <circle 
            cx="24" 
            cy="24" 
            r="20" 
            fill="none" 
            stroke={variant === 'white' ? '#FFFFFF' : '#1E3A8A'} 
            strokeWidth="4" 
            strokeLinecap="round"
            strokeDasharray="110 30"
            className={animated ? "animate-pulse-slow" : ""}
          />
          
          {/* Upward Arrow */}
          <path 
            d="M24 34V14M16 22L24 14L32 22" 
            stroke={variant === 'white' ? '#FFFFFF' : '#00A3E0'} 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={animated ? "animate-pulse-slow" : ""}
          />
        </svg>
        
        {/* Logo Text */}
        <span className={cn("font-bold tracking-tight", textColor, {
          'text-lg': size === 'sm',
          'text-2xl': size === 'md',
          'text-3xl': size === 'lg',
        })}>
          Holden
        </span>
      </div>
    </Link>
  );
};

export default Logo;
