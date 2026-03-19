export default function Separator({ className = 'py-10' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="relative w-full max-w-6xl">
        {/* Top highlight (raised edge) */}
        <div className="absolute -top-[1px] left-0 w-full h-[1px] bg-white/90 dark:bg-gray-500/25 z-0" />

        {/* Ultra-thin main bevel line (1px) */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 rounded-full z-10" />

        {/* Sharp, thin bottom shadow */}
        <div className="absolute top-[1px] left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-900 blur-[2px] opacity-25 z-0" />
      </div>
    </div>
  );
}
