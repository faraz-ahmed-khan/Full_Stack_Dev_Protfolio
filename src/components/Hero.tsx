'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronDown, Download, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react'

const typewriterText = [
  "Full Stack Developer",
  "UI/UX Designer", 
  "3D Artist",
  "Problem Solver"
]

export default function Hero() {
  const [currentText, setCurrentText] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typeSpeed, setTypeSpeed] = useState(100)

  useEffect(() => {
    const handleTyping = () => {
      const current = typewriterText[currentText]
      
      if (isDeleting) {
        setDisplayText(current.substring(0, displayText.length - 1))
        setTypeSpeed(50)
      } else {
        setDisplayText(current.substring(0, displayText.length + 1))
        setTypeSpeed(100)
      }

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentText((prev) => (prev + 1) % typewriterText.length)
      }
    }

    const timer = setTimeout(handleTyping, typeSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, typeSpeed, currentText])

  const socialLinks = [
    { icon: Github, href: "https://github.com/farazahmedkhan", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/farazahmedkhan", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/farazahmedkhan", label: "Twitter" },
  ]

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-slate-400 mb-4"
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="gradient-text">Faraz Ahmed Khan</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-16 mb-8"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl text-slate-300">
                I'm a{' '}
                <span className="text-blue-400 font-semibold">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </p>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              I craft beautiful, functional, and user-centered digital experiences with modern technologies. 
              Passionate about creating solutions that make a difference for small businesses and startups.
            </motion.p>
          </motion.div>

          {/* (Hero image removed per user request) */}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg flex items-center gap-3 transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
              onClick={() => window.open('#contact', '_self')}
            >
              <ExternalLink size={20} />
              Get In Touch
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-lg flex items-center gap-3 transition-all duration-300 hover:border-slate-500 hover:text-white glass-effect"
            >
              <Download size={20} />
              Download CV
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex justify-center gap-6 mb-16"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  className="p-3 rounded-full glass-effect hover:text-blue-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <Icon size={24} />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="flex flex-col items-center"
          >
            <p className="text-slate-500 text-sm mb-4">Scroll to explore</p>
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full border border-slate-600 hover:border-slate-500 transition-colors duration-300"
              aria-label="Scroll down"
            >
              <ChevronDown size={24} className="text-slate-400" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-20 h-20 border border-blue-400/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-10 w-16 h-16 border border-purple-400/20 rounded-lg"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 left-5 w-2 h-2 bg-blue-400/40 rounded-full"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/3 right-5 w-3 h-3 bg-purple-400/40 rounded-full"
      />
    </section>
  )
}