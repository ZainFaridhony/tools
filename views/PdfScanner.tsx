import React, { useState } from 'react';
import { Button } from '../components/Button';

export const PdfScanner: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        Array.from(e.target.files).forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const target = ev.target as FileReader;
                if (target?.result) {
                    setImages(prev => [...prev, target.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    }
  };

  const handlePrint = () => {
     const printWindow = window.open('', '_blank');
     if (printWindow) {
         printWindow.document.write(`
            <html>
                <head>
                    <title>RetroFunk PDF Export</title>
                    <style>
                        body { margin: 0; padding: 20px; font-family: courier; text-align: center; }
                        img { max-width: 100%; max-height: 100vh; margin-bottom: 20px; border: 1px solid #ccc; }
                        @media print { body { padding: 0; } img { page-break-after: always; } }
                    </style>
                </head>
                <body>
                    ${images.map(img => `<img src="${img}" />`).join('')}
                    <script>window.onload = () => { window.print(); window.close(); }</script>
                </body>
            </html>
         `);
         printWindow.document.close();
     }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 border-2 border-black transition-colors">
          <label className="cursor-pointer bg-retro-yellow text-black font-bold font-mono px-4 py-2 border-2 border-black shadow-hard-sm hover:translate-y-[1px] hover:shadow-none active:bg-yellow-500">
             ADD PAGES +
             <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
          <Button onClick={handlePrint} disabled={images.length === 0}>
             PRINT / SAVE PDF
          </Button>
      </div>

      <div className="flex-1 bg-gray-200 dark:bg-gray-800 border-2 border-black overflow-y-auto p-8 shadow-inner transition-colors">
         {images.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center opacity-40 dark:text-white">
                 <span className="material-icons text-6xl">description</span>
                 <p className="font-mono font-bold mt-2">NO_DOCUMENTS_LOADED</p>
             </div>
         ) : (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {images.map((img, idx) => (
                     <div key={idx} className="relative group bg-white p-2 shadow-hard rotate-1 hover:rotate-0 transition-transform duration-300">
                         <img src={img} alt={`Page ${idx + 1}`} className="w-full h-48 object-cover border border-gray-300" />
                         <div className="absolute -top-2 -left-2 bg-black text-white w-6 h-6 flex items-center justify-center font-mono text-xs rounded-full border border-white">
                             {idx + 1}
                         </div>
                         <button 
                           onClick={() => setImages(images.filter((_, i) => i !== idx))}
                           className="absolute top-2 right-2 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                            <span className="material-icons text-sm">delete</span>
                         </button>
                     </div>
                 ))}
             </div>
         )}
      </div>
    </div>
  );
};