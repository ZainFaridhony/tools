import React, { useState } from 'react';
import { Button } from '../components/Button';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';

export const HtmlFormatter: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleFormat = async () => {
        try {
            setError('');
            const formatted = await prettier.format(input, {
                parser: 'html',
                plugins: [parserHtml],
                printWidth: 80,
                tabWidth: 2,
            });
            setOutput(formatted);
        } catch (e: any) {
            setError(e.message || 'Error formatting HTML');
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-bold font-mono">HTML INPUT</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 p-4 bg-white dark:bg-black border-2 border-black resize-none font-mono text-sm focus:outline-none focus:shadow-hard transition-all"
                        placeholder="Paste your messy HTML here..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold font-mono">FORMATTED OUTPUT</label>
                    <textarea
                        readOnly
                        value={output}
                        className={`w-full h-64 p-4 bg-gray-100 dark:bg-gray-900 border-2 border-black resize-none font-mono text-sm focus:outline-none ${error ? 'text-red-500' : ''}`}
                        placeholder={error || "Formatted HTML will appear here..."}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={handleFormat} variant="primary">
                    FORMAT_HTML
                </Button>
                <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
                    COPY_RESULT
                </Button>
                <Button onClick={() => { setInput(''); setOutput(''); setError(''); }} variant="danger">
                    CLEAR
                </Button>
            </div>
        </div>
    );
};
