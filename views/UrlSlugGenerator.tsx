import React, { useState } from 'react';
import { Button } from '../components/Button';

export const UrlSlugGenerator: React.FC = () => {
    const [input, setInput] = useState('How to Create SEO-Friendly URLs for Better Rankings');
    const [slug, setSlug] = useState('how-to-create-seo-friendly-urls-for-better-rankings');

    const generateSlug = (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    const handleGenerate = () => {
        setSlug(generateSlug(input));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(slug);
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex-1 flex flex-col gap-4">

                {/* Input Section */}
                <div className="flex flex-col gap-2">
                    <label className="font-mono font-bold bg-emerald-200 text-black px-2 self-start border-2 border-black">
                        INPUT TEXT / TITLE
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full border-2 border-black p-4 font-sans resize-none focus:shadow-hard-sm outline-none dark:bg-gray-900 dark:text-white h-32"
                        placeholder="Enter your article title or any text..."
                    />
                    <Button onClick={handleGenerate} className="self-start">
                        GENERATE SLUG
                    </Button>
                </div>

                {/* Output Section */}
                <div className="flex flex-col gap-2">
                    <label className="font-mono font-bold bg-purple-200 text-black px-2 self-start border-2 border-black">
                        URL SLUG (SEO-FRIENDLY)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={slug}
                            readOnly
                            className="flex-1 border-2 border-black p-4 font-mono focus:shadow-hard-sm outline-none bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                        />
                        <Button onClick={handleCopy} variant="secondary" className="flex items-center gap-2">
                            <span className="material-icons text-sm">content_copy</span>
                            COPY
                        </Button>
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black p-4">
                    <p className="font-mono text-xs mb-2 text-gray-600 dark:text-gray-400">PREVIEW URL:</p>
                    <p className="font-mono text-sm break-all text-blue-600 dark:text-blue-400">
                        https://example.com/blog/<span className="font-bold">{slug || 'your-slug-here'}</span>
                    </p>
                </div>
            </div>

            <div className="bg-retro-yellow border-2 border-black p-4 shadow-hard-sm flex items-center gap-4">
                <span className="material-icons text-2xl">info</span>
                <p className="font-mono text-sm">
                    <strong>TIP:</strong> Clean URLs improve SEO rankings and are easier to share. Special characters and spaces are automatically removed.
                </p>
            </div>
        </div>
    );
};
