import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, CheckCircle2, TrendingUp } from 'lucide-react';

// Import Microsoft Images
import pb1 from '../../assets/Power BI images/pic1.png';
import pb2 from '../../assets/Power BI images/Picture2.png';
import pb3 from '../../assets/Power BI images/Picture3.png';
import pb4 from '../../assets/Power BI images/Power-BI-web-2025-Dashboard.png';
import ex1 from '../../assets/Excel image/Excel img 1.png';
import ex2 from '../../assets/Excel image/excel img 2.png';
import productImg from '../../assets/Product img.png';

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
];

type MockupItem = {
  color: string;
  title: string;
  pages: number;
  type: 'mock' | 'image';
  images?: string[];
  agentName: string;
  whatItDoes: string[];
  outcome: {
    text: string;
    footer?: string;
  };
};

const MOCKUP_DATA: Record<string, MockupItem> = {
  schedule: {
    color: 'from-primary-100 to-accent-100',
    title: 'Invoice Processing Agent',
    pages: 1,
    type: 'mock',
    agentName: 'AP Automation Agent',
    whatItDoes: [
      'Automatically extracts line items and header data from multi-format vendor invoices.',
      'Performs 3-way matching against Purchase Orders and Goods Receipts in real-time.',
      'Identifies anomalies and assigns exceptions to specific approvers instantly.',
    ],
    outcome: {
      text: 'Accounts Payable workflows that took days are now instantaneous. Over 96% touchless processing with zero data entry errors.',
      footer: 'Enterprise Finance · SAP Integration · Multi-Region',
    },
  },
  attendance: {
    color: 'from-accent-100 to-accent-100',
    title: 'BI Dashboards',
    pages: 4,
    type: 'image',
    images: [pb1, pb2, pb3, pb4],
    agentName: 'BI Analytics Agent',
    whatItDoes: [
      'AI Chatbot for real-time report conversations.',
      'Automated narratives and smart insights.',
      'Interactive filters with custom drilldowns.',
      'Live dashboards with auto-refresh.',
      'Key Influencer analysis for business factors.',
      'Visual decision trees for data exploration.',
      'Data visualization with compelling charts.',
      'Team collaboration and report sharing.',
      'Track KPIs and spot trends instantly.',
    ],
    outcome: {
      text: 'Business intelligence that was complex and static is now interactive and AI-driven. Insights delivered in seconds, not days.',
      footer: 'Power BI · Azure AI · Real-time Analytics',
    },
  },
  payroll: {
    color: 'from-white to-white',
    title: 'Excel Automation',
    pages: 2,
    type: 'image',
    images: [ex1, ex2],
    agentName: 'Excel Automation Agent',
    whatItDoes: [
      'Seamless Microsoft 365 integration — Excel, Power BI, SharePoint & more.',
      'Low-code apps for custom solutions without developer support.',
      'Cloud-based workflows accessible from anywhere.',
      'AI-powered insights for smarter decisions.',
      'VBA & Office Script automation out of the box.',
      'Power Automate for end-to-end process flows.',
      'Cross-app data sync between Excel, Teams & SharePoint.',
      'Enhanced desktop apps for maximum productivity.',
      'Secure data handling with enterprise compliance.',
    ],
    outcome: {
      text: 'Manual Excel operations that consumed entire workdays now complete in minutes. Fully automated, error-free processing built in.',
      footer: 'Microsoft 365 · VBA · Office Scripts · Power Automate',
    },
  },
  compliance: {
    color: 'from-white to-white',
    title: 'Your Digital Dreams Delivered',
    pages: 1,
    type: 'image',
    images: [productImg],
    agentName: 'Product Suite',
    whatItDoes: [
      'Automate routine office tasks within minutes.',
      'Build bots without coding — no developer needed.',
      'Save up to 90% of your time on repetitive work.',
      'Works with Excel, PowerPoint & Microsoft 365.',
      'Schedule bots with alerts to prevent rework.',
      'Scale across all verticals and domains.',
      'Handle higher volumes with streamlined workflows.',
      'Deploy quickly from concept to execution.',
      'Fully compatible with desktop and cloud processes.',
    ],
    outcome: {
      text: 'Enterprise-grade automation products ready to deploy. From document processing to task allocation — all handled seamlessly.',
      footer: 'DocCraft · Sheets to Slides · File Splitter · Merge Master',
    },
  },
};

