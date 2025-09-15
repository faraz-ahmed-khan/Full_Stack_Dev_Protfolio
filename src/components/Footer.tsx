'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  ArrowUp,
  Code,
  Palette,
  Coffee
} from 'lucide-react'

const socialLinks = [
  { icon: Github, href: "https://github.com/farazahmedkhan", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/farazahmedkhan", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/farazahmedkhan", label: "Twitter" },
]

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  { label: 'Web Development', href: '#services' },
  { label: 'UI/UX Design', href: '#services' },
  { label: 'Mobile Apps', href: '#services' },
  { label: 'E-commerce', href: '#services' },
  { label: 'SEO Optimization', href: '#services' },
  { label: 'Digital Strategy', href: '#services' },
]

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.open(href, '_blank', 'noopener noreferrer')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <footer className="relative bg-slate-900/50 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-16"
        >
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold gradient-text mb-4">Faraz Ahmed Khan</h3>
                <p className="text-slate-400 leading-relaxed">
                  Full Stack Developer & UI/UX Designer passionate about creating 
                  beautiful, functional digital experiences for small businesses.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <motion.a
                  href="mailto:hello@farazahmedkhan.dev"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} />
                  hello@farazahmedkhan.dev
                </motion.a>
                <motion.a
                  href="tel:+923001234567"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Phone size={16} />
                  +92 300 1234567
                </motion.a>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-slate-400"
                >
                  <MapPin size={16} />
                  Karachi, Pakistan
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="p-2 bg-slate-800/50 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <motion.button
                      onClick={() => handleLinkClick(link.href)}
                      whileHover={{ x: 5 }}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <motion.button
                      onClick={() => handleLinkClick(service.href)}
                      whileHover={{ x: 5 }}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {service.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
              <p className="text-slate-400 mb-4">
                Subscribe to get the latest updates on new projects and blog posts.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t border-slate-800 my-12"
          />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 text-slate-400">
              <p className="flex items-center gap-2">
                © 2024 Faraz Ahmed Khan. Made with{' '}
                <Heart className="text-red-400" size={16} fill="currentColor" />{' '}
                and{' '}
                <Coffee className="text-amber-400" size={16} />
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Code className="text-blue-400" size={14} />
                  Built with Next.js
                </span>
                <span className="flex items-center gap-1">
                  <Palette className="text-purple-400" size={14} />
                  Designed with Figma
                </span>
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      </div>
    </footer>
  )
}