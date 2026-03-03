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

const RADIUS_PERCENT = 38;

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
  const angleDeg = (index / total) * 360;
  const rad = (angleDeg * Math.PI) / 180;
  const x = 50 + RADIUS_PERCENT * Math.sin(rad);
  const y = 50 - RADIUS_PERCENT * Math.cos(rad);
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

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360 * 2]);

  useMotionValueEvent(rotation, 'change', (v) => {
    const normalized = ((v % 360) + 360) % 360;
    const segmentAngle = 360 / SEGMENTS.length;
    const idx = Math.min(
      Math.floor(normalized / segmentAngle),
      SEGMENTS.length - 1
    );
    setActiveIndex(idx);
  });

  const active = SEGMENTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="products-wheel"
      className="relative py-24 min-h-[250vh] section-bg"
    >
      <div className="sticky top-24 z-10 min-h-[70vh] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Left: static ring + segments; only center rotates with arrow */}
        <div className="flex-shrink-0 w-full max-w-[320px] lg:max-w-[380px] aspect-square relative">
          {/* Static outer ring and segment icons */}
          <div className="relative w-full aspect-square rounded-full border-[14px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 shadow-xl">
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
            {/* Only the center icon + arrow rotate with scroll; fixed size so rotation is around circle center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="relative w-24 h-24 overflow-visible"
                style={{
                  rotate: rotation,
                  transformOrigin: '50% 50%',
                }}
              >
                {/* Circle fills the rotating box so it stays visually centered */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#002060] to-[#4C99A0] flex items-center justify-center shadow-inner border-4 border-white dark:border-gray-700">
                  <span className="text-white font-bold text-lg">A365</span>
                </div>
                {/* Arrow positioned above circle, rotates with center */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-white dark:border-b-gray-200"
                  style={{
                    bottom: '100%',
                    marginBottom: '2px',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
                  }}
                  aria-hidden
                />
              </motion.div>
            </div>
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