export default function ShowcaseCarousel() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const visualCardRef = useRef<HTMLDivElement | null>(null);
  const [visualCardHeight, setVisualCardHeight] = useState<number | null>(null);

  const activeData = MOCKUP_DATA[activeTab as keyof typeof MOCKUP_DATA];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const currentData = MOCKUP_DATA[activeTab as keyof typeof MOCKUP_DATA];

      if (currentPage < currentData.pages) {
        setCurrentPage((prev) => prev + 1);
      } else {
        const currentTabIndex = TABS.findIndex((t) => t.id === activeTab);
        const nextTabIndex = (currentTabIndex + 1) % TABS.length;
        setActiveTab(TABS[nextTabIndex].id);
        setCurrentPage(1);
      }
    }, 2500); // 2.5 seconds per state

    return () => clearTimeout(timer);
  }, [isPlaying, activeTab, currentPage]);

  useEffect(() => {
    const syncRightPanelHeight = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop || !visualCardRef.current) {
        setVisualCardHeight(null);
        return;
      }
      setVisualCardHeight(visualCardRef.current.getBoundingClientRect().height);
    };

    syncRightPanelHeight();
    window.addEventListener('resize', syncRightPanelHeight);

    const observer = new ResizeObserver(syncRightPanelHeight);
    if (visualCardRef.current) {
      observer.observe(visualCardRef.current);
    }

    return () => {
      window.removeEventListener('resize', syncRightPanelHeight);
      observer.disconnect();
    };
  }, [activeTab, currentPage]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setCurrentPage(1);
  };

  return (
    <section className="section-bg relative w-full overflow-hidden py-4">
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white shadow-lg shadow-[#4C99A0]/25'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-0 w-full">
          {/* Left Side: 60% Dashboard Preview */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div ref={visualCardRef} className="w-full rounded-l-2xl lg:rounded-r-none rounded-2xl lg:rounded-bl-2xl overflow-hidden relative bg-white dark:bg-gray-950 shadow-2xl border border-gray-200 dark:border-gray-800">
              {/* Dashboard Image Area */}
              <div className="relative w-full bg-gray-50 dark:bg-[#0B1120]/50" style={{ aspectRatio: '16/10' }}>
                <AnimatePresence mode="wait">
                  {activeData.type === 'image' && activeData.images && (
                    <motion.img
                      key={`${activeTab}-${currentPage}`}
                      src={activeData.images[currentPage - 1]}
                      alt={`${activeData.title} - View ${currentPage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full object-contain p-3 md:p-5"
                    />
                  )}
                  {activeData.type === 'mock' && (
                    <motion.div
                      key={`${activeTab}-mock`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center p-6"
                    >
                      {/* Mock dashboard UI for 'Agents' tab */}
                      <div className="w-full h-full rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-4 md:p-6 flex flex-col gap-4 shadow-sm">
                        {/* Fake header bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center">
                              <span className="text-white text-xs font-bold">AP</span>
                            </div>
                            <div>
                              <div className="text-gray-900 dark:text-white text-sm font-semibold">Invoice Processing Queue</div>
                              <div className="text-gray-400 dark:text-gray-500 text-xs">Q3 2024 · 4 Regions · 12,000 Vendors</div>
                            </div>
                          </div>
                          <span className="px-2 py-1 rounded-md bg-[#65A859]/10 dark:bg-[#65A859]/20 text-[#65A859] text-xs font-semibold">96.8% Auto-Match</span>
                        </div>
                        {/* Fake stats row */}
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'INVOICES PROCESSED', value: '45,230', color: 'text-gray-900 dark:text-white' },
                            { label: 'AUTO-MATCH RATE', value: '96.8%', color: 'text-[#4C99A0]' },
                            { label: 'EXCEPTIONS', value: '142', color: 'text-[#65A859]' },
                          ].map((stat, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-[#1a2332] rounded-lg p-3 border border-gray-100 dark:border-gray-800">
                              <div className="text-gray-400 dark:text-gray-500 text-[10px] tracking-wider mb-1">{stat.label}</div>
                              <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                            </div>
                          ))}
                        </div>
                        {/* Fake chart area */}
                        <div className="flex-1 bg-gray-50 dark:bg-[#1a2332] rounded-lg p-3 flex items-end gap-1 border border-gray-100 dark:border-gray-800">
                          {[40, 65, 50, 80, 70, 90, 85, 75, 95, 88, 92, 100].map((h, i) => (
                            <motion.div
                              key={i}
                              className="flex-1 rounded-t-sm bg-gradient-to-t from-[#4C99A0] to-[#65A859]"
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 0.6, delay: i * 0.05 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Carousel navigation arrows — only when multiple pages */}
                {activeData.pages > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-all disabled:opacity-30 shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(activeData.pages, p + 1))}
                      disabled={currentPage === activeData.pages}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-all disabled:opacity-30 shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Bottom bar: Agent Name + LIVE badge */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-gray-50 dark:bg-[#0d1526] border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">{activeData.agentName.charAt(0)}{activeData.agentName.split(' ')[1]?.charAt(0) || ''}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm font-semibold tracking-wide">{activeData.agentName}</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Page dots */}
                  {activeData.pages > 1 && (
                    <div className="flex items-center gap-1.5 mr-2">
                      {Array.from({ length: activeData.pages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === i + 1
                            ? 'w-5 bg-[#65A859]'
                            : 'w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                            }`}
                        />
                      ))}
                    </div>
                  )}
                  {/* LIVE badge */}
                  <span className="px-3 py-1.5 rounded-md bg-[#65A859]/10 text-[#65A859] text-xs font-bold tracking-wider flex items-center gap-2 border border-[#65A859]/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65A859] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65A859]"></span>
                    </span>
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: 40% — WHAT IT DOES + OUTCOME */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col justify-between bg-white dark:bg-gray-900 rounded-r-2xl lg:rounded-l-none rounded-2xl lg:rounded-tr-2xl lg:rounded-br-2xl border border-gray-200 dark:border-gray-700 lg:border-l-0 shadow-xl overflow-y-auto no-scrollbar"
                style={visualCardHeight ? { height: visualCardHeight } : undefined}
              >
                {/* WHAT IT DOES */}
                <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex-1">
                  <div className="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-5">
                    What It Does
                  </div>
                  <ul className="space-y-3.5">
                    {activeData.whatItDoes.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-0.5 shrink-0">
                          <CheckCircle2 className="w-[18px] h-[18px] text-[#65A859]" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* OUTCOME */}
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-[#65A859]" />
                      <span className="text-xs font-bold tracking-[0.15em] text-[#65A859] uppercase">Outcome</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                      {activeData.outcome.text}
                    </p>
                    {activeData.outcome.footer && (
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 tracking-wide">
                        {activeData.outcome.footer}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
