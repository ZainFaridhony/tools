import React, { useState, useEffect } from 'react';
import { Dashboard } from './views/Dashboard';
import { ImageGenerator } from './views/ImageGenerator';
import { ChatBot } from './views/ChatBot';
import { PdfScanner } from './views/PdfScanner';
import { PaletteGenerator } from './views/PaletteGenerator';
import { TweetToImage } from './views/TweetToImage';
import { BionicReader } from './views/BionicReader';
import { Handwriter } from './views/Handwriter';
import { CodeSnap } from './views/CodeSnap';
import { CssLoaders } from './views/CssLoaders';
import { CaptionGenerator } from './views/CaptionGenerator';
import { InstaMaker } from './views/InstaMaker';
import { ClipPathGenerator } from './views/ClipPathGenerator';
import { JsonTreeViewer } from './views/JsonTreeViewer';
import { ReactNativeShadowGenerator } from './views/ReactNativeShadowGenerator';
import { HtmlEncoderDecoder } from './views/HtmlEncoderDecoder';
import { Tool } from './types';
import { Card } from './components/Card';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    // Inject Google Fonts and Material Icons
    const fontLink = document.createElement('link');
    fontLink.href = "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Permanent+Marker&family=Material+Icons&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleCloseTool = () => setActiveTool(null);

  const renderActiveTool = () => {
    if (!activeTool) return null;

    switch (activeTool.id) {
      case 'ai-image': return <ImageGenerator />;
      case 'ai-chat': return <ChatBot />;
      case 'pdf-scan': return <PdfScanner />;
      case 'palette-gen': return <PaletteGenerator />;
      case 'tweet-img': return <TweetToImage />;
      case 'bionic-read': return <BionicReader />;
      case 'text-hand': return <Handwriter />;
      case 'code-img': return <CodeSnap />;
      case 'css-loader': return <CssLoaders />;
      case 'img-caption': return <CaptionGenerator />;
      case 'insta-post': return <InstaMaker />;
      case 'clip-path': return <ClipPathGenerator />;
      case 'json-tree': return <JsonTreeViewer />;
      case 'rn-shadow': return <ReactNativeShadowGenerator />;
      case 'html-enc': return <HtmlEncoderDecoder />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 p-8">
            <span className="material-icons text-6xl animate-bounce">error_outline</span>
            <h2 className="font-display text-3xl">MODULE NOT FOUND</h2>
            <Button onClick={handleCloseTool} variant="danger">CLOSE</Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[radial-gradient(#ccc_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] transition-colors duration-500 ease-in-out">
      {/* Header */}
      <header className="border-b-4 border-black bg-white dark:bg-black sticky top-0 z-[1000] transition-colors duration-500 ease-in-out">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => setActiveTool(null)}
          >
            <div className="w-10 h-10 bg-retro-hotPink border-2 border-black shadow-hard-sm flex items-center justify-center hover:rotate-12 transition-transform">
              <span className="font-display text-xl text-white">R</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl tracking-tighter dark:text-white transition-colors duration-500">
              RETRO<span className="text-retro-purple">FUNK</span>_OS
            </h1>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="w-12 h-12 border-2 border-black flex items-center justify-center bg-retro-neonGreen hover:bg-green-400 shadow-hard active:shadow-none active:translate-y-1 transition-all"
          >
            <span className="material-icons text-black">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 transition-colors duration-500 relative">
        {activeTool ? (
          <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
             <div className="mb-4 flex justify-between items-center">
                <Button onClick={handleCloseTool} variant="secondary" className="flex items-center gap-2 text-xs">
                  <span className="material-icons text-sm">arrow_back</span>
                  BACK_TO_GRID
                </Button>
             </div>
             <Card 
              title={activeTool.name} 
              onClose={handleCloseTool}
              isDraggable={true}
              className="min-h-[600px] h-[calc(100vh-200px)] bg-retro-bg dark:bg-gray-900 transition-colors duration-500"
             >
               {renderActiveTool()}
             </Card>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
               <h2 className="font-mono font-bold text-lg mb-2 inline-block bg-black text-white px-2 transition-colors duration-500">AVAILABLE_MODULES: {15}</h2>
               <p className="font-sans text-gray-600 dark:text-gray-400 transition-colors duration-500">Select a tool to launch application window.</p>
            </div>
            <Dashboard onSelectTool={setActiveTool} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-retro-yellow py-2 text-center font-mono text-xs font-bold transition-colors duration-500 select-none relative z-10">
        SYSTEM_STATUS: ONLINE | MEMORY: 64KB | © 199X RETRO CORP
      </footer>
    </div>
  );
};

export default App;