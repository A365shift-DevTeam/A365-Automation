import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import ambotLogo from '../../assets/Ambot logo png.png';

const PHASES = [
  {
    step: '01',
    weeks: '0–2 weeks',
    title: 'Discovery Sprint',
    desc: 'We understand your business processes and identify automation opportunities.',
    included: ['Process mapping', 'Requirement analysis', 'Technical feasibility', 'Solution scope document'],
    outcome: 'Clear roadmap and project scope.',
  },
  {
    step: '02',
    weeks: '2–4 weeks',
    title: 'Solution Design',
    desc: 'We design the AI agent architecture, integrations, and workflow.',
    included: ['Agent workflow design', 'System integration planning', 'UI/UX prototype', 'Architecture design'],
    outcome: 'Approved design ready for development.',
  },
  {
    step: '03',
    weeks: '4–8 weeks',
    title: 'Agent Build & Deployment',
    desc: 'We build, integrate, and deploy AI agents within your systems.',
    included: ['AI agent development', 'Microsoft 365 & API integrations', 'Testing with real data', 'UAT & production deployment'],
    outcome: 'Production-ready AI automation.',
  },
];

export default function HowEngagementsWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Logo moves along the line from 0% to 100% as user scrolls through the section
  const logoPositionPercent = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 50, 100, 100]);
  const logoLeft = useTransform(logoPositionPercent, (v) => `${v}%`);

  // Which card to glow: logo at 0-33% → card 0, 33-66% → card 1, 66-100% -> card 2
  useMotionValueEvent(logoPositionPercent, 'change', (v) => {
    if (v <= 33) setActiveCardIndex(0);
    else if (v <= 66) setActiveCardIndex(1);
    else setActiveCardIndex(2);
  });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-12 md:py-16 min-h-[200vh] section-bg"
    >
      {/* Sticky viewport-sized block so at 100% zoom everything fits in one screen */}
      <div className="sticky top-20 z-10 flex flex-col max-w-7xl mx-auto px-4 md:px-8 max-h-[calc(100vh-6rem)] min-h-0">
        <div className="text-center mb-3 md:mb-4 shrink-0">
          <h2 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 text-gray-900 dark:text-gray-50">How Engagements Work</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">Transparent process. Predictable investment. Every engagement follows the same proven path.</p>
        </div>

        {/* Line + logo + nodes – bot centered ON the line (line runs through bot) */}
        <div className="relative w-full mb-3 md:mb-4 shrink-0">
          <div className="relative h-14 md:h-16">
            {/* Horizontal line – vertical center of track */}
            <div
              className="absolute left-0 right-0 top-1/2 h-0.5 md:h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4C99A0]/20 via-[#65A859]/40 to-[#4C99A0]/20 dark:from-[#4C99A0]/30 dark:via-[#65A859]/50 dark:to-[#4C99A0]/30"
              aria-hidden
            />
            {/* Nodes on the line */}
            {[0, 50, 100].map((pct) => (
              <div
                key={pct}
                className="absolute top-1/2 w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-700 border-2 border-white dark:border-gray-900 shadow z-[1]"
                style={{ left: `${pct}%`, transform: 'translate(-50%, -50%)' }}
                aria-hidden
              />
            ))}
            {/* Bot logo: vertically centered on the line so it sits IN the line */}
            <motion.div
              className="absolute top-1/2 left-0 w-10 h-10 md:w-14 md:h-14 -translate-y-1/2 z-10 pointer-events-none"
              style={{ left: logoLeft, x: '-50%' }}
              aria-hidden
            >
              <img
                src={ambotLogo}
                alt=""
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(101,168,89,0.5)]"
              />
            </motion.div>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-1">
            {PHASES.map((phase, i) => (
              <span
                key={phase.step}
                className={`text-xs md:text-sm font-bold text-[#65A859] dark:text-[#4C99A0] ${i === 0 ? 'text-left' : i === 2 ? 'text-right' : 'text-center'}`}
              >
                {phase.weeks}
              </span>
            ))}
          </div>
        </div>

        {/* Cards – no scroll; content flows with section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 flex-1 min-h-0">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.step}
              className={`section-card p-4 rounded-xl flex flex-col min-w-0 transition-all duration-300 shrink-0 ${activeCardIndex === i
                ? 'ring-2 ring-[#65A859] dark:ring-[#4C99A0] ring-offset-2 dark:ring-offset-gray-900'
                : ''
                }`}
              style={
                activeCardIndex === i
                  ? {
                    boxShadow: '0 0 28px rgba(101, 168, 89, 0.35), 0 0 56px rgba(76, 153, 160, 0.25)',
                  }
                  : undefined
              }
            >
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{phase.step}</span>
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{phase.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1 flex-1">{phase.desc}</p>
              <p className="text-xs font-semibold text-[#65A859] dark:text-[#4C99A0] mt-2 uppercase tracking-wider">What's included</p>
              <ul className="space-y-0.5 mt-1">
                {phase.included.map((item, j) => (
                  <li key={j} className="flex items-center gap-1.5 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    <span className="w-1 h-1 rounded-full bg-[#65A859] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-[10px] md:text-xs font-bold text-[#65A859] dark:text-[#4C99A0] uppercase tracking-wider">Outcome</p>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5">{phase.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="shrink-0 mt-3 md:mt-4">
          {/* <p className="text-center text-gray-500 dark:text-gray-400 text-xs md:text-sm">Scroll to move along the journey · Pricing depends on complexity, integrations, and SLA requirements.</p> */}
          <div className="text-center mt-3">
            <a href="#cta" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-xl font-medium hover:shadow-lg transition-all">
              Get Custom Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
