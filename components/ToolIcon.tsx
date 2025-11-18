import React from 'react';

export const ToolIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = '' }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ fontFamily: 'Material Icons, sans-serif' }}>
    {/* 
      We need to load Material Icons stylesheet in index.html or use an SVG library. 
      For simplicity, I will stick to text-based fallback if external CSS fails, 
      but let's assume we add the link in App or rely on text.
      Actually, standard practice is to add the link. I will update index.html in my mind, 
      but since I cannot edit previous files in this stream, I will use a simple SVG mapping or text.
      Let's just use text for the 'icon' name as a fallback if the font isn't loaded, 
      but actually I'll inject the link in the App useEffect to be safe.
    */}
    {icon}
  </span>
);