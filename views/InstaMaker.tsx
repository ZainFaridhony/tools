import React, { useState } from 'react';

export const InstaMaker: React.FC = () => {
  const [username, setUsername] = useState('retro_user');
  const [likes, setLikes] = useState('1,337');
  const [caption, setCaption] = useState('Living my best digital life #retro #vibes');
  const [image, setImage] = useState<string>('https://via.placeholder.com/400');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-8 overflow-auto">
       <div className="flex-1 flex flex-col gap-4 p-1">
          <h3 className="font-display text-lg">POST_CONFIG</h3>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 border-black p-2 font-mono" placeholder="Username" />
          <input type="text" value={likes} onChange={(e) => setLikes(e.target.value)} className="border-2 border-black p-2 font-mono" placeholder="Like Count" />
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="border-2 border-black p-2 font-mono h-24 resize-none" placeholder="Caption" />
          
          <div className="border-2 border-black border-dashed p-4 text-center cursor-pointer relative hover:bg-gray-50">
             <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
             <span className="font-mono text-sm">UPLOAD_PHOTO</span>
          </div>
       </div>

       <div className="flex-1 flex items-center justify-center bg-gray-100 border-2 border-black p-4 shadow-inner">
          {/* Phone Mockup */}
          <div className="w-[320px] bg-white border border-gray-300 rounded-sm shadow-xl text-black font-sans">
              {/* Header */}
              <div className="flex items-center p-3 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                     <div className="w-full h-full bg-white rounded-full border-2 border-white"></div>
                  </div>
                  <span className="ml-3 font-semibold text-sm">{username}</span>
                  <span className="ml-auto material-icons text-sm">more_horiz</span>
              </div>
              
              {/* Image */}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                 <img src={image} className="w-full h-full object-cover" alt="Post" />
              </div>

              {/* Actions */}
              <div className="flex items-center p-3 gap-4">
                 <span className="material-icons">favorite_border</span>
                 <span className="material-icons">chat_bubble_outline</span>
                 <span className="material-icons">send</span>
                 <span className="ml-auto material-icons">bookmark_border</span>
              </div>

              {/* Likes & Caption */}
              <div className="px-3 pb-3 text-sm">
                 <div className="font-semibold mb-1">{likes} likes</div>
                 <div>
                    <span className="font-semibold mr-2">{username}</span>
                    {caption}
                 </div>
              </div>
          </div>
       </div>
    </div>
  );
};