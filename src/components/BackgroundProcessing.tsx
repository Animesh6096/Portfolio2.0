import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';

function ProcessingParticles() {
  const count = 3000;
  const particlesRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.Line>(null);

  // Generate particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Purple gradient colors
      colors[i * 3] = 0.6 + Math.random() * 0.4; // R
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }

    return {
      positions,
      colors
    };
  }, []);

  // Animation frame
  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Wave animation
    for (let i = 0; i < count; i++) {
      const x = particles.positions[i * 3];
      const y = particles.positions[i * 3 + 1];
      const z = particles.positions[i * 3 + 2];

      // Create wave effect
      particlesRef.current.geometry.attributes.position.array[i * 3] = 
        x + Math.sin(time * 0.5 + y) * 0.3;
      particlesRef.current.geometry.attributes.position.array[i * 3 + 1] = 
        y + Math.cos(time * 0.5 + x) * 0.3;
      particlesRef.current.geometry.attributes.position.array[i * 3 + 2] = 
        z + Math.sin(time * 0.5 + x) * 0.3;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <Points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation={true}
        />
      </Points>

      {/* Add glowing lines connecting nearby particles */}
      <LineConnections particlesRef={particlesRef} />
    </>
  );
}

function LineConnections({ particlesRef }: { particlesRef: React.RefObject<THREE.Points> }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (!particlesRef.current || !lineRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array;
    const linePositions: number[] = [];

    // Connect particles that are close to each other
    for (let i = 0; i < positions.length; i += 3) {
      for (let j = i + 3; j < positions.length; j += 3) {
        const dx = positions[i] - positions[j];
        const dy = positions[i + 1] - positions[j + 1];
        const dz = positions[i + 2] - positions[j + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 5) {
          linePositions.push(
            positions[i], positions[i + 1], positions[i + 2],
            positions[j], positions[j + 1], positions[j + 2]
          );
        }
      }
    }

    lineRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color="#a855f7"
        transparent
        opacity={0.2}
        linewidth={1}
      />
    </lineSegments>
  );
}

// Processing circles animation
function ProcessingRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringsRef.current) return;
    const time = state.clock.getElapsedTime();
    ringsRef.current.rotation.z = time * 0.2;
  });

  return (
    <group ref={ringsRef}>
      {[10, 15, 20].map((radius, i) => (
        <mesh key={i} rotation-x={Math.PI / 2}>
          <ringGeometry args={[radius - 0.3, radius, 64]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BackgroundProcessing() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#0a0a1a']} />
        <ambientLight intensity={0.5} />
        <ProcessingParticles />
        <ProcessingRings />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
