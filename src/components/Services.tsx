 'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code, 
  Palette, 
  Smartphone, 
  ShoppingCart, 
  Search, 
  BarChart3,
  ArrowRight,
  Check
} from 'lucide-react'
import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei'

// Dynamically load the 3D Canvas portion to avoid importing three-mesh-bvh/@react-three/drei during SSR
const ServiceCanvas = dynamic(
  async () => {
    const mod = await import('./ServiceCanvasClient')
    return mod.ServiceCanvas
  },
  { ssr: false }
)

// 3D Icon Components
function CodeIcon3D() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.7) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

function DesignIcon3D() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 8]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

const services = [
  {
    icon: Code,
    icon3D: CodeIcon3D,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Optimized', 'Modern Stack'],
    price: 'Starting at $2,000',
    popular: false,
  },
  {
    icon: Palette,
    icon3D: DesignIcon3D,
    title: 'UI/UX Design',
    description: 'Beautiful, user-centered designs that convert visitors into customers and provide exceptional user experiences.',
    features: ['User Research', 'Prototyping', 'Brand Identity', 'Mobile First'],
    price: 'Starting at $1,500',
    popular: true,
  },
  {
    icon: Smartphone,
    icon3D: CodeIcon3D,
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications using React Native for iOS and Android platforms.',
    features: ['Cross Platform', 'Native Performance', 'Push Notifications', 'App Store Ready'],
    price: 'Starting at $3,000',
    popular: false,
  },
  {
    icon: ShoppingCart,
    icon3D: DesignIcon3D,
    title: 'E-commerce Solutions',
    description: 'Complete online store solutions with payment integration, inventory management, and analytics.',
    features: ['Payment Gateway', 'Inventory System', 'Analytics', 'Admin Panel'],
    price: 'Starting at $2,500',
    popular: false,
  },
  {
    icon: Search,
    icon3D: CodeIcon3D,
    title: 'SEO Optimization',
    description: 'Improve your website\'s visibility and ranking on search engines to drive more organic traffic.',
    features: ['Keyword Research', 'On-page SEO', 'Performance Boost', 'Analytics Setup'],
    price: 'Starting at $800',
    popular: false,
  },
  {
    icon: BarChart3,
    icon3D: DesignIcon3D,
    title: 'Digital Strategy',
    description: 'Comprehensive digital strategy to help your business grow online and reach your target audience.',
    features: ['Market Analysis', 'Growth Strategy', 'Brand Positioning', 'ROI Tracking'],
    price: 'Starting at $1,200',
    popular: false,
  },
]

function ServiceCard3D({ service, index }: { service: any; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const Icon = service.icon
  const Icon3D = service.icon3D

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`relative overflow-hidden rounded-2xl p-8 glass-effect border-2 transition-all duration-300 ${
        service.popular 
          ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
          : 'border-slate-700/50 hover:border-blue-500/30'
      }`}
    >
      {service.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold rounded-bl-lg">
          Most Popular
        </div>
      )}

      {/* 3D Icon */}
      <div className="relative h-32 mb-6 overflow-hidden rounded-lg">
        <ServiceCanvas Icon3D={Icon3D} Icon={Icon} />
        {/* Fallback 2D Icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
          <Icon size={48} className="text-blue-400" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">{service.description}</p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {service.features.map((feature: string, featureIndex: number) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
            className="flex items-center gap-3 text-slate-300"
          >
            <Check size={16} className="text-green-400 flex-shrink-0" />
            {feature}
          </motion.li>
        ))}
      </ul>

      {/* Price */}
      <div className="mb-6">
        <p className="text-2xl font-bold text-blue-400">{service.price}</p>
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
          service.popular
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
            : 'border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
        }`}
      >
        Get Started
        <ArrowRight size={16} />
      </motion.button>
    </motion.div>
  )
}

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="services" className="py-20 relative">
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
              Services for <span className="gradient-text">Small Businesses</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto"
            >
              Comprehensive digital solutions to help your business grow online and reach more customers.
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard3D key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-slate-300 mb-8 text-lg">
                Let's discuss your project and create something amazing together. 
                Get a free consultation and quote for your next digital project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg flex items-center justify-center gap-3"
                >
                  Start Your Project
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-slate-500 hover:text-white transition-all duration-300"
                >
                  Schedule a Call
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}