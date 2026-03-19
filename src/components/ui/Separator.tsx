export default function Separator({ className = 'py-8' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      {/* Container for the line to control max-width if needed */}
      <div className="relative w-full max-w-6xl">
        
        {/* The main sharp line fading at the edges */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        
        {/* The soft blue shadow/glow effect directly underneath */}
        <div className="absolute top-[1px] left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[2px] opacity-40"></div>
        
      </div>
    </div>
  );
}
