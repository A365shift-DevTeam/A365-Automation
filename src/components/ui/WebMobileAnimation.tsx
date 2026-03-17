import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export default function WebMobileAnimation() {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMobile((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-[#4C99A0]/5 blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#65A859]/5 blur-xl" />
        <motion.div
          className="absolute top-1/4 right-1/4 text-[#4C99A0]/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Globe className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Toggle indicator */}
      <div className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
        <Monitor className={`w-3.5 h-3.5 transition-colors duration-300 ${!showMobile ? 'text-[#4C99A0]' : 'text-gray-400'}`} />
        <div className="w-8 h-4 rounded-full bg-gray-200 dark:bg-gray-700 relative cursor-pointer">
          <motion.div
            className="absolute top-0.5 w-3 h-3 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] shadow-sm"
            animate={{ left: showMobile ? '18px' : '2px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>
        <Smartphone className={`w-3.5 h-3.5 transition-colors duration-300 ${showMobile ? 'text-[#65A859]' : 'text-gray-400'}`} />
      </div>

      <AnimatePresence mode="wait">
        {!showMobile ? (
          /* ─── Desktop Browser Frame ─── */
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-[85%] md:w-[75%] max-w-[480px]"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-white dark:bg-gray-700 rounded-md px-3 py-1 text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5 border border-gray-200 dark:border-gray-600">
                    <Globe className="w-3 h-3 text-[#4C99A0]" />
                    <span>www.yourcompany.com</span>
                  </div>
                </div>
              </div>

              {/* Website content mock */}
              <div className="p-4 space-y-3 bg-white dark:bg-gray-900">
                {/* Nav bar */}
                <div className="flex items-center justify-between">
                  <div className="w-20 h-5 rounded bg-gradient-to-r from-[#4C99A0] to-[#65A859] opacity-80" />
                  <div className="flex gap-3">
                    <div className="w-10 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="w-10 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="w-10 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>

                {/* Hero section */}
                <div className="bg-gradient-to-r from-[#4C99A0]/10 to-[#65A859]/10 rounded-lg p-4 text-center space-y-2">
                  <div className="w-3/4 h-3.5 rounded bg-gray-800 dark:bg-gray-200 mx-auto opacity-70" />
                  <div className="w-1/2 h-2.5 rounded bg-gray-400 mx-auto opacity-50" />
                  <div className="w-24 h-6 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] mx-auto mt-2" />
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5 space-y-1.5 border border-gray-100 dark:border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className={`w-full h-8 rounded bg-gradient-to-br ${i === 0 ? 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30' : i === 1 ? 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30' : 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30'}`} />
                      <div className="w-3/4 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div className="w-1/2 h-2 rounded-full bg-gray-100 dark:bg-gray-700/60" />
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-1">
                  <div className="w-16 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="flex gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium"
            >
              Responsive Web Application
            </motion.p>
          </motion.div>
        ) : (
          /* ─── Mobile Phone Frame ─── */
          <motion.div
            key="mobile"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="w-[180px] md:w-[200px] bg-gray-900 dark:bg-gray-800 rounded-[28px] p-2 shadow-2xl border border-gray-700/50">
              {/* Phone notch */}
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 dark:bg-gray-800 rounded-b-xl z-10" />
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-[20px] overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-1.5 bg-gray-50 dark:bg-gray-850">
                  <span className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">9:41</span>
                  <div className="flex items-center gap-1">
                    <Signal className="w-2.5 h-2.5 text-gray-600 dark:text-gray-400" />
                    <Wifi className="w-2.5 h-2.5 text-gray-600 dark:text-gray-400" />
                    <Battery className="w-3 h-2.5 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>

                {/* App content */}
                <div className="p-3 space-y-2.5">
                  {/* App header */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-4 rounded bg-gradient-to-r from-[#4C99A0] to-[#65A859] opacity-80" />
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </div>

                  {/* App hero card */}
                  <motion.div
                    className="bg-gradient-to-br from-[#4C99A0]/15 to-[#65A859]/15 rounded-xl p-3 space-y-1.5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-2/3 h-2.5 rounded bg-gray-800 dark:bg-gray-200 opacity-70" />
                    <div className="w-1/2 h-2 rounded bg-gray-400 opacity-50" />
                    <div className="w-16 h-5 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] mt-1" />
                  </motion.div>

                  {/* App list items */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`w-7 h-7 rounded-lg flex-shrink-0 ${i === 0 ? 'bg-blue-100 dark:bg-blue-900/30' : i === 1 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`} />
                      <div className="flex-1 space-y-1">
                        <div className="w-3/4 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                        <div className="w-1/2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Bottom nav */}
                  <div className="flex justify-around pt-2 border-t border-gray-100 dark:border-gray-700">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <div className={`w-4 h-4 rounded ${i === 0 ? 'bg-[#4C99A0]' : 'bg-gray-300 dark:bg-gray-600'}`} />
                        <div className="w-5 h-1 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="w-[180px] md:w-[200px] flex justify-center -mt-1">
              <div className="w-20 h-1 rounded-full bg-gray-400/50 mt-0" />
            </div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium"
            >
              Native Mobile Application
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
