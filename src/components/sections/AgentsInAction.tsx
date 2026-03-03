import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { ArrowRight, Zap, LayoutTemplate, Code2, CheckCircle2 } from 'lucide-react';

const AGENTS = [
  { name: 'GRN Reconciliation', stat: '~100%', statLabel: 'Automation rate', desc: 'Logs into 19+ portals daily, zero manual touch', stack: 'SAP ECC · Playwright', lastRun: 'Today 06:03 AM', status: '0 errors', live: true },
  { name: 'AP/AR Automation', stat: '94%', statLabel: 'Auto match rate', desc: 'Matches invoices to POs with 94% accuracy', stack: 'NetSuite · Claude Vision', lastRun: 'Today 05:45 AM', status: '0 errors', live: true },
  { name: 'SAP Query Agent', stat: '2 to 5s', statLabel: 'Query response', desc: 'Self service SAP access, no IT tickets', stack: 'SAP HANA · ACDOCA', lastRun: 'Today 06:12 AM', status: '0 errors', live: true },
  { name: 'Fund Operations', stat: '97.3%', statLabel: 'Accuracy vs legacy', desc: '117 investors, full audit trail', stack: 'Tally Prime · FBIL API', lastRun: 'Today 04:30 AM', status: '0 errors', live: true },
  { name: 'CS Intelligence', stat: '200+', statLabel: 'Accounts monitored', desc: 'Flags at risk revenue before your team sees it', stack: 'Salesforce · SOQL', lastRun: 'Today 06:00 AM', status: '0 errors', live: true },
  { name: 'Vehicle Compliance', stat: '10,000+', statLabel: 'Vehicles validated', desc: '10K+ vehicles validated against RTO daily', stack: 'RTO API · Fleet DB', lastRun: 'Today 05:00 AM', status: '0 errors', live: true },
];

const TABS = [
  { id: 'live', label: 'Live Agents', icon: Zap, subtitle: 'Proven agents running in production. Adaptable to your stack, deployable in weeks.' },
  { id: 'blueprints', label: 'Agent Blueprints', icon: LayoutTemplate, subtitle: "We've solved this class of problem before. Faster build, lower risk, known patterns." },
  { id: 'custom', label: 'Custom Agents', icon: Code2, subtitle: 'Any operation. Any system. Scoped after a 2 week Discovery Sprint.' },
];

export default function AgentsInAction() {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <SectionWrapper id="agents-in-action" className="section-bg">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase mb-2">Purpose-built agentic AI for enterprise operations</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">Agents in Production</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === tab.id
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AGENTS.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="section-card p-6 hover:border-primary-500/30 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{agent.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-medium">Live</span>
                  </div>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{agent.stat}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{agent.statLabel}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{agent.desc}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{agent.stack}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Last Run {agent.lastRun}</span>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><CheckCircle2 className="w-3.5 h-3.5" /> {agent.status}</span>
                  </div>
                  <button className="mt-4 w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center justify-center gap-1 group-hover:gap-2">
                    View details <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
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
            <div className="section-card p-8">
              <p className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">Operation Detected</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Scanning blueprint library...</p>
              <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <li>Checking: Finance Ops patterns...</li>
                <li>Checking: NetSuite integrations...</li>
                <li>Checking: PDF extraction layer...</li>
              </ul>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Blueprint Match</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">AP/AR Automation</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">4 to 6 weeks · NetSuite + Vision API</p>
                <button className="px-5 py-2.5 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-xl font-medium text-sm flex items-center gap-2">
                  Start Discovery Sprint <ArrowRight className="w-4 h-4" />
                </button>
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
            className="max-w-2xl mx-auto"
          >
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10">{TABS[2].subtitle}</p>
            <div className="section-card overflow-hidden">
              <div className="bg-gray-900 dark:bg-gray-950 px-4 py-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-400 ml-2">agent.py</span>
              </div>
              <pre className="p-6 text-sm text-gray-300 font-mono overflow-x-auto">
{`1  # Custom agent scaffold
2  # Run · Deploy →
3
4  # Use tabs to explore more`}
              </pre>
              <div className="px-6 pb-6 flex gap-3">
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium">Run</button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">Deploy →</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
