"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Environment } from "@react-three/drei";

function CameraPlaceholder() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Lens barrel */}
      <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[0, 0, 0.91]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color="#1a1a3a" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Viewfinder */}
      <mesh position={[-0.05, 0.6, -0.1]}>
        <boxGeometry args={[0.35, 0.25, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Hot shoe */}
      <mesh position={[0, 0.72, -0.1]}>
        <boxGeometry args={[0.5, 0.04, 0.2]} />
        <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

export function HeroCamera3D() {
  return (
    <div className="absolute right-8 top-8 hidden h-[200px] w-[200px] pointer-events-auto lg:block">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 35 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0.1, -0.3, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-0.5, 0.5]}
            snap
          >
            <CameraPlaceholder />
          </PresentationControls>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
