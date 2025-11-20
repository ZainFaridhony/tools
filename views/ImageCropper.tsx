import React, { useState, useRef, useEffect } from 'react';
import { Tool } from '../types';

export const ImageCropper: React.FC<{ tool: Tool }> = ({ tool }) => {
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selection, setSelection] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setCroppedImage(null);
                setSelection(null);
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
                imageRef.current = img;
                // Resize logic
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

    const drawCanvas = () => {
        if (!canvasRef.current || !imageRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear and redraw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

        // Draw overlay
        if (selection) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Clear selection area
            ctx.clearRect(selection.x, selection.y, selection.w, selection.h);
            ctx.drawImage(
                imageRef.current,
                selection.x * (imageRef.current.width / canvas.width),
                selection.y * (imageRef.current.height / canvas.height),
                selection.w * (imageRef.current.width / canvas.width),
                selection.h * (imageRef.current.height / canvas.height),
                selection.x,
                selection.y,
                selection.w,
                selection.h
            );

            // Draw border
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.strokeRect(selection.x, selection.y, selection.w, selection.h);
        }
    };

    useEffect(() => {
        drawCanvas();
    }, [selection]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setIsDragging(true);
        setStartPos({ x, y });
        setSelection({ x, y, w: 0, h: 0 });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging || !startPos || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const x = Math.min(currentX, startPos.x);
        const y = Math.min(currentY, startPos.y);
        const w = Math.abs(currentX - startPos.x);
        const h = Math.abs(currentY - startPos.y);

        setSelection({ x, y, w, h });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const cropImage = () => {
        if (!imageRef.current || !selection || !canvasRef.current) return;

        const scaleX = imageRef.current.width / canvasRef.current.width;
        const scaleY = imageRef.current.height / canvasRef.current.height;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = selection.w * scaleX;
        tempCanvas.height = selection.h * scaleY;
        const ctx = tempCanvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                imageRef.current,
                selection.x * scaleX,
                selection.y * scaleY,
                selection.w * scaleX,
                selection.h * scaleY,
                0,
                0,
                tempCanvas.width,
                tempCanvas.height
            );
            setCroppedImage(tempCanvas.toDataURL('image/png'));
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2">{tool.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Area */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-hard border-2 border-black dark:border-white min-h-[400px] flex flex-col items-center justify-center">
                    {!image ? (
                        <div className="text-center">
                            <span className="material-icons text-6xl text-gray-300 mb-4">crop</span>
                            <p className="mb-4 dark:text-gray-300">Upload an image to start cropping</p>
                            <label className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded font-bold cursor-pointer hover:opacity-80 transition-opacity">
                                Choose Image
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            <div className="relative border border-gray-300 overflow-hidden cursor-crosshair max-w-full">
                                <canvas
                                    ref={canvasRef}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    className="max-w-full h-auto"
                                />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => setImage(null)}
                                    className="text-red-500 font-bold hover:underline"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={cropImage}
                                    disabled={!selection || selection.w < 5 || selection.h < 5}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-hard-sm"
                                >
                                    Crop Selection
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Result Area */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-hard border-2 border-black dark:border-white h-fit">
                    <h3 className="font-bold text-xl mb-6 dark:text-white">Cropped Result</h3>

                    {croppedImage ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-900">
                                <img src={croppedImage} alt="Cropped" className="w-full h-auto" />
                            </div>
                            <a
                                href={croppedImage}
                                download="cropped-image.png"
                                className="block w-full bg-green-600 text-white text-center py-3 rounded font-bold hover:bg-green-700 shadow-hard-sm transition-transform active:translate-y-1 active:shadow-none border-2 border-black"
                            >
                                DOWNLOAD
                            </a>
                        </div>
                    ) : (
                        <div className="text-center py-10 opacity-50">
                            <span className="material-icons text-4xl mb-2">image</span>
                            <p className="text-sm">Cropped image will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
