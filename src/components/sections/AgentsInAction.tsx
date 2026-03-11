import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { ArrowRight, Zap, LayoutTemplate, Code2, CheckCircle2, Package, Activity, Layers, Box, ShieldCheck, Settings, Cpu, Settings2, LineChart, Clock, Database, TrendingUp, Shield } from 'lucide-react';
import OrbitalApps from './OrbitalApps';
import CardSwap, { Card } from './CardSwap';
import SuitcaseImage from '../../assets/image.png';

const AGENTS = [
  { name: 'GRN Reconciliation', stat: '~100%', statLabel: 'Automation rate', desc: 'Logs into portals daily, zero manual touch', stack: 'SAP ECC · Playwright', lastRun: 'Today 06:03 AM', status: '0 errors', live: true },
  { name: 'AP/AR Automation', stat: '94%', statLabel: 'Auto match rate', desc: 'Matches invoices to POs with 94% accuracy', stack: 'NetSuite · Claude Vision', lastRun: 'Today 05:45 AM', status: '0 errors', live: true },
  { name: 'SAP Query Agent', stat: '2 to 5s', statLabel: 'Query response', desc: 'Self service SAP access, no IT tickets', stack: 'SAP HANA · ACDOCA', lastRun: 'Today 06:12 AM', status: '0 errors', live: true },
  // { name: 'Fund Operations', stat: '97.3%', statLabel: 'Accuracy vs legacy', desc: '117 investors, full audit trail', stack: 'Tally Prime · FBIL API', lastRun: 'Today 04:30 AM', status: '0 errors', live: true },
  // { name: 'CS Intelligence', stat: '200+', statLabel: 'Accounts monitored', desc: 'Flags at risk revenue before your team sees it', stack: 'Salesforce · SOQL', lastRun: 'Today 06:00 AM', status: '0 errors', live: true },
  // { name: 'Vehicle Compliance', stat: '10,000+', statLabel: 'Vehicles validated', desc: '10K+ vehicles validated against RTO daily', stack: 'RTO API · Fleet DB', lastRun: 'Today 05:00 AM', status: '0 errors', live: true },
];

const TABS = [
  { id: 'live', label: 'AI Agents', icon: Zap, subtitle: 'Proven agents running in production. Adaptable to your stack, deployable in weeks.' },
  { id: 'blueprints', label: 'Microsoft', icon: LayoutTemplate, subtitle: "We've solved this class of problem before. Faster build, lower risk, known patterns." },
  { id: 'custom', label: 'Office Suite', icon: Code2, subtitle: 'Any operation. Any system. Scoped after a 2 week Discovery Sprint.' },
  { id: 'products', label: 'Products', icon: Package, subtitle: 'Ready-to-use, scalable AI products built for your enterprise workflows.' },
];

