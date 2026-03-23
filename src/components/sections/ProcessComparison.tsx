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
    { name: 'Login to multiple systems manually', duration: '2-3 min', seconds: 150 },
    { name: 'Search and open orders one-by-one', duration: '3-4 min', seconds: 210 },
    { name: 'Verify payment manually', duration: '2-3 min', seconds: 150 },
    { name: 'Update ERP and notify teams manually', duration: '2-3 min', seconds: 150 },
    { name: 'Send emails and maintain audit manually', duration: '1-2 min', seconds: 90 },
  ];

  const autoSteps = [
    { name: 'Auto-login across systems securely', duration: '5 sec', seconds: 5 },
    { name: 'Auto-scan and process all orders', duration: '10-15 sec', seconds: 12 },
    { name: 'Auto-validate payment instantly', duration: '5-10 sec', seconds: 7 },
    { name: 'Auto-update ERP and notify instantly', duration: '<5 sec', seconds: 4 },
    { name: 'Auto-email and auto-log every action', duration: '<3 sec', seconds: 2 },
  ];

  const MANUAL_CYCLE_MS = 10000; // 10s per manual cycle
  const AUTO_CYCLE_MS = 5000;   // 5s per auto cycle — resets immediately

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
      timers.push(setTimeout(() => setManualStep(2), 4500));
      timers.push(setTimeout(() => setManualStep(3), 6500));
      timers.push(setTimeout(() => setManualStep(4), 8500));
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
      timers.push(setTimeout(() => setAutoStep(1), 1000));
      timers.push(setTimeout(() => setAutoStep(2), 1800));
      timers.push(setTimeout(() => setAutoStep(3), 2600));
      timers.push(setTimeout(() => setAutoStep(4), 3400));
      timers.push(setTimeout(() => {
        setAutoStep(5);
        setAutoFinished(true);
      }, 4000));
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
            className="text-2xl md:text-4xl mb-4 section-title"
          >
            Manual Process vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4C99A0] to-[#65A859]">Ambot365 Automation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Watch both processes run side by side. Ambot365 agents complete in minutes what takes humans much longer.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsInView(true)}
          className="relative [transform-style:preserve-3d]"
        >
          {/* Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mb-6 bg-gradient-to-r from-[#4C99A0]/10 via-white dark:via-gray-900 to-[#65A859]/10 rounded-2xl p-5 md:p-6 border border-gray-200/50 dark:border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Save <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4C99A0] to-[#65A859] font-black text-lg">7+ minutes</span> per transaction with Ambot365 agents
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs  tracking-wide uppercase text-gray-500 dark:text-gray-400">
              <span>No code changes</span>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span>Deploy in weeks</span>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span>Full audit trail</span>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute left-8 right-8 -bottom-10 h-16 bg-black/20 blur-3xl opacity-20 dark:opacity-30" />

          {/* Two Column Layout */}
          <div className="relative rounded-3xl overflow-hidden border border-gray-200/70 dark:border-gray-800/80 bg-[#EAF6F1] dark:bg-gray-900/90 shadow-[0_28px_70px_-30px_rgba(31,41,55,0.45),0_6px_16px_rgba(31,41,55,0.08)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-transparent dark:from-white/[0.04] dark:via-transparent dark:to-transparent z-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-20">

              {/* ── LEFT: MANUAL ── */}
              <div className="bg-white dark:bg-gray-900 p-8 md:p-10 relative overflow-hidden lg:border-r border-gray-200/60 dark:border-gray-800/80">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 flex items-center justify-center">
                      <Timer className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg  text-gray-900 dark:text-white">Manual</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Traditional process</p>
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-xl px-4 py-2 text-center">
                    <p className="text-2xl font-mono font-black text-red-500 leading-none">10+</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mt-1">Minutes</p>
                  </div>
                </div>

                {/* Elapsed Timer */}
                <div className="mb-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 xl:gap-2 min-h-[2rem]">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono  transition-colors duration-300 ${manualFinished
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
                  <p className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 max-w-[280px] xl:max-w-[200px] xl:text-right">
                    Manual: slow (10+ min) | error-prone | limited hours | not scalable
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="relative ml-4">
                  {/* Vertical line */}
                  <div className="absolute left-[11.5px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-700" />
                  {/* Manual progress line */}
                  <motion.div
                    className="absolute left-[11.5px] top-3 w-px bg-gradient-to-b from-blue-400 to-orange-400 origin-top"
                    animate={{ height: `${Math.min((manualStep + 1) / 5 * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />

                  <div className="space-y-5">
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
                              <p className={`text-xs md:text-[13px] font-medium transition-colors duration-500 ${isDone ? 'text-gray-800 dark:text-gray-200' : isCurrent ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-600'
                                }`}>
                                {step.name}
                              </p>
                              <span className={`text-[10px] md:text-[11px] font-mono ml-2 transition-colors duration-500 ${isDone ? 'text-gray-500' : isCurrent ? 'text-orange-500' : 'text-gray-300 dark:text-gray-700'
                                }`}>
                                {step.duration}
                              </span>
                            </div>
                            {/* Always rendered to prevent height shift */}
                            <div className="h-[2px] mt-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
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
              <div className="bg-white dark:bg-gray-900 p-8 md:p-10 relative overflow-hidden">
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
                      <h3 className="text-lg  text-gray-900 dark:text-white">Ambot365 Agent</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Fully automated</p>
                    </div>
                  </div>
                  <div className="bg-[#65A859]/10 border border-[#65A859]/25 rounded-xl px-4 py-2 text-center">
                    <p className="text-2xl font-mono font-black text-[#65A859] leading-none">3</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#65A859]/70 mt-1">Minutes</p>
                  </div>
                </div>

                {/* Elapsed Timer */}
                <div className="mb-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 xl:gap-2 relative z-10 min-h-[2rem]">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono  transition-colors duration-300 ${autoFinished
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
                  <p className="text-[10px] md:text-[11px] text-gray-600 dark:text-gray-300 max-w-[280px] xl:max-w-[200px] xl:text-right">
                    Ambot365: fast (3 min) | highly accurate | scalable | runs 24/7
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="relative ml-4 z-10">
                  {/* Vertical line */}
                  <div className="absolute left-[11.5px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-700" />
                  {/* Animated progress line */}
                  <motion.div
                    className="absolute left-[11.5px] top-3 w-px bg-gradient-to-b from-[#4C99A0] to-[#65A859] origin-top"
                    animate={{ height: `${Math.min((autoStep + 1) / 5 * 100, 100)}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />

                  <div className="space-y-5">
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
                              <p className={`text-xs md:text-[13px] font-medium transition-colors duration-400 ${isDone ? 'text-gray-900 dark:text-white' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-400 dark:text-gray-600'
                                }`}>
                                {step.name}
                              </p>
                              <span className={`text-[10px] md:text-[11px] font-mono ml-2 transition-colors duration-400 ${isDone ? 'text-[#65A859]' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-300 dark:text-gray-700'
                                }`}>
                                {step.duration}
                              </span>
                            </div>
                            {/* Always rendered to prevent height shift */}
                            <div className="h-[2px] mt-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
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


              </div>

            </div>
          </div>




        </motion.div>
      </div>
    </section>
  );
}
