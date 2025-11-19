import React, { useState } from 'react';
import { Button } from '../components/Button';

export const HtmlMinifier: React.FC = () => {
    const [input, setInput] = useState(`<!DOCTYPE html>
<html>
  <head>
    <title>Example Page</title>
    <!-- This is a comment -->
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is a paragraph with    extra    spaces.</p>
  </body>
</html>`);
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0, percentage: 0 });

    const minifyHtml = (html: string): string => {
        return html
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .replace(/>\s+</g, '><') // Remove whitespace between tags
            .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
            .replace(/^\s+|\s+$/gm, '') // Trim lines
            .trim();
    };

    const handleMinify = () => {
        const minified = minifyHtml(input);
        setOutput(minified);

        const originalSize = input.length;
        const minifiedSize = minified.length;
        const savedBytes = originalSize - minifiedSize;
        const percentage = originalSize > 0 ? ((savedBytes / originalSize) * 100) : 0;

        setStats({
            original: originalSize,
            minified: minifiedSize,
            saved: savedBytes,
            percentage: Math.round(percentage * 10) / 10
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex-1 flex flex-col md:flex-row gap-4">

                {/* Input Section */}
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-mono font-bold bg-red-200 text-black px-2 self-start border-2 border-black">
                        ORIGINAL HTML
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 w-full border-2 border-black p-4 font-mono text-xs resize-none focus:shadow-hard-sm outline-none dark:bg-gray-900 dark:text-white min-h-[200px]"
                        placeholder="Paste your HTML code here..."
                    />
                    <Button onClick={handleMinify} className="self-start">
                        MINIFY HTML
                    </Button>
                </div>

                {/* Middle Divider (Desktop) */}
                <div className="hidden md:flex flex-col justify-center gap-4">
                    <div className="w-[1px] h-full bg-black self-center opacity-20"></div>
                </div>

                {/* Output Section */}
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-mono font-bold bg-fuchsia-200 text-black px-2 self-start border-2 border-black">
                        MINIFIED HTML
                    </label>
                    <textarea
                        value={output}
                        readOnly
                        className="flex-1 w-full border-2 border-black p-4 font-mono text-xs resize-none focus:shadow-hard-sm outline-none bg-gray-50 dark:bg-gray-800 dark:text-gray-300 min-h-[200px]"
                        placeholder="Minified code will appear here..."
                    />
                    <Button onClick={handleCopy} variant="secondary" className="self-start flex items-center gap-2">
                        <span className="material-icons text-sm">content_copy</span>
                        COPY
                    </Button>
                </div>

            </div>

            {/* Stats */}
            {output && (
                <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black p-4">
                    <p className="font-mono text-xs mb-2 font-bold">COMPRESSION STATS:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">Original:</p>
                            <p className="font-bold">{stats.original} bytes</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">Minified:</p>
                            <p className="font-bold">{stats.minified} bytes</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">Saved:</p>
                            <p className="font-bold text-green-600">{stats.saved} bytes</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">Reduction:</p>
                            <p className="font-bold text-green-600">{stats.percentage}%</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-retro-yellow border-2 border-black p-4 shadow-hard-sm flex items-center gap-4">
                <span className="material-icons text-2xl">info</span>
                <p className="font-mono text-sm">
                    <strong>TIP:</strong> Minifying HTML reduces file size by removing comments, whitespace, and newlines. This improves page load speed and reduces bandwidth usage.
                </p>
            </div>
        </div>
    );
};