export default function AgentsInAction() {
  const [activeTab, setActiveTab] = useState('live');
  const reduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="agents-in-action" className="section-bg relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs - matching site theme */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#4C99A0]/30 dark:bg-[#4C99A0]/15 blur-3xl"
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
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[#65A859]/25 dark:bg-[#65A859]/15 blur-3xl"
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
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-[#4C99A0]/20 dark:bg-[#4C99A0]/10 blur-3xl"
          animate={reduceMotion ? undefined : {
            y: [0, -8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Subtle abstract patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12] dark:opacity-[0.06]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bgCurve1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4C99A0" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#65A859" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4C99A0" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="bgCurve2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#65A859" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#4C99A0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#65A859" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          {/* Subtle flowing curves */}
          <path
            d="M 0,150 Q 250,50 500,150 T 1000,150 T 1500,150"
            fill="none"
            stroke="url(#bgCurve1)"
            strokeWidth="1.5"
          />
          <path
            d="M 0,350 Q 300,250 600,350 T 1200,350 T 1800,350"
            fill="none"
            stroke="url(#bgCurve2)"
            strokeWidth="1.5"
          />
          <path
            d="M 0,550 Q 200,450 400,550 T 800,550 T 1200,550"
            fill="none"
            stroke="url(#bgCurve1)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12 px-4">
          {/* <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase mb-2">Intelligent AI Agents · Microsoft ecosystem · Office Suite · Scalable products</p> */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50"
          >
            Our Digital Services
          </motion.h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : ''}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[1400px] mx-auto"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg font-medium"
              >
                {TABS[0].subtitle}
              </motion.p>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                {/* Decorative accent line */}
                <div className="hidden lg:block absolute left-[40%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                {/* Left: 40% Info */}
                <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-6 lg:py-8 relative">
                  <div className="relative z-10 flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">AI Agents</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-base pr-4 leading-relaxed">Enterprise-grade automation replacing manual workflows seamlessly.</p>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                        <Activity className="w-4 h-4" /> Capabilities
                      </div>
                      <ul className="space-y-4">
                        {[
                          'Automate repetitive workflows end-to-end across multiple platforms.',
                          'Connect seamlessly to any ERP, CRM, or custom data source.',
                          'Run 24/7 with zero manual intervention required.',
                          'Full audit trails and sophisticated error handling built-in.'
                        ].map((text, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-3 group"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Right: 60% Card Swap */}
                <div className="w-full lg:w-[60%] flex justify-center items-center h-[500px] relative">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/5 via-transparent to-[#65A859]/5 rounded-3xl blur-2xl" />
                  <div className="relative z-10">
                    <CardSwap width={400} height={350} pauseOnHover={true} visibleStack={4}>
                      {AGENTS.map((agent, i) => (
                        <Card
                          key={agent.name}
                          customClass="section-card p-6 !w-full !h-full border-2 border-gray-200 dark:border-gray-800 !bg-white dark:!bg-[#0B0F19] hover:border-[#4C99A0]/50 dark:hover:border-[#65A859]/50 transition-all duration-300 group !items-start !justify-start text-left shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                        >
                          <div className="flex items-start justify-between w-full mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{agent.name}</h3>
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white text-xs font-semibold shadow-md flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              Live
                            </span>
                          </div>
                          <div className="mb-4">
                            <p className="text-3xl font-bold bg-gradient-to-r from-[#4C99A0] to-[#65A859] bg-clip-text text-transparent mb-1">{agent.stat}</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{agent.statLabel}</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-left w-full leading-relaxed">{agent.desc}</p>
                          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <Database className="w-4 h-4 text-[#4C99A0] dark:text-[#65A859]" />
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{agent.stack}</p>
                          </div>
                          <div className="flex items-center justify-between w-full text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Last Run {agent.lastRun}</span>
                            </div>
                            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-semibold">
                              <CheckCircle2 className="w-4 h-4" /> {agent.status}
                            </span>
                          </div>
                          <button className="mt-4 w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                            View details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Card>
                      ))}
                    </CardSwap>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'blueprints' && (
            <motion.div
              key="blueprints"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[1400px] mx-auto"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg font-medium max-w-2xl mx-auto"
              >
                {TABS[1].subtitle}
              </motion.p>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                {/* Decorative accent line */}
                <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                {/* Left: 60% Orbit */}
                <div className="w-full lg:w-[60%] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/5 via-transparent to-[#65A859]/5 rounded-3xl blur-2xl" />
                  <div className="relative z-10">
                    <OrbitalApps />
                  </div>
                </div>
                {/* Right: 40% Info */}
                <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-6 lg:py-8 relative">
                  <div className="relative z-10 flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                        <LayoutTemplate className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Microsoft</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-base pr-4 leading-relaxed">Deep integration across the Microsoft platform — Desktop, Cloud, and AI.</p>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                        <Layers className="w-4 h-4" /> Ecosystem Scope
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {['Word', 'Excel', 'PowerPoint', 'SharePoint', 'Teams', 'OneDrive', 'Outlook', 'Power BI', 'Power Apps', 'Azure'].map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="px-4 py-2 text-xs font-semibold bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:border-[#4C99A0]/50 dark:hover:border-[#65A859]/50 text-gray-700 dark:text-gray-300 transition-all duration-300"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'custom' && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[1400px] mx-auto"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg font-medium"
              >
                {TABS[2].subtitle}
              </motion.p>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                {/* Decorative accent line */}
                <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                {/* Left: 60% Image */}
                <div className="w-full lg:w-[60%] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/10 via-transparent to-[#65A859]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img src={SuitcaseImage} alt="Office Suite Integration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                {/* Right: 40% Info */}
                <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-6 lg:py-8 relative">
                  <div className="relative z-10 flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Office Suite</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-base pr-4 leading-relaxed">Convert daily manual reporting and emails into seamless automation.</p>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                        <Activity className="w-4 h-4" /> Capabilities
                      </div>
                      <ul className="space-y-4">
                        {['Excel automation with VBA and Office Scripts.', 'Word document generation and templating.', 'PowerPoint deck creation from data sources.', 'Outlook email workflows and scheduling.'].map((text, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-3 group"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[1400px] mx-auto"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg font-medium"
              >
                {TABS[3].subtitle}
              </motion.p>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                {/* Decorative accent line */}
                <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                {/* Left: 60% Product Grid */}
                <div className="w-full lg:w-[60%] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border-2 border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/5 via-transparent to-[#65A859]/5 rounded-3xl" />
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "DocCraft", desc: "Automate Excel to PDF, PPT & Image Like Certificates, Reports." },
                        { title: "Sheets to Slides", desc: "Creating Excel to Presentation like Weekly Report, Proposals." },
                        { title: "Image Compressor", desc: "Compress your image up to 90% without compromising quality" },
                        { title: "Consolidation", desc: "Combine multiple files into single file (by Column)" },
                        { title: "File Splitter", desc: "Split large files into sheets and workbook, based on criteria" },
                        { title: "Merge Master", desc: "Combine multiple files into single file (by Multiple Range)" },
                        { title: "File Comparison", desc: "Compare between files and Highlight changes." },
                        { title: "Work Allocation", desc: "Allocate tasks equally or Randomly based on User" }
                      ].map((product, i) => (
                        <motion.div
                          key={product.title}
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{
                            opacity: [0, 1, 1, 0, 0],
                            y: [15, 0, 0, -15, 15],
                            scale: [0.95, 1, 1, 0.95, 0.95]
                          }}
                          transition={{
                            duration: 5,
                            times: [0, 0.08, 0.85, 0.95, 1],
                            repeat: Infinity,
                            repeatType: 'loop',
                            delay: i * 0.15,
                            ease: "easeOut"
                          }}
                          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 hover:border-[#4C99A0]/50 dark:hover:border-[#65A859]/50"
                        >
                          <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">{product.title}</h4>
                          <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">{product.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right: 40% Info */}
                <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-6 lg:py-8 relative">
                  <div className="relative z-10 flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Our Products</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-base pr-4 leading-relaxed">Ready-to-deploy solutions for common enterprise bottlenecks.</p>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                        <Activity className="w-4 h-4" /> Product Suite
                      </div>
                      <ul className="space-y-4">
                        {['Document automation and conversion tools.', 'File management: split, merge, compare.', 'Image compression without quality loss.', 'Smart work allocation and task distribution.'].map((text, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-3 group"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
