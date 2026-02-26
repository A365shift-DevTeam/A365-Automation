import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';

const LOGOS = [
  'Google Workspace', 'Salesforce', 'Slack', 'HubSpot',
  'Notion', 'Airtable', 'Zendesk', 'Stripe',
  'Shopify', 'Mailchimp', 'Jira', 'GitHub'
];

export default function Integrations() {
  return (
    <SectionWrapper className="text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Plays nicely with others</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-16">
        Connect to the tools you already use. Our library of native integrations is growing every week.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
        {LOGOS.map((logo, i) => (
          <motion.div
            key={logo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel py-6 px-4 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group shadow-sm"
          >
            <span className="font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">{logo}</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
