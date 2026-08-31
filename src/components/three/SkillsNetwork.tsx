"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODES: [number, number, number][] = [
  [0, 0.6, 0],      // center
  [-1.2, 0.2, -0.3], // backend
  [1.2, 0.3, -0.5],  // frontend
  [-0.8, -0.8, 0.2], // devops
  [0.9, -0.7, 0.4],  // databases
  [0, -0.2, 0.8],    // tools
];

const EDGES: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],[0,5],
  [1,3],[2,4],[3,5],[4,5],[1,2]
];

function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()*0.2)*0.08;
    }
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.35 + Math.sin(state.clock.getElapsedTime()*0.8)*0.1;
    }
  });

  const lineGeometry = useMemo(() => {
    const pos: number[] = [];
    EDGES.forEach(([a,b]) => {
      pos.push(...NODES[a], ...NODES[b]);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return geo;
  }, []);

  return (
    <group ref={groupRef}>
      {/* lines */}
      {/* @ts-ignore */}
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </lineSegments>
      {/* nodes */}
      {NODES.map((pos, i) => (
        <mesh key={i} position={pos as any}>
          <sphereGeometry args={[0.07 + (i===0?0.05:0), 16, 16]} />
          <meshStandardMaterial
            color={i===0 ? "#f59e0b" : i%2===0 ? "#06b6d4" : "#8b5cf6"}
            emissive={i===0 ? "#f59e0b" : "#06b6d4"}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SkillsNetwork() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }} dpr={[1,1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[2,2,2]} intensity={1.2} color="#06b6d4" />
        <Network />
      </Canvas>
    </div>
  );
}
