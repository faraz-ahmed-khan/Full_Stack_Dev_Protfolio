'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Palette, Zap, Users, Award, Coffee } from 'lucide-react'

const skills = [
  { name: 'React/Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 85 },
  { name: 'UI/UX Design', level: 92 },
  { name: '3D Modeling', level: 80 },
]

const stats = [
  { icon: Code, label: 'Projects Completed', value: '50+' },
  { icon: Users, label: 'Happy Clients', value: '30+' },
  { icon: Award, label: 'Years Experience', value: '5+' },
  { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Passionate developer with a love for creating beautiful, functional, and user-centered digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Personal Info */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  <Palette className="inline-block mr-3 text-blue-400" size={28} />
                  My Story
                </h3>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    Hello! I'm Faraz Ahmed Khan, a passionate full-stack developer and UI/UX designer 
                    based in Pakistan. I specialize in creating modern, responsive web applications 
                    that deliver exceptional user experiences.
                  </p>
                  <p>
                    My journey in web development started 5 years ago, and since then, I've had the 
                    privilege of working with various clients, from startups to established businesses, 
                    helping them bring their digital visions to life.
                  </p>
                  <p>
                    I'm particularly passionate about helping small businesses establish their online 
                    presence and grow through effective digital solutions. When I'm not coding, you 
                    can find me exploring new technologies, creating 3D art, or contributing to 
                    open-source projects.
                  </p>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                  >
                    <Zap className="text-blue-400" size={16} />
                    <span className="text-sm text-slate-300">Fast Learner</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                  >
                    <Users className="text-purple-400" size={16} />
                    <span className="text-sm text-slate-300">Team Player</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <Award className="text-green-400" size={16} />
                    <span className="text-sm text-slate-300">Problem Solver</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  <Code className="inline-block mr-3 text-blue-400" size={28} />
                  Skills & Expertise
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-blue-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 1 + index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="text-center glass-effect p-6 rounded-xl"
                  >
                    <Icon className="mx-auto mb-4 text-blue-400" size={32} />
                    <h4 className="text-2xl font-bold text-white mb-2">{stat.value}</h4>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}