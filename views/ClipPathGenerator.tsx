import React, { useState } from 'react';
import { Button } from '../components/Button';

const SHAPES = {
  'Polygon': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  'Circle': 'circle(50% at 50% 50%)',
  'Inset': 'inset(10% 20% 30% 10%)',
  'Triangle': 'polygon(50% 0%, 0% 100%, 100% 100%)',
  'Hexagon': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  'Message': 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)',
};

export const ClipPathGenerator: React.FC = () => {
  const [activeShape, setActiveShape] = useState<keyof typeof SHAPES>('Polygon');
  const [customPath, setCustomPath] = useState(SHAPES['Polygon']);

  const handleShapeChange = (shape: keyof typeof SHAPES) => {
    setActiveShape(shape);
    setCustomPath(SHAPES[shape]);
  };

  return (
    <div className="flex flex-col h-full gap-6">
       <div className="flex flex-wrap gap-2">
         {(Object.keys(SHAPES) as Array<keyof typeof SHAPES>).map(shape => (
           <button
             key={shape}
             onClick={() => handleShapeChange(shape)}
             className={`px-3 py-1 border-2 border-black font-mono text-xs transition-all ${activeShape === shape ? 'bg-retro-neonGreen shadow-hard-sm translate-y-[-2px]' : 'bg-white hover:bg-gray-100'}`}
           >
             {shape}
           </button>
         ))}
       </div>

       <div className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-black p-4 shadow-inner">
          {/* Preview */}
          <div 
            className="w-48 h-48 bg-gradient-to-br from-retro-pink to-retro-purple shadow-hard transition-all duration-300"
            style={{ clipPath: customPath }}
          >
             <div className="w-full h-full flex items-center justify-center font-bold text-white mix-blend-difference">
               PREVIEW
             </div>
          </div>

          {/* Controls */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <label className="font-mono font-bold">CSS PROPERTY:</label>
            <textarea 
              value={`clip-path: ${customPath};`}
              onChange={(e) => setCustomPath(e.target.value.replace('clip-path: ', '').replace(';', ''))}
              className="w-full h-24 border-2 border-black p-2 font-mono text-sm bg-white focus:shadow-hard-sm outline-none"
            />
            <p className="text-xs text-gray-500 font-mono">Tip: You can edit the coordinates directly above.</p>
          </div>
       </div>
    </div>
  );
};