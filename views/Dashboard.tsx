import React from 'react';
import { TOOLS } from '../constants';
import { Tool } from '../types';
import { Card } from '../components/Card';

interface DashboardProps {
  onSelectTool: (tool: Tool) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectTool }) => {
  // Get unique categories
  const categories = Array.from(new Set(TOOLS.map(tool => tool.category)));

  return (
    <div className="flex flex-col gap-12 p-4 pb-20">
      {categories.map((category) => (
        <div key={category}>
          {/* Category Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 flex-1 bg-black dark:bg-white opacity-20"></div>
            <h2 className="font-display text-2xl md:text-3xl text-black dark:text-white uppercase tracking-widest px-4 py-1 border-2 border-black dark:border-white shadow-hard bg-retro-bg dark:bg-retro-dark">
              {category}
            </h2>
            <div className="h-1 flex-1 bg-black dark:bg-white opacity-20"></div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {TOOLS.filter(tool => tool.category === category).map((tool) => (
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
        </div>
      ))}
    </div>
  );
};