import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

const TYPED_TEXT = "AI Without Process is Chaos . We Don't sell AI Hype";

function useTypingText(text: string, speed = 60, deleteSpeed = 30, startDelay = 1000, pauseTime = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delay);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (!deleting) {
      if (count >= text.length) {
        const pause = setTimeout(() => setDeleting(true), pauseTime);
        return () => clearTimeout(pause);
      }
      const timer = setTimeout(() => setCount((c) => c + 1), speed);
      return () => clearTimeout(timer);
    } else {
      if (count <= 0) {
        setDeleting(false);
        return;
      }
      const timer = setTimeout(() => setCount((c) => c - 1), deleteSpeed);
      return () => clearTimeout(timer);
    }
  }, [count, started, deleting, text, speed, deleteSpeed, pauseTime]);

  return text.slice(0, count);
}

export default function Hero() {
  const typedSubtitle = useTypingText(TYPED_TEXT);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-gray-900 dark:text-gray-50"
        >
          What Generic AI tools Can't Structure<br className="hidden md:block" />
          We<span className="text-gradient"> Architect , Integrate</span> and <span className="text-gradient">Scale</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 max-w-3xl mx-auto my-8 min-h-[2em]"
        >
          {typedSubtitle}
          <span className="inline-block w-[2px] h-[1em] bg-gray-400 dark:bg-gray-500 ml-0.5 animate-pulse align-middle" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-10 pl-4 md:pl-0 flex flex-col items-center"
        >
          <div className="text-left w-fit mx-auto md:ml-auto md:mr-auto">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center md:text-left">We Design AI for Real Business Impact</h3>
            <ul className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-1 font-medium text-[#2d6a8f] dark:text-[#53a2d1]">
              <li className="flex items-center gap-2"><span className="text-[#2d6a8f] dark:text-[#53a2d1] font-bold">*</span> Requirement-driven systems</li>
              <li className="flex items-center gap-2"><span className="text-[#2d6a8f] dark:text-[#53a2d1] font-bold">*</span> Process-aligned automation</li>
              <li className="flex items-center gap-2"><span className="text-[#2d6a8f] dark:text-[#53a2d1] font-bold">*</span> API-connected platforms</li>
              <li className="flex items-center gap-2"><span className="text-[#2d6a8f] dark:text-[#53a2d1] font-bold">*</span> Multi-agent enterprise frameworks</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#4C99A0]/25">
            Connect US
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            View Demo
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
