import React, { useState } from 'react';
import { Tool } from '../types';

export const CssGradientGenerator: React.FC<{ tool: Tool }> = ({ tool }) => {
    const [type, setType] = useState<'linear' | 'radial'>('linear');
    const [angle, setAngle] = useState(90);
    const [colors, setColors] = useState<string[]>(['#4f46e5', '#9333ea']);

    const addColor = () => {
        if (colors.length < 5) {
            setColors([...colors, '#ffffff']);
        }
    };

    const removeColor = (index: number) => {
        if (colors.length > 2) {
            const newColors = [...colors];
            newColors.splice(index, 1);
            setColors(newColors);
        }
    };

    const updateColor = (index: number, value: string) => {
        const newColors = [...colors];
        newColors[index] = value;
        setColors(newColors);
    };

    const gradientCss = type === 'linear'
        ? `linear-gradient(${angle}deg, ${colors.join(', ')})`
        : `radial-gradient(circle, ${colors.join(', ')})`;

    const codeSnippet = `background: ${gradientCss};`;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2">{tool.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-hard border-2 border-black dark:border-white">
                    <h3 className="font-bold text-xl mb-6 dark:text-white">Configuration</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Type</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setType('linear')}
                                    className={`flex-1 py-2 rounded font-bold border-2 border-black transition-all ${type === 'linear' ? 'bg-indigo-500 text-white shadow-hard-sm translate-y-[-2px]' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
                                >
                                    Linear
                                </button>
                                <button
                                    onClick={() => setType('radial')}
                                    className={`flex-1 py-2 rounded font-bold border-2 border-black transition-all ${type === 'radial' ? 'bg-indigo-500 text-white shadow-hard-sm translate-y-[-2px]' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
                                >
                                    Radial
                                </button>
                            </div>
                        </div>

                        {type === 'linear' && (
                            <div>
                                <label className="block text-sm font-bold mb-2 dark:text-gray-300">Angle ({angle}°)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={angle}
                                    onChange={(e) => setAngle(Number(e.target.value))}
                                    className="w-full accent-indigo-500"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Colors</label>
                            <div className="space-y-3">
                                {colors.map((color, index) => (
                                    <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => updateColor(index, e.target.value)}
                                            className="h-10 w-14 cursor-pointer rounded border-2 border-gray-300"
                                        />
                                        <input
                                            type="text"
                                            value={color}
                                            onChange={(e) => updateColor(index, e.target.value)}
                                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 font-mono text-sm dark:bg-gray-900 dark:text-white"
                                        />
                                        {colors.length > 2 && (
                                            <button
                                                onClick={() => removeColor(index)}
                                                className="text-red-500 hover:text-red-700 p-2"
                                            >
                                                <span className="material-icons">delete</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {colors.length < 5 && (
                                <button
                                    onClick={addColor}
                                    className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded hover:border-indigo-500 hover:text-indigo-500 transition-colors font-bold"
                                >
                                    + Add Color
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-bold dark:text-gray-300">CSS Code</label>
                            <button
                                onClick={() => navigator.clipboard.writeText(codeSnippet)}
                                className="text-xs bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded hover:opacity-80"
                            >
                                COPY
                            </button>
                        </div>
                        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto border border-gray-300 dark:border-gray-700 font-mono">
                            {codeSnippet}
                        </pre>
                    </div>
                </div>

                {/* Preview */}
                <div
                    className="rounded-xl shadow-hard border-2 border-black dark:border-white min-h-[300px] transition-all duration-300"
                    style={{ background: gradientCss }}
                >
                </div>
            </div>
        </div>
    );
};
