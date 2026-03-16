import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Plus, Mic } from 'lucide-react';
import { localAnswer } from '../../lib/localChat';

const SIDEBAR_MENUS = [
  'Intelligent AI Agents',
  'Microsoft AI Ecosystem',
  'Office Suite',
  'Scalable Industry Products',
  'Contact Us',
];

const MENU_SUGGESTIONS: Record<string, string[]> = {
  'Intelligent AI Agents': [
    'What AI Agents do you offer?',
    'How do AI Agents integrate with SAP?',
    'What is the typical delivery timeline?',
  ],
  'Microsoft AI Ecosystem': [
    'What Microsoft AI solutions do you offer?',
    'Can you build custom Copilot agents?',
    'Do you support Power Platform and Power Automate?',
  ],
  'Office Suite': [
    'What are your Office Suite products?',
    'What is DocCraft?',
    'Do you offer chatbots?',
  ],
  'Scalable Industry Products': [
    'What Scalable Industry Products do you have?',
    'What is Office AI Bots?',
    'Is there a pilot or trial option?',
  ],
  'Contact Us': [
    'Email Us',
    'LinkedIn',
    'Instagram',
    'Facebook',
    'YouTube',
  ],
};

type Message = { role: 'user' | 'assistant'; content: string };

export default function AIChatFullScreen({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string = input.trim()) => {
    if (!text) return;
    setInput('');

    // Handle "Contact Us" suggestions immediately
    if (text === 'LinkedIn') {
      window.open('https://linkedin.com/in/ambrose-denny-39320692', '_blank');
      return;
    }
    if (text === 'Instagram') {
      window.open('https://www.instagram.com/ambot_365/', '_blank');
      return;
    }
    if (text === 'Facebook') {
      window.open('https://www.facebook.com/people/AmBot-365/100092347833674/', '_blank');
      return;
    }
    if (text === 'YouTube') {
      window.open('https://www.youtube.com/@Ambot365Digibots', '_blank');
      return;
    }

    if (text === 'Email Us') {
      setMessages((m) => [
        ...m,
        { role: 'user', content: text },
        { role: 'assistant', content: 'SHOW_CONTACT_FORM' },
      ]);
      return;
    }

    const reply = localAnswer(text);
    setMessages((m) => [
      ...m,
      { role: 'user', content: text },
      { role: 'assistant', content: reply },
    ]);
  };

  const currentSuggestions = selectedMenu ? MENU_SUGGESTIONS[selectedMenu] ?? [] : [];

  /** Render text with **bold** markdown support */
  const renderText = (content: string) =>
    content.split('\n').map((line, li, arr) => (
      <span key={li}>
        {line.split('**').map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
        )}
        {li < arr.length - 1 && <br />}
      </span>
    ));

  const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const sub = async (e: any) => {
      e.preventDefault();
      setStatus('sending');
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) setStatus('success');
        else setStatus('error');
      } catch {
        setStatus('error');
      }
    };

    if (status === 'success') {
      return (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
          Message sent successfully! We'll get back to you soon.
        </div>
      );
    }

    return (
      <form onSubmit={sub} className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3">
        <h3 className="text-white font-medium text-sm">Send us a message</h3>
        <input
          required
          type="text"
          placeholder="Name"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Subject"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
        <textarea
          required
          placeholder="Message"
          rows={3}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <button
          disabled={status === 'sending'}
          className="w-full py-2 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'error' && <p className="text-red-400 text-[10px]">Failed to send. Please try again.</p>}
      </form>
    );
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
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-[10000] flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-900 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4C99A0] animate-pulse" />
            <h2
              className="font-bold text-xl tracking-tight"
              style={{ color: '#ffffff', textShadow: '0 0 1px rgba(255,255,255,0.5)' }}
            >
              A365 AI Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Main layout */}
        <div className="flex-1 flex min-h-0 overflow-hidden pt-14 bg-gray-900">

          {/* Sidebar */}
          <aside className="w-56 shrink-0 border-r border-gray-700 bg-gray-800/50 flex flex-col py-4">
            <p className="px-4 text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">Solutions</p>
            <nav className="flex flex-col gap-0.5 px-2">
              {SIDEBAR_MENUS.map((menu) => (
                <button
                  key={menu}
                  onClick={() => setSelectedMenu(menu)}
                  className={`text-left px-3 py-2.5 rounded-lg transition-colors text-sm ${selectedMenu === menu
                      ? 'text-white bg-[#4C99A0]/30 border border-[#4C99A0]/50'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/80'
                    }`}
                >
                  {menu}
                </button>
              ))}
            </nav>
            <div className="mt-auto px-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-xs">A365 AI Assistant</p>
              <p className="text-gray-600 text-xs mt-1">Powered by A365 data</p>
            </div>
          </aside>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {messages.length === 0 ? (
              /* Welcome state */
              <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto min-h-0">
                <p className="text-2xl md:text-3xl font-medium text-white mb-2">What can I help with?</p>
                <p className="text-gray-400 text-sm mb-8">
                  Ask me anything about A365 solutions, products, pricing, or getting started.
                </p>

                {!selectedMenu && (
                  <p className="text-gray-500 text-sm mb-8">
                    Choose a solution from the sidebar to see suggested questions, or type anything below.
                  </p>
                )}

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
                      placeholder="Ask anything about A365..."
                      className="flex-1 bg-transparent text-white placeholder-gray-500 text-base py-1 focus:outline-none"
                    />
                    <button type="button" className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors" aria-label="Voice">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="p-2 rounded-xl bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat state */
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                  {messages.map((msg, i) => {
                    const isLast = i === messages.length - 1;
                    const showSuggestions = isLast && msg.role === 'assistant' && selectedMenu && currentSuggestions.length > 0;

                    return (
                      <div key={i} className="space-y-4">
                        <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.content === 'SHOW_CONTACT_FORM' ? (
                            <ContactForm />
                          ) : (
                            <div
                              className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-br-md'
                                : 'bg-gray-800 text-gray-100 rounded-bl-md'
                                }`}
                            >
                              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                {renderText(msg.content)}
                              </p>
                            </div>
                          )}
                        </div>

                        {showSuggestions && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-start gap-3 ml-2"
                          >
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Suggested</p>
                            <div className="flex flex-wrap gap-2">
                              {currentSuggestions.map((q, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleSend(q)}
                                  className="px-4 py-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/80 border border-gray-700/50 hover:border-[#4C99A0]/50 text-gray-300 hover:text-white text-xs transition-all duration-200 shadow-sm"
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom bar */}
                <div className="shrink-0 border-t border-gray-800 bg-gray-900 px-4 py-4">
                  <div className="max-w-2xl flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                    <button type="button" className="p-1.5 text-gray-400 hover:text-white rounded-lg" aria-label="Attach">
                      <Plus className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask anything about A365..."
                      className="flex-1 bg-transparent text-white placeholder-gray-500 text-base py-1 focus:outline-none"
                    />
                    <button type="button" className="p-1.5 text-gray-400 hover:text-white rounded-lg" aria-label="Voice">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="p-2 rounded-xl bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
