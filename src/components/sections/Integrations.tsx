import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';

const LOGOS = [
  'SAP ECC', 'SAP HANA', 'NetSuite', 'Salesforce',
  'Microsoft 365', 'Tally Prime', 'Playwright', 'Claude Vision',
  'FBIL API', 'SOQL', 'RTO API', 'Fleet DB'
];

export default function Integrations() {
  return (
    <SectionWrapper className="section-bg text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50">Enterprise systems we integrate with</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg mb-16">
        Agents connect to SAP, NetSuite, Salesforce, vendor portals, and more. Deployed on your infrastructure.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
        {LOGOS.map((logo, i) => (
          <motion.div
            key={logo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="section-card py-6 px-4 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors cursor-pointer group"
          >
            <span className="font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">{logo}</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
