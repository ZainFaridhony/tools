import React, { useState } from 'react';
import { Button } from '../components/Button';

const LOADERS = [
    {
        id: 1,
        name: 'Retro Spinner',
        html: `<div class="loader-1"></div>`,
        css: `.loader-1 {
  width: 40px;
  height: 40px;
  border: 4px solid #000;
  border-top-color: #39FF14;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`
    },
    {
        id: 2,
        name: 'Pixel Bounce',
        html: `<div class="loader-2"></div>`,
        css: `.loader-2 {
  width: 20px;
  height: 20px;
  background: #FF69B4;
  box-shadow: 20px 0 #000, -20px 0 #000;
  animation: bounce 1s infinite alternate;
}
@keyframes bounce {
  0% { background-color: #FF69B4; box-shadow: 20px 0 #000, -20px 0 #000; }
  100% { background-color: #000; box-shadow: 20px 0 #FF69B4, -20px 0 #FF69B4; }
}`
    },
    {
        id: 3,
        name: 'Digital Bar',
        html: `<div class="loader-3"></div>`,
        css: `.loader-3 {
  width: 0;
  height: 10px;
  background: #000;
  animation: grow 2s infinite steps(10);
}
@keyframes grow { 0% { width: 0; } 100% { width: 100px; } }`
    }
];

export const CssLoaders: React.FC = () => {
    const [selected, setSelected] = useState(LOADERS[0]);

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex gap-4 justify-center flex-wrap">
                {LOADERS.map(l => (
                    <div 
                        key={l.id}
                        onClick={() => setSelected(l)}
                        className={`w-24 h-24 border-2 border-black flex flex-col items-center justify-center cursor-pointer transition-all ${selected.id === l.id ? 'bg-gray-100 shadow-hard-sm translate-y-[-2px]' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <style>{l.css}</style>
                        <div dangerouslySetInnerHTML={{ __html: l.html }} />
                    </div>
                ))}
            </div>

            <div className="flex-1 border-2 border-black bg-[#1e1e1e] text-green-400 p-4 font-mono text-sm overflow-auto shadow-inner relative">
                <div className="absolute top-0 right-0 bg-retro-yellow text-black px-2 py-1 font-bold text-xs">CSS_OUTPUT</div>
                <pre className="whitespace-pre-wrap">{selected.css}</pre>
            </div>
            
            <Button onClick={() => navigator.clipboard.writeText(selected.css)}>COPY CODE</Button>
        </div>
    );
};