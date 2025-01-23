import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

function AnimatedSpheres() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-4, 2, -10]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            opacity={0.9} /* Increased from 0.7 to 0.9 */
            transparent
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, -2, -8]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#d8b4fe"
            opacity={0.7} /* Increased from 0.5 to 0.7 */
            transparent
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10"> {/* Changed from -z-50 to -z-10 to be in front of other backgrounds */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.8} /> {/* Increased from 0.5 to 0.8 */}
        <pointLight position={[10, 10, 10]} intensity={1.5} /> {/* Added intensity */}
        <Stars
          radius={100}
          depth={50}
          count={3000} /* Increased from 2000 to 3000 */
          factor={6}
          saturation={1} /* Increased from 0 to 1 */
          fade
          speed={1.5} /* Increased from 1 to 1.5 */
        />
        <AnimatedSpheres />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7} /* Increased from 0.5 to 0.7 */
        />
      </Canvas>
    </div>
  );
}
