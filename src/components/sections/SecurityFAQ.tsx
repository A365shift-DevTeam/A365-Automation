import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { ChevronDown, Shield, Server, Lock } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: 'Security & Compliance',
    questions: [
      { q: 'Where does my data live?', a: 'Your data never leaves your environment. Agents are deployed directly on your infrastructure, whether that\'s your private cloud, on-premise servers, or a dedicated secure environment. We don\'t have access to your production data unless explicitly granted for debugging.' },
      { q: 'What are the deployment options?', a: 'On premise, private cloud, or secured managed environment. You choose. We build to your compliance standards, integrate with your secret management, and operate under your security policies.' },
      { q: 'How do you handle compliance?', a: 'Every agent is architected for your compliance requirements from day one. Security isn\'t an afterthought.' },
      { q: 'What about API keys and credentials?', a: 'We integrate with your existing secret management (e.g. Azure Key Vault, AWS Secrets Manager). Credentials stay in your control.' },
    ],
  },
  {
    category: 'Process & Integration',
    questions: [
      { q: 'How long does it take to get an agent live?', a: 'Typically 4–8 weeks from Discovery Sprint to production. First agent often live within 8 weeks.' },
      { q: 'What systems can you integrate with?', a: 'SAP (ECC, HANA), NetSuite, Salesforce, Microsoft 365, Tally, custom APIs, vendor portals, and more. We\'ve integrated 19+ enterprise systems.' },
      { q: 'What happens if something goes wrong?', a: '24/7 monitoring and alerting. We fix it under SLA. You have a single team to call.' },
    ],
  },
  {
    category: 'Engagement & Pricing',
    questions: [
      { q: 'How is pricing determined?', a: 'Pricing depends on complexity, number of integrations, and SLA requirements. We provide a fixed quote after the Discovery Sprint.' },
      { q: "What's included in monthly operations?", a: '24/7 monitoring, bug fixes, maintenance, monthly performance reports, and ongoing optimization. One subscription.' },
      { q: 'Can we start small and expand?', a: 'Yes. Many clients start with one agent and add more as they see results.' },
    ],
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        {question}
        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SecurityFAQ() {
  const [openKey, setOpenKey] = useState<string | null>('security-0');

  return (
    <SectionWrapper id="security-faq" className="section-bg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">Built for enterprise. Secured by design.</h2>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Security isn't an afterthought. Every agent is architected for your compliance requirements from day one.</p>
          <div className="section-card p-6">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Your infrastructure. Your rules.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Every A365 agent is deployed within your security perimeter.</p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2"><Server className="w-4 h-4 text-primary-500" /> On premise · Private cloud</li>
              <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-primary-500" /> No data egress</li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">Common Questions</p>
          <div className="space-y-10">
            {FAQ_ITEMS.map((section, i) => (
              <div key={section.category}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{section.category}</h3>
                <div className="section-card p-6">
                  {section.questions.map((item, j) => {
                    const key = `${section.category}-${j}`;
                    return (
                      <AccordionItem
                        key={key}
                        question={item.q}
                        answer={item.a}
                        isOpen={openKey === key}
                        onToggle={() => setOpenKey(openKey === key ? null : key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
