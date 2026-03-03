import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Plus, Mic } from 'lucide-react';

const SIDEBAR_MENUS = [
  'Intelligent AI Agents',
  'Microsoft AI Ecosystem',
  'Office Suite',
  'Scalable Industry Products',
];

type QandA = { question: string; answer: string };

/** Suggested questions per sidebar menu – shown only after user picks that menu */
const MENU_SUGGESTIONS: Record<string, QandA[]> = {
  'Intelligent AI Agents': [
    { question: 'What Intelligent AI Agents do you offer?', answer: 'We offer **AP Agent**, **AR Agent**, **SAP Reconcile Agent**, and **Reconcile Agent**—all designed to automate finance and reconciliation workflows with high accuracy.' },
    { question: 'How do AI Agents integrate with our ERP?', answer: 'Our agents integrate with SAP (ECC, HANA), NetSuite, and other ERPs via secure APIs. They run on your infrastructure so your data stays in-house.' },
    { question: 'What is the typical timeline for an AI Agent?', answer: 'Discovery Sprint is 0–2 weeks; Agent Build is 4–8 weeks depending on complexity. You get a fixed quote after Discovery.' },
  ],
  'Microsoft AI Ecosystem': [
    { question: 'What Microsoft AI solutions do you offer?', answer: 'We offer **Microsoft Copilot Solutions**, **Custom Agent Development**, **Microsoft 365 Desktop Automation**, and **Microsoft 365 Cloud Automation**—all aligned with the Microsoft AI stack.' },
    { question: 'Can you build custom Copilot agents?', answer: 'Yes. We develop custom agents using the Microsoft Agents platform, tailored to your processes and integrated with your M365 tenant.' },
    { question: 'Do you support M365 desktop and cloud?', answer: 'Yes. We automate both desktop (Power Automate, VBA, etc.) and cloud (Power Platform, Graph API) workflows on Microsoft 365.' },
  ],
  'Office Suite': [
    { question: 'What are your Office Suite products?', answer: 'Our Office Suite includes **DocCraft** (Excel to PDF/PPT/Image), **Sheets to Slides**, **Image Compressor**, **Consolidation**, **File Splitter**, **Merge Master**, **File Comparison**, and **Work Allocation**—all to automate daily office work.' },
    { question: 'Do you offer CRM or chatbot solutions?', answer: 'Yes. We offer CRM Agents, Chatbots with AI, Digital Marketing Agent, and Lead Agents as part of our Office Suite and Web | Mobile Apps with BI.' },
    { question: 'Can you build web or mobile apps?', answer: 'Yes. We deliver Web and Mobile Apps with BI, integrated with your data and workflows, as part of the Office Suite.' },
  ],
  'Scalable Industry Products': [
    { question: 'What Scalable Industry Products do you have?', answer: 'We offer **Office AI Bots** and **Customer Satisfaction** solutions—scalable products that can be deployed across teams or divisions.' },
    { question: 'How do these scale across our organization?', answer: 'Products are designed for multi-tenant or multi-team use. We help you roll out the same solution across departments with minimal rework.' },
    { question: 'Is there a trial or pilot option?', answer: 'We typically start with a Discovery Sprint and a scoped pilot. Get in touch for a fixed quote and pilot options.' },
  ],
};

/** All Q&As flattened for lookup when user types a question */
const ALL_QA: QandA[] = Object.values(MENU_SUGGESTIONS).flat();

type Message = { role: 'user' | 'assistant'; content: string };

export default function AIChatFullScreen({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
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
    const card = ALL_QA.find((c) => c.question.toLowerCase() === text.toLowerCase());
    const answer = card
      ? card.answer
      : "Thanks for your question. Choose a solution from the sidebar to see related questions, or get in touch with our team for more help.";
    setMessages((m) => [...m, { role: 'assistant', content: answer }]);
  };

  const handleSuggestionClick = (question: string, answer: string) => {
    setMessages((m) => [...m, { role: 'user', content: question }, { role: 'assistant', content: answer }]);
  };

  const handleSidebarMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    const question = `Tell me more about ${menu}`;
    const introAnswer = `Here’s an overview of **${menu}**. Use the suggested questions below to dive deeper.`;
    handleSuggestionClick(question, introAnswer);
  };

  const currentSuggestions = selectedMenu ? MENU_SUGGESTIONS[selectedMenu] ?? [] : [];

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

        {/* Main content: sidebar + chat area */}
        <div className="flex-1 flex min-h-0 overflow-hidden pt-14 bg-gray-900">
          {/* Sidebar - only on Ask AI chatbot page */}
          <aside className="w-56 shrink-0 border-r border-gray-700 bg-gray-800/50 flex flex-col py-4">
            <p className="px-4 text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">Solutions</p>
            <nav className="flex flex-col gap-0.5 px-2">
              {SIDEBAR_MENUS.map((menu) => (
                <button
                  key={menu}
                  onClick={() => handleSidebarMenuClick(menu)}
                  className={`text-left px-3 py-2.5 rounded-lg transition-colors text-sm ${
                    selectedMenu === menu
                      ? 'text-white bg-[#4C99A0]/30 border border-[#4C99A0]/50'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/80'
                  }`}
                >
                  {menu}
                </button>
              ))}
            </nav>
          </aside>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {messages.length === 0 ? (
            /* Welcome state: centered prompt + input + cards (scrollable if needed) */
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto min-h-0">
              <p className="text-2xl md:text-3xl font-medium text-white mb-2">What can I help with?</p>
              <p className="text-gray-400 text-sm mb-8">Ask anything about A365 solutions, pricing, or getting started.</p>

              {/* Suggested questions above search bar - only after user picks a sidebar menu */}
              {selectedMenu && currentSuggestions.length > 0 && (
                <>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
                    Suggested questions for {selectedMenu}
                  </p>
                  <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {currentSuggestions.map((card, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(card.question, card.answer)}
                        className="text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-gray-200 text-sm transition-colors"
                      >
                        {card.question}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {!selectedMenu && (
                <p className="text-gray-500 text-sm mb-8">Choose a solution from the sidebar to see suggested questions.</p>
              )}

              {/* Search / Input bar - below questions */}
              <div className="w-full max-w-2xl">
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

              {/* Suggested questions above input bar, then input bar */}
              <div className="shrink-0 border-t border-gray-800 bg-gray-900 px-4 py-4">
                {selectedMenu && currentSuggestions.length > 0 && (
                  <>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                      Suggested for {selectedMenu}
                    </p>
                    <div className="max-w-2xl mx-auto flex flex-wrap gap-2 mb-4">
                      {currentSuggestions.map((card, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(card.question, card.answer)}
                          className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs transition-colors"
                        >
                          {card.question}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <div className="max-w-2xl mx-auto flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
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
              </div>
            </>
          )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(chatUI, document.body);
}
