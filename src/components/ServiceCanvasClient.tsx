'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

export function ServiceCanvas({ Icon3D, Icon }: any) {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Icon3D />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Suspense>
    </Canvas>
  )
}
