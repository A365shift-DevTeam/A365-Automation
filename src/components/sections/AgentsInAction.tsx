import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { ArrowRight, Zap, LayoutTemplate, Code2, CheckCircle2, Package } from 'lucide-react';
import OrbitalApps from './OrbitalApps';
import CardSwap, { Card } from './CardSwap';
import SuitcaseImage from '../../assets/image.png';

const AGENTS = [
  { name: 'GRN Reconciliation', stat: '~100%', statLabel: 'Automation rate', desc: 'Logs into 19+ portals daily, zero manual touch', stack: 'SAP ECC · Playwright', lastRun: 'Today 06:03 AM', status: '0 errors', live: true },
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
        <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase mb-2">Intelligent AI Agents · Microsoft ecosystem · Office Suite · Scalable products</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">Agents in Production</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === tab.id
              ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white shadow-lg shadow-[#4C99A0]/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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
              {/* Left: 60% Card Swap */}
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
              {/* Right: 40% Info */}
              <div className="w-full lg:w-[40%] flex flex-col justify-start p-6 lg:p-8 glass-panel bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100 to-accent-100 rounded-bl-full opacity-20" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-100 to-accent-100 rounded-tr-full opacity-10" />
                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">AI Agents</h3>
                  <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#69a84f] to-[#a0c563] text-white font-semibold px-4 py-1.5 text-center text-sm">What They Do</div>
                      <ul className="space-y-1 p-3 text-[13px] leading-snug">
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Automate repetitive workflows end-to-end.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Connect to any ERP, CRM, or data source.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Run 24/7 with zero manual intervention.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Full audit trails and error handling built-in.</span></li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#5a9bd5] to-[#7fb2dd] text-white font-semibold px-4 py-1.5 text-center text-sm">Key Benefits</div>
                      <ul className="space-y-1 p-3 text-[13px] leading-snug">
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Production Proven:</strong> Running live in enterprise environments.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Deploy in Weeks:</strong> Adaptable to your stack, not months.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Zero Errors:</strong> Monitored 24/7 with real-time alerts.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Cost Savings:</strong> Eliminate manual effort and reduce costs.</span></li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">All agents deployed on your infrastructure · Monitored 24/7</p>
                </div>
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
              <div className="w-full lg:w-[40%] flex flex-col justify-start p-6 lg:p-8 glass-panel bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100 to-accent-100 rounded-bl-full opacity-20" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-100 to-accent-100 rounded-tr-full opacity-10" />
                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Microsoft 365</h3>
                  <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#69a84f] to-[#a0c563] text-white font-semibold px-4 py-1.5 text-center text-sm">Ecosystem</div>
                      <div className="p-3">
                        <p className="text-[13px] leading-snug mb-3">
                          Deep integration across the <strong>Microsoft 365</strong> platform — Desktop, Cloud, and AI-powered tools.
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Word</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Excel</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">PowerPoint</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">SharePoint</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Teams</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">OneDrive</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Outlook</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Power BI</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Power Apps</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Azure</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#5a9bd5] to-[#7fb2dd] text-white font-semibold px-4 py-1.5 text-center text-sm">Why Microsoft?</div>
                      <ul className="space-y-1 p-3 text-[13px] leading-snug">
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Proven Patterns:</strong> We've solved this class of problem before.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Faster Builds:</strong> Lower risk with known, tested architectures.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Enterprise Ready:</strong> Security, compliance, and scalability built-in.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">AI-Powered:</strong> Leverage Copilot and AI across your workflows.</span></li>
                      </ul>
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
              <div className="w-full lg:w-[40%] flex flex-col justify-start p-6 lg:p-8 glass-panel bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100 to-accent-100 rounded-bl-full opacity-20" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-100 to-accent-100 rounded-tr-full opacity-10" />
                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Office Suite</h3>
                  <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#69a84f] to-[#a0c563] text-white font-semibold px-4 py-1.5 text-center text-sm">Capabilities</div>
                      <ul className="space-y-1 p-3 text-[13px] leading-snug">
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Excel automation with VBA and Office Scripts.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Word document generation and templating.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>PowerPoint deck creation from data sources.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Outlook email workflows and scheduling.</span></li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#5a9bd5] to-[#7fb2dd] text-white font-semibold px-4 py-1.5 text-center text-sm">Why Office Suite?</div>
                      <ul className="space-y-1 p-3 text-[13px] leading-snug">
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Any Operation:</strong> Custom scoped after a 2 week Discovery Sprint.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Any System:</strong> Integrates with your existing tools and platforms.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">End-to-End:</strong> From data input to polished output, fully automated.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Time Savings:</strong> Hours of manual work reduced to minutes.</span></li>
                      </ul>
                    </div>
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
              <div className="w-full lg:w-[60%] bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">DocCraft</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Automate Excel to PDF, PPT & Image Like Certificates, Reports.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">Sheets to Slides</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Creating Excel to Presentation like Weekly Report, Proposals.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">Image Compressor</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Compress your image up to 90% without compromising quality</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">Consolidation</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Combine multiple files into single file (by Column)</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">File Splitter</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Split large files into sheets and workbook, based on criteria</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">Merge Master</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Combine multiple files into single file (by Multiple Range)</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">File Comparison</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Compare between files and Highlight changes.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2">Work Allocation</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">Allocate tasks equally or Randomly based on User</p>
                  </div>
                </div>
              </div>
              {/* Right: 40% Info */}
              <div className="w-full lg:w-[40%] flex flex-col justify-start p-6 lg:p-8 glass-panel bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100 to-accent-100 rounded-bl-full opacity-20" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-100 to-accent-100 rounded-tr-full opacity-10" />
                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Our Products</h3>
                  <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#69a84f] to-[#a0c563] text-white font-semibold px-4 py-1.5 text-center text-sm">Product Suite</div>
                      <ul className="space-y-1 p-3 text-[13px] leading-snug">
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Document automation and conversion tools.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>File management: split, merge, compare.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Image compression without quality loss.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span>Smart work allocation and task distribution.</span></li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#5a9bd5] to-[#7fb2dd] text-white font-semibold px-4 py-1.5 text-center text-sm">Why Our Products?</div>
                      <ul className="space-y-1 p-3 text-[13px] leading-snug">
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Ready to Use:</strong> No custom development needed.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Scalable:</strong> Built for enterprise-level workloads.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Plug & Play:</strong> Integrate with existing workflows instantly.</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#f1c232] font-bold text-[10px] mt-[3px]">▶</span> <span><strong className="text-gray-900 dark:text-gray-100">Cost Effective:</strong> Standard licensing, no consulting fees.</span></li>
                      </ul>
                    </div>
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
