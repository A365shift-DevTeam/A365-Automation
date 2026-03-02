import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Globe from '../ui/Globe';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Rotating 3D Globe Background */}
      <Globe />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-sm md:text-base uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4"
        >
          AGENTS AS A SERVICE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-gray-900 dark:text-gray-50"
        >
          Enterprise operations.<br />
          Now agent-powered.
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
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#4C99A0]/25">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
