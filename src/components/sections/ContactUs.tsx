import { motion } from 'motion/react';
import { Download, Facebook, Linkedin, Youtube, Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: '#', color: '#1877F2' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: Youtube, label: 'YouTube', href: '#', color: '#FF0000' },
  { icon: Instagram, label: 'Instagram', href: '#', color: '#E4405F' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#', color: '#25D366' },
];

export default function ContactUs() {
  return (
    <section id="contact" className="relative w-full overflow-hidden">
      {/* Main Contact Area with Office Background */}
      <div
        className="relative w-full py-16 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #f8fafb 0%, #eef2f7 50%, #f5f7fa 100%)',
        }}
      >
        {/* Decorative desk elements using CSS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-16">

            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Contact Us
              </h2>

              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-4 h-4 text-primary-500 shrink-0" />
                <span className="text-sm md:text-base">United Arab Emirates | India</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-8">
                <Mail className="w-4 h-4 text-primary-500 shrink-0" />
                <span className="text-sm md:text-base">
                  E-mail Id: <a href="mailto:info@ambot365.com" className="text-primary-600 hover:underline">info@ambot365.com</a>
                </span>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-lg font-medium text-sm hover:bg-primary-50 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Connect to Us
              </a>
            </motion.div>

            {/* Right: QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="shrink-0"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center p-3">
                {/* QR Code placeholder — replace with actual QR image */}
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 text-xs font-semibold text-center leading-tight">
                    QR<br />Code
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Social Media Bar */}
      <div className="w-full bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-300 group"
              >
                <social.icon
                  className="w-5 h-5 transition-colors duration-300"
                  style={{ color: social.color }}
                />
                <span className="text-sm font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
