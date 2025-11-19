import React, { useState } from 'react';
import { Button } from '../components/Button';

export const UrlEncoderDecoder: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        try {
            setOutput(encodeURIComponent(input));
        } catch (e) {
            setOutput('Error encoding URL');
        }
    };

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input));
        } catch (e) {
            setOutput('Error decoding URL');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-bold font-mono">INPUT</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 p-4 bg-white dark:bg-black border-2 border-black resize-none font-mono text-sm focus:outline-none focus:shadow-hard transition-all"
                        placeholder="Enter URL to encode or decode..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold font-mono">OUTPUT</label>
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-64 p-4 bg-gray-100 dark:bg-gray-900 border-2 border-black resize-none font-mono text-sm focus:outline-none"
                        placeholder="Result will appear here..."
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={handleEncode} variant="primary">
                    ENCODE
                </Button>
                <Button onClick={handleDecode} variant="secondary">
                    DECODE
                </Button>
                <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
                    COPY_RESULT
                </Button>
                <Button onClick={() => { setInput(''); setOutput(''); }} variant="danger">
                    CLEAR
                </Button>
            </div>
        </div>
    );
};
