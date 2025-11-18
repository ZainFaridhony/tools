import React, { useState } from 'react';
import { Button } from '../components/Button';

export const ReactNativeShadowGenerator: React.FC = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(2);
  const [radius, setRadius] = useState(4);
  const [opacity, setOpacity] = useState(0.25);
  const [elevation, setElevation] = useState(5);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  // Approximation for web preview
  const boxShadow = `${width}px ${height}px ${radius}px ${hexToRgba(shadowColor, opacity)}`;

  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const codeSnippet = `const styles = StyleSheet.create({
  box: {
    backgroundColor: '${bgColor}',
    ...Platform.select({
      ios: {
        shadowColor: '${shadowColor}',
        shadowOffset: { width: ${width}, height: ${height} },
        shadowOpacity: ${opacity},
        shadowRadius: ${radius},
      },
      android: {
        elevation: ${elevation},
      },
    }),
  },
});`;

  return (
    <div className="flex flex-col h-full gap-6 overflow-auto">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Controls */}
        <div className="flex-1 flex flex-col gap-4">
           <div className="bg-gray-100 dark:bg-gray-800 p-4 border-2 border-black shadow-hard-sm">
              <h3 className="font-display mb-4 border-b-2 border-black inline-block">IOS_SHADOW</h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="flex justify-between font-mono text-xs mb-1">
                        <span>OFFSET_WIDTH (x)</span> <span>{width}</span>
                    </label>
                    <input type="range" min="-50" max="50" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full accent-black" />
                 </div>
                 <div>
                    <label className="flex justify-between font-mono text-xs mb-1">
                        <span>OFFSET_HEIGHT (y)</span> <span>{height}</span>
                    </label>
                    <input type="range" min="-50" max="50" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full accent-black" />
                 </div>
                 <div>
                    <label className="flex justify-between font-mono text-xs mb-1">
                        <span>RADIUS (blur)</span> <span>{radius}</span>
                    </label>
                    <input type="range" min="0" max="100" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full accent-black" />
                 </div>
                 <div>
                    <label className="flex justify-between font-mono text-xs mb-1">
                        <span>OPACITY</span> <span>{opacity}</span>
                    </label>
                    <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={e => setOpacity(Number(e.target.value))} className="w-full accent-black" />
                 </div>
              </div>
           </div>

           <div className="bg-gray-100 dark:bg-gray-800 p-4 border-2 border-black shadow-hard-sm">
              <h3 className="font-display mb-4 border-b-2 border-black inline-block">ANDROID</h3>
              <div>
                <label className="flex justify-between font-mono text-xs mb-1">
                    <span>ELEVATION</span> <span>{elevation}</span>
                </label>
                <input type="range" min="0" max="24" value={elevation} onChange={e => setElevation(Number(e.target.value))} className="w-full accent-black" />
              </div>
           </div>

           <div className="bg-gray-100 dark:bg-gray-800 p-4 border-2 border-black shadow-hard-sm flex gap-4">
              <div className="flex-1">
                  <label className="font-mono text-xs block mb-1">SHADOW_COLOR</label>
                  <input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="w-full h-8 border-2 border-black" />
              </div>
              <div className="flex-1">
                  <label className="font-mono text-xs block mb-1">BOX_BG</label>
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-8 border-2 border-black" />
              </div>
           </div>
        </div>

        {/* Preview */}
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 border-2 border-black flex items-center justify-center relative min-h-[300px] overflow-hidden shadow-inner" 
                 style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.8 }}>
                 <div className="absolute top-2 left-2 font-mono text-xs bg-white px-1 border border-black">PREVIEW (IOS APPROX)</div>
                 
                 <div 
                    className="w-32 h-32 md:w-48 md:h-48 rounded-xl transition-all duration-300"
                    style={{ 
                        backgroundColor: bgColor,
                        boxShadow: boxShadow
                    }}
                 ></div>
            </div>

            <div className="h-48 bg-[#1e1e1e] border-2 border-black p-4 overflow-auto relative shadow-hard">
                <div className="absolute top-0 right-0 bg-retro-neonGreen text-black px-2 font-mono text-xs font-bold">REACT_NATIVE</div>
                <pre className="font-mono text-xs md:text-sm text-green-400 whitespace-pre">{codeSnippet}</pre>
            </div>
            <Button onClick={() => navigator.clipboard.writeText(codeSnippet)}>COPY CODE</Button>
        </div>

      </div>
    </div>
  );
};