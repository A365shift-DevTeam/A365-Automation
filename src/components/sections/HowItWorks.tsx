import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Blocks, Zap, BarChart3 } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';

const STEPS = [
  {
    id: '01',
    title: 'Connect your apps',
    description: 'Securely link your favorite tools with our one-click integrations. We support over 500+ SaaS applications out of the box.',
    icon: Blocks,
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
  {
    id: '02',
    title: 'Build workflows',
    description: 'Use our intuitive drag-and-drop builder to create complex automation logic without writing a single line of code.',
    icon: Zap,
    color: 'text-accent-400',
    bg: 'bg-accent-500/10',
  },
  {
    id: '03',
    title: 'Automate & monitor',
    description: 'Set it live and watch the magic happen. Track performance, errors, and savings in real-time on your dashboard.',
    icon: BarChart3,
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <SectionWrapper id="how-it-works" className="bg-gray-50">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">How A365 Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Three simple steps to transform your business operations from manual chaos to automated harmony.
        </p>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

        <motion.div
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary-500 -translate-x-1/2 origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        <div className="space-y-24">
          {STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}>

                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-gray-50 border-2 border-primary-500 -translate-x-1/2 flex items-center justify-center z-10 shadow-sm">
                  <span className="text-sm font-bold text-primary-500">{step.id}</span>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className={`inline-flex p-3 rounded-xl ${step.bg} ${step.color} mb-6`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>

                {/* Empty space for the other side */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
