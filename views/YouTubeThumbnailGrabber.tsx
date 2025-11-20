import React, { useState } from 'react';
import { Tool } from '../types';

export const YouTubeThumbnailGrabber: React.FC<{ tool: Tool }> = ({ tool }) => {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState<string | null>(null);
    const [error, setError] = useState('');

    const extractVideoId = (inputUrl: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleGrab = () => {
        setError('');
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
        } else {
            setVideoId(null);
            setError('Invalid YouTube URL. Please check and try again.');
        }
    };

    const qualities = [
        { name: 'Max Resolution (HD)', suffix: 'maxresdefault' },
        { name: 'Standard (SD)', suffix: 'sddefault' },
        { name: 'High Quality (HQ)', suffix: 'hqdefault' },
        { name: 'Medium Quality (MQ)', suffix: 'mqdefault' },
    ];

    const downloadImage = async (imgUrl: string, name: string) => {
        try {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `youtube-thumb-${videoId}-${name}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            // Fallback for CORS issues if direct fetch fails (common with YT images)
            window.open(imgUrl, '_blank');
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2">{tool.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-hard border-2 border-black dark:border-white mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste YouTube Video URL here..."
                        className="flex-1 border-2 border-black dark:border-gray-600 rounded px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleGrab()}
                    />
                    <button
                        onClick={handleGrab}
                        className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition-colors shadow-hard-sm active:translate-y-1 active:shadow-none border-2 border-black"
                    >
                        GRAB
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2 font-bold text-sm">{error}</p>}
            </div>

            {videoId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8">
                    {qualities.map((q) => (
                        <div key={q.suffix} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-hard border-2 border-black dark:border-white group">
                            <div className="aspect-video bg-gray-200 dark:bg-gray-900 rounded overflow-hidden mb-4 border border-gray-300 dark:border-gray-700 relative">
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/${q.suffix}.jpg`}
                                    alt={q.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Hide if image doesn't exist (some videos don't have maxres)
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">Not Available</div>';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-sm dark:text-white">{q.name}</span>
                                <button
                                    onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/${q.suffix}.jpg`, q.suffix)}
                                    className="text-xs bg-black text-white dark:bg-white dark:text-black px-3 py-2 rounded hover:opacity-80 flex items-center gap-1"
                                >
                                    <span className="material-icons text-sm">download</span>
                                    DOWNLOAD
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
