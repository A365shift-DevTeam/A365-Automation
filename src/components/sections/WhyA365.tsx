import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { Building2, Globe, Bot, Zap, Cog, Search } from 'lucide-react';

const STATS = [
  { value: '70%', label: 'Manual Work Reduction' },
  { value: '3-6 Weeks', label: 'Typical Deployement Window' },
  { value: '24/7', label: 'Always on agent Operations' },
  { value: 'Enterprise', label: 'Enterprise Level Solutions' },
];

export default function WhyA365() {
  return (
    <SectionWrapper id="about" className="section-bg">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl mb-4 section-title">Why Ambot365</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Intelligent AI Agents, Microsoft AI Ecosystem, Office Suite, and Scalable Industry Products—built by people who've lived inside enterprise systems.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="section-card rounded-xl p-6 text-center"
          >
            <p className="text-xl md:text-3xl  text-primary-600 dark:text-primary-400">{stat.value}</p>
            <p className="text-[11px] md:text-sm text-gray-600 dark:text-gray-400 mt-1 leading-tight">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-card rounded-xl p-6 w-full md:w-[48%]"
        >
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Ambot365 was founded by operators with 20+ years inside SAP, IBM, HCL, HP, and Talend who then spent time inside high-growth startups learning how to ship fast. We don&apos;t consult on enterprise operations. We&apos;ve run them. That&apos;s why our agents handle the edge cases your IT team hasn&apos;t thought of yet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="section-card rounded-xl p-6 w-full md:w-[48%]"
        >
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Cog className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs tracking-[0.14em] font-semibold uppercase text-gray-500 dark:text-gray-400">Enterprise Background</p>
                <p className="text-base text-gray-800 dark:text-gray-100">20+ years across SAP, IBM, HCL, HP, Talend</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs tracking-[0.14em] font-semibold uppercase text-gray-500 dark:text-gray-400">Global Delivery</p>
                <p className="text-base text-gray-800 dark:text-gray-100">Built for enterprises operating across time zones</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs tracking-[0.14em] font-semibold uppercase text-gray-500 dark:text-gray-400">Discovery-First</p>
                <p className="text-base text-gray-800 dark:text-gray-100">Process deep-dive before a single line of code is written</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl section-card p-8 md:p-12"
      >
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">When the engagement needs more</p>
        <h3 className="text-2xl md:text-3xl  text-gray-900 dark:text-gray-50 mb-6">For larger engagements, we bring the whole group.</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         

          <div className="section-card p-6">
            <Bot className="w-10 h-10 text-primary-500 mb-4" />
            <h4 className="text-lg  text-gray-900 dark:text-gray-100 mb-2">Ambot365</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI agents for individuals and professionals. Personal productivity, task automation, daily workflows.</p>
          </div>

           <div className="section-card p-6">
            <Building2 className="w-10 h-10 text-primary-500 mb-4" />
            <h4 className="text-lg  text-gray-900 dark:text-gray-100 mb-2">Coreshift</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Intelligent AI Agents, Microsoft AI Ecosystem, Office Suite, and Scalable Industry Products. We deliver it all.</p>
          </div>
            <div className="section-card p-6">
            <Building2 className="w-10 h-10 text-primary-500 mb-4" />
            <h4 className="text-lg  text-gray-900 dark:text-gray-100 mb-2">Group Of Companies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Intelligent AI Agents, Microsoft AI Ecosystem, Office Suite, and Scalable Industry Products. We deliver it all.</p>
          </div>

          
        </div>
        <div className="mt-8 text-center">
          <a href="#cta" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Talk to us about your engagement <Zap className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
