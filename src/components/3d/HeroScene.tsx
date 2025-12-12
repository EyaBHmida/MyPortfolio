import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import FloatingShapes3D from './FloatingShapes3D';
import InteractiveSphere from './InteractiveSphere';

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  
  canvas {
    pointer-events: auto;
  }
`;

export default function HeroScene() {
  return (
    <CanvasContainer>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting for reflections */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#896E8F" />
          <pointLight position={[0, 5, 5]} intensity={0.8} color="#B49BA4" />
          <spotLight
            position={[5, 10, 7]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#ffffff"
          />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* 3D Shapes */}
          <FloatingShapes3D />
          
          {/* Main interactive sphere - positioned on the left */}
          <InteractiveSphere 
            position={[-4, 0, -2]} 
            scale={1.8} 
            color="#5F214D" 
          />
          
          {/* Secondary spheres - all on the left side */}
          <InteractiveSphere 
            position={[-6, 3, -4]} 
            scale={1.0} 
            color="#896E8F" 
          />
          <InteractiveSphere 
            position={[-3, -4, -3]} 
            scale={0.7} 
            color="#68546D" 
          />
          
          {/* Subtle camera movement disabled for now */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
}

