import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 opacity-90" />

        <div className="relative z-10 px-6 py-20 md:py-32 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Deploy your first agent.</h2>
          <p className="text-primary-100 text-lg md:text-xl mb-10">
            Clear scope after a Discovery Sprint. Production-ready in weeks. One monthly invoice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" id="cta">
            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-md hover:shadow-lg">
              Deploy Your First Agent
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-black/20 hover:bg-black/30 text-white border border-white/20 rounded-xl font-medium transition-all">
              Get Custom Pricing
            </a>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
