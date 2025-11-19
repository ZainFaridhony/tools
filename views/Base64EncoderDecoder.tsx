import React, { useState } from 'react';
import { Button } from '../components/Button';

export const Base64EncoderDecoder: React.FC = () => {
    const [input, setInput] = useState('Hello, World! 🚀');
    const [output, setOutput] = useState('SGVsbG8sIFdvcmxkISDwn5qA');

    const encode = (str: string): string => {
        try {
            return btoa(unescape(encodeURIComponent(str)));
        } catch (e) {
            return 'Error: Invalid input for encoding';
        }
    };

    const decode = (str: string): string => {
        try {
            return decodeURIComponent(escape(atob(str)));
        } catch (e) {
            return 'Error: Invalid Base64 string';
        }
    };

    const handleEncode = () => {
        setOutput(encode(input));
    };

    const handleDecode = () => {
        setInput(decode(output));
    };

    const handleCopyInput = () => {
        navigator.clipboard.writeText(input);
    };

    const handleCopyOutput = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex-1 flex flex-col md:flex-row gap-4">

                {/* Input / Plain Text Side */}
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-mono font-bold bg-blue-200 text-black px-2 self-start border-2 border-black">
                        PLAIN TEXT
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 w-full border-2 border-black p-4 font-mono resize-none focus:shadow-hard-sm outline-none dark:bg-gray-900 dark:text-white min-h-[200px]"
                        placeholder="Enter text to encode..."
                    />
                    <div className="flex gap-2">
                        <Button onClick={handleEncode} className="flex-1">
                            ENCODE →
                        </Button>
                        <Button onClick={handleCopyInput} variant="secondary" className="flex items-center gap-1">
                            <span className="material-icons text-sm">content_copy</span>
                        </Button>
                    </div>
                </div>

                {/* Middle Divider (Desktop) */}
                <div className="hidden md:flex flex-col justify-center gap-4">
                    <div className="w-[1px] h-full bg-black self-center opacity-20"></div>
                </div>

                {/* Output / Base64 Side */}
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-mono font-bold bg-amber-200 text-black px-2 self-start border-2 border-black">
                        BASE64 ENCODED
                    </label>
                    <textarea
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                        className="flex-1 w-full border-2 border-black p-4 font-mono resize-none focus:shadow-hard-sm outline-none bg-gray-50 dark:bg-gray-800 dark:text-gray-300 min-h-[200px]"
                        placeholder="Base64 output will appear here..."
                    />
                    <div className="flex gap-2">
                        <Button onClick={handleDecode} variant="secondary" className="flex-1">
                            ← DECODE
                        </Button>
                        <Button onClick={handleCopyOutput} variant="secondary" className="flex items-center gap-1">
                            <span className="material-icons text-sm">content_copy</span>
                        </Button>
                    </div>
                </div>

            </div>

            <div className="bg-retro-yellow border-2 border-black p-4 shadow-hard-sm flex items-center gap-4">
                <span className="material-icons text-2xl">info</span>
                <p className="font-mono text-sm">
                    <strong>TIP:</strong> Base64 encoding is commonly used for transmitting binary data over text-based protocols like JSON and XML. Supports Unicode characters including emojis!
                </p>
            </div>
        </div>
    );
};
