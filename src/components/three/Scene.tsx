"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    // scroll-driven y position
    meshRef.current.position.y = Math.sin(t * 0.3) * 0.3;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[1.8, 0.2, -1]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0e7490"
          emissiveIntensity={0.45}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  );
}

function SecondaryShape() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.08;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.6}>
      <mesh ref={ref} position={[-2.2, -1, -2]}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#a5f3fc"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

function Rig() {
  useFrame((state) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1000;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // scroll-driven camera: desciende y rota levemente al hacer scroll
    const targetY = -scrollProgress * 3.5;
    const targetZ = 6 - scrollProgress * 1.2;
    const targetRot = scrollProgress * 0.35;

    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + state.pointer.y * 0.3, 0.04);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.03);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.04);
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, targetRot * 0.2, 0.04);
    state.camera.lookAt(0, targetY * 0.15, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#000000", 6, 14]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} intensity={1.6} color="#06b6d4" />
        <pointLight position={[3, -2, 2]} intensity={1.0} color="#8b5cf6" />
        <pointLight position={[0, -3, 2]} intensity={0.6} color="#f59e0b" />

        <Stars radius={30} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <FloatingShape />
        <SecondaryShape />
        <Rig />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.3}
        />
      </Canvas>
      {/* gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.15),transparent_60%)]" />
    </div>
  );
}
