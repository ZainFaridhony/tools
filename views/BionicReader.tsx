import React, { useState } from 'react';
import { Button } from '../components/Button';

export const BionicReader: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<React.ReactNode[]>([]);

  const processText = () => {
    const words = input.split(/\s+/);
    const processed = words.map((word, index) => {
      const splitIndex = Math.ceil(word.length / 2);
      const boldPart = word.slice(0, splitIndex);
      const normalPart = word.slice(splitIndex);
      return (
        <span key={index} className="mr-1">
          <b className="font-bold text-black dark:text-white">{boldPart}</b>
          <span className="text-gray-600 dark:text-gray-400">{normalPart}</span>
        </span>
      );
    });
    setOutput(processed);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 flex flex-col gap-2">
        <label className="font-bold font-mono">INPUT_TEXT:</label>
        <textarea
          className="w-full h-32 p-2 border-2 border-black font-sans text-sm resize-none focus:shadow-hard-sm outline-none"
          placeholder="Paste your text here to convert it to bionic reading format..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end">
           <Button onClick={processText}>CONVERT</Button>
        </div>
      </div>
      
      <div className="flex-[2] border-2 border-black bg-white dark:bg-gray-800 p-6 overflow-y-auto shadow-hard-sm relative">
        <div className="absolute top-0 right-0 bg-black text-white text-xs px-2 py-1 font-mono">READING_MODE</div>
        <div className="prose dark:prose-invert max-w-none font-sans text-lg leading-relaxed">
          {output.length > 0 ? output : <span className="opacity-50 italic">Output will appear here...</span>}
        </div>
      </div>
    </div>
  );
};