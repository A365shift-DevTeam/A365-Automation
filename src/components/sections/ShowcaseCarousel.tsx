import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Import Microsoft Images
import pb1 from '../../assets/Power BI images/pic1.png';
import pb2 from '../../assets/Power BI images/Picture2.png';
import pb3 from '../../assets/Power BI images/Picture3.png';
import pb4 from '../../assets/Power BI images/Power-BI-web-2025-Dashboard.png';
import ex1 from '../../assets/Excel image/Excel img 1.png';
import ex2 from '../../assets/Excel image/excel img 2.png';

type TabItem = {
  id: string;
  label: string;
  isSpecial?: boolean;
  badge?: string;
};

const TABS: TabItem[] = [
  { id: 'schedule', label: 'Agents' },
  { id: 'attendance', label: 'BI' },
  { id: 'payroll', label: 'Excel' },
  { id: 'compliance', label: 'Products' },
  // { id: 'microsoft', label: 'Microsoft' },
  // { id: 'custom', label: '', isSpecial: true },
];

type MockupItem = {
  color: string;
  title: string;
  pages: number;
  type: 'mock' | 'image';
  images?: string[];
  descriptions?: string[];
  features?: string[];
  customContent?: React.ReactNode;
};

const MOCKUP_DATA: Record<string, MockupItem> = {
  schedule: {
    color: 'from-primary-100 to-accent-100',
    title: 'Shift Schedule Overview',
    pages: 5,
    type: 'mock',
    descriptions: ['Optimize your shift planning with intelligent scheduling that adapts to real-time needs and constraints.', 'View comprehensive schedules across all departments at a glance.', 'Automatically detect and resolve scheduling conflicts before they occur.'],
    features: ['Automated conflict resolution', 'Real-time coverage alerts', 'Multi-department sync']
  },
  attendance: {
    color: 'from-accent-100 to-accent-100',
    title: 'BI Dashboards',
    pages: 4,
    type: 'image',
    images: [pb1, pb2, pb3, pb4],
    customContent: (
      <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-semibold px-4 py-2 text-center text-sm border-b border-gray-100 dark:border-gray-700">AI Features</div>
          <ul className="space-y-1 p-3 text-[13px] leading-snug">
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Chatbot: Real-time chat with reports.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>AI Tree: Visual decision trees.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Narrative: Automated insights.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Key Influencer: Identifying key business factors.</span></li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-semibold px-4 py-2 text-center text-sm border-b border-gray-100 dark:border-gray-700">Features</div>
          <ul className="space-y-1 p-3 text-[13px] leading-snug">
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Live Updates: Get the latest information with each refresh.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Interactive Filters: Custom views and drilldowns.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Data Visualization: Create compelling visuals to represent data.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Collaboration Tools: Share insights and reports with your team.</span></li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-semibold px-4 py-2 text-center text-sm border-b border-gray-100 dark:border-gray-700">Benefits</div>
          <ul className="space-y-1 p-3 text-[13px] leading-snug">
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Monitor Business: Keep track of key metrics.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Identify Trends: Spot patterns and insights.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Enhance Efficiency: Streamline operations with data-driven insights.</span></li>
          </ul>
        </div>
      </div>
    )
  },
  payroll: {
    color: 'from-primary-100 to-primary-100',
    title: 'Excel Automation',
    pages: 2,
    type: 'image',
    images: [ex1, ex2],
    customContent: (
      <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-semibold px-4 py-2 text-center text-sm border-b border-gray-100 dark:border-gray-700">Microsoft 365 Integrations</div>
          <div className="p-3">
            <p className="text-[13px] leading-snug mb-3">
              Seamlessly connect across the Microsoft ecosystem, leveraging <strong>Desktop, Cloud, and AI</strong> capabilities for:
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Excel</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Office Script</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Power Automate</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">VBA</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Power BI</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">SharePoint</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Teams</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-semibold px-4 py-2 text-center text-sm border-b border-gray-100 dark:border-gray-700">Key Benefits: Microsoft 365</div>
          <ul className="space-y-1 p-3 text-[13px] leading-snug">
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Low-Code Apps:</strong> Create custom solutions effortlessly.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Cloud Integration:</strong> Enhance collaboration and accessibility from anywhere.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Automation:</strong> Streamline tasks, saving time and reducing errors.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">AI Insights:</strong> Make smarter decisions with powerful AI tools.</span></li>
            <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Enhanced Desktop:</strong> Boost efficiency with advanced desktop applications.</span></li>
          </ul>
        </div>
      </div>
    )
  },
  compliance: {
    color: 'from-primary-100 to-pink-100',
    title: 'Rule Break Warnings',
    pages: 2,
    type: 'mock',
    descriptions: ['Stay ahead of compliance issues with automated rule break detection and immediate alerting.', 'Detailed audit trails and reporting for regulatory requirements.'],
    features: ['Proactive compliance monitoring', 'Automated audit logs', 'Configurable rule engines']
  },
  microsoft: {
    color: 'from-slate-100 to-gray-100',
    title: 'Microsoft',
    pages: 6,
    type: 'image',
    images: [pb1, pb2, pb3, pb4, ex1, ex2],
    descriptions: ['Seamlessly integrate with the Microsoft ecosystem for automated data flows.', 'Experience deep integration across Power BI, Excel, and Office 365.'],
    features: ['Native M365 integration', 'Secure data parsing', 'Cross-app automation']
  },
  custom: {
    color: 'from-primary-100 to-cyan-100',
    title: 'Custom Workflow Builder',
    pages: 1,
    type: 'mock',
    descriptions: ['Design and deploy custom automation workflows tailored to your unique business processes.'],
    features: ['Drag-and-drop builder', 'API endpoint integration', 'Custom logic routing']
  },
};

