import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Plus, Mic } from 'lucide-react';

const SUGGESTION_CARDS = [
  {
    question: 'What solutions does A365 offer?',
    answer: 'A365 offers four main solution areas: **Intelligent AI Agents** (AP Agent, AR Agent, SAP Reconcile Agent), **Microsoft AI Ecosystem** (Copilot, Custom Agents, M365 Desktop & Cloud Automation), **Office Suite** (Web/Mobile Apps with BI, CRM Agents, Chatbots, Digital Marketing), and **Scalable Industry Products** (Office AI Bots, Customer Satisfaction).',
  },
  {
    question: 'How do I get started?',
    answer: 'We follow a simple three-phase process: **Discovery Sprint** (0–2 weeks) to map your needs and scope the solution, **Agent Build** (4–8 weeks) to develop and integrate, and **Monthly Operations** for 24/7 monitoring and support. You get a fixed quote after the Discovery Sprint.',
  },
  {
    question: 'What does it cost?',
    answer: 'Pricing depends on complexity, number of integrations, and SLA requirements. We provide a fixed quote after the Discovery Sprint—no surprises. Many clients see 20–50% cost savings compared to hiring for the same work.',
  },
  {
    question: 'Can you integrate with our systems?',
    answer: 'Yes. We integrate with SAP (ECC, HANA), NetSuite, Salesforce, Microsoft 365, Tally, custom APIs, and vendor portals. Solutions are deployed on your infrastructure so your data stays in your control.',
  },
  {
    question: 'What are your Office Suite products?',
    answer: 'Our Office Suite includes DocCraft (Excel to PDF/PPT/Image), Sheets to Slides, Image Compressor, Consolidation, File Splitter, Merge Master, File Comparison, and Work Allocation tools—all designed to automate daily office workflows.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Every A365 solution is deployed within your security perimeter—on premise, private cloud, or your chosen environment. We integrate with your secret management and do not access your production data unless you grant it for debugging.',
  },
];

type Message = { role: 'user' | 'assistant'; content: string };

export default function AIChatFullScreen({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll so only the chat content scrolls; restore on close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    const card = SUGGESTION_CARDS.find((c) => c.question.toLowerCase() === text.toLowerCase());
    const answer = card
      ? card.answer
      : "Thanks for your question. For specific details on solutions, pricing, or integrations, please use one of the suggested questions below or get in touch with our team.";
    setMessages((m) => [...m, { role: 'assistant', content: answer }]);
  };

  const handleSuggestionClick = (question: string, answer: string) => {
    setMessages((m) => [...m, { role: 'user', content: question }, { role: 'assistant', content: answer }]);
  };

  const chatUI = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex flex-col bg-gray-900 overflow-hidden"
        style={{ isolation: 'isolate' }}
      >
        {/* Fixed header - never scrolls, always visible */}
        <header className="fixed top-0 left-0 right-0 z-[10000] flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-900 shrink-0">
          <h2
            className="font-bold text-xl tracking-tight"
            style={{ color: '#ffffff', textShadow: '0 0 1px rgba(255,255,255,0.5)' }}
          >
            A365 AI Assistant
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Main content - with top padding so it doesn't sit under fixed header */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden pt-14 bg-gray-900">
          {messages.length === 0 ? (
            /* Welcome state: centered prompt + input + cards (scrollable if needed) */
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto min-h-0">
              <p className="text-2xl md:text-3xl font-medium text-white mb-2">What can I help with?</p>
              <p className="text-gray-400 text-sm mb-8">Ask anything about A365 solutions, pricing, or getting started.</p>

              {/* Search / Input bar - prominent */}
              <div className="w-full max-w-2xl mb-8">
                <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                  <button type="button" className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors" aria-label="Attach">
                    <Plus className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything"
                    className="flex-1 bg-transparent text-white placeholder-gray-500 text-base py-1 focus:outline-none"
                  />
                  <button type="button" className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors" aria-label="Voice">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSend}
                    className="p-2 rounded-xl bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white hover:opacity-90 transition-opacity"
                    aria-label="Send"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Suggestion cards below search */}
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Suggested questions</p>
              <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTION_CARDS.map((card, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(card.question, card.answer)}
                    className="text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-gray-200 text-sm transition-colors"
                  >
                    {card.question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat state: message list + same input + cards below */
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-br-md'
                          : 'bg-gray-800 text-gray-100 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {msg.content.split('**').map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar + cards */}
              <div className="shrink-0 border-t border-gray-800 bg-gray-900 px-4 py-4">
                <div className="max-w-2xl mx-auto flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 mb-4">
                  <button type="button" className="p-1.5 text-gray-400 hover:text-white rounded-lg" aria-label="Attach">
                    <Plus className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything"
                    className="flex-1 bg-transparent text-white placeholder-gray-500 text-base py-1 focus:outline-none"
                  />
                  <button type="button" className="p-1.5 text-gray-400 hover:text-white rounded-lg" aria-label="Voice">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSend}
                    className="p-2 rounded-xl bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white hover:opacity-90"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Suggested questions</p>
                <div className="max-w-2xl mx-auto flex flex-wrap gap-2">
                  {SUGGESTION_CARDS.slice(0, 4).map((card, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(card.question, card.answer)}
                      className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs transition-colors"
                    >
                      {card.question}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(chatUI, document.body);
}
