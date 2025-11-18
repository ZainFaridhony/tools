import React, { useState } from 'react';
import { Button } from '../components/Button';

export const CodeSnap: React.FC = () => {
  const [code, setCode] = useState("const hello = 'world';\n\nfunction init() {\n  console.log(hello);\n}");
  const [bgGradient, setBgGradient] = useState('bg-gradient-to-br from-pink-500 to-orange-400');
  const [fileName, setFileName] = useState('script.js');

  const gradients = [
    'bg-gradient-to-br from-pink-500 to-orange-400',
    'bg-gradient-to-br from-blue-400 to-indigo-600',
    'bg-gradient-to-br from-green-400 to-cyan-500',
    'bg-gradient-to-br from-gray-700 to-gray-900',
    'bg-retro-yellow',
  ];

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4 justify-between items-end">
         <div className="flex-1">
            <label className="font-mono text-xs block mb-1">BACKGROUND</label>
            <div className="flex gap-2">
                {gradients.map(g => (
                    <button 
                        key={g}
                        onClick={() => setBgGradient(g)}
                        className={`w-6 h-6 rounded-full border-2 border-black ${g} ${bgGradient === g ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    />
                ))}
            </div>
         </div>
         <div className="flex-1">
             <label className="font-mono text-xs block mb-1">FILENAME</label>
             <input 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)}
                className="border-b-2 border-black bg-transparent font-mono text-sm w-full focus:outline-none"
             />
         </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800 border-2 border-black p-8 flex items-center justify-center shadow-inner min-h-[300px]">
         <div className={`${bgGradient} p-8 md:p-12 shadow-2xl transition-all duration-300`}>
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl min-w-[300px] max-w-full">
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="ml-4 text-xs text-gray-400 font-mono">{fileName}</span>
                </div>
                <div className="p-4">
                    <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap break-all" style={{ fontFamily: '"Fira Code", monospace' }}>
                        {code}
                    </pre>
                </div>
            </div>
         </div>
      </div>

      <div className="h-32">
        <label className="font-mono text-xs block mb-1">SOURCE_CODE</label>
        <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full border-2 border-black bg-white dark:bg-black dark:text-white p-2 font-mono text-xs focus:shadow-hard-sm outline-none resize-none"
            spellCheck={false}
        />
      </div>
    </div>
  );
};