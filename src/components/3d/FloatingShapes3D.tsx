import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useIsMobile';

interface Shape {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'torus' | 'octahedron' | 'dodecahedron';
  color: string;
  scale: number;
  speed: number;
}

export default function FloatingShapes3D() {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();

  // Wine Plum color palette
  const colors = {
    winePlum: '#5F214D',
    grayishPlum: '#68546D',
    dustyViolet: '#896E8F',
    silverPlum: '#A08A9F',
    softPlum: '#B49BA4',
  };

  // Shapes positioned on the LEFT side to avoid overlapping with text on the right
  const allShapes: Shape[] = [
    { position: [-7, 2, -5], geometry: 'dodecahedron', color: colors.winePlum, scale: 1.2, speed: 0.5 },
    { position: [-3, -3, -8], geometry: 'octahedron', color: colors.dustyViolet, scale: 1.0, speed: 0.7 },
    { position: [-5, -5, -3], geometry: 'torus', color: colors.grayishPlum, scale: 0.8, speed: 0.6 },
    { position: [-8, 4, -6], geometry: 'box', color: colors.silverPlum, scale: 1.1, speed: 0.8 },
    { position: [-4, -7, -10], geometry: 'sphere', color: colors.softPlum, scale: 1.2, speed: 0.4 },
    { position: [-9, 0, -7], geometry: 'octahedron', color: colors.winePlum, scale: 0.9, speed: 0.9 },
    { position: [-6, 6, -4], geometry: 'dodecahedron', color: colors.dustyViolet, scale: 1.0, speed: 0.55 },
  ];

  const shapes = isMobile ? allShapes.slice(0, 3) : allShapes;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const renderGeometry = (type: Shape['geometry']) => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <Float
          key={index}
          speed={shape.speed}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <mesh position={shape.position} scale={shape.scale}>
            {renderGeometry(shape.geometry)}
            <MeshDistortMaterial
              color={shape.color}
              transparent
              opacity={0.7}
              distort={0.3}
              speed={2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