export default function ShowcaseCarousel() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeData = MOCKUP_DATA[activeTab as keyof typeof MOCKUP_DATA];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && activeData.pages > 1) {
      interval = setInterval(() => {
        setCurrentPage((prev) => (prev % activeData.pages) + 1);
      }, 3000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeData.pages]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setCurrentPage(1);
  };

  return (
    <section className="section-bg relative w-full overflow-hidden py-4">
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs - matching site theme */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#65A859]/45 dark:bg-[#65A859]/30 blur-3xl"
          animate={reduceMotion ? undefined : {
            y: [0, -12, 0],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[#4C99A0]/40 dark:bg-[#4C99A0]/25 blur-3xl"
          animate={reduceMotion ? undefined : {
            y: [0, 10, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-[#65A859]/35 dark:bg-[#65A859]/20 blur-3xl"
          animate={reduceMotion ? undefined : {
            y: [0, -8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">

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
                  ? 'border border-dashed border-primary-500/50 text-primary-500 hover:bg-primary-500/10 dark:hover:bg-primary-500/20'
                  : activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white shadow-lg shadow-[#4C99A0]/25'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
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
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          {/* Left Side: 60% Carousel */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            {/* Main Visual Container */}
            <div className="glass-panel w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/11] bg-white dark:bg-gray-950 flex flex-col w-full">
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
                        className="w-full h-full object-contain p-2 md:p-4"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Carousel Controls (Outer) */}
            <div className="flex justify-center w-full">
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex-shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-30 disabled:dark:opacity-50 flex-shrink-0"
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
                        : 'w-1.5 md:w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(activeData.pages, p + 1))}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-30 disabled:dark:opacity-50 flex-shrink-0"
                  disabled={currentPage === activeData.pages}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

                <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {currentPage}/{activeData.pages}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: 40% Information */}
          <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-0 lg:py-2 relative">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.customContent ? activeTab : `${activeTab}-${currentPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col gap-6"
              >
                <div>
                  {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    Agent Insight
                  </div> */}
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                    {activeData.title}
                  </h3>
                </div>

                {activeData.customContent ? (
                  activeData.customContent
                ) : (
                  <>
                    <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {activeData.descriptions?.[currentPage - 1] || activeData.descriptions?.[0] || 'Experience intelligent automation tailored to your unique workflows, driving efficiency and scale across operations.'}
                    </p>

                    {activeData.features && (
                      <div className="mt-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Key Capabilities</h4>
                        <ul className="space-y-3">
                          {activeData.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${activeData.color} shrink-0`} />
                              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
