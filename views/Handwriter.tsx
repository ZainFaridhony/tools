import React, { useState } from 'react';
import { Button } from '../components/Button';

export const Handwriter: React.FC = () => {
  const [text, setText] = useState("Dear Journal,\n\nToday I hacked the mainframe using only a toaster and a floppy disk.\n\n- ZeroCool");
  
  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
       <div className="flex-1 flex flex-col gap-2">
          <label className="font-mono font-bold">INPUT_TEXT:</label>
          <textarea 
             value={text}
             onChange={(e) => setText(e.target.value)}
             className="flex-1 border-2 border-black p-4 font-sans resize-none focus:shadow-hard-sm outline-none"
          />
       </div>

       <div className="flex-1 relative">
          <div className="absolute inset-0 bg-yellow-50 border-2 border-black shadow-hard rotate-1 flex flex-col p-6 md:p-8">
              {/* Paper lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#999 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
              
              <div className="font-handwriting text-xl md:text-2xl text-blue-800 leading-[2rem] relative z-10 whitespace-pre-wrap" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                  {text}
              </div>
          </div>
          {/* Tape effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/80 border border-white/20 rotate-[-2deg] shadow-sm backdrop-blur-sm"></div>
       </div>
    </div>
  );
};