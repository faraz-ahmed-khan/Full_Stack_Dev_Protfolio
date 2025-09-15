'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Dynamically import heavy 3D components
const Background3D = dynamic(() => import('@/components/3d/Background3D'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
})

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Background3D />
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Blog />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  )
}