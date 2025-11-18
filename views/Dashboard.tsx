import React, { useState, useMemo } from 'react';
import { TOOLS } from '../constants';
import { Tool } from '../types';
import { Card } from '../components/Card';

interface DashboardProps {
  onSelectTool: (tool: Tool) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');

  // Get unique categories preserving order from TOOLS
  const categories = useMemo(() => {
    const unique = Array.from(new Set(TOOLS.map(tool => tool.category)));
    return ['All', ...unique];
  }, []);

  const filteredTools = useMemo(() => {
    let tools = selectedCategory === 'All' ? [...TOOLS] : TOOLS.filter(t => t.category === selectedCategory);
    
    if (sortOrder === 'asc') {
      tools.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      tools.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return tools;
  }, [selectedCategory, sortOrder]);

  const renderGrid = (tools: Tool[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
      {tools.map((tool) => (
        <div 
          key={tool.id}
          className="group"
        >
          <Card 
            title={tool.name} 
            color={tool.color}
            isDraggable={true}
            onClick={() => onSelectTool(tool)}
            className="h-64 transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pointer-events-none select-none">
              <div className="w-20 h-20 border-2 border-black bg-white rounded-full flex items-center justify-center shadow-hard-sm group-hover:scale-110 transition-transform duration-200">
                 <span className="material-icons text-4xl text-black">{tool.icon}</span>
              </div>
              <p className="font-mono text-sm font-bold dark:text-black px-2 bg-white/50 backdrop-blur-sm border border-black/10 rounded">
                {tool.description}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col p-4 pb-20 relative">
      
      {/* Controls Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-4 shadow-hard z-10 relative">
         
         {/* Categories */}
         <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono font-bold mr-2 py-1 dark:text-white text-xs md:text-sm">FILTER:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3 py-1 font-mono text-xs md:text-sm border-2 border-black transition-all
                  ${selectedCategory === cat 
                    ? 'bg-retro-hotPink text-white shadow-hard-sm translate-y-[-2px]' 
                    : 'bg-gray-100 hover:bg-gray-200 text-black hover:translate-y-[-1px]'}
                `}
              >
                {cat === 'All' ? 'ALL' : cat.toUpperCase()}
              </button>
            ))}
         </div>

         {/* Sort */}
         <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="font-mono font-bold dark:text-white text-xs md:text-sm">SORT:</span>
            <div className="relative flex-1 md:flex-none">
                <select 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="w-full md:w-48 appearance-none border-2 border-black px-3 py-1 pr-8 font-mono text-xs md:text-sm bg-retro-yellow focus:outline-none shadow-hard-sm cursor-pointer hover:bg-yellow-400 transition-colors"
                >
                  <option value="default">DEFAULT (GROUPED)</option>
                  <option value="asc">NAME (A-Z)</option>
                  <option value="desc">NAME (Z-A)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                  <span className="material-icons text-sm">arrow_drop_down</span>
                </div>
            </div>
         </div>
      </div>

      {/* Content */}
      {sortOrder === 'default' && selectedCategory === 'All' ? (
         <div className="flex flex-col gap-12">
           {categories.filter(c => c !== 'All').map((category) => (
             <div key={category}>
               <div className="flex items-center gap-4 mb-6">
                 <div className="h-1 flex-1 bg-black dark:bg-white opacity-20"></div>
                 <h2 className="font-display text-xl md:text-3xl text-black dark:text-white uppercase tracking-widest px-4 py-1 border-2 border-black dark:border-white shadow-hard bg-retro-bg dark:bg-retro-dark transform -rotate-1">
                   {category}
                 </h2>
                 <div className="h-1 flex-1 bg-black dark:bg-white opacity-20"></div>
               </div>
               {renderGrid(TOOLS.filter(tool => tool.category === category))}
             </div>
           ))}
         </div>
      ) : (
         <div className="animate-in fade-in duration-300">
            {/* Optional Header for Filtered View */}
            {selectedCategory !== 'All' && (
                <div className="mb-6">
                   <h2 className="font-display text-2xl inline-block border-b-4 border-retro-hotPink dark:text-white">
                     {selectedCategory.toUpperCase()}
                   </h2>
                </div>
            )}
            
            {filteredTools.length > 0 ? (
               renderGrid(filteredTools)
            ) : (
               <div className="text-center py-20 opacity-50 font-mono text-xl dark:text-white">NO_MODULES_FOUND</div>
            )}
         </div>
      )}
    </div>
  );
};