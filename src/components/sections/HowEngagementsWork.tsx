import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { Search, Wrench, RefreshCw } from 'lucide-react';

const PHASES = [
  {
    step: '01',
    weeks: '0–2 weeks',
    title: 'Discovery Sprint',
    desc: 'We embed with your team to understand the operation, map edge cases, and scope the agent.',
    included: ['Process mapping sessions', 'Edge case documentation', 'Technical feasibility assessment', 'Agent scope & spec document'],
    outcome: 'Clear scope and fixed quote for build',
    icon: Search,
  },
  {
    step: '02',
    weeks: '4–8 weeks',
    title: 'Agent Build',
    desc: 'We build the agent, integrate with your systems, and test against real data until it works.',
    included: ['Custom agent development', 'System integrations (SAP, Salesforce, etc.)', 'Testing with production data', 'UAT and sign-off'],
    outcome: 'Production-ready agent on your infrastructure',
    icon: Wrench,
  },
  {
    step: '03',
    weeks: 'Ongoing',
    title: 'Monthly Operations',
    desc: 'Agent goes live. We monitor 24/7, handle issues, and ship updates. You get a single monthly invoice.',
    included: ['24/7 monitoring & alerting', 'Bug fixes & maintenance', 'Monthly performance reports', 'Ongoing optimization'],
    outcome: 'One subscription. Zero ops burden.',
    icon: RefreshCw,
  },
];

export default function HowEngagementsWork() {
  return (
    <SectionWrapper id="how-it-works" className="section-bg">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">How Engagements Work</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Transparent process. Predictable investment. Every engagement follows the same proven path.</p>
      </div>

      <div className="space-y-12 md:space-y-16">
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 items-start"
          >
            <div className="lg:w-1/3 shrink-0">
              <span className="text-4xl md:text-5xl font-bold text-primary-500/30 dark:text-primary-500/40">{phase.step}</span>
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">{phase.weeks}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{phase.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{phase.desc}</p>
              <div className="mt-4 p-4 rounded-xl bg-primary-500/10 dark:bg-primary-500/10 border border-primary-500/20">
                <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">Outcome</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{phase.outcome}</p>
              </div>
            </div>
            <div className="lg:flex-1 section-card p-8">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">What's Included</p>
              <ul className="space-y-2">
                {phase.included.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-500 dark:text-gray-400 mt-12 text-sm">Pricing depends on complexity, integrations, and SLA requirements.</p>
      <div className="text-center mt-6">
        <a href="#cta" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-xl font-medium hover:shadow-lg transition-all">
          Get Custom Pricing
        </a>
      </div>
    </SectionWrapper>
  );
}
