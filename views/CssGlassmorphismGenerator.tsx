import React, { useState } from 'react';
import { Tool } from '../types';

export const CssGlassmorphismGenerator: React.FC<{ tool: Tool }> = ({ tool }) => {
    const [blur, setBlur] = useState(10);
    const [transparency, setTransparency] = useState(0.25);
    const [color, setColor] = useState('#ffffff');
    const [outline, setOutline] = useState(true);

    const rgbaColor = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const cssCode = `background: ${rgbaColor(color, transparency)};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: 16px;
${outline ? 'border: 1px solid rgba(255, 255, 255, 0.3);' : ''}
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2">{tool.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-hard border-2 border-black dark:border-white">
                    <h3 className="font-bold text-xl mb-4 dark:text-white">Settings</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Blur ({blur}px)</label>
                            <input
                                type="range"
                                min="0"
                                max="40"
                                value={blur}
                                onChange={(e) => setBlur(Number(e.target.value))}
                                className="w-full accent-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Transparency ({transparency})</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={transparency}
                                onChange={(e) => setTransparency(Number(e.target.value))}
                                className="w-full accent-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Color</label>
                            <div className="flex gap-4 items-center">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="h-10 w-20 cursor-pointer rounded border-2 border-gray-300"
                                />
                                <span className="font-mono dark:text-gray-300">{color}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="outline"
                                checked={outline}
                                onChange={(e) => setOutline(e.target.checked)}
                                className="w-5 h-5 accent-indigo-500"
                            />
                            <label htmlFor="outline" className="font-bold dark:text-gray-300 cursor-pointer">Add Border</label>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-bold dark:text-gray-300">CSS Code</label>
                            <button
                                onClick={() => navigator.clipboard.writeText(cssCode)}
                                className="text-xs bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded hover:opacity-80"
                            >
                                COPY
                            </button>
                        </div>
                        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto border border-gray-300 dark:border-gray-700 font-mono">
                            {cssCode}
                        </pre>
                    </div>
                </div>

                {/* Preview */}
                <div className="relative min-h-[400px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl shadow-hard border-2 border-black dark:border-white flex items-center justify-center overflow-hidden">
                    {/* Decorative shapes */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full mix-blend-overlay opacity-50 animate-bounce" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>

                    {/* Glass Element */}
                    <div
                        className="p-8 w-64 h-64 flex flex-col items-center justify-center text-center transition-all duration-200"
                        style={{
                            background: rgbaColor(color, transparency),
                            backdropFilter: `blur(${blur}px)`,
                            WebkitBackdropFilter: `blur(${blur}px)`,
                            borderRadius: '16px',
                            border: outline ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h4 className="text-xl font-bold mb-2" style={{ color: parseInt(color.slice(1), 16) > 0xffffff / 2 ? '#000' : '#fff' }}>Glass Card</h4>
                        <p className="text-sm opacity-80" style={{ color: parseInt(color.slice(1), 16) > 0xffffff / 2 ? '#000' : '#fff' }}>
                            This is how your glassmorphism effect looks over a colorful background.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
