import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { TrendingUp, Clock, Users } from 'lucide-react';

export default function Benefits() {
  return (
    <SectionWrapper className="bg-gray-50">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16">

        <div className="w-full lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 40 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-2xl p-6 border border-gray-200 shadow-xl"
            style={{ perspective: 1000 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-gray-900">Weekly Hours Saved</h4>
              <span className="text-teal-600 font-mono font-bold">+124 hrs</span>
            </div>
            <div className="h-48 flex items-end gap-2">
              {[40, 60, 45, 80, 100, 120, 110].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(h / 120) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-indigo-600 to-teal-400 rounded-t-md"
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">The ROI of Automation</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Stop wasting human potential on robotic tasks. A365 pays for itself in the first month by reclaiming thousands of hours of manual work.
          </p>

          <div className="space-y-6">
            {[
              { icon: Clock, title: 'Save Time', desc: 'Automate repetitive tasks and focus on strategic work.' },
              { icon: TrendingUp, title: 'Reduce Errors', desc: 'Eliminate manual data entry mistakes completely.' },
              { icon: Users, title: 'Scale Faster', desc: 'Handle 10x the volume without hiring more staff.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-gray-900">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
