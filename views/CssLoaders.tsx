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
  border: 4px solid rgba(255,255,255,0.3);
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
  box-shadow: 20px 0 #39FF14, -20px 0 #39FF14;
  animation: bounce 1s infinite alternate;
}
@keyframes bounce {
  0% { background-color: #FF69B4; box-shadow: 20px 0 #39FF14, -20px 0 #39FF14; }
  100% { background-color: #39FF14; box-shadow: 20px 0 #FF69B4, -20px 0 #FF69B4; }
}`
    },
    {
        id: 3,
        name: 'Digital Bar',
        html: `<div class="loader-3"></div>`,
        css: `.loader-3 {
  width: 0;
  height: 10px;
  background: #39FF14;
  animation: grow 2s infinite steps(10);
}
@keyframes grow { 0% { width: 0; } 100% { width: 100px; } }`
    }
];

export const CssLoaders: React.FC = () => {
    const [selected, setSelected] = useState(LOADERS[0]);

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Main Preview Area */}
            <div className="flex-1 min-h-[250px] border-2 border-black bg-[#111] relative shadow-hard overflow-hidden flex items-center justify-center group select-none">
                {/* Retro Grid Background */}
                <div 
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(transparent 0%, transparent 98%, #39FF14 98%, #39FF14 100%),
                            linear-gradient(90deg, transparent 0%, transparent 98%, #39FF14 98%, #39FF14 100%)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
                
                {/* CRT Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]" />

                {/* Active Loader Display */}
                <div className="relative z-20 transform scale-[2]">
                    <style>{selected.css}</style>
                    <div dangerouslySetInnerHTML={{ __html: selected.html }} />
                </div>

                <div className="absolute top-0 left-0 bg-retro-neonGreen text-black font-mono text-xs px-2 py-1 border-b-2 border-r-2 border-black z-30 font-bold">
                    PREVIEW: {selected.name.toUpperCase()}
                </div>
            </div>

            {/* Thumbnails List */}
            <div>
                <label className="font-mono text-xs font-bold mb-2 block bg-black text-white w-max px-2 uppercase">Select Style</label>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {LOADERS.map(l => (
                        <div 
                            key={l.id}
                            onClick={() => setSelected(l)}
                            className={`
                                flex-shrink-0 w-24 h-24 border-2 border-black flex flex-col items-center justify-center cursor-pointer transition-all 
                                ${selected.id === l.id 
                                    ? 'bg-retro-yellow shadow-hard-sm translate-y-[-4px]' 
                                    : 'bg-white hover:bg-gray-100'
                                }
                            `}
                        >
                            {/* Mini Preview */}
                            <div className="transform scale-50 pointer-events-none mb-1">
                                <style>{l.css}</style>
                                <div dangerouslySetInnerHTML={{ __html: l.html }} />
                            </div>
                            <span className="font-mono text-[10px] text-center leading-tight px-1 font-bold">{l.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Snippet */}
            <div className="h-40 border-2 border-black bg-[#1e1e1e] text-green-400 p-4 font-mono text-sm overflow-auto shadow-inner relative">
                <div className="absolute top-0 right-0 bg-retro-neonGreen text-black px-2 py-1 font-bold text-xs border-l-2 border-b-2 border-black">CSS_OUTPUT</div>
                <pre className="whitespace-pre-wrap select-text">{selected.css}</pre>
            </div>
            
            <div className="flex justify-end">
                <Button onClick={() => navigator.clipboard.writeText(selected.css)}>COPY CSS CODE</Button>
            </div>
        </div>
    );
};