import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

const TYPING_TEXT = 'Now agent-powered.';
const TYPING_SPEED_MS = 85;
const CURSOR_BLINK_MS = 530;
const PAUSE_AFTER_TYPING_MS = 2500;
const PAUSE_BEFORE_RETYPE_MS = 400;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? TYPING_TEXT : '');
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const runTypingCycle = () => {
      setTyped('');
      timeoutId = setTimeout(() => {
        let i = 0;
        intervalId = setInterval(() => {
          i += 1;
          setTyped(TYPING_TEXT.slice(0, i));
          if (i >= TYPING_TEXT.length) {
            clearInterval(intervalId);
            timeoutId = setTimeout(runTypingCycle, PAUSE_AFTER_TYPING_MS + PAUSE_BEFORE_RETYPE_MS);
          }
        }, TYPING_SPEED_MS);
      }, PAUSE_BEFORE_RETYPE_MS);
    };

    runTypingCycle();
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setCursorOn((c) => !c), CURSOR_BLINK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-r from-[#EDEEF3] to-[#FFFFFF] dark:from-gray-900 dark:to-gray-950">
      {/* Soft gradient orbs - subtle enterprise motion (respects reduced motion) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#4C99A0]/20 dark:bg-[#4C99A0]/10 blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, -12, 0], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[#65A859]/15 dark:bg-[#65A859]/10 blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, 10, 0], x: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-[#4C99A0]/10 dark:bg-[#4C99A0]/5 blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

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
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          <span className="text-[#002060] dark:text-white">Enterprise operations.</span>
          <br />
          <span className="inline-block text-2xl md:text-4xl lg:text-5xl mt-1 min-h-[1.2em]">
            <span className="bg-gradient-to-r from-[#4C99A0] to-[#65A859] bg-clip-text text-transparent">{typed}</span>
            {!reduceMotion && (
              <span
                className="inline-block w-0.5 h-[0.9em] align-middle bg-[#4C99A0] ml-0.5 transition-opacity duration-75"
                style={{
                  opacity: typed.length < TYPING_TEXT.length ? 1 : cursorOn ? 1 : 0,
                }}
                aria-hidden
              />
            )}
          </span>
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
          <motion.a
            href="#agents-in-action"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-2xl font-medium flex items-center justify-center gap-2 group shadow-lg shadow-[#4C99A0]/25"
            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 20px 40px -12px rgba(76, 153, 160, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Deploy Your First Agent
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
          <a href="#agents-in-action" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 font-medium text-sm">
            Agents in Action ↓
          </a>
        </motion.div>

        {/* Trust / value pills - adds visual interest */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8"
        >
          {[
            { icon: Zap, label: 'Deploy in weeks', sub: 'Not months' },
            { icon: Shield, label: 'Your infrastructure', sub: 'Data stays in-house' },
            { icon: Clock, label: '24/7 monitoring', sub: 'We maintain it' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-sm backdrop-blur-sm cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4C99A0]/20 to-[#65A859]/20 dark:from-[#4C99A0]/30 dark:to-[#65A859]/30 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#4C99A0] dark:text-[#65A859]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
