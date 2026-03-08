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
  { name: 'Fund Operations', stat: '97.3%', statLabel: 'Accuracy vs legacy', desc: '117 investors, full audit trail', stack: 'Tally Prime · FBIL API', lastRun: 'Today 04:30 AM', status: '0 errors', live: true },
  { name: 'CS Intelligence', stat: '200+', statLabel: 'Accounts monitored', desc: 'Flags at risk revenue before your team sees it', stack: 'Salesforce · SOQL', lastRun: 'Today 06:00 AM', status: '0 errors', live: true },
  { name: 'Vehicle Compliance', stat: '10,000+', statLabel: 'Vehicles validated', desc: '10K+ vehicles validated against RTO daily', stack: 'RTO API · Fleet DB', lastRun: 'Today 05:00 AM', status: '0 errors', live: true },
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
            className="space-y-4"
          >
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">{TABS[0].subtitle}</p>
            <div className="flex justify-center items-center h-[500px] mt-16 mb-8">
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
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">All agents deployed on your infrastructure · Monitored 24/7</p>
          </motion.div>
        )}

        {activeTab === 'blueprints' && (
          <motion.div
            key="blueprints"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10">{TABS[1].subtitle}</p>
            <OrbitalApps />
          </motion.div>
        )}

        {activeTab === 'custom' && (
          <motion.div
            key="custom"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row w-full min-h-[500px] bg-white dark:bg-gray-100 rounded-lg overflow-hidden shadow-xl mt-8">
              <div className="w-full md:w-1/2 bg-[#e8f1fc] flex items-center justify-center">
                <img src={SuitcaseImage} alt="Office Suite Integration" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gray-200/40">
                {/* Empty container as shown in screenshot */}
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
            className="w-full max-w-5xl mx-auto"
          >
            <div className="flex w-full min-h-[500px] mt-8">
              {/* Left empty light grey pane */}
              <div className="hidden md:block w-1/4 bg-[#EBEBEB] min-h-full rounded-l-lg"></div>

              {/* Right pane with product grid */}
              <div className="w-full md:w-3/4 bg-[#EBEBEB] p-8 md:p-12 md:rounded-r-lg rounded-lg border-l border-gray-300/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Card 1 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">DocCraft</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Automate Excel to PDF, PPT & Image Like Certificates, Reports.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">Sheets to Slides</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Creating Excel to Presentation like Weekly Report, Proposals.</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">Image Compressor</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Compress your image up to 90% without compromising quality</p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">Consolidation</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Combine multiple files into single file (by Column)</p>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">File Splitter</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Split large files into sheets and workbook, based on criteria</p>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">Merge Master</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Combine multiple files into single file (by Multiple Range)</p>
                  </div>

                  {/* Card 7 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">File Comparison</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Compare between files and Highlight changes.</p>
                  </div>

                  {/* Card 8 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 font-bold text-sm mb-2">Work Allocation</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Allocate tasks equally or Randomly based on User</p>
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
