import React, { useState, useRef, useEffect } from 'react';

// Global counter to manage stacking order across all Card instances
let globalZIndex = 100;

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  color?: string; // bg color class
  isDraggable?: boolean;
  onClick?: () => void;
  initialPosition?: { x: number; y: number };
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  onClose, 
  color = 'bg-white dark:bg-gray-900',
  isDraggable = false,
  onClick,
  initialPosition
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [size, setSize] = useState<{ w: string | number; h: string | number }>({ w: 'auto', h: 'auto' });
  const [zIndex, setZIndex] = useState(10);
  const [isDragging, setIsDragging] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);

  // Brings this card to the front of the stack
  const bringToFront = () => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable && !isFixed) return;
    
    // Don't trigger drag if clicking a button or interactive element
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('a')) return;

    dragMovedRef.current = false;

    // Initialize drag: convert from static layout to fixed positioning
    if (!isFixed && isDraggable && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setIsFixed(true);
        setPosition({ x: rect.left, y: rect.top });
        // Capture current dimensions to prevent collapse when removing from flow
        setSize({ 
          w: rect.width, 
          h: isMinimized ? 'auto' : rect.height 
        });
        
        dragOffsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    } else {
        // Already floating
        dragOffsetRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    }

    setIsDragging(true);
    bringToFront();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      dragMovedRef.current = true;
      const newX = e.clientX - dragOffsetRef.current.x;
      const newY = e.clientY - dragOffsetRef.current.y;
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Always bring to front when interacting with the window
    bringToFront();

    // If dragging happened, don't treat it as a click
    if (dragMovedRef.current) return;

    // Don't trigger card click/open if clicking an interactive element
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('a')) return;

    // Trigger external click handler if provided
    if (onClick) {
      onClick();
    }
  };

  // Dynamic styles based on state
  const style: React.CSSProperties = isFixed ? {
    position: 'fixed',
    left: position.x,
    top: position.y,
    width: size.w,
    height: isMinimized ? 'auto' : size.h,
    zIndex: zIndex,
    margin: 0,
  } : {
    position: 'relative',
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <>
      {isFixed && (
        <div 
          className={className} 
          style={{ 
            width: size.w, 
            height: size.h, 
            opacity: 0, 
            pointerEvents: 'none',
            border: 'none',
            margin: 0 
          }} 
        />
      )}
      <div 
        ref={cardRef}
        style={style}
        className={`
          border-2 border-black shadow-hard ${color} ${className} 
          flex flex-col overflow-hidden transition-shadow duration-200
          ${isDragging ? 'shadow-hard-lg cursor-grabbing' : ''}
          ${!isFixed && !isDragging ? 'hover:translate-y-[-2px] hover:shadow-hard-lg' : ''}
          dark:border-white dark:shadow-[4px_4px_0px_0px_#fff]
        `}
        onClick={handleCardClick}
      >
        {/* Title Bar */}
        <div 
          className={`
            bg-black px-2 py-1 flex justify-between items-center border-b-2 border-black select-none group
            ${isDraggable || isFixed ? 'cursor-grab active:cursor-grabbing' : ''}
            dark:bg-black dark:border-white
          `}
          onMouseDown={handleMouseDown}
        >
            <div className="flex items-center flex-1 min-w-0 gap-2 overflow-hidden text-white dark:text-white">
               {/* Retro 3-line decoration */}
               <div className="flex flex-col space-y-[2px] flex-shrink-0">
                  <div className="w-3 h-[2px] bg-white"></div>
                  <div className="w-3 h-[2px] bg-white"></div>
                  <div className="w-3 h-[2px] bg-white"></div>
               </div>
               
               <h3 className="font-display font-bold uppercase tracking-widest text-sm md:text-base truncate px-1 text-retro-neonGreen dark:text-retro-yellow">
                 {title || 'UNTITLED'}
               </h3>

               {/* Drag Handle or Retro Striped Pattern */}
               {isDraggable ? (
                 <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity ml-auto mr-2">
                    <span className="material-icons text-[10px] leading-none">drag_indicator</span>
                    <span className="text-[10px] font-mono tracking-widest leading-none">DRAG_ME</span>
                 </div>
               ) : (
                 <div 
                   className="flex-1 h-3 opacity-50 hidden sm:block mx-2"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)'
                   }}
                 />
               )}
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                className="
                  w-5 h-5 md:w-6 md:h-6 flex items-center justify-center 
                  bg-white border-2 border-black 
                  hover:bg-gray-200 
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  active:shadow-[inset_1px_1px_0px_0px_rgba(0,0,0,1)] 
                  active:translate-x-[2px] active:translate-y-[2px]
                  transition-all 
                  dark:border-black
                "
                aria-label="Minimize"
              >
                <div className="w-3 h-1 bg-black"></div>
              </button>
              
              {onClose && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="
                    w-5 h-5 md:w-6 md:h-6 flex items-center justify-center 
                    bg-retro-hotPink border-2 border-black 
                    hover:bg-pink-400 
                    text-white font-bold text-xs md:text-sm
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    active:shadow-[inset_1px_1px_0px_0px_rgba(0,0,0,0.5)] 
                    active:translate-x-[2px] active:translate-y-[2px]
                    transition-all 
                    dark:border-black
                  "
                  aria-label="Close"
                >
                  X
                </button>
              )}
            </div>
        </div>

        {/* Body Content */}
        {!isMinimized && (
          <div 
            className="flex-1 overflow-auto relative flex flex-col min-h-0 cursor-auto"
          >
             {/* Inner Bevel for depth */}
             <div className="absolute inset-0 pointer-events-none shadow-[inset_2px_2px_0px_rgba(255,255,255,0.5),inset_-2px_-2px_0px_rgba(0,0,0,0.1)] z-10"></div>
             
             {/* Content container */}
             <div className="relative z-0 flex-1 flex flex-col h-full">
                {children}
             </div>

             {/* Retro Corner Grip (Decorative) */}
             <div className="absolute bottom-1 right-1 w-3 h-3 flex flex-col gap-[2px] items-end opacity-50 pointer-events-none z-20">
               <div className="w-3 h-[2px] bg-black dark:bg-white"></div>
               <div className="w-2 h-[2px] bg-black dark:bg-white"></div>
               <div className="w-1 h-[2px] bg-black dark:bg-white"></div>
             </div>
          </div>
        )}
      </div>
    </>
  );
};