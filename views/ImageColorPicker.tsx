import React, { useState, useRef, useEffect } from 'react';
import { Tool } from '../types';

export const ImageColorPicker: React.FC<{ tool: Tool }> = ({ tool }) => {
    const [image, setImage] = useState<string | null>(null);
    const [color, setColor] = useState<{ hex: string; rgb: string; hsl: string } | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoverColor, setHoverColor] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                // Resize canvas to fit image but max width 100%
                const maxWidth = 800;
                const scale = Math.min(1, maxWidth / img.width);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                if (ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            };
            img.src = image;
        }
    }, [image]);

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);

        setColor({ hex, rgb, hsl });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        setHoverColor(rgbToHex(pixel[0], pixel[1], pixel[2]));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2">{tool.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Image Area */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-hard border-2 border-black dark:border-white min-h-[300px] flex flex-col items-center justify-center relative">
                    {!image ? (
                        <div className="text-center">
                            <span className="material-icons text-6xl text-gray-300 mb-4">add_photo_alternate</span>
                            <p className="mb-4 dark:text-gray-300">Upload an image to start picking colors</p>
                            <label className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded font-bold cursor-pointer hover:opacity-80 transition-opacity">
                                Choose Image
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    ) : (
                        <>
                            <div className="relative cursor-crosshair overflow-hidden rounded border border-gray-300">
                                <canvas
                                    ref={canvasRef}
                                    onClick={pickColor}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={() => setHoverColor(null)}
                                    className="max-w-full h-auto"
                                />
                                {hoverColor && (
                                    <div
                                        className="absolute pointer-events-none w-16 h-16 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                                        style={{
                                            backgroundColor: hoverColor,
                                            left: 'var(--mouse-x)', // This would need real mouse tracking for the magnifying glass effect, skipping for simplicity
                                        }}
                                    >
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => { setImage(null); setColor(null); }}
                                className="mt-4 text-sm text-red-500 hover:text-red-700 font-bold underline"
                            >
                                Remove Image
                            </button>
                        </>
                    )}
                </div>

                {/* Results Area */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-hard border-2 border-black dark:border-white h-fit">
                    <h3 className="font-bold text-xl mb-6 dark:text-white">Selected Color</h3>

                    {color ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div
                                className="w-full h-32 rounded-lg shadow-inner border-2 border-gray-200 mb-4"
                                style={{ backgroundColor: color.hex }}
                            ></div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">HEX</label>
                                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                                        <span className="font-mono font-bold dark:text-white">{color.hex}</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(color.hex)}
                                            className="text-gray-500 hover:text-black dark:hover:text-white"
                                        >
                                            <span className="material-icons text-sm">content_copy</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">RGB</label>
                                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                                        <span className="font-mono font-bold dark:text-white text-sm">{color.rgb}</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(color.rgb)}
                                            className="text-gray-500 hover:text-black dark:hover:text-white"
                                        >
                                            <span className="material-icons text-sm">content_copy</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">HSL</label>
                                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                                        <span className="font-mono font-bold dark:text-white text-sm">{color.hsl}</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(color.hsl)}
                                            className="text-gray-500 hover:text-black dark:hover:text-white"
                                        >
                                            <span className="material-icons text-sm">content_copy</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10 opacity-50">
                            <span className="material-icons text-4xl mb-2">colorize</span>
                            <p className="text-sm">Click on the image to pick a color</p>
                        </div>
                    )}

                    {hoverColor && !color && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-xs font-bold text-gray-500 mb-2">HOVERING</p>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-6 h-6 rounded-full border border-gray-300" style={{ backgroundColor: hoverColor }}></div>
                                <span className="font-mono text-sm dark:text-white">{hoverColor}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
