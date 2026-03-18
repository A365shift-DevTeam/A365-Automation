import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Zap, ArrowRight, Timer, AlertTriangle, Shield, TrendingUp, Activity, RotateCw } from 'lucide-react';

export default function ProcessComparison() {
  const [isInView, setIsInView] = useState(false);
  const [manualStep, setManualStep] = useState(-1);
  const [autoStep, setAutoStep] = useState(-1);
  const [manualElapsed, setManualElapsed] = useState(0);
  const [autoElapsed, setAutoElapsed] = useState(0);
  const [autoFinished, setAutoFinished] = useState(false);
  const [manualFinished, setManualFinished] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const manualSteps = [
    { name: 'Open SAP & Download GRN', duration: '2 min', seconds: 120 },
    { name: 'Copy to Excel & Clean Data', duration: '3 min', seconds: 180 },
    { name: 'VLOOKUP & Cross-Check', duration: '3 min', seconds: 180 },
    { name: 'Flag Mismatches Manually', duration: '2 min', seconds: 120 },
  ];

  const autoSteps = [
    { name: 'SAP Auto-Login & Extract', duration: '30s', seconds: 30 },
    { name: 'AI-Powered Matching', duration: '1 min', seconds: 60 },
    { name: 'Validation & Reconciliation', duration: '1 min', seconds: 60 },
    { name: 'Exception Report Generated', duration: '30s', seconds: 30 },
  ];

  const MANUAL_CYCLE_MS = 10000; // 10s per manual cycle
  const AUTO_CYCLE_MS = 4000;   // 4s per auto cycle — resets immediately

  const resetManual = useCallback(() => {
    setManualStep(-1);
    setManualElapsed(0);
    setManualFinished(false);
  }, []);

  const resetAuto = useCallback(() => {
    setAutoStep(-1);
    setAutoElapsed(0);
    setAutoFinished(false);
  }, []);

  // Manual cycle — slow, never finishes
  useEffect(() => {
    if (!isInView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    function runManualCycle() {
      resetManual();
      timers.push(setTimeout(() => setManualStep(0), 400));
      timers.push(setTimeout(() => setManualStep(1), 2500));
      timers.push(setTimeout(() => setManualStep(2), 5500));
      timers.push(setTimeout(() => setManualStep(3), 8500));
      timers.push(setTimeout(() => setManualFinished(true), 9500));
    }

    runManualCycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      setCycleCount(c => c + 1);
      runManualCycle();
    }, MANUAL_CYCLE_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isInView, resetManual]);

  // Automation cycle — fast, resets immediately after finishing
  useEffect(() => {
    if (!isInView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    function runAutoCycle() {
      resetAuto();
      timers.push(setTimeout(() => setAutoStep(0), 200));
      timers.push(setTimeout(() => setAutoStep(1), 900));
      timers.push(setTimeout(() => setAutoStep(2), 1600));
      timers.push(setTimeout(() => setAutoStep(3), 2300));
      timers.push(setTimeout(() => {
        setAutoStep(4);
        setAutoFinished(true);
      }, 3000));
    }

    runAutoCycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      runAutoCycle();
    }, AUTO_CYCLE_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isInView, resetAuto]);

  // Elapsed time counters
  useEffect(() => {
    if (!isInView) return;

    // Manual elapsed: counts up slowly (simulates real minutes as seconds)
    const manualTimer = setInterval(() => {
      setManualElapsed(prev => {
        if (prev >= 600) return 600; // cap at 10 min
        return prev + 1;
      });
    }, 16); // ~60 per second for fast visual counting

    // Auto elapsed: counts up fast then stops
    const autoTimer = setInterval(() => {
      setAutoElapsed(prev => {
        if (prev >= 180) return 180; // cap at 3 min
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(manualTimer);
      clearInterval(autoTimer);
    };
  }, [isInView, cycleCount]);

  // Reset elapsed on cycle
  useEffect(() => {
    setManualElapsed(0);
    setAutoElapsed(0);
  }, [cycleCount]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-gray-950" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4C99A0]/10 border border-[#4C99A0]/20 text-[#4C99A0] text-xs font-semibold tracking-wide uppercase mb-4"
          >
            <Activity className="w-3.5 h-3.5" />
            Live Comparison
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4 section-title"
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
            Watch both processes run side by side. A365 agents complete in minutes what takes humans much longer.
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
              <div className="flex items-center justify-between mb-6">
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

              {/* Elapsed Timer */}
              <div className="mb-6 flex items-center gap-2 h-8">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors duration-300 ${manualFinished
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  }`}>
                  <span className={`w-2 h-2 rounded-full ${manualFinished ? 'bg-red-500' : 'bg-orange-500 animate-pulse'}`} />
                  {manualFinished ? 'TIMED OUT' : 'RUNNING'} {formatTime(Math.min(manualElapsed, 600))}
                </div>
                <div className={`flex items-center gap-1 text-xs text-red-500 font-medium transition-opacity duration-300 ${manualFinished ? 'opacity-100' : 'opacity-0'}`}>
                  <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '2s' }} />
                  Restarting...
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="relative ml-4">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-gray-700" />
                {/* Manual progress line */}
                <motion.div
                  className="absolute left-[11px] top-3 w-0.5 bg-gradient-to-b from-blue-400 to-orange-400 origin-top"
                  animate={{ height: `${Math.min((manualStep + 1) / 4 * 100, 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                <div className="space-y-6">
                  {manualSteps.map((step, i) => {
                    const isDone = i < manualStep;
                    const isCurrent = i === manualStep;
                    const isPending = i > manualStep;

                    return (
                      <div key={i} className="flex items-start gap-4 relative">
                        {/* Node */}
                        <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center z-10 transition-all duration-500 ${isDone
                            ? 'bg-blue-500 border-blue-500'
                            : isCurrent
                              ? 'bg-white dark:bg-gray-800 border-orange-400 shadow-md shadow-orange-200 dark:shadow-orange-900/30'
                              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                          }`}>
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          {isCurrent && (
                            <motion.div
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-2 h-2 rounded-full bg-orange-400"
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pb-1 transition-all duration-500 ${isPending ? 'opacity-30' : ''}`}>
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold transition-colors duration-500 ${isDone ? 'text-gray-800 dark:text-gray-200' : isCurrent ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-600'
                              }`}>
                              {step.name}
                            </p>
                            <span className={`text-xs font-mono font-bold ml-2 transition-colors duration-500 ${isDone ? 'text-gray-500' : isCurrent ? 'text-orange-500' : 'text-gray-300 dark:text-gray-700'
                              }`}>
                              {step.duration}
                            </span>
                          </div>
                          {/* Always rendered to prevent height shift */}
                          <div className="h-1 mt-2 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <motion.div
                              animate={{ width: isCurrent ? '100%' : isDone ? '100%' : '0%' }}
                              transition={{ duration: isCurrent ? 2.5 : 0.3, ease: isCurrent ? 'linear' : 'easeOut' }}
                              className={`h-full rounded-full transition-colors duration-300 ${isCurrent ? 'bg-gradient-to-r from-orange-300 to-orange-400 dark:from-orange-500/60 dark:to-orange-400/80' : isDone ? 'bg-blue-400/40' : 'bg-transparent'}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom: Pain Points */}
              <div className="mt-8 pt-6 border-t border-gray-200/80 dark:border-gray-700/50 grid grid-cols-3 gap-3">
                {[
                  { icon: XCircle, label: 'Error Prone', color: 'text-red-400', bgColor: 'bg-red-50 dark:bg-red-900/10' },
                  { icon: AlertTriangle, label: 'Not Scalable', color: 'text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-900/10' },
                  { icon: Clock, label: 'Slow & Tedious', color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/10' },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1.5 text-center py-2 rounded-xl ${item.bgColor}`}>
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
              <div className="flex items-center justify-between mb-6 relative z-10">
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

              {/* Elapsed Timer */}
              <div className="mb-6 flex items-center gap-2 relative z-10 h-8">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors duration-300 ${autoFinished
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-[#4C99A0]/15 text-[#4C99A0] dark:text-[#65A859]'
                  }`}>
                  <span className={`w-2 h-2 rounded-full ${autoFinished ? 'bg-green-500' : 'bg-[#4C99A0] animate-pulse'}`} />
                  {autoFinished ? 'COMPLETED' : 'RUNNING'} {formatTime(Math.min(autoElapsed, 180))}
                </div>
                <div className={`flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-semibold transition-opacity duration-300 ${autoFinished ? 'opacity-100' : 'opacity-0'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  All tasks done!
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="relative ml-4 z-10">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-gray-700" />
                {/* Animated progress line */}
                <motion.div
                  className="absolute left-[11px] top-3 w-0.5 bg-gradient-to-b from-[#4C99A0] to-[#65A859] origin-top"
                  animate={{ height: `${Math.min((autoStep + 1) / 4 * 100, 100)}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />

                <div className="space-y-6">
                  {autoSteps.map((step, i) => {
                    const isDone = i < autoStep;
                    const isCurrent = i === autoStep;

                    return (
                      <div key={i} className="flex items-start gap-4 relative">
                        {/* Node */}
                        <motion.div
                          animate={isDone ? { scale: [0.8, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center z-10 transition-all duration-400 ${isDone
                              ? 'bg-[#65A859] border-[#65A859] shadow-md shadow-[#65A859]/30'
                              : isCurrent
                                ? 'bg-white dark:bg-gray-800 border-[#4C99A0] shadow-md shadow-[#4C99A0]/20'
                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                            }`}
                        >
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          {isCurrent && (
                            <motion.div
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                              className="w-2 h-2 rounded-full bg-[#4C99A0]"
                            />
                          )}
                        </motion.div>

                        {/* Content */}
                        <div className={`flex-1 pb-1 transition-all duration-500 ${isDone || isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold transition-colors duration-400 ${isDone ? 'text-gray-900 dark:text-white' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-400 dark:text-gray-600'
                              }`}>
                              {step.name}
                            </p>
                            <span className={`text-xs font-mono font-bold ml-2 transition-colors duration-400 ${isDone ? 'text-[#65A859]' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-300 dark:text-gray-700'
                              }`}>
                              {step.duration}
                            </span>
                          </div>
                          {/* Always rendered to prevent height shift */}
                          <div className="h-1 mt-2 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <motion.div
                              animate={{ width: isCurrent ? '100%' : isDone ? '100%' : '0%' }}
                              transition={{ duration: isCurrent ? 0.7 : 0.3, ease: 'easeOut' }}
                              className={`h-full rounded-full transition-colors duration-300 ${isCurrent ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859]' : isDone ? 'bg-[#65A859]/30' : 'bg-transparent'}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom: Highlights */}
              <div className="mt-8 pt-6 border-t border-[#4C99A0]/15 dark:border-gray-700/40 grid grid-cols-3 gap-3 relative z-10">
                {[
                  { icon: Shield, value: '~100%', label: 'Accuracy', color: 'text-[#65A859]' },
                  { icon: XCircle, value: '0', label: 'Errors', color: 'text-[#65A859]' },
                  { icon: Activity, value: '24/7', label: 'Uptime', color: 'text-[#65A859]' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 text-center bg-[#65A859]/5 dark:bg-[#65A859]/10 py-2.5 rounded-xl">
                    <item.icon className={`w-3.5 h-3.5 ${item.color} mb-0.5`} />
                    <span className={`text-lg font-mono font-black ${item.color}`}>{item.value}</span>
                    <span className="text-[11px] font-medium text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Comparison Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Manual Drawbacks */}
            <div className="bg-red-50/60 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-red-500" />
                <h4 className="text-sm font-bold text-red-600 dark:text-red-400">Manual Process</h4>
              </div>
              <ul className="space-y-2">
                {[
                  'Takes 10+ minutes per transaction',
                  'Prone to human errors & typos',
                  'Cannot scale with volume',
                  'Limited to business hours',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Automation Benefits */}
            <div className="bg-[#65A859]/5 dark:bg-green-900/10 border border-[#65A859]/20 dark:border-green-800/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[#65A859]" />
                <h4 className="text-sm font-bold text-[#65A859]">A365 Automation</h4>
              </div>
              <ul className="space-y-2">
                {[
                  'Completes in under 3 minutes',
                  '~100% accuracy, zero human errors',
                  'Handles thousands of transactions',
                  'Runs 24/7 without breaks',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65A859] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Bottom Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-4 bg-gradient-to-r from-[#4C99A0]/10 via-white dark:via-gray-900 to-[#65A859]/10 rounded-2xl p-5 md:p-6 border border-gray-200/50 dark:border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4"
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
