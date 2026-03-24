"use client"
import { motion } from "motion/react"
import React from "react"
import { Facebook, Linkedin, Github, Mail, MapPin, Twitter } from "lucide-react"
// Animation variants for reusability
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
}

const backgroundVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Footer data for better maintainability
const footerData = {
  social: [
    { href: "https://twitter.com/ambot365", label: "Twitter", icon: Twitter, color: "#1DA1F2" },
    { href: "https://github.com/ambot365", label: "GitHub", icon: Github, color: "#333" },
    { href: "https://www.linkedin.com/company/ambot-365/", label: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
  ],
  title: "Ambot365",
  subtitle: "Enterprise-grade AI Automation",
  copyright: `©${new Date().getFullYear()} Ambot365. All rights reserved.`,
}

const SocialLink: React.FC<{ href: string; label: string; icon: any; index: number; color: string }> = ({ href, label, icon: Icon, index, color }) => (
  <motion.a
    variants={socialVariants}
    custom={index}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{
      scale: 1.15,
      y: -4,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center transition-all duration-300 group hover:shadow-lg hover:border-primary-500/30"
    aria-label={label}
  >
    <Icon
      className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-primary-500 transition-colors"
      style={{ color: undefined }} // Let hover take over or use specific color
    />
  </motion.a>
)

export default function StickyFooter() {
  return (
    <div className="relative h-[70vh] md:h-[60vh] lg:h-[70vh]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="relative h-[calc(100vh+70vh)] -top-[100vh]">
        <div className="h-[70vh] md:h-[60vh] lg:h-[70vh] sticky top-[calc(100vh-70vh)] md:top-[calc(100vh-60vh)] lg:top-[calc(100vh-70vh)]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white dark:bg-gray-950 py-12 md:py-16 px-6 md:px-12 h-full w-full flex flex-col justify-end relative overflow-hidden border-t border-gray-100 dark:border-gray-900"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-900/20 to-transparent pointer-events-none" />

            <motion.div
              variants={backgroundVariants}
              className="absolute top-0 right-0 w-64 h-64 md:w-[600px] md:h-[600px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Footer Bottom Section */}
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-8 md:gap-12 mt-0"
              >
                <div className="flex-1 w-full relative z-20">
                  <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-gray-50 mb-6"
                  >
                    {footerData.title}
                  </motion.h1>

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500" />
                      <p className="text-primary-600 dark:text-primary-400 text-sm  uppercase tracking-[0.3em]">
                        {footerData.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-8 text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2 group cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Info@ambot365.com</span>
                      </div>
                      <div className="flex items-center gap-2 group cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">UAE | India</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right relative z-20 min-w-[200px]">
                  <p className="text-gray-400 dark:text-gray-500 text-xs md:text-sm mb-6 font-medium">
                    {footerData.copyright}
                  </p>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, staggerChildren: 0.1 }}
                    className="flex justify-start md:justify-end gap-3"
                  >
                    {footerData.social.map((social, index) => (
                      <SocialLink
                        key={social.label}
                        href={social.href}
                        label={social.label}
                        icon={social.icon}
                        index={index}
                        color={social.color}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
