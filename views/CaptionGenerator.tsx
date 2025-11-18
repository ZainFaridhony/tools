import React, { useState } from 'react';
import { Button } from '../components/Button';
import { generateCaption } from '../services/geminiService';

export const CaptionGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setCaption('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await generateCaption(image);
      setCaption(result);
    } catch (e) {
      setCaption("ERROR: COULD_NOT_GENERATE_CAPTION");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="border-2 border-black border-dashed p-4 text-center hover:bg-gray-50 transition-colors relative bg-white dark:bg-gray-800">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="pointer-events-none">
            <span className="material-icons text-4xl text-gray-400">cloud_upload</span>
            <p className="font-mono text-sm mt-2">DRAG IMAGE OR CLICK TO UPLOAD</p>
        </div>
      </div>

      {image && (
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          <div className="flex-1 bg-black flex items-center justify-center border-2 border-black p-2 shadow-hard-sm">
             <img src={image} alt="Preview" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Button onClick={handleGenerate} disabled={loading} isLoading={loading}>
              GENERATE CAPTION
            </Button>
            <div className="flex-1 border-2 border-black bg-retro-yellow p-4 font-mono text-sm overflow-y-auto shadow-inner relative">
               <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-1">GEMINI_2.5_FLASH</div>
               {caption ? caption : "Awaiting generation..."}
            </div>
            <Button variant="secondary" onClick={() => navigator.clipboard.writeText(caption)} disabled={!caption}>
              COPY_TEXT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};