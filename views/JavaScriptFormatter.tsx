import React, { useState } from 'react';
import { Button } from '../components/Button';
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";

export const JavaScriptFormatter: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleFormat = async () => {
        setError('');
        try {
            const formatted = await prettier.format(input, {
                parser: "babel",
                plugins: [parserBabel, parserEstree],
                semi: true,
                singleQuote: false,
                trailingComma: "es5",
            });
            setOutput(formatted);
        } catch (e: any) {
            setError(e.message || 'Error formatting code');
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
                    <label className="block text-sm font-bold font-mono">INPUT_JS</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-96 p-4 bg-white dark:bg-black border-2 border-black resize-none font-mono text-sm focus:outline-none focus:shadow-hard transition-all"
                        placeholder="Paste minified or messy JavaScript here..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold font-mono">FORMATTED_OUTPUT</label>
                    <div className="relative w-full h-96">
                        <textarea
                            readOnly
                            value={output}
                            className={`w-full h-full p-4 bg-gray-100 dark:bg-gray-900 border-2 border-black resize-none font-mono text-sm focus:outline-none ${error ? 'border-red-500' : ''}`}
                            placeholder="Beautiful code will appear here..."
                        />
                        {error && (
                            <div className="absolute bottom-4 left-4 right-4 bg-red-100 border-2 border-red-500 text-red-700 p-2 text-xs font-mono">
                                ERROR: {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={handleFormat} variant="primary">
                    FORMAT_CODE
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
