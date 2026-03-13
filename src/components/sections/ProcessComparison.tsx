import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Zap, ArrowRight, Timer, AlertTriangle } from 'lucide-react';

export default function ProcessComparison() {
  const [isInView, setIsInView] = useState(false);
  const [manualProgress, setManualProgress] = useState(0);
  const [autoProgress, setAutoProgress] = useState(0);

  const manualSteps = [
    { name: 'Open SAP & Download GRN', duration: '2 min' },
    { name: 'Copy to Excel & Clean Data', duration: '3 min' },
    { name: 'VLOOKUP & Cross-Check', duration: '3 min' },
    { name: 'Flag Mismatches Manually', duration: '2 min' },
  ];

  const autoSteps = [
    { name: 'SAP Auto-Login & Extract', duration: '30s' },
    { name: 'AI-Powered Matching', duration: '1 min' },
    { name: 'Validation & Reconciliation', duration: '1 min' },
    { name: 'Exception Report Generated', duration: '30s' },
  ];

  useEffect(() => {
    if (!isInView) return;

    const CYCLE_DURATION = 6000; // total loop duration in ms

    function runCycle() {
      // Reset both sides
      setManualProgress(0);
      setAutoProgress(0);

      const t: ReturnType<typeof setTimeout>[] = [];

      // Manual progresses slowly — only reaches step 3 before cycle resets
      t.push(setTimeout(() => setManualProgress(1), 800));
      t.push(setTimeout(() => setManualProgress(2), 2000));
      t.push(setTimeout(() => setManualProgress(3), 4000));
      // never reaches step 4 — too slow!

      // Auto progresses quickly and finishes all 4 steps
      t.push(setTimeout(() => setAutoProgress(1), 500));
      t.push(setTimeout(() => setAutoProgress(2), 1000));
      t.push(setTimeout(() => setAutoProgress(3), 1500));
      t.push(setTimeout(() => setAutoProgress(4), 2000));

      return t;
    }

    let timers = runCycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runCycle();
    }, CYCLE_DURATION);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isInView]);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-gray-950" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50"
          >
            Manual Process vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4C99A0] to-[#65A859]">A365 Automation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            See how A365 agents replace hours of repetitive manual work — from GRN reconciliation to invoice matching — in minutes.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsInView(true)}
          className="relative"
        >
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">

            {/* ── LEFT: MANUAL ── */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 dark:from-gray-900 dark:to-gray-900/80 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none p-8 md:p-10 relative overflow-hidden border border-gray-200/60 dark:border-gray-800">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 flex items-center justify-center">
                    <Timer className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Manual</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Traditional process</p>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-xl px-4 py-2 text-center">
                  <p className="text-2xl font-mono font-black text-red-500 leading-none">10+</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mt-1">Minutes</p>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="relative ml-4">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-gray-700" />

                <div className="space-y-6">
                  {manualSteps.map((step, i) => {
                    const isDone = i < manualProgress;
                    const isCurrent = i === manualProgress;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                        transition={{ delay: 0.2 + i * 0.15 }}
                        className="flex items-start gap-4 relative"
                      >
                        {/* Node */}
                        <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center z-10 transition-all duration-500 ${
                          isDone ? 'bg-blue-500 border-blue-500' : isCurrent ? 'bg-white dark:bg-gray-800 border-orange-400 shadow-md shadow-orange-200 dark:shadow-orange-900/30' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                        }`}>
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          {isCurrent && (
                            <motion.div
                              animate={{ scale: [1, 1.4, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-2 h-2 rounded-full bg-orange-400"
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pb-1 ${isDone ? '' : isCurrent ? '' : 'opacity-40'}`}>
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold ${isDone ? 'text-gray-800 dark:text-gray-200' : isCurrent ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-600'}`}>
                              {step.name}
                            </p>
                            <span className={`text-xs font-mono font-bold ml-2 ${isDone ? 'text-gray-500' : isCurrent ? 'text-orange-500' : 'text-gray-300 dark:text-gray-700'}`}>
                              {step.duration}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom: Pain Points */}
              <div className="mt-8 pt-6 border-t border-gray-200/80 dark:border-gray-700/50 grid grid-cols-3 gap-3">
                {[
                  { icon: XCircle, label: 'Error Prone', color: 'text-red-400' },
                  { icon: AlertTriangle, label: 'Not Scalable', color: 'text-orange-400' },
                  { icon: Clock, label: 'Slow & Tedious', color: 'text-yellow-500' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CENTER VS BADGE ── */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0] to-[#65A859] rounded-full blur-xl opacity-40 scale-150" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-2xl relative border-4 border-white dark:border-gray-950">
                  <span className="text-white font-black text-sm tracking-wider">VS</span>
                </div>
              </div>
            </div>

            {/* Mobile VS */}
            <div className="lg:hidden flex justify-center -my-3 z-20 relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-950">
                <span className="text-white font-black text-xs">VS</span>
              </div>
            </div>

            {/* ── RIGHT: AUTOMATION ── */}
            <div className="bg-gradient-to-br from-[#4C99A0]/5 to-[#65A859]/5 dark:from-gray-900 dark:to-gray-900/80 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none p-8 md:p-10 relative overflow-hidden border border-[#4C99A0]/20 dark:border-gray-800">
              {/* Glow effects */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#4C99A0]/8 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#65A859]/8 blur-3xl pointer-events-none" />

              {/* Header Row */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg shadow-[#4C99A0]/25">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">A365 Agent</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fully automated</p>
                  </div>
                </div>
                <div className="bg-[#65A859]/10 border border-[#65A859]/25 rounded-xl px-4 py-2 text-center">
                  <p className="text-2xl font-mono font-black text-[#65A859] leading-none">3</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#65A859]/70 mt-1">Minutes</p>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="relative ml-4 z-10">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-gray-700" />
                {/* Animated progress line */}
                <motion.div
                  className="absolute left-[11px] top-3 w-0.5 bg-gradient-to-b from-[#4C99A0] to-[#65A859] origin-top"
                  initial={{ height: 0 }}
                  animate={{ height: isInView ? `${Math.min(autoProgress / 4 * 100, 100)}%` : 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />

                <div className="space-y-6">
                  {autoSteps.map((step, i) => {
                    const isDone = i < autoProgress;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                        transition={{ delay: 0.2 + i * 0.12 }}
                        className="flex items-start gap-4 relative"
                      >
                        {/* Node */}
                        <motion.div
                          animate={isDone ? { scale: [0.8, 1.15, 1] } : {}}
                          transition={{ duration: 0.4 }}
                          className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center z-10 transition-all duration-500 ${
                            isDone ? 'bg-[#65A859] border-[#65A859] shadow-md shadow-[#65A859]/30' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </motion.div>

                        {/* Content */}
                        <div className={`flex-1 pb-1 transition-opacity duration-500 ${isDone ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold ${isDone ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                              {step.name}
                            </p>
                            <span className={`text-xs font-mono font-bold ml-2 ${isDone ? 'text-[#65A859]' : 'text-gray-300 dark:text-gray-700'}`}>
                              {step.duration}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom: Highlights */}
              <div className="mt-8 pt-6 border-t border-[#4C99A0]/15 dark:border-gray-700/40 grid grid-cols-3 gap-3 relative z-10">
                {[
                  { value: '~100%', label: 'Accuracy' },
                  { value: '0', label: 'Errors' },
                  { value: '24/7', label: 'Uptime' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                    transition={{ delay: 1.6 + i * 0.15 }}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <span className="text-lg font-mono font-black text-[#65A859]">{item.value}</span>
                    <span className="text-[11px] font-medium text-gray-500">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ delay: 2 }}
            className="mt-8 bg-gradient-to-r from-[#4C99A0]/10 via-white dark:via-gray-900 to-[#65A859]/10 rounded-2xl p-5 md:p-6 border border-gray-200/50 dark:border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Save <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4C99A0] to-[#65A859] font-black text-lg">7+ minutes</span> per transaction with A365 agents
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs font-bold tracking-wide uppercase text-gray-500 dark:text-gray-400">
              <span>No code changes</span>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span>Deploy in weeks</span>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span>Full audit trail</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
