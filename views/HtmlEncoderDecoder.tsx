import React, { useState } from 'react';
import { Button } from '../components/Button';

export const HtmlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('<h1>Hello & Welcome!</h1>');
  const [output, setOutput] = useState('&lt;h1&gt;Hello &amp; Welcome!&lt;/h1&gt;');

  const encode = (str: string) => {
    return str.replace(/[\u00A0-\u9999<>&]/g, (i) => '&#' + i.charCodeAt(0) + ';');
  };

  const decode = (str: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  };

  const handleEncode = () => {
    setOutput(encode(input));
  };

  const handleDecode = () => {
    setInput(decode(output));
  };

  return (
    <div className="flex flex-col h-full gap-6">
       <div className="flex-1 flex flex-col md:flex-row gap-4">
          
          {/* Input / Decoded Side */}
          <div className="flex-1 flex flex-col gap-2">
             <label className="font-mono font-bold bg-blue-200 text-black px-2 self-start border-2 border-black">DECODED (Readable)</label>
             <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 w-full border-2 border-black p-4 font-mono resize-none focus:shadow-hard-sm outline-none dark:bg-gray-900 dark:text-white"
                placeholder="<div>Enter raw HTML here...</div>"
             />
             <Button onClick={handleEncode} className="self-end md:self-auto">
                ENCODE &rarr;
             </Button>
          </div>

          {/* Middle Actions (Desktop) */}
          <div className="hidden md:flex flex-col justify-center gap-4">
             <div className="w-[1px] h-full bg-black self-center opacity-20"></div>
          </div>

          {/* Output / Encoded Side */}
          <div className="flex-1 flex flex-col gap-2">
             <label className="font-mono font-bold bg-red-200 text-black px-2 self-start border-2 border-black">ENCODED (Safe)</label>
             <textarea 
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                className="flex-1 w-full border-2 border-black p-4 font-mono resize-none focus:shadow-hard-sm outline-none bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                placeholder="&lt;div&gt;Entities will appear here...&lt;/div&gt;"
             />
             <Button onClick={handleDecode} variant="secondary" className="self-start md:self-auto">
                &larr; DECODE
             </Button>
          </div>

       </div>
       
       <div className="bg-retro-yellow border-2 border-black p-4 shadow-hard-sm flex items-center gap-4">
          <span className="material-icons text-2xl">info</span>
          <p className="font-mono text-sm">
             <strong>TIP:</strong> Use encoding when displaying user-provided text in HTML to prevent XSS attacks and rendering errors.
          </p>
       </div>
    </div>
  );
};