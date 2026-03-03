import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-r from-[#EDEEF3] to-[#FFFFFF] dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden />
          AGENTS AS A SERVICE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-gray-900 dark:text-gray-50"
        >
          Enterprise operations.<br />
          <span className="bg-gradient-to-r from-[#4C99A0] to-[#65A859] bg-clip-text text-transparent">Now agent-powered.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10"
        >
          We build it. You run it. We maintain it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#agents-in-action" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#4C99A0]/25 hover:shadow-xl hover:-translate-y-0.5">
            Deploy Your First Agent
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#agents-in-action" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 font-medium text-sm">
            Agents in Action ↓
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
