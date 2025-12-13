import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveSphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export default function InteractiveSphere({ 
  position = [3, 0, 0], 
  scale = 1.8,
  color = '#5F214D'
}: InteractiveSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Scale on hover
      const targetScale = hovered ? scale * 1.15 : scale;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 128, 128]}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.05}
        metalness={0.95}
        transparent
        opacity={0.85}
      />
    </Sphere>
  );
}




