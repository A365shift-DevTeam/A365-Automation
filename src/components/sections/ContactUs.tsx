import { motion } from 'motion/react';
import { Facebook, Linkedin, Youtube, Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';
import qrCode from '../../assets/QR-code.png';
import SectionWrapper from '../ui/SectionWrapper';

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61555896342817&mibextid=LQQJ4d', color: '#1877F2' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/ambot-365/', color: '#0A66C2' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@ambot365?si=0lREyG9S_k68ZzYp', color: '#FF0000' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/ambot365?igsh=MW9mNjYwaWFibGNlcg%3D%3D&utm_source=qr', color: '#E4405F' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/message/RTMK3T6Y7ZJXP1', color: '#25D366' },
];

export default function ContactUs() {
  return (
    <SectionWrapper id="contact" className="bg-white dark:bg-gray-950 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Contact Details (Mobile: 1st) */}
        <div className="text-center lg:text-left order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tighter text-[#0B1E3F] dark:text-white">
              Contact Us
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-400">
               <MapPin className="w-6 h-6 text-[#65A859]" />
               <span className="italic">United Arab Emirates | India</span>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent mr-auto hidden lg:block" />

            <div className="flex flex-col items-center lg:items-start gap-3">
              <span className="text-sm font-black uppercase tracking-[0.4em] text-[#4C99A0]">E-mail Id</span>
              <a
                href="mailto:Info@ambot365.com"
                className="group flex items-center justify-center lg:justify-start gap-4 text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 hover:text-[#4C99A0] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center border border-gray-100 dark:border-gray-800 group-hover:border-[#4C99A0]/30 group-hover:bg-[#4C99A0]/5 transition-all">
                  <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <span>Info@ambot365.com</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Social Media & QR Code (Mobile: 2nd) */}
        <div className="flex flex-col md:flex-row items-center justify-center lg:justify-end gap-12 order-2">
          <div className="grid grid-cols-3 gap-6 order-2 md:order-1">
            {SOCIAL_LINKS.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center border border-gray-100 dark:border-gray-800 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] group-hover:border-primary-500/30">
                  <social.icon 
                    className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: social.color }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200 uppercase tracking-tighter transition-colors">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center gap-4 order-1 md:order-2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#4C99A0]/20 to-[#65A859]/20 rounded-[2.5rem] blur-2xl group-hover:opacity-100 opacity-70 transition-opacity" />
              <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={qrCode}
                  alt="Ambot365 QR Code"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-700">Scan to Connect</p>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
