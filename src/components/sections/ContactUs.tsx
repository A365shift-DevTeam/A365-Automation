import { motion } from 'motion/react';
import { UserPlus, Facebook, Linkedin, Youtube, Instagram, MessageCircle } from 'lucide-react';
import contactBg from '../../assets/Contact-Us- 1.jpg';
import qrCode from '../../assets/QR-code.png';

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: '#', color: '#1877F2' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: Youtube, label: 'YouTube', href: '#', color: '#FF0000' },
  { icon: Instagram, label: 'Instagram', href: '#', color: '#E4405F' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#', color: '#25D366' },
];

export default function ContactUs() {
  return (
    <section id="contact" className="relative w-full">
      {/* Full background image — desk photo with white space at bottom */}
      <div
        className="relative w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${contactBg})`,
          aspectRatio: '5184 / 1500',
        }}
      >
        {/* Contact info positioned in the white area of the image */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-5xl mx-auto px-6 md:px-12 pb-10 md:pb-14">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Left: Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold italic text-gray-700 mb-4">
                  Contact Us
                </h2>

                <p className="italic text-gray-600 text-sm md:text-base mb-1.5">
                  United Arab Emirates | India
                </p>

                <p className="italic text-gray-600 text-sm md:text-base mb-6">
                  E-mail Id:{' '}
                  <a
                    href="mailto:Info@ambot365.com"
                    className="text-gray-700 hover:underline"
                  >
                    Info@ambot365.com
                  </a>
                </p>

                <a
                  href="#"
                  className="inline-flex items-center border border-[#308BAF] rounded overflow-hidden text-sm hover:bg-[#308BAF]/5 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-10 h-10 bg-[#308BAF]/10">
                    <UserPlus className="w-4 h-4 text-[#308BAF]" />
                  </span>
                  <span className="px-5 py-2.5 text-[#308BAF] font-medium">
                    Connect to Us
                  </span>
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
                <img
                  src={qrCode}
                  alt="Ambot365 QR Code"
                  className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-sm"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Bar */}
      <div className="w-full bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-5">
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
                className="flex items-center gap-2.5 text-gray-500 hover:text-gray-800 transition-colors duration-300"
              >
                <social.icon
                  className="w-5 h-5"
                  style={{ color: social.color }}
                />
                <span className="text-sm font-medium" style={{ color: social.color }}>
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
