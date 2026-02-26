import { motion } from 'motion/react';
import { GitMerge, Network, CalendarClock, Bot, LineChart, ShieldCheck } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';

const FEATURES = [
  {
    title: 'Workflow Builder',
    description: 'Visual drag-and-drop interface to map out complex business processes effortlessly.',
    icon: GitMerge,
  },
  {
    title: 'API Integrations',
    description: 'Connect to any REST or GraphQL API with our universal connector module.',
    icon: Network,
  },
  {
    title: 'Smart Scheduling',
    description: 'Run automations on a cron schedule, specific intervals, or specific business days.',
    icon: CalendarClock,
  },
  {
    title: 'AI Automation',
    description: 'Leverage LLMs to parse unstructured data, draft emails, or make routing decisions.',
    icon: Bot,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track execution times, success rates, and ROI across all your automated workflows.',
    icon: LineChart,
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SOC2 compliance, and granular role-based access control.',
    icon: ShieldCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Features() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Everything you need to scale</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Powerful features designed for modern teams who want to move faster and break fewer things.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-panel p-8 rounded-2xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
