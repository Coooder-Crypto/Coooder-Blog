'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface SceneProps {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  lowPower: boolean;
}

function Avatar({ progress, reducedMotion }: Pick<SceneProps, 'progress' | 'reducedMotion'>) {
  const group = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progress.get();
    const targetX = p < 0.28 ? 1.65 : p < 0.66 ? -1.6 : 0.7;
    const targetY = p < 0.66 ? 0 : -0.45;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 3.5, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3.5, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (p - 0.35) * -0.7, 3, delta);
    if (!reducedMotion) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.45) * 0.025;

    const eyeX = reducedMotion ? 0 : state.pointer.x * 0.055;
    const eyeY = reducedMotion ? 0 : state.pointer.y * 0.04;
    [leftEye.current, rightEye.current].forEach((eye) => {
      if (eye) {
        eye.position.x = eye.userData.baseX + eyeX;
        eye.position.y = eye.userData.baseY + eyeY;
      }
    });
    if (core.current && !reducedMotion) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.1) * 0.04;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group} position={[1.65, 0, 0]}>
      <group position={[0, -0.35, 0]}>
        <mesh position={[0, -1.15, 0]} scale={[1.25, 1.45, 0.72]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshStandardMaterial color="#11283a" roughness={0.56} metalness={0.18} />
        </mesh>
        <mesh position={[0, -0.76, 0.7]} rotation={[0.12, 0, 0]}>
          <torusGeometry args={[0.43, 0.035, 12, 48, Math.PI]} />
          <meshStandardMaterial color="#67e8f9" emissive="#0891b2" emissiveIntensity={1.5} />
        </mesh>
        <mesh ref={core} position={[0, -1.02, 0.78]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#a5f3fc" emissive="#22d3ee" emissiveIntensity={2.4} />
        </mesh>
      </group>

      <group position={[0, 0.68, 0.08]}>
        <mesh scale={[0.79, 0.92, 0.74]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshStandardMaterial color="#d8a27d" roughness={0.72} />
        </mesh>
        <mesh position={[0, 0.5, -0.1]} scale={[0.86, 0.48, 0.78]}>
          <sphereGeometry args={[1, 36, 24]} />
          <meshStandardMaterial color="#101822" roughness={0.8} />
        </mesh>
        <mesh position={[-0.79, 0.02, 0]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.08, 0.37, 0.1]} />
          <meshStandardMaterial color="#67e8f9" emissive="#0891b2" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0.79, 0.02, 0]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.08, 0.37, 0.1]} />
          <meshStandardMaterial color="#67e8f9" emissive="#0891b2" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0, 0.08, 0.72]}>
          <boxGeometry args={[1.24, 0.38, 0.055]} />
          <meshPhysicalMaterial color="#07101a" transparent opacity={0.88} roughness={0.15} metalness={0.6} />
        </mesh>
        <mesh ref={leftEye} userData={{ baseX: -0.27, baseY: 0.08 }} position={[-0.27, 0.08, 0.765]}>
          <sphereGeometry args={[0.075, 18, 18]} />
          <meshBasicMaterial color="#a5f3fc" />
        </mesh>
        <mesh ref={rightEye} userData={{ baseX: 0.27, baseY: 0.08 }} position={[0.27, 0.08, 0.765]}>
          <sphereGeometry args={[0.075, 18, 18]} />
          <meshBasicMaterial color="#a5f3fc" />
        </mesh>
      </group>
    </group>
  );
}

function OrbitalSystem({ progress, reducedMotion, lowPower }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: lowPower ? 18 : 38 }, (_, index) => ({
        position: [Math.sin(index * 12.9898) * 5.8, Math.cos(index * 4.1414) * 3.5, -1.2 - (index % 5) * 0.65] as [
          number,
          number,
          number,
        ],
        scale: 0.018 + (index % 4) * 0.009,
      })),
    [lowPower]
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const speed = reducedMotion ? 0 : delta * 0.055;
    group.current.rotation.y += speed;
    group.current.rotation.z = progress.get() * 0.18;
    group.current.position.y = -progress.get() * 0.9;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.35, 0.2, 0]}>
        <torusGeometry args={[2.72, 0.012, 8, 120]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 1.85, -0.45, 0.3]}>
        <torusGeometry args={[3.45, 0.008, 8, 140]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.19} />
      </mesh>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position} scale={node.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={index % 3 === 0 ? '#c4b5fd' : '#a5f3fc'} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ progress, reducedMotion }: Pick<SceneProps, 'progress' | 'reducedMotion'>) {
  useFrame((state, delta) => {
    const p = progress.get();
    const targetZ = 7.2 - Math.sin(Math.min(p, 0.76) * Math.PI) * 0.8;
    const targetY = 0.2 - p * 0.45;
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3, delta);
    state.camera.position.x = reducedMotion ? 0 : Math.sin(p * Math.PI * 1.4) * 0.16;
    state.camera.lookAt(0, -0.15, 0);
  });
  return null;
}

export default function ResumeScene({ progress, reducedMotion, lowPower }: SceneProps) {
  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.5]}
      camera={{ position: [0, 0.2, 7.2], fov: 38, near: 0.1, far: 50 }}
      gl={{ antialias: !lowPower, alpha: false, powerPreference: lowPower ? 'low-power' : 'high-performance' }}
      shadows={false}
    >
      <color attach="background" args={['#07101a']} />
      <fog attach="fog" args={['#07101a', 8, 16]} />
      <ambientLight intensity={1.35} />
      <directionalLight position={[3, 5, 5]} intensity={2.2} color="#d9faff" />
      <pointLight position={[-4, 1, 2]} intensity={18} distance={8} color="#7c3aed" />
      <pointLight position={[3, -2, 3]} intensity={14} distance={7} color="#06b6d4" />
      <Avatar progress={progress} reducedMotion={reducedMotion} />
      <OrbitalSystem progress={progress} reducedMotion={reducedMotion} lowPower={lowPower} />
      <CameraRig progress={progress} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
