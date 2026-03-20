import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import fbIcon from '../../assets/Socialmedia-icons/facebook.png';
import inIcon from '../../assets/Socialmedia-icons/linkedin.png';
import ytIcon from '../../assets/Socialmedia-icons/youtube.png';
import igIcon from '../../assets/Socialmedia-icons/instagram.png';
import waIcon from '../../assets/Socialmedia-icons/social.png';
import qrCode from '../../assets/QR-code.png';
import contactBg from '../../assets/Contact-Us- 1.jpg';
import SectionWrapper from '../ui/SectionWrapper';
import Separator from '../ui/Separator';

const SOCIAL_LINKS = [
  { imgSrc: fbIcon, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61555896342817&mibextid=LQQJ4d', color: '#1877F2' },
  { imgSrc: inIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/company/ambot-365/', color: '#0A66C2' },
  { imgSrc: ytIcon, label: 'YouTube', href: 'https://youtube.com/@ambot365?si=0lREyG9S_k68ZzYp', color: '#FF0000' },
  { imgSrc: igIcon, label: 'Instagram', href: 'https://www.instagram.com/ambot365?igsh=MW9mNjYwaWFibGNlcg%3D%3D&utm_source=qr', color: '#E4405F' },
  { imgSrc: waIcon, label: 'WhatsApp', href: 'https://wa.me/message/RTMK3T6Y7ZJXP1', color: '#25D366' },
];

export default function ContactUs() {
  return (
    <SectionWrapper
      id="contact"
      className="relative overflow-hidden p-0 [&>div]:max-w-none [&>div]:px-0"
      style={{
        backgroundImage: `url(${contactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/72 dark:bg-black/88" />
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-12 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="space-y-3 text-center md:text-left ml-6 md:ml-14 md:translate-x-24 lg:translate-x-40"
          >
            <h2 className="text-3xl md:text-4xl section-title">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">United Arab Emirates | India</p>
            <p className="text-gray-900 dark:text-gray-100 text-xl">
              E-mail Id: <a className="hover:text-[#4C99A0] transition-colors" href="mailto:Info@ambot365.com">Info@ambot365.com</a>
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-md border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              Connect to Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex justify-center md:justify-start md:translate-x-12"
          >
            <img src={qrCode} alt="Ambot365 QR Code" className="w-36 h-36 md:w-40 md:h-40 object-contain" />
          </motion.div>
        </div>

        <div className="border-t border-white/70 dark:border-gray-700/60">
          <div className="max-w-6xl mx-auto px-6 pt-5 pb-2 flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5"
                style={{ color: social.color }}
              >
                <img src={social.imgSrc} alt={social.label} className="w-6 h-6 object-contain" />
                <span className="text-base">{social.label}</span>
              </a>
            ))}
          </div>
          <Separator className="py-2" />
        </div>
      </div>
    </SectionWrapper>
  );
}
