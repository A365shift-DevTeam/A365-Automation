import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import AIChatFullScreen from '../chat/AIChatFullScreen';
import logoPath from '../../assets/AmBot 365-Logo.png';

const NAV_LINKS = [
    { name: 'Services', href: '#solutions-overview' },
    { name: 'AI Solutions', href: '#agents-in-action' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'FAQ', href: '#security-faq' },
    { name: 'Why Us', href: '#about' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    <img src={logoPath} alt="AmBot 365 Logo" className="h-8 w-auto" />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full rounded-full" />
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setIsAIChatOpen(true)}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#4C99A0] to-[#65A859] hover:from-[#3d7a80] hover:to-[#508a47] text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-[#4C99A0]/25 hover:shadow-lg hover:shadow-[#4C99A0]/40 hover:-translate-y-0.5"
                    >
                        Ask AI
                    </button>
                    <a
                        href="#cta"
                        className="px-5 py-2.5 bg-gradient-to-r from-[#4C99A0] to-[#65A859] hover:from-[#3d7a80] hover:to-[#508a47] text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-[#4C99A0]/25 hover:shadow-lg hover:shadow-[#4C99A0]/40 hover:-translate-y-0.5"
                    >
                        Get in Touch
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setIsAIChatOpen(true)}
                        className="px-4 py-2 bg-gradient-to-r from-[#4C99A0] to-[#65A859] hover:from-[#3d7a80] hover:to-[#508a47] text-white text-sm font-medium rounded-xl transition-all"
                    >
                        Ask AI
                    </button>
                    <button
                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden md:hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-medium text-gray-900 dark:text-gray-100 py-3 border-b border-gray-100 dark:border-gray-800 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-3 mt-4 pb-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAIChatOpen(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full py-3 text-center text-base font-medium text-white bg-gradient-to-r from-[#4C99A0] to-[#65A859] hover:from-[#3d7a80] hover:to-[#508a47] rounded-xl transition-all shadow-md"
                                >
                                    Ask AI
                                </button>
                                <a
                                    href="#cta"
                                    className="w-full py-3 text-center text-base font-medium text-white bg-gradient-to-r from-[#4C99A0] to-[#65A859] hover:from-[#3d7a80] hover:to-[#508a47] rounded-xl transition-all shadow-md shadow-[#4C99A0]/25"
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full-screen AI Chat (Gemini/ChatGPT style) */}
            <AnimatePresence>
                {isAIChatOpen && <AIChatFullScreen onClose={() => setIsAIChatOpen(false)} />}
            </AnimatePresence>
        </header>
    );
}
