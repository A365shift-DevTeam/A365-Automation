import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useRef, useState, Fragment } from 'react';
import {
  FileText,
  Presentation,
  Image,
  Layers,
  Split,
  Merge,
  type LucideIcon,
} from 'lucide-react';

const SEGMENTS = [
  {
    id: 0,
    title: 'DocCraft',
    description:
      'Automate Excel to PDF, PPT & Image conversions for certificates, reports, and documents. Reduce manual export work and keep branding consistent.',
    icon: FileText,
    color: 'from-[#4C99A0] to-[#3d8a91]',
    lightBg: 'bg-[#4C99A0]/10 dark:bg-[#4C99A0]/20',
  },
  {
    id: 1,
    title: 'Sheets to Slides',
    description:
      'Create presentations from Excel in one click—weekly reports, proposals, and dashboards. Data stays in sync with your spreadsheets.',
    icon: Presentation,
    color: 'from-[#65A859] to-[#55904b]',
    lightBg: 'bg-[#65A859]/10 dark:bg-[#65A859]/20',
  },
  {
    id: 2,
    title: 'Image Compressor',
    description:
      'Compress images up to 90% without noticeable quality loss. Optimize for web, email, and storage while keeping visuals sharp.',
    icon: Image,
    color: 'from-[#002060] to-[#001a50]',
    lightBg: 'bg-[#002060]/10 dark:bg-[#002060]/20',
  },
  {
    id: 3,
    title: 'Consolidation',
    description:
      'Combine multiple files into a single file by column. Merge data from different sources with consistent structure and no manual copy-paste.',
    icon: Layers,
    color: 'from-[#4C99A0] to-[#65A859]',
    lightBg: 'bg-[#4C99A0]/10 dark:bg-[#4C99A0]/20',
  },
  {
    id: 4,
    title: 'File Splitter',
    description:
      'Split large files into sheets and workbooks based on criteria. Break down exports by date, region, or category for easier handling.',
    icon: Split,
    color: 'from-[#65A859] to-[#4C99A0]',
    lightBg: 'bg-[#65A859]/10 dark:bg-[#65A859]/20',
  },
  {
    id: 5,
    title: 'Merge Master',
    description:
      'Combine multiple files into one by multiple ranges. Flexible merging for complex workflows and consolidated reporting.',
    icon: Merge,
    color: 'from-[#002060] to-[#4C99A0]',
    lightBg: 'bg-[#002060]/10 dark:bg-[#002060]/20',
  },
];

/* Half circle: 6 segments on right arc from -90° (top) to 90° (bottom) */
const ARC_START = -90;
const ARC_END = 90;
const RADIUS_PERCENT = 38;
const CENTER_X = 50; // center of circle
const CENTER_Y = 50;

function Segment({
  index,
  total,
  icon: Icon,
  color,
}: {
  index: number;
  total: number;
  icon: LucideIcon;
  color: string;
}) {
  const angleDeg = ARC_START + (index / (total - 1)) * (ARC_END - ARC_START);
  const rad = (angleDeg * Math.PI) / 180;
  // Standard Math -> CSS coord transform: x is cos, y is sin (positive goes down)
  const x = CENTER_X + RADIUS_PERCENT * Math.cos(rad);
  const y = CENTER_Y + RADIUS_PERCENT * Math.sin(rad);
  return (
    <div
      className={`absolute w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg border-2 border-white/30`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
  );
}

export default function ScrollWheelFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map 0 -> 1 scroll to -90 -> 270 (one full rotation starting at Top)
  const rotation = useTransform(scrollYProgress, [0, 1], [-90, -90 + 360]);

  // Arrow points to nearest segment
  useMotionValueEvent(rotation, 'change', (v) => {
    // Normalize to -180 to 180 or 0 to 360 for matching
    const normalized = ((v % 360) + 360) % 360;
    const segmentAngles = SEGMENTS.map((_, i) => {
      const ang = ARC_START + (i / (SEGMENTS.length - 1)) * (ARC_END - ARC_START);
      return ((ang % 360) + 360) % 360; // Normalize the target angle
    });
    let best = 0;
    let bestDiff = 360;
    segmentAngles.forEach((angle, i) => {
      let diff = Math.abs(normalized - angle);
      if (diff > 180) diff = 360 - diff;
      if (diff < bestDiff) {
        bestDiff = diff;
        best = i;
      }
    });
    setActiveIndex(best);
  });

  const active = SEGMENTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="products-wheel"
      className="relative py-24 min-h-[250vh] section-bg"
    >
      <div className="sticky top-24 z-10 min-h-[70vh] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Left: half circle (arc) on the left + segments on arc; center wheel rotates with scroll */}
        <div className="flex-shrink-0 w-full max-w-[320px] lg:max-w-[380px] aspect-square relative flex items-center justify-end">
          {/* Half circle arc – left side only (curve from top to bottom) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="absolute w-full h-full text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              aria-hidden
            >
              {/* Left half arc: from 12 o'clock (90°) to 6 o'clock (270°) */}
              <path
                d="M 50 5 A 45 45 0 0 1 50 95"
                strokeWidth="14"
              />
            </svg>
          </div>
          {/* Segment icons along the left half arc */}
          <div className="absolute inset-0">
            {SEGMENTS.map((seg, i) => (
              <Fragment key={seg.id}>
                <Segment
                  index={i}
                  total={SEGMENTS.length}
                  icon={seg.icon}
                  color={seg.color}
                />
              </Fragment>
            ))}
          </div>
          {/* Center wheel overlay with arrow pointer */}
          <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20">
            {/* Rotating Arrow Pointer - tracks with scroll */}
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center justify-center dark:bg-gray-50 border border-gray-100"
              style={{
                rotate: rotation,
                transformOrigin: '50% 50%',
              }}
            >
              {/* Arrow head pointing Right when unrotated (rotate=0) */}
              {/* The arrow is a simple polygon sticking out of the right side */}
              <div className="absolute right-[-14px] top-1/2 -translate-y-1/2">
                <svg width="18" height="40" viewBox="0 0 18 40" fill="none" className="text-white dark:text-gray-50 drop-shadow-sm">
                  <path
                    d="M0 0 L18 20 L0 40 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Inner Logo/Text inside the rotating bubble. (Counter-rotate so text stays upright) */}
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center pointer-events-auto"
                style={{ rotate: useTransform(rotation, r => -r) }}
              >
                {/* Styled logo like the reference image (A365 split/stacked) */}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-rose-500 font-extrabold text-3xl md:text-4xl tracking-tighter" style={{ fontFamily: 'monospace', letterSpacing: '-0.1em', transform: 'scale(1, 1.3)' }}>
                  A365
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right: expanding info panel */}
        <div className="flex-1 w-full max-w-xl min-h-[280px] flex flex-col justify-center">
          <p className="text-sm font-semibold tracking-wider text-[#4C99A0] uppercase mb-2">
            Products & features
          </p>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl p-6 md:p-8 border-2 border-gray-200 dark:border-gray-700 ${active.lightBg}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center`}
              >
                <active.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Step {String(active.id + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              {active.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {active.description}
            </p>
          </motion.div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Scroll to rotate and explore more features
          </p>
        </div>
      </div>
    </section>
  );
}
