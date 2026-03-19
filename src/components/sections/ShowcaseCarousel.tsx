import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, CheckCircle2, TrendingUp } from 'lucide-react';
import ProcessAnimationCard from '../ui/ProcessAnimationCard';
import WebMobileAnimation from '../ui/WebMobileAnimation';
import ChatbotPreview from '../ui/ChatbotPreview';

// Videos
import biVideo from '../../assets/Videos/BI.mp4';
import excelVideo from '../../assets/Videos/Excel.mp4';
import pb1 from '../../assets/Power BI images/pic1.png';
import pb2 from '../../assets/Power BI images/Picture2.png';
import pb3 from '../../assets/Power BI images/Picture3.png';
import pb4 from '../../assets/Power BI images/Power-BI-web-2025-Dashboard.png';
import ex1 from '../../assets/Excel image/Excel img 1.png';
import ex2 from '../../assets/Excel image/excel img 2.png';
import productImg from '../../assets/Product img.png';

// Website GIFs
import gifCar from '../../assets/Website gif/Car.gif';
import gifHome from '../../assets/Website gif/Home.gif';
import gifJwelery from '../../assets/Website gif/Jwelery.gif';
import gifPerfume from '../../assets/Website gif/Perfume.gif';
import gifPC from '../../assets/Website gif/PC.gif';

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
  { id: 'webmobile', label: 'Web & Mobile' },
  { id: 'chatbot', label: 'Chatbot' },
  { id: 'websites', label: 'Websites' },
  { id: 'compliance', label: 'Products' },
];

