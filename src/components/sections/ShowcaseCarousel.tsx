import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Import Microsoft Images
import pb1 from '../../assets/Power BI images/pic1.png';
import pb2 from '../../assets/Power BI images/Picture2.png';
import pb3 from '../../assets/Power BI images/Picture3.png';
import pb4 from '../../assets/Power BI images/Power-BI-web-2025-Dashboard.png';
import ex1 from '../../assets/Excel image/Excel img 1.png';
import ex2 from '../../assets/Excel image/excel img 2.png';

const TABS = [
  { id: 'schedule', label: 'AI Agents' },
  { id: 'attendance', label: 'Products' },
  { id: 'payroll', label: 'Website' },
  { id: 'compliance', label: 'WEB Application' },
  { id: 'microsoft', label: 'Microsoft' },
  // { id: 'custom', label: '', isSpecial: true },
];

type MockupItem = {
  color: string;
  title: string;
  pages: number;
  type: 'mock' | 'image';
  images?: string[];
};

const MOCKUP_DATA: Record<string, MockupItem> = {
  schedule: { color: 'from-primary-100 to-accent-100', title: 'Shift Schedule Overview', pages: 5, type: 'mock' },
  attendance: { color: 'from-accent-100 to-accent-100', title: 'Time Tracking Dashboard', pages: 4, type: 'mock' },
  payroll: { color: 'from-primary-100 to-primary-100', title: 'Payroll Export & Sync', pages: 3, type: 'mock' },
  compliance: { color: 'from-primary-100 to-pink-100', title: 'Rule Break Warnings', pages: 2, type: 'mock' },
  microsoft: {
    color: 'from-slate-100 to-gray-100',
    title: 'Microsoft',
    pages: 6,
    type: 'image',
    images: [pb1, pb2, pb3, pb4, ex1, ex2]
  },
  custom: { color: 'from-primary-100 to-cyan-100', title: 'Custom Workflow Builder', pages: 1, type: 'mock' },
};

export default function ShowcaseCarousel() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeData = MOCKUP_DATA[activeTab as keyof typeof MOCKUP_DATA];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 relative z-20 w-full overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                relative px-5 py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300
                flex items-center gap-2
                ${tab.isSpecial
                  ? 'border border-dashed border-primary-500/50 text-primary-500 hover:bg-primary-500/10'
                  : activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white shadow-lg shadow-[#4C99A0]/25'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {tab.label}
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${tab.id === 'custom' ? 'bg-primary-100 text-primary-700' : 'bg-accent-300/20 text-accent-600'} font-bold`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto flex flex-col gap-6 lg:gap-8 w-full">
          {/* Main Visual Container */}
          <div className="glass-panel w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] bg-white flex flex-col w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-br ${activeData.color} opacity-5`}
                />
              </AnimatePresence>

              {/* Content Switching */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-0">
                <AnimatePresence mode="wait">
                  {activeData.type === 'image' && activeData.images && (
                    <motion.img
                      key={`${activeTab}-${currentPage}`}
                      src={activeData.images[currentPage - 1]}
                      alt={`Carousel image ${currentPage}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Carousel Controls (Outer) */}
          <div className="flex justify-center mt-2 w-full">
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white border border-gray-200 shadow-sm">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <div className="w-px h-4 bg-gray-200 hidden sm:block" />

              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-30 flex-shrink-0"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
                {Array.from({ length: activeData.pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentPage === i + 1
                      ? 'w-4 md:w-6 bg-primary-500'
                      : 'w-1.5 md:w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(activeData.pages, p + 1))}
                className="text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-30 flex-shrink-0"
                disabled={currentPage === activeData.pages}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="w-px h-4 bg-gray-200 hidden sm:block" />

              <span className="text-xs md:text-sm font-medium text-gray-500 whitespace-nowrap">
                {currentPage}/{activeData.pages}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
