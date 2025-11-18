import React, { useState } from 'react';

export const TweetToImage: React.FC = () => {
  const [name, setName] = useState('Retro User');
  const [handle, setHandle] = useState('@retro_dev');
  const [content, setContent] = useState('Just deployed a new update to the mainframe. 💾 #coding #retro');
  const [theme, setTheme] = useState('bg-white');

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Controls */}
      <div className="flex-1 flex flex-col gap-4 bg-gray-50 p-4 border-2 border-black shadow-hard-sm">
         <h3 className="font-display text-lg uppercase border-b-2 border-black mb-2">Tweet Editor</h3>
         <div className="flex gap-2">
             <input className="flex-1 border-2 border-black p-2 font-mono text-sm" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
             <input className="flex-1 border-2 border-black p-2 font-mono text-sm" placeholder="Handle" value={handle} onChange={e => setHandle(e.target.value)} />
         </div>
         <textarea className="w-full h-32 border-2 border-black p-2 font-mono text-sm resize-none" placeholder="Content..." value={content} onChange={e => setContent(e.target.value)} />
         
         <div>
            <label className="font-mono text-xs block mb-1">THEME</label>
            <div className="flex gap-2">
                {['bg-white', 'bg-black text-white', 'bg-retro-yellow', 'bg-retro-pink'].map(t => (
                    <button key={t} className={`w-8 h-8 border-2 border-black ${t} ${t.includes('text-white') ? '' : 'text-black'}`} onClick={() => setTheme(t)}></button>
                ))}
            </div>
         </div>
      </div>

      {/* Preview Area */}
      <div className="flex-[2] bg-gray-200 border-2 border-black flex items-center justify-center p-8 shadow-inner overflow-auto">
          <div className={`max-w-md w-full border-2 border-black p-6 shadow-hard ${theme}`}>
             <div className="flex items-start gap-3 mb-4">
                 <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-black overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${handle}`} alt="Avatar" />
                 </div>
                 <div>
                     <div className="font-bold font-sans text-lg leading-tight">{name}</div>
                     <div className={`opacity-60 text-sm ${theme.includes('text-white') ? 'text-gray-300' : 'text-gray-500'}`}>{handle}</div>
                 </div>
                 <div className="ml-auto text-2xl opacity-50">...</div>
             </div>
             
             <div className="font-sans text-xl mb-4 whitespace-pre-wrap leading-normal">
                 {content}
             </div>

             <div className={`opacity-60 text-sm mb-4 border-b border-current pb-4 ${theme.includes('text-white') ? 'text-gray-300' : 'text-gray-500'}`}>
                 {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} · {new Date().toLocaleDateString()} · RetroFunk Web
             </div>

             <div className="flex justify-between opacity-80 text-sm font-bold">
                 <span>24 Retweets</span>
                 <span>138 Likes</span>
             </div>
          </div>
      </div>
    </div>
  );
};