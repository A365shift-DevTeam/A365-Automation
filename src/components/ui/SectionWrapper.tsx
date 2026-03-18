import { motion } from 'motion/react';
import { CSSProperties, ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export default function SectionWrapper({ children, className = '', id, style }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-24 relative ${className}`} style={style}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