type MockupItem = {
  color: string;
  title: string;
  pages: number;
  type: 'mock' | 'image' | 'iframe' | 'chatbot' | 'video' | 'mixed';
  images?: string[];
  video?: string;
  iframeUrl?: string;
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
    pages: 5,
    type: 'mixed',
    video: biVideo,
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
    pages: 3,
    type: 'mixed',
    video: excelVideo,
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
  webmobile: {
    color: 'from-blue-50 to-indigo-50',
    title: 'Web & Mobile Applications',
    pages: 1,
    type: 'iframe',
    iframeUrl: 'https://resturant-poc-kohl.vercel.app/',
    agentName: 'Web & Mobile Solutions',
    whatItDoes: [
      'Custom web applications with modern frameworks — React, Next.js, Angular.',
      'Cross-platform mobile apps for iOS and Android.',
      'Progressive Web Apps (PWA) for offline-ready experiences.',
      'API development and third-party integrations.',
      'Real-time dashboards and data-driven UIs.',
      'Cloud-native deployment on Azure, AWS, or GCP.',
      'Performance-optimized, scalable architecture.',
      'End-to-end development from design to deployment.',
    ],
    outcome: {
      text: 'Enterprise-grade web and mobile applications delivered with modern tech stacks. From concept to production in weeks, not months.',
      footer: 'React · Next.js · React Native · Azure · REST APIs',
    },
  },
  chatbot: {
    color: 'from-cyan-50 to-emerald-50',
    title: 'AI Chatbot Assistant',
    pages: 1,
    type: 'chatbot',
    agentName: 'Conversational Assistant',
    whatItDoes: [
      'Answers questions about all sections on this page in a guided chat flow.',
      'Highlights key offerings from Agents, BI, Excel, Web & Mobile, Websites, and Products.',
      'Improves engagement with quick contextual responses and clear next steps.',
      'Ends with a direct Contact Us action to convert interest into leads.',
    ],
    outcome: {
      text: 'Visitors get immediate guidance and product clarity, then move smoothly to Contact Us for faster conversion.',
      footer: 'AI Chat · Lead Capture · Customer Guidance',
    },
  },
  websites: {
    color: 'from-emerald-50 to-teal-50',
    title: 'Professional Websites',
    pages: 5,
    type: 'image',
    images: [gifHome, gifCar, gifJwelery, gifPerfume, gifPC],
    agentName: 'Website Solutions',
    whatItDoes: [
      'Corporate and brand websites with premium design.',
      'E-commerce platforms with payment integrations.',
      'Landing pages optimized for lead generation.',
      'SEO-optimized content architecture.',
      'CMS integration — WordPress, Headless CMS.',
      'Responsive design for all screen sizes.',
      'Analytics and conversion tracking built-in.',
      'Fast hosting with CDN and SSL security.',
    ],
    outcome: {
      text: 'Stunning, high-performance websites that convert visitors into customers. Mobile-first design with enterprise-level security and speed.',
      footer: 'WordPress · Headless CMS · SEO · Analytics · E-commerce',
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
    }, 4000); // 4 seconds per state

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
    <section
      className="relative w-full overflow-hidden py-16 md:py-24 dark:bg-gray-950"
      style={{
        background: 'linear-gradient(135deg, #e8f5ee 0%, #f0faf4 30%, #f7fdfa 60%, #ffffff 100%)'
      }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}
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
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(59,130,246,0.08)' }}
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
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}
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

        {/* Section Title */}
        <div className="text-center mb-8 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl mb-3 section-title"
          >
            Digital Solutions
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs md:text-sm font-medium">
            Explore our automated agents and interactive dashboards designed to scale your business.
          </p>
        </div>

        {/* Unified Card Container */}
        <div className="relative max-w-[1400px] mx-auto bg-white dark:bg-gray-950 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col w-full">

          {/* Tabs Inside Card */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-4 lg:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  relative px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-medium text-xs md:text-sm transition-all duration-300
                  flex items-center justify-center min-w-[110px]
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

          <div className="flex flex-col lg:flex-row w-full">
            {/* Left Side: 60% Dashboard Preview */}
            <div className="w-full lg:w-[60%] flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
              <div ref={visualCardRef} className="w-full h-full overflow-hidden relative bg-white dark:bg-gray-950 flex flex-col">
                {/* Top bar: Agent Name + LIVE badge */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-gray-50 dark:bg-[#0d1526] border-b border-gray-200 dark:border-gray-800 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-md">
                      <span className="text-white text-xs ">{activeData.agentName.charAt(0)}{activeData.agentName.split(' ')[1]?.charAt(0) || ''}</span>
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
                  </div>
                </div>

                {/* Dashboard Image Area */}
                <div className="relative w-full flex-auto bg-gray-50 dark:bg-[#0B1120]/50" style={{ aspectRatio: '16/10' }}>
                  <AnimatePresence mode="wait">
                    {activeData.type === 'mixed' && currentPage === 1 && activeData.video && (
                      <motion.video
                        key={`${activeTab}-mixed-video`}
                        src={activeData.video}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-contain p-3 md:p-5"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}
                    {activeData.type === 'mixed' && currentPage > 1 && activeData.images && (
                      <motion.img
                        key={`${activeTab}-mixed-img-${currentPage}`}
                        src={activeData.images[currentPage - 2]}
                        alt={`${activeData.title} - View ${currentPage}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-contain p-3 md:p-5"
                      />
                    )}
                    {activeData.type === 'video' && activeData.video && (
                      <motion.video
                        key={`${activeTab}-video`}
                        src={activeData.video}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-contain p-3 md:p-5"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}
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
                        className="absolute inset-0 p-3 md:p-4 lg:p-6 bg-gray-50/50 dark:bg-gray-950/20 flex flex-col items-center justify-center"
                      >
                        <ProcessAnimationCard />
                      </motion.div>
                    )}
                    {activeData.type === 'chatbot' && (
                      <motion.div
                        key={`${activeTab}-chatbot`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <ChatbotPreview />
                      </motion.div>
                    )}
                    {activeTab === 'webmobile' && activeData.iframeUrl && (
                      <motion.div
                        key={`${activeTab}-webmobile`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <WebMobileAnimation url={activeData.iframeUrl} />
                      </motion.div>
                    )}
                    {activeData.type === 'iframe' && activeData.iframeUrl && activeTab !== 'webmobile' && (
                      <motion.div
                        key={`${activeTab}-iframe`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <iframe
                          src={activeData.iframeUrl}
                          title={activeData.title}
                          className="w-full h-full border-0"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
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
              </div>
            </div>

            {/* Right Side: 40% — WHAT IT DOES + OUTCOME */}
            <div className="w-full lg:w-[40%] flex flex-col bg-white dark:bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-between"
                  style={visualCardHeight ? { height: visualCardHeight } : undefined}
                >
                  {/* WHAT IT DOES */}
                  <div className="px-5 md:px-6 pt-5 md:pt-6 pb-2 flex-auto flex flex-col justify-center">
                    <div className="text-[10px] md:text-xs  tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-3 md:mb-4">
                      What It Does
                    </div>
                    <ul className="space-y-2 md:space-y-2.5">
                      {activeData.whatItDoes.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.06 }}
                          className="flex items-start gap-3 group"
                        >
                          <div className="mt-0.5 shrink-0">
                            <CheckCircle2 className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#65A859]" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-xs md:text-sm leading-snug md:leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* OUTCOME */}
                  <div className="px-5 md:px-6 pb-5 md:pb-6 mt-auto">
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#65A859]" />
                        <span className="text-[10px] md:text-xs  tracking-[0.15em] text-[#65A859] uppercase">Outcome</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-snug md:leading-relaxed mb-2 md:mb-3">
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

      </div>
    </section>
  );
}
