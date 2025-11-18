import React, { useState } from 'react';
import { Button } from '../components/Button';

const JsonNode: React.FC<{ label?: string; value: any; level?: number }> = ({ label, value, level = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const type = isArray ? '[]' : '{}';
  
  if (!isObject) {
    const valueColor = 
      typeof value === 'string' ? 'text-green-600 dark:text-green-400' : 
      typeof value === 'number' ? 'text-blue-600 dark:text-blue-400' : 
      typeof value === 'boolean' ? 'text-purple-600 dark:text-purple-400' : 
      'text-gray-500';

    return (
      <div style={{ paddingLeft: `${level * 16}px` }} className="font-mono text-sm py-1 hover:bg-black/5 dark:hover:bg-white/5">
        {label && <span className="text-retro-deepPurple dark:text-retro-pink mr-2">{label}:</span>}
        <span className={`${valueColor} break-all`}>
          {typeof value === 'string' ? `"${value}"` : String(value)}
        </span>
      </div>
    );
  }

  const entryCount = Object.keys(value).length;

  return (
    <div className="font-mono text-sm">
      <div 
        className="flex items-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 py-1 select-none"
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
      >
        <span className="material-icons text-xs mr-1 text-gray-500">
          {expanded ? 'arrow_drop_down' : 'arrow_right'}
        </span>
        {label && <span className="text-retro-deepPurple dark:text-retro-pink mr-2">{label}:</span>}
        <span className="text-gray-500 font-bold">{isArray ? '[' : '{'}</span>
        {!expanded && <span className="text-gray-400 mx-1 text-xs">... {entryCount} items ...</span>}
        {!expanded && <span className="text-gray-500 font-bold">{isArray ? ']' : '}'}</span>}
      </div>
      
      {expanded && (
        <div>
          {Object.entries(value).map(([key, val]) => (
            <JsonNode key={key} label={isArray ? undefined : key} value={val} level={level + 1} />
          ))}
          <div style={{ paddingLeft: `${level * 16 + 16}px` }} className="text-gray-500 font-bold py-1">
            {isArray ? ']' : '}'}
          </div>
        </div>
      )}
    </div>
  );
};

export const JsonTreeViewer: React.FC = () => {
  const [input, setInput] = useState('{\n  "name": "RetroFunk OS",\n  "version": 1.0,\n  "features": ["AI", "Tools", "Retro UI"],\n  "active": true,\n  "meta": {\n    "created": 1995,\n    "author": "Unknown"\n  }\n}');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(input);
      setData(parsed);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setData(null);
    }
  };

  // Initial parse on mount/first render
  React.useEffect(() => {
    handleParse();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          <div className="flex justify-between items-center">
            <label className="font-mono font-bold bg-black text-white px-2">RAW_JSON_INPUT</label>
            <div className="flex gap-2">
                <button onClick={() => setInput('{}')} className="text-xs font-mono underline">CLEAR</button>
                <button onClick={() => {
                    try { setInput(JSON.stringify(JSON.parse(input), null, 2)) } catch {}
                }} className="text-xs font-mono underline">FORMAT</button>
            </div>
          </div>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full border-2 border-black p-2 font-mono text-xs resize-none focus:shadow-hard-sm outline-none bg-white dark:bg-gray-900 dark:text-white"
            spellCheck={false}
          />
          <Button onClick={handleParse}>PARSE JSON</Button>
        </div>

        <div className="flex-1 flex flex-col gap-2 min-h-0">
          <label className="font-mono font-bold bg-retro-yellow text-black px-2 self-start border-2 border-black">TREE_VIEW</label>
          <div className="flex-1 border-2 border-black bg-gray-50 dark:bg-gray-800 p-4 overflow-auto shadow-hard-sm relative">
            {error ? (
              <div className="text-red-600 font-mono p-4 border-2 border-red-200 bg-red-50">
                <div className="font-bold mb-2">PARSE_ERROR:</div>
                {error}
              </div>
            ) : data ? (
              <JsonNode value={data} />
            ) : (
              <div className="text-gray-400 font-mono text-center mt-10">NO_DATA_TO_DISPLAY</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};