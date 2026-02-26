import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import ambotLogo from '../../assets/Ambot logo png.png';

const PHASE_COLORS = [
  {
    badge: 'bg-blue-500',
    title: 'text-blue-700',
    dot: 'bg-blue-500',
    outcomeBg: 'bg-blue-50',
    outcomeText: 'text-blue-700',
    outcomeBorder: 'border-blue-200',
    iconColor: 'text-blue-500',
  },
  {
    badge: 'bg-teal-500',
    title: 'text-teal-700',
    dot: 'bg-teal-500',
    outcomeBg: 'bg-teal-50',
    outcomeText: 'text-teal-700',
    outcomeBorder: 'border-teal-200',
    iconColor: 'text-teal-500',
  },
  {
    badge: 'bg-amber-500',
    title: 'text-amber-700',
    dot: 'bg-amber-500',
    outcomeBg: 'bg-amber-50',
    outcomeText: 'text-amber-700',
    outcomeBorder: 'border-amber-200',
    iconColor: 'text-amber-500',
  },
  {
    badge: 'bg-purple-500',
    title: 'text-purple-700',
    dot: 'bg-purple-500',
    outcomeBg: 'bg-purple-50',
    outcomeText: 'text-purple-700',
    outcomeBorder: 'border-purple-200',
    iconColor: 'text-purple-500',
  },
  {
    badge: 'bg-green-500',
    title: 'text-green-700',
    dot: 'bg-green-500',
    outcomeBg: 'bg-green-50',
    outcomeText: 'text-green-700',
    outcomeBorder: 'border-green-200',
    iconColor: 'text-green-500',
  },
];

