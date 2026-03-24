import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Check } from 'lucide-react';
import botLogo from '../../assets/Ambot logo png.png';

const PHASES = [
  {
    step: '01',
    weeks: '0–2 WEEKS',
    title: 'Discovery Sprint',
    desc: 'We understand your business processes and identify automation opportunities.',
    included: ['Process mapping', 'Requirement analysis', 'Technical feasibility', 'Solution scope document'],
    outcome: 'Clear roadmap and project scope.',
    colorClass: 'text-[#4C99A0]',
    bgClass: 'bg-gradient-to-r from-[#4C99A0] to-[#65A859]',
    lightBgClass: 'bg-[#4C99A0]/10',
    accentColor: '#4C99A0' // teal-500
  },
  {
    step: '02',
    weeks: '2–4 WEEKS',
    title: 'Solution Design',
    desc: 'We design the AI agent architecture, integrations, and workflow.',
    included: ['Agent workflow design', 'System integration planning', 'UI/UX prototype', 'Architecture design'],
    outcome: 'Approved design ready for development.',
    colorClass: 'text-[#4C99A0]',
    bgClass: 'bg-gradient-to-r from-[#4C99A0] to-[#65A859]',
    lightBgClass: 'bg-[#4C99A0]/10',
    accentColor: '#4C99A0' // blue-500
  },
  {
    step: '03',
    weeks: '4–8 WEEKS',
    title: 'Agent Build & Deployment',
    desc: 'We build, integrate, and deploy AI agents within your systems.',
    included: ['AI agent development', 'Microsoft 365 & API integrations', 'Testing with real data', 'UAT & production deployment'],
    outcome: 'Production-ready AI automation.',
    colorClass: 'text-[#4C99A0]',
    bgClass: 'bg-gradient-to-r from-[#4C99A0] to-[#65A859]',
    lightBgClass: 'bg-[#4C99A0]/10',
    accentColor: '#4C99A0' // purple-500
  },
];

export default function HowEngagementsWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const botLeftPercent = useTransform(scrollYProgress, [0, 0.5, 1], [16.6, 50, 83.3]);
  const botLeft = useTransform(botLeftPercent, (v) => `${v}%`);
  const progressWidth = useTransform(botLeftPercent, (v) => `${v - 16.6}%`);

  useMotionValueEvent(botLeftPercent, 'change', (v) => {
    if (v <= 33.3) setActiveCardIndex(0);
    else if (v <= 66.6) setActiveCardIndex(1);
    else setActiveCardIndex(2);
  });

  return (
    <section
      id="how-it-works"
      className="relative md:h-[250vh] bg-[linear-gradient(135deg,#e8f5ee_0%,#f0faf4_30%,#f7fdfa_60%,#ffffff_100%)] dark:bg-none dark:bg-gray-950"
      ref={sectionRef}
    >
      {/* Professional Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(101,168,89,0.08)' }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(76,153,160,0.08)' }}
          animate={{
            y: [0, 10, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="md:sticky md:top-[80px] flex flex-col justify-start pt-8 pb-4 max-w-7xl mx-auto px-6 lg:px-8 overflow-visible">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl mb-4 section-title">Our Engagement Model</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Transparent process. Predictable investment. Every engagement follows the same proven path.
          </p>
        </div>

        {/* Timeline header for desktop only, to show flow */}
        <div className="hidden md:block relative w-full mb-12">
          <div className="relative h-1">
            {/* Base Horizontal line with gradient */}
            <div
              className="absolute left-[16.6%] right-[16.6%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] opacity-20"
              aria-hidden
            />
            {/* Active Progress Gradient line */}
            <motion.div
              className="absolute left-[16.6%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] z-[5]"
              style={{ width: progressWidth }}
            />

            {/* Nodes */}
            {[16.6, 50, 83.3].map((pct, i) => (
              <div
                key={i}
                className={`absolute top-1/2 w-4 h-4 rounded-full border-2 shadow-sm z-10 transition-all duration-300 ${activeCardIndex >= i
                  ? `${PHASES[i].bgClass} border-white scale-110`
                  : 'bg-gray-200 border-white'
                  }`}
                style={{ left: `${pct}%`, transform: 'translate(-50%, -50%)' }}
                aria-hidden
              />
            ))}
            {/* Animated Bot Icon riding the line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 pointer-events-none"
              style={{ left: botLeft, x: '-50%' }}
            >
              <img
                src={botLogo}
                alt="Ambot365"
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(101,168,89,0.5)]"
              />
            </motion.div>
          </div>

          <div className="flex justify-between px-[16.6%] mt-6">
            {PHASES.map((phase, i) => (
              <span
                key={phase.step}
                className={`text-sm tracking-widest font-bold transition-colors duration-300 ${activeCardIndex >= i ? phase.colorClass : 'text-gray-300'
                  } ${i === 0 ? '-ml-8' : i === 2 ? '-mr-8' : ''
                  }`}
              >
                {phase.weeks}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col h-full transition-all duration-500 ${activeCardIndex === i ? 'ring-2 ring-offset-4 ring-opacity-50 ring-gray-200' : ''
                }`}
            >
              {/* Colored top bar accent */}
              <div className={`h-1.5 w-full ${phase.bgClass}`} />

              <div className="p-8 flex flex-col h-full">
                {/* Inline step + title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`min-w-12 h-12 px-3 rounded-2xl flex items-center justify-center font-bold text-white ${phase.bgClass} shadow-lg shadow-${phase.colorClass.split('-')[1]}-200 dark:shadow-none`}>
                    {phase.step}
                  </div>
                  <span className="text-xl font-semibold text-[#002060] dark:text-gray-400">-</span>
                  <h3 className="text-2xl font-bold !text-[#002060] dark:!text-gray-50 leading-tight">
                    {phase.title}
                  </h3>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 flex-1 font-light">
                  {phase.desc}
                </p>

                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${phase.colorClass}`}>
                    WHAT'S INCLUDED
                  </p>
                  <ul className="space-y-4 mb-8">
                    {phase.included.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${phase.bgClass} shadow-sm`}>
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-auto p-5 rounded-2xl ${phase.lightBgClass} dark:bg-gray-800/50`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${phase.colorClass}`}>
                    OUTCOME
                  </p>
                  <p className="text-gray-900 dark:text-gray-100 font-semibold leading-snug">
                    {phase.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Custom Pricing
          </motion.a>
        </div>
      </div>
    </section>
  );
}
