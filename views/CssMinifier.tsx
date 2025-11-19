import React, { useState } from 'react';
import { Button } from '../components/Button';

export const CssMinifier: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleMinify = () => {
        try {
            let minified = input
                // Remove comments
                .replace(/\/\*[\s\S]*?\*\//g, '')
                // Remove extra whitespace
                .replace(/\s+/g, ' ')
                // Remove space before/after { } ; : ,
                .replace(/\s*([{};:,])\s*/g, '$1')
                // Remove final semicolon in block
                .replace(/;}/g, '}')
                // Trim
                .trim();

            setOutput(minified);
        } catch (e) {
            setOutput('Error minifying CSS');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-bold font-mono">CSS INPUT</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 p-4 bg-white dark:bg-black border-2 border-black resize-none font-mono text-sm focus:outline-none focus:shadow-hard transition-all"
                        placeholder="Paste your CSS here..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold font-mono">MINIFIED OUTPUT</label>
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-64 p-4 bg-gray-100 dark:bg-gray-900 border-2 border-black resize-none font-mono text-sm focus:outline-none"
                        placeholder="Minified CSS will appear here..."
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={handleMinify} variant="primary">
                    MINIFY_CSS
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
