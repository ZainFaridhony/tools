import React, { useState } from 'react';
import { Button } from '../components/Button';
import { generateImage } from '../services/geminiService';

const RetroSpinner = () => (
  <div className="w-4 h-4 border-2 border-current border-t-transparent border-r-transparent animate-spin rounded-none inline-block"></div>
);

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const base64Data = await generateImage(prompt);
      setImage(base64Data);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6 shadow-hard-sm dark:shadow-none transition-colors">
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <label className="font-display text-xl dark:text-white">ENTER PROMPT:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cyberpunk cat eating pizza in 1995..."
            className="w-full h-32 p-4 font-mono text-lg border-2 border-black dark:border-white focus:outline-none focus:shadow-hard-sm resize-none bg-retro-bg dark:bg-gray-900 dark:text-white transition-colors"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <RetroSpinner />
                  <span className="animate-pulse">GENERATING...</span>
                </div>
              ) : (
                "GENERATE IMAGE"
              )}
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 font-mono">
          ERROR: {error}
        </div>
      )}

      {image && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-800 shadow-hard dark:shadow-[4px_4px_0px_0px_#fff] relative animate-in fade-in zoom-in duration-500">
           <img src={image} alt="Generated" className="max-h-[400px] w-auto border-2 border-black dark:border-white shadow-hard-sm dark:shadow-none" />
           <a 
             href={image} 
             download={`retro-gen-${Date.now()}.jpg`}
             className="mt-4 inline-block bg-black text-white font-mono px-4 py-2 hover:bg-retro-neonGreen hover:text-black border-2 border-transparent hover:border-black transition-colors"
           >
             DOWNLOAD.JPG
           </a>
        </div>
      )}
      
      {!image && !loading && !error && (
        <div className="flex-1 flex items-center justify-center border-2 border-black dark:border-white border-dashed opacity-50 dark:text-white">
          <p className="font-mono text-xl">OUTPUT_DISPLAY_AREA</p>
        </div>
      )}
    </div>
  );
};