import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { Building2, Globe, Bot, Zap } from 'lucide-react';

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
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">Why Ambot365</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Intelligent AI Agents, Microsoft AI Ecosystem, Office Suite, and Scalable Industry Products—built by people who've lived inside enterprise systems.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="section-card rounded-xl p-6 text-center"
          >
            <p className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">{stat.value}</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl section-card p-8 md:p-12"
      >
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">When the engagement needs more</p>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">For larger engagements, we bring the whole group.</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="section-card p-6">
            <Building2 className="w-10 h-10 text-primary-500 mb-4" />
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Coreshift</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Intelligent AI Agents, Microsoft AI Ecosystem, Office Suite, and Scalable Industry Products. We deliver it all.</p>
          </div>
          <div className="section-card p-6">
            <Globe className="w-10 h-10 text-primary-500 mb-4" />
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">A365Shift</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">The group. When engagements span both enterprise and individual automation, we deliver as one.</p>
          </div>
          <div className="section-card p-6">
            <Bot className="w-10 h-10 text-primary-500 mb-4" />
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Ambot365</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI agents for individuals and professionals. Personal productivity, task automation, daily workflows.</p>
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
