import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 font-bold border-2 border-black shadow-hard transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed font-mono uppercase tracking-wider text-sm md:text-base flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-retro-yellow hover:bg-yellow-400 text-black",
    secondary: "bg-white hover:bg-gray-100 text-black",
    danger: "bg-retro-hotPink hover:bg-pink-400 text-white",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
           <div className="w-4 h-4 border-2 border-current border-t-transparent border-r-transparent animate-spin rounded-none"></div>
           <span>PROCESSING...</span>
        </>
      ) : children}
    </button>
  );
};