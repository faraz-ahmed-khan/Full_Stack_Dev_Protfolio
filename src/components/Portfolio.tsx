'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Html } from '@react-three/drei'
import { ExternalLink, Github, Eye, Filter } from 'lucide-react'
import * as THREE from 'three'

// 3D Project Card Component
function ProjectCard3D({ project, index }: { project: any; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.05
      }
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial
          color={project.color}
          transparent
          opacity={0.8}
          emissive={hovered ? project.color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
        
        {/* Project Info Overlay */}
        <Html
          position={[0, 0, 0.06]}
          transform
          occlude
          style={{
            width: '200px',
            height: '120px',
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '8px',
            padding: '16px',
            color: 'white',
            fontSize: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="text-center">
            <h4 className="font-bold mb-2">{project.title}</h4>
            <p className="text-xs opacity-80 mb-3">{project.category}</p>
            <div className="flex justify-center gap-2">
              <button className="p-1 bg-blue-500 rounded text-xs">
                <Eye size={12} />
              </button>
              <button className="p-1 bg-purple-500 rounded text-xs">
                <Github size={12} />
              </button>
            </div>
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

// 3D Scene for Portfolio
function PortfolioScene({ projects }: { projects: any[] }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      
      {projects.slice(0, 6).map((project, index) => (
        <group key={project.id} position={[
          (index % 3 - 1) * 3,
          Math.floor(index / 3) * 2 - 1,
          0
        ]}>
          <ProjectCard3D project={project} index={index} />
        </group>
      ))}
    </>
  )
}

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with Next.js, featuring advanced product filtering, secure payments, and admin dashboard.',
    category: 'Web Development',
    color: '#3b82f6',
  image: '/assets/portfolio-1.jpg',
  // optional: set a video (local file in public/ or a direct mp4 URL). Replace or upload `/assets/ecommerce.mp4` to enable.
  video: '/assets/ecommerce.mp4',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    github: 'https://github.com/farazahmedkhan/ecommerce',
    live: 'https://ecommerce-demo.farazahmedkhan.dev',
    featured: true,
  },
  {
    id: 2,
    title: 'Restaurant Website',
    description: 'Beautiful restaurant website with online ordering system, table reservations, and menu management.',
    category: 'UI/UX Design',
    color: '#8b5cf6',
  image: '/assets/portfolio-2.jpg',
    technologies: ['React', 'Framer Motion', 'Node.js', 'MongoDB'],
    github: 'https://github.com/farazahmedkhan/restaurant',
    live: 'https://restaurant-demo.farazahmedkhan.dev',
    featured: true,
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, team collaboration, and progress tracking.',
    category: 'Mobile App',
    color: '#ec4899',
  image: '/assets/portfolio-3.jpg',
    technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
    github: 'https://github.com/farazahmedkhan/taskapp',
    live: 'https://taskapp-demo.farazahmedkhan.dev',
    featured: false,
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Creative portfolio website for a photographer with image galleries, client testimonials, and booking system.',
    category: 'Web Development',
    color: '#10b981',
  image: '/assets/portfolio-4.jpg',
    technologies: ['Vue.js', 'Nuxt.js', 'Contentful', 'GSAP'],
    github: 'https://github.com/farazahmedkhan/photography',
    live: 'https://photography-demo.farazahmedkhan.dev',
    featured: false,
  },
  {
    id: 5,
    title: 'Learning Platform',
    description: 'Online learning platform with course management, progress tracking, and interactive lessons.',
    category: 'Web Development',
    color: '#f59e0b',
  image: '/assets/portfolio-5.jpg',
    technologies: ['React', 'Express.js', 'PostgreSQL', 'Socket.io'],
    github: 'https://github.com/farazahmedkhan/learning',
    live: 'https://learning-demo.farazahmedkhan.dev',
    featured: true,
  },
  {
    id: 6,
    title: 'Crypto Dashboard',
    description: 'Real-time cryptocurrency dashboard with portfolio tracking, price alerts, and market analysis.',
    category: 'UI/UX Design',
    color: '#ef4444',
  image: '/assets/portfolio-6.jpg',
    technologies: ['React', 'Chart.js', 'CoinGecko API', 'TailwindCSS'],
    github: 'https://github.com/farazahmedkhan/crypto',
    live: 'https://crypto-demo.farazahmedkhan.dev',
    featured: false,
  },
]

const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile App']

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState('All')
  const [view3D, setView3D] = useState(false)

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              My <span className="gradient-text">Portfolio</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto mb-8"
            >
              A showcase of my recent projects and creative work. Each project represents 
              a unique challenge and solution.
            </motion.p>

            {/* View Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-slate-800/50 p-1 rounded-lg">
                <button
                  onClick={() => setView3D(false)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    !view3D 
                      ? 'bg-blue-500 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setView3D(true)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    view3D 
                      ? 'bg-blue-500 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D View
                </button>
              </div>
            </motion.div>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Filter size={16} />
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* 3D Portfolio View */}
          {view3D && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-96 mb-12 rounded-2xl overflow-hidden glass-effect"
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                <Suspense fallback={null}>
                  <PortfolioScene projects={filteredProjects} />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                </Suspense>
              </Canvas>
            </motion.div>
          )}

          {/* Traditional Grid View */}
          {!view3D && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-2xl glass-effect border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                      Featured
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Background gradient overlay based on project color */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                      }}
                    />

                    {/* Project media: prefer video when available, otherwise image */}
                    {project.video ? (
                      <video
                        src={project.video}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        onError={(e) => {
                          // hide video if it cannot play; image fallback will show (if present)
                          const el = e.currentTarget as HTMLVideoElement
                          el.style.display = 'none'
                        }}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          // fallback to colored block if image missing
                          const el = e.currentTarget as HTMLImageElement
                          el.style.display = 'none'
                        }}
                      />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-slate-700 rounded-full text-white hover:bg-slate-600 transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span 
                        className="px-3 py-1 text-sm font-medium rounded-full"
                        style={{ 
                          backgroundColor: `${project.color}20`,
                          color: project.color
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Like What You See?
              </h3>
              <p className="text-slate-300 mb-8 text-lg">
                I'm always excited to work on new projects and bring creative ideas to life. 
                Let's collaborate on your next digital venture!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg flex items-center justify-center gap-3 mx-auto"
              >
                Start a Project
                <ExternalLink size={20} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}