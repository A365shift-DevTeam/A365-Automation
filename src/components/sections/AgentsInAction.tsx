import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  return (
    <SectionWrapper id="agents-in-action" className="section-bg">
      <div className="text-center mb-12">
        {/* <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase mb-2">Intelligent AI Agents · Microsoft ecosystem · Office Suite · Scalable products</p> */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">Our Digital Services</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === tab.id
              ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white shadow-lg shadow-[#4C99A0]/25'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'live' && (
          <motion.div
            key="live"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[1400px] mx-auto"
          >
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">{TABS[0].subtitle}</p>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
              {/* Left: 40% Info */}
              <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-0 lg:py-2 relative">

                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">AI Agents</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base pr-4">Enterprise-grade automation replacing manual workflows seamlessly.</p>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100">
                      <Activity className="w-4 h-4" /> Capabilities
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#65A859] shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">Automate repetitive workflows end-to-end across multiple platforms.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#65A859] shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">Connect seamlessly to any ERP, CRM, or custom data source.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#65A859] shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">Run 24/7 with zero manual intervention required.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#65A859] shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">Full audit trails and sophisticated error handling built-in.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right: 60% Card Swap */}
              <div className="w-full lg:w-[60%] flex justify-center items-center h-[500px]">
                <CardSwap width={400} height={350} pauseOnHover={true} visibleStack={4}>
                  {AGENTS.map((agent, i) => (
                    <Card
                      key={agent.name}
                      customClass="section-card p-6 !w-full !h-full border border-gray-200 dark:border-gray-800 !bg-white dark:!bg-[#0B0F19] hover:border-primary-500/30 transition-colors group !items-start !justify-start text-left"
                    >
                      <div className="flex items-start justify-between w-full mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{agent.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-medium">Live</span>
                      </div>
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{agent.stat}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{agent.statLabel}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 text-left w-full">{agent.desc}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-left w-full">{agent.stack}</p>
                      <div className="flex items-center justify-between w-full text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span>Last Run {agent.lastRun}</span>
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><CheckCircle2 className="w-3.5 h-3.5" /> {agent.status}</span>
                      </div>
                      <button className="mt-4 w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center justify-center gap-1 group-hover:gap-2">
                        View details <ArrowRight className="w-4 h-4" />
                      </button>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'blueprints' && (
          <motion.div
            key="blueprints"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[1400px] mx-auto"
          >
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10">{TABS[1].subtitle}</p>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
              {/* Left: 60% Orbit */}
              <div className="w-full lg:w-[60%] flex items-center justify-center">
                <OrbitalApps />
              </div>
              {/* Right: 40% Info */}
              <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-0 lg:py-2 relative">

                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">Microsoft</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base pr-4">Deep integration across the Microsoft platform — Desktop, Cloud, and AI.</p>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100">
                      <Layers className="w-4 h-4" /> Ecosystem Scope
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Word', 'Excel', 'PowerPoint', 'SharePoint', 'Teams', 'OneDrive', 'Outlook', 'Power BI', 'Power Apps', 'Azure'].map(tag => (
                        <span key={tag} className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[1400px] mx-auto"
          >
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">{TABS[2].subtitle}</p>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
              {/* Left: 60% Image */}
              <div className="w-full lg:w-[60%] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                <img src={SuitcaseImage} alt="Office Suite Integration" className="w-full h-full object-cover" />
              </div>
              {/* Right: 40% Info */}
              <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-0 lg:py-2 relative">

                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">Office Suite</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base pr-4">Convert daily manual reporting and emails into seamless automation.</p>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100">
                      <Activity className="w-4 h-4" /> Capabilities
                    </div>
                    <ul className="space-y-4">
                      {['Excel automation with VBA and Office Scripts.', 'Word document generation and templating.', 'PowerPoint deck creation from data sources.', 'Outlook email workflows and scheduling.'].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#65A859] shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{text}</span>
                        </li>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[1400px] mx-auto"
          >
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">{TABS[3].subtitle}</p>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
              {/* Left: 60% Product Grid */}
              <div className="w-full lg:w-[60%] bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
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
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                    >
                      <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">{product.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">{product.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Right: 40% Info */}
              <div className="w-full lg:w-[40%] flex flex-col justify-start px-6 lg:px-8 py-0 lg:py-2 relative">

                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">Our Products</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base pr-4">Ready-to-deploy solutions for common enterprise bottlenecks.</p>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100">
                      <Activity className="w-4 h-4" /> Product Suite
                    </div>
                    <ul className="space-y-4">
                      {['Document automation and conversion tools.', 'File management: split, merge, compare.', 'Image compression without quality loss.', 'Smart work allocation and task distribution.'].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#65A859] shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
