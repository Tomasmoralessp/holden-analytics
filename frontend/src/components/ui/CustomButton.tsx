
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  withArrow?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = 'primary', size = 'default', withArrow = false, children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-holden-cyan hover:bg-holden-cyan/90 text-white shadow-md hover:shadow-lg',
      secondary: 'bg-holden-dark hover:bg-holden-dark/90 text-white',
      outline: 'border border-holden-dark/20 bg-transparent hover:bg-holden-light text-holden-dark',
      ghost: 'bg-transparent hover:bg-holden-light text-holden-dark',
      link: 'bg-transparent underline-offset-4 hover:underline text-holden-dark p-0 h-auto'
    };

    // Map our custom variants to Button's expected variants
    const buttonVariant = variant === 'primary' ? 'default' : variant;

    return (
      <Button
        ref={ref}
        variant={buttonVariant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}
        size={size}
        className={cn(
          'font-medium transition-all duration-300 ease-in-out rounded-xl',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
        {withArrow && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </Button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
