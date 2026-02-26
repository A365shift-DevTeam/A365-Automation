import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const TABS = [
  { id: 'schedule', label: 'AI Agents' },
  { id: 'attendance', label: 'Products' },
  { id: 'payroll', label: 'Website' },
  { id: 'compliance', label: 'WEB Application' },
  { id: 'analytics', label: 'Microsoft' },
  // { id: 'custom', label: '', isSpecial: true },
];

const MOCKUP_DATA = {
  schedule: { color: 'from-primary-100 to-accent-100', title: 'Shift Schedule Overview', pages: 5 },
  attendance: { color: 'from-accent-100 to-accent-100', title: 'Time Tracking Dashboard', pages: 4 },
  payroll: { color: 'from-primary-100 to-primary-100', title: 'Payroll Export & Sync', pages: 3 },
  compliance: { color: 'from-primary-100 to-pink-100', title: 'Rule Break Warnings', pages: 2 },
  analytics: { color: 'from-slate-100 to-gray-100', title: 'Labor Cost Analysis', pages: 8 },
  custom: { color: 'from-primary-100 to-cyan-100', title: 'Custom Workflow Builder', pages: 1 },
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

        {/* Browser Mockup */}
        <div className="glass-panel rounded-2xl border border-gray-200 overflow-hidden shadow-2xl shadow-gray-200/50 bg-white">
          {/* Browser Header */}
          <div className="h-12 border-b border-gray-100 flex items-center px-4 relative bg-gray-50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-accent-400" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-gray-200 text-xs font-mono text-gray-500 shadow-sm">
              <span className="text-primary-500">~/</span>{activeTab}
            </div>
          </div>

          {/* Browser Content */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] bg-white overflow-hidden flex flex-col w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentPage}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 bg-gradient-to-br ${activeData.color} opacity-20`}
              />
            </AnimatePresence>

            {/* Mock UI Content */}
            <div className="relative z-10 flex-1 p-4 md:p-6 lg:p-8 flex flex-col h-full overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-4 shrink-0">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{activeData.title}</h3>
                  <div className="h-2 w-32 md:w-48 bg-gray-200 rounded-full" />
                </div>
                <div className="flex gap-4">
                  <div className="h-8 w-20 md:w-24 bg-gray-100 border border-gray-200 rounded-md" />
                  <div className="h-8 w-20 md:w-24 bg-primary-500/90 text-white rounded-md flex items-center justify-center text-xs font-medium shadow-sm" />
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 min-h-0 pb-16">
                {/* Mock Sidebar List */}
                <div className="hidden md:flex col-span-1 flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-10 bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-white transition-all rounded-lg w-full flex items-center px-4 shrink-0 shadow-sm">
                      <div className="w-5 h-5 rounded-full bg-gray-200 mr-3" />
                      <div className="h-2 w-16 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>

                {/* Mock Schedule/Table Grid Content */}
                <div className="col-span-1 md:col-span-3 bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-4 shadow-sm h-full overflow-hidden">
                  <div className="flex gap-2 lg:gap-4 shrink-0">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day} className="flex-1 h-6 bg-gray-50 rounded flex items-center justify-center text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-2">{day}</div>
                    ))}
                  </div>

                  <div className="flex-1 grid grid-cols-7 gap-1 sm:gap-2 auto-rows-fr h-full overflow-y-auto custom-scrollbar pr-1">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const isWeekend = i % 7 === 5 || i % 7 === 6;
                      const hasEvent1 = i % 3 === 0 && !isWeekend;
                      const hasEvent2 = i % 5 === 0 && !isWeekend;
                      return (
                        <div key={i} className={`rounded-md border border-gray-100 ${isWeekend ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50'} p-1.5 sm:p-2 flex flex-col gap-1 transition-colors min-h-[40px] sm:min-h-0`}>
                          <div className="text-[10px] font-medium text-gray-400 mb-1">{i + 1}</div>
                          {hasEvent1 && <div className="h-1.5 w-full bg-primary-500/60 rounded-full" />}
                          {hasEvent2 && <div className="h-1.5 w-3/4 bg-accent-400/60 rounded-full" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-fit max-w-[90%]">
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl mx-auto">
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

      </div>
    </section>
  );
}
