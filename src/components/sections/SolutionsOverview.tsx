import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { Bot, Sparkles, LayoutTemplate, Package } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Intelligent AI Agents',
    icon: Bot,
    items: ['AP Agent', 'AR Agent', 'SAP Reconcile Agent', 'Reconcile Agent'],
  },
  {
    title: 'Microsoft AI Ecosystem',
    icon: Sparkles,
    items: [
      'Microsoft Copilot Solutions',
      'Microsoft Agents (Custom Agent Development)',
      'Microsoft 365 Desktop Automation',
      'Microsoft 365 Cloud Automation',
    ],
  },
  {
    title: 'Office Suite',
    icon: LayoutTemplate,
    items: [
      'Web | Mobile Apps with BI',
      'CRM Agents',
      'Websites',
      'Chatbots with AI',
      'Digital Marketing Agent',
      'Lead Agents',
    ],
  },
  {
    title: 'Scalable Industry Products',
    icon: Package,
    items: ['Office AI Bots', 'Customer Satisfaction'],
  },
];

export default function SolutionsOverview() {
  return (
    <SectionWrapper id="solutions-overview" className="section-bg">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase mb-2">What we offer</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">Solutions & products</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Intelligent AI Agents, Microsoft AI Ecosystem, Office Suite, and Scalable Industry Products—everything you need in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {COLUMNS.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="section-card p-6 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-500/15 dark:bg-primary-500/20 flex items-center justify-center mb-4">
              <col.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">{col.title}</h3>
            <ul className="space-y-2 flex-1">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
