import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';

const PHASES = [
  {
    step: '01',
    weeks: '0ΓÇô2 weeks',
    title: 'Discovery Sprint',
    desc: 'We understand your business processes and identify automation opportunities.',
    included: ['Process mapping', 'Requirement analysis', 'Technical feasibility', 'Solution scope document'],
    outcome: 'Clear roadmap and project scope.',
  },
  {
    step: '02',
    weeks: '2ΓÇô4 weeks',
    title: 'Solution Design',
    desc: 'We design the AI agent architecture, integrations, and workflow.',
    included: ['Agent workflow design', 'System integration planning', 'UI/UX prototype', 'Architecture design'],
    outcome: 'Approved design ready for development.',
  },
  {
    step: '03',
    weeks: '4ΓÇô8 weeks',
    title: 'Agent Build & Deployment',
    desc: 'We build, integrate, and deploy AI agents within your systems.',
    included: ['AI agent development', 'Microsoft 365 & API integrations', 'Testing with real data', 'UAT & production deployment'],
    outcome: 'Production-ready AI automation.',
  },
];

export default function HowEngagementsWork() {
  return (
    <section id="how-it-works" className="relative py-16 md:py-24 section-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl mb-4 section-title">How Engagements Work</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Transparent process. Predictable investment. Every engagement follows the same proven path.
          </p>
        </div>

        {/* Timeline header for desktop only, to show flow */}
        <div className="hidden md:block relative w-full mb-8">
          <div className="relative h-8">
            {/* Horizontal line */}
            <div
              className="absolute left-[16.6%] right-[16.6%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4C99A0]/20 via-[#65A859]/40 to-[#4C99A0]/20 dark:from-[#4C99A0]/30 dark:via-[#65A859]/50 dark:to-[#4C99A0]/30"
              aria-hidden
            />
            {/* Nodes */}
            {[16.6, 50, 83.3].map((pct, i) => (
              <div
                key={i}
                className="absolute top-1/2 w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-700 border-2 border-white dark:border-gray-900 shadow z-10"
                style={{ left: `${pct}%`, transform: 'translate(-50%, -50%)' }}
                aria-hidden
              />
            ))}
          </div>
          <div className="flex justify-between px-[16.6%]">
            {PHASES.map((phase, i) => (
              <span
                key={phase.step}
                className={`text-sm tracking-wider uppercase font-semibold text-[#65A859] dark:text-[#4C99A0] ${
                  i === 0 ? '-ml-8' : i === 2 ? '-mr-8' : ''
                }`}
              >
                {phase.weeks}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PHASES.map((phase) => (
            <motion.div
              key={phase.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-card p-6 rounded-2xl flex flex-col h-full hover:ring-2 hover:ring-[#65A859] dark:hover:ring-[#4C99A0] hover:ring-offset-2 dark:hover:ring-offset-gray-900 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <div className="md:hidden text-xs font-semibold text-[#65A859] dark:text-[#4C99A0] uppercase tracking-wider mb-1">
                {phase.weeks}
              </div>
              <span className="text-3xl md:text-4xl text-gray-900 dark:text-gray-100">{phase.step}</span>
              <h3 className="text-xl md:text-2xl section-subtitle mt-1">
                {phase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-2 flex-1">
                {phase.desc}
              </p>
              
              <div className="mt-5 mb-3">
                <p className="text-xs text-[#65A859] dark:text-[#4C99A0] uppercase tracking-wider mb-2">What's included</p>
                <ul className="space-y-2">
                  {phase.included.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#65A859] mt-1.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-[#65A859] dark:text-[#4C99A0] uppercase tracking-wider mb-1">Outcome</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{phase.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="#cta" 
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base md:text-lg bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Custom Pricing
          </motion.a>
        </div>
      </div>
    </section>
  );
}
