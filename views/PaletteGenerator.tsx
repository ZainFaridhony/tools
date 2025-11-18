import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';

export const PaletteGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
           setImage(event.target?.result as string);
           extractColors(img);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCounts: { [key: string]: number } = {};
    const step = 2000; // Check every 2000th pixel to improve performance

    for (let i = 0; i < imageData.length; i += 4 * step) {
       const r = imageData[i];
       const g = imageData[i + 1];
       const b = imageData[i + 2];
       const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
       colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }

    // Simple sort by frequency
    const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
    // Take top 5 diverse colors (naive approach)
    setColors(sorted.slice(0, 5).map(k => k[0]));
  };

  return (
    <div className="flex flex-col h-full gap-4">
       {!image ? (
          <div className="flex-1 flex items-center justify-center border-2 border-black border-dashed bg-gray-50 dark:bg-gray-800">
             <label className="cursor-pointer text-center">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <span className="material-icons text-4xl block mb-2">palette</span>
                <span className="font-mono font-bold">UPLOAD_SOURCE_IMAGE</span>
             </label>
          </div>
       ) : (
          <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
             <div className="flex-1 relative bg-black p-1 border-2 border-black shadow-hard">
                <img src={image} className="w-full h-full object-contain" alt="Source" />
                <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-white p-1 border border-black">
                    <span className="material-icons text-sm">close</span>
                </button>
             </div>
             
             <div className="flex md:flex-col gap-2">
                {colors.map((c, i) => (
                   <div 
                     key={i} 
                     className="flex-1 min-h-[60px] min-w-[60px] border-2 border-black shadow-hard-sm transition-transform hover:scale-105 cursor-pointer flex items-center justify-center group relative"
                     style={{ backgroundColor: c }}
                     onClick={() => navigator.clipboard.writeText(c)}
                   >
                      <span className="bg-white px-1 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity border border-black">
                        {c}
                      </span>
                   </div>
                ))}
             </div>
          </div>
       )}
       <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};