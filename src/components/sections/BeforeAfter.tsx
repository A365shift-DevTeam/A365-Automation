import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { User, Zap, Download, CheckCircle2, FileEdit, BarChart3, Clock } from 'lucide-react';

const MANUAL_STEPS = [
  { label: 'Portal Login', time: '~15 min', icon: User },
  { label: 'Data Download', icon: Download },
  { label: 'Manual Check', icon: CheckCircle2 },
  { label: 'ERP Entry', icon: FileEdit },
  { label: 'Status Report', icon: BarChart3 },
];

const AGENT_STEPS = [
  { label: 'Portal Auth', status: 'processing', icon: Zap },
  { label: 'Data Extract', icon: Download },
  { label: 'Validation', icon: CheckCircle2 },
  { label: 'ERP Sync', icon: FileEdit },
  { label: 'Status', icon: BarChart3 },
];

export default function BeforeAfter() {
  return (
    <SectionWrapper className="section-bg">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">The operation stays the same.<br />The execution changes.</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        {/* Current Process - Manual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-card p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Manual Workflow</h3>
          </div>
          <div className="space-y-4">
            {MANUAL_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1 border-b border-gray-200 dark:border-gray-700 pb-3">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{step.label}</p>
                  {step.time && <p className="text-sm text-gray-500 dark:text-gray-400">{step.time}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Daily Effort: 4–6 hours</span>
            <span>Status: 0 min · 0 Records · 0 Errors</span>
          </div>
        </motion.div>

        {/* With A365 - Automated */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-card p-8 border-2 border-primary-500/30 dark:border-primary-500/30 bg-primary-500/5 dark:bg-primary-500/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400">Agent Workflow</h3>
          </div>
          <div className="space-y-4">
            {AGENT_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 dark:bg-primary-500/20 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 border-b border-gray-200 dark:border-gray-700 pb-3">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{step.label}</p>
                  {step.status && <p className="text-sm text-primary-600 dark:text-primary-400">{step.status}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-primary-600 dark:text-primary-400 font-medium">Duration: 2 min</span>
            <span className="text-gray-500 dark:text-gray-400">19 Portals · 100% Match</span>
          </div>
          <a href="#agents-in-action" className="mt-6 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline">
            See It In Action <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