const PHASES = [
  {
    threshold: 0.1,
    week: "WEEK 0",
    title: "Ready to start",
    desc1: "Let's embark on the automation journey.",
    desc2: "We will analyze your current processes.",
    outcome: "A clear roadmap for automation.",
    colorIndex: 0,
  },
  {
    threshold: 0.35,
    week: "WEEK 1",
    title: "Discovery",
    desc1: "We dive deep into your existing workflows and identify bottlenecks.",
    desc2: "Our team maps out the exact processes that need automation.",
    outcome: "Comprehensive process documentation.",
    colorIndex: 1,
  },
  {
    threshold: 0.6,
    week: "WEEK 2",
    title: "BRD",
    desc1: "Business Requirements Document creation.",
    desc2: "We finalize the scope, tools, and expected ROI.",
    outcome: "Approved blueprint for the bot.",
    colorIndex: 2,
  },
  {
    threshold: 0.85,
    week: "WEEK 3-5",
    title: "Build & Train",
    desc1: "We develop the platform, configure AI models, integrate systems, and run iterative testing.",
    desc2: "Automation workflows, backend logic, and UI components are implemented.",
    outcome: "Production-ready AI system.",
    colorIndex: 3,
  },
  {
    threshold: 1.1,
    week: "WEEK 6-8",
    title: "Go Live",
    desc1: "Deployment to production environment.",
    desc2: "We monitor the bot's performance and make necessary adjustments.",
    outcome: "Fully automated workflow.",
    colorIndex: 4,
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [percentage, setPercentage] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(PHASES[0]);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
      const phase = PHASES.find(p => latest < p.threshold) || PHASES[PHASES.length - 1];
      setCurrentPhase(phase);
    });
  }, [scrollYProgress]);

  const colors = PHASE_COLORS[currentPhase.colorIndex];

  // The exact path the bot and the progress line will follow
  const pathString = "M 190 280 C 230 280, 270 400, 350 400 C 450 400, 450 250, 550 250 C 650 250, 650 150, 750 150 C 850 150, 850 80, 950 80";

  return (
    <section ref={containerRef} id="how-it-works" className="bg-white h-[300vh] relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden py-6">

        <div className="text-center mb-4 shrink-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">How A365 Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Scroll down to see how our AI bot transforms your manual process into a fully automated workflow.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 min-h-0">

          {/* Left Side: Text & Gauge */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-center">
            {/* Text Description - fixed height to prevent layout shift */}
            <div className="h-[280px] overflow-hidden">
              {/* Week Badge */}
              <span className={`inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-wider uppercase mb-3 ${colors.badge}`}>
                {currentPhase.week}
              </span>

              {/* Title */}
              <h3 className={`text-3xl font-bold mb-4 ${colors.title}`}>{currentPhase.title}</h3>

              {/* Descriptions with colored bullet dots */}
              <div className="flex items-start gap-2 mb-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${colors.dot}`}></span>
                <p className="text-gray-600 text-sm leading-relaxed">{currentPhase.desc1}</p>
              </div>
              <div className="flex items-start gap-2 mb-4">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${colors.dot}`}></span>
                <p className="text-gray-600 text-sm leading-relaxed">{currentPhase.desc2}</p>
              </div>

              {/* Outcome Box */}
              <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${colors.outcomeBg} ${colors.outcomeBorder}`}>
                <svg className={`w-5 h-5 shrink-0 ${colors.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-sm font-semibold ${colors.outcomeText}`}>{currentPhase.outcome}</p>
              </div>
            </div>

            {/* Gauge Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 pb-8">
              <div className="flex gap-4 mb-6 font-bold text-sm">
                <span className="text-blue-500">AI Process</span>
                <span className="text-primary-500">Your Process</span>
              </div>
              <div className="relative">
                <svg viewBox="0 0 300 200" className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00B050" />
                      <stop offset="100%" stopColor="#308BAF" />
                    </linearGradient>
                  </defs>

                  {/* Background Arc */}
                  <path d="M 30 140 A 120 120 0 0 1 270 140" fill="none" stroke="#e5e7eb" strokeWidth="24" strokeLinecap="round" />

                  {/* Foreground Arc */}
                  <motion.path
                    d="M 30 140 A 120 120 0 0 1 270 140"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeDasharray={377}
                    style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [377, 0]) }}
                  />

                  {/* Needle */}
                  <motion.g
                    style={{
                      rotate: useTransform(scrollYProgress, [0, 1], [-90, 90]),
                      originX: 0.5,
                      originY: 0.5
                    }}
                  >
                    {/* Transparent bounding box to force the rotation center to exactly 150,140 */}
                    <circle cx="150" cy="140" r="90" fill="transparent" />
                    <line x1="150" y1="140" x2="150" y2="50" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="150" cy="140" r="12" fill="#2563eb" />
                  </motion.g>

                  {/* Labels */}
                  <text x="30" y="185" textAnchor="middle" className="text-lg font-medium fill-gray-400">0%</text>
                  <text x="270" y="185" textAnchor="middle" className="text-lg font-medium fill-gray-400">100%</text>
                </svg>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl font-bold text-blue-600">
                  {percentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Timeline SVG */}
          <div className="lg:col-span-8 flex items-center justify-center h-full">
            <svg viewBox="50 0 950 500" className="w-full h-auto drop-shadow-sm overflow-visible max-h-[80vh]">
              <defs>
                <linearGradient id="btn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#308BAF" />
                  <stop offset="100%" stopColor="#00B050" />
                </linearGradient>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#308BAF" />
                  <stop offset="100%" stopColor="#00B050" />
                </linearGradient>
              </defs>

              {/* Base Path */}
              <path d={pathString} fill="none" stroke="#f3f4f6" strokeWidth="6" strokeLinecap="round" />

              {/* Animated Progress Path */}
              <motion.path
                d={pathString}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />

              {/* Nodes */}
              <g transform="translate(80, 260)">
                <rect width="110" height="40" rx="20" fill="url(#btn-gradient)" className="drop-shadow-md" />
                <text x="55" y="25" textAnchor="middle" className="text-sm font-medium fill-white" style={{ fontFamily: 'Inter, sans-serif' }}>Get started</text>
              </g>

              <g>
                <circle cx="350" cy="400" r="8" fill="white" stroke="#e5e7eb" strokeWidth="4" />
                <text x="350" y="435" textAnchor="middle" className="text-sm font-bold fill-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Week 1</text>
                <text x="350" y="455" textAnchor="middle" className="text-sm fill-accent-600" style={{ fontFamily: 'Inter, sans-serif' }}>Discovery</text>
              </g>

              <g>
                <circle cx="550" cy="250" r="8" fill="white" stroke="#e5e7eb" strokeWidth="4" />
                <text x="550" y="210" textAnchor="middle" className="text-sm font-bold fill-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Week 2</text>
                <text x="550" y="230" textAnchor="middle" className="text-sm fill-accent-600" style={{ fontFamily: 'Inter, sans-serif' }}>BRD</text>
              </g>

              <g>
                <circle cx="750" cy="150" r="8" fill="white" stroke="#e5e7eb" strokeWidth="4" />
                <text x="750" y="185" textAnchor="middle" className="text-sm font-bold fill-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Week 3 to 5</text>
                <text x="750" y="205" textAnchor="middle" className="text-sm fill-accent-600" style={{ fontFamily: 'Inter, sans-serif' }}>Build</text>
              </g>

              <g>
                <circle cx="950" cy="80" r="8" fill="white" stroke="#e5e7eb" strokeWidth="4" />
                <text x="950" y="40" textAnchor="middle" className="text-sm font-bold fill-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Week 6 to 8</text>
                <text x="950" y="60" textAnchor="middle" className="text-sm fill-accent-600" style={{ fontFamily: 'Inter, sans-serif' }}>Go Live</text>
              </g>

              {/* Bot Icon */}
              <motion.g
                style={{
                  offsetPath: `path('${pathString}')`,
                  offsetDistance: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                  offsetRotate: "0deg"
                }}
              >
                <image href={ambotLogo} x="-24" y="-24" width="48" height="48" />
              </motion.g>

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
