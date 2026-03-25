import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import excelImg from '../../assets/Excel 9.png';
import pptImg from '../../assets/Power Point 10.png';
import ambotLogo from '../../assets/Ambot logo png.png';

const LogoBox = ({ name, color, className = "" }: { name: string, color?: string, className?: string }) => (
  <div className={`flex items-center justify-center h-10 px-1 rounded-md border border-gray-100 bg-white shadow-sm text-[9px] font-bold hover:shadow-md transition-shadow cursor-pointer ${className}`}>
    <span style={{ color: color || '#4B5563' }} className="text-center leading-[1.1] line-clamp-2">{name}</span>
  </div>
);

export default function ProductsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lines, setLines] = useState<{ id: string; path: string; delay: number }[]>([]);

  const updateLines = () => {
    if (!containerRef.current || !centerRef.current) return;
    
    // Scale-independent dimensions provided by user design
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();
    
    // Adjust center points for top and bottom connections
    const centerPointTop = {
      x: centerRect.left - containerRect.left + centerRect.width / 2,
      y: centerRect.top - containerRect.top + 10,
    };
    const centerPointBottom = {
      x: centerRect.left - containerRect.left + centerRect.width / 2,
      y: centerRect.bottom - containerRect.top - 10,
    };

    const newLines: { id: string; path: string; delay: number }[] = [];

    // Lines from top items to center
    topRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const point = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.bottom - containerRect.top,
      };
      
      const cp1x = point.x;
      const cp1y = point.y + (centerPointTop.y - point.y) / 2;
      const cp2x = centerPointTop.x;
      const cp2y = centerPointTop.y - (centerPointTop.y - point.y) / 2;
      
      newLines.push({
        id: `top-${index}`,
        path: `M ${point.x} ${point.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${centerPointTop.x} ${centerPointTop.y}`,
        delay: index * 0.7,
      });
    });

    // Lines from center to bottom items
    bottomRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const point = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      };
      
      const cp1x = centerPointBottom.x;
      const cp1y = centerPointBottom.y + (point.y - centerPointBottom.y) / 2;
      const cp2x = point.x;
      const cp2y = point.y - (point.y - centerPointBottom.y) / 2;
      
      newLines.push({
        id: `bottom-${index}`,
        path: `M ${centerPointBottom.x} ${centerPointBottom.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`,
        delay: index * 0.9,
      });
    });

    setLines(newLines);
  };

  useLayoutEffect(() => {
    // Small delay to ensure layout is settled
    const timer = setTimeout(updateLines, 100);
    const observer = new ResizeObserver(updateLines);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#F8FAFC] dark:bg-gray-950 p-4 overflow-hidden flex items-center justify-center font-sans absolute inset-0">
      <div 
        ref={containerRef} 
        className="relative w-full min-w-[320px] max-w-[600px] h-[400px] flex flex-col items-center justify-between py-6 shrink-0"
      >
        {/* SVG Lines */}
        <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible" width="100%" height="100%">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {lines.map((line) => (
            <g key={line.id}>
              <path
                d={line.path}
                fill="none"
                stroke="#E2E8F0"
                className="dark:stroke-gray-800"
                strokeWidth="1.5"
              />
              <circle r="3" fill="#22c55e" filter="url(#glow)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={line.path}
                  begin={`${line.delay}s`}
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Top Row */}
        <div className="flex justify-center gap-32 z-10 w-full mb-auto mt-2">
          {/* Excel */}
          <div ref={el => { topRefs.current[0] = el; }} className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer overflow-hidden p-2">
            <img src={excelImg} alt="Excel" className="w-full h-full object-contain" />
          </div>

          {/* PowerPoint */}
          <div ref={el => { topRefs.current[1] = el; }} className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer overflow-hidden p-2">
            <img src={pptImg} alt="PowerPoint" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Center Section */}
        <div className="z-10 relative flex items-center justify-center my-auto">
          {/* Center Logo */}
          <div ref={centerRef} className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-20 h-20 flex items-center justify-center relative hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img src={ambotLogo} alt="Ambot Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          
          {/* Right Text */}
          <div className="absolute left-[50%] ml-16 whitespace-nowrap hidden sm:block">
            <div className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200">Zero coding</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center z-10 w-full mt-auto mb-2">
          {/* 7 Icons Card */}
          <div ref={el => { bottomRefs.current[0] = el; }} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full max-w-[380px]">
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider text-center">Our Bots</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <LogoBox name="DocCraft" color="#002060" className="w-[calc(25%-6px)] dark:bg-gray-900 border-gray-100 dark:border-gray-700" />
              <LogoBox name="Image Compressor" color="#002060" className="w-[calc(25%-6px)] dark:bg-gray-900 border-gray-100 dark:border-gray-700" />
              <LogoBox name="Consolidation" color="#002060" className="w-[calc(25%-6px)] dark:bg-gray-900 border-gray-100 dark:border-gray-700" />
              <LogoBox name="File Splitter" color="#002060" className="w-[calc(25%-6px)] dark:bg-gray-900 border-gray-100 dark:border-gray-700" />
              <LogoBox name="Merge Master" color="#002060" className="w-[calc(25%-6px)] dark:bg-gray-900 border-gray-100 dark:border-gray-700" />
              <LogoBox name="File Comparison" color="#002060" className="w-[calc(25%-6px)] dark:bg-gray-900 border-gray-100 dark:border-gray-700" />
              <LogoBox name="Work Allocation" color="#002060" className="w-[calc(25%-6px)] dark:!text-white dark:bg-gray-900 border-gray-100 dark:border-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
