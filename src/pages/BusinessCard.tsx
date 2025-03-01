import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  PerspectiveCamera, 
  Text, 
  Html, 
  RoundedBox,
  Circle,
  Environment,
  OrbitControls
} from '@react-three/drei';
import { Github, Linkedin, Facebook, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Background3D from '../components/Background3D';
import { ErrorBoundary } from 'react-error-boundary';
import Navigation from '../components/Navigation';

// Social media icon component
interface SocialIconProps {
  Icon: React.ElementType;
  position: [number, number, number];
  url: string;
}

function SocialIcon({ Icon, position, url }: SocialIconProps) {
  return (
    <Html position={position} transform occlude>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center bg-purple-500/30 hover:bg-purple-500/60 rounded-full transition-all transform hover:scale-110 shadow-lg hover:shadow-purple-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon className="w-5 h-5 text-white" />
      </a>
    </Html>
  );
}

// Card component that can be flipped
interface CardProps {
  flipped: boolean;
  toggleFlip: () => void;
}

function Card({ flipped, toggleFlip }: CardProps) {
  const cardRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Detect if viewport is mobile-sized
  const isMobileViewport = viewport.width < 5;
  
  // Adjust card size based on viewport with better mobile handling
  const cardWidth = isMobileViewport ? Math.min(2.5, viewport.width / 1.5) : Math.min(3, viewport.width / 2);
  const cardHeight = cardWidth * 0.6; // Business card ratio
  const cardDepth = 0.05;
  
  // Initial animation state
  const [initialAnimation, setInitialAnimation] = useState(true);
  
  // Run initial animation once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimation(false);
    }, 2500); // Animation duration
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animate the card flip
  useFrame(() => {
    if (!cardRef.current) return;
    
    const targetRotation = flipped ? Math.PI : Math.PI * 0.15; // Keep card at an angle even when flipped
    cardRef.current.rotation.y = THREE.MathUtils.lerp(
      cardRef.current.rotation.y,
      targetRotation,
      initialAnimation ? 0.03 : 0.1
    );
  });
  
  // Add subtle floating animation and auto-rotation when not flipped
  useFrame(({ clock }) => {
    if (!cardRef.current) return;
    
    // Subtle floating effect - reduce on mobile for better performance
    cardRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * (isMobileViewport ? 0.03 : 0.05);
    
    // Initial animation to grab attention
    if (initialAnimation) {
      // Full 360° flip animation
      if (clock.getElapsedTime() < 2.0) {
        // Map time from 0-2 seconds to 0-2π (full 360° rotation)
        const targetRotation = Math.PI * 2 * (clock.getElapsedTime() / 2.0);
        cardRef.current.rotation.y = targetRotation;
      } 
      // Then settle to a slightly sideways position
      else if (clock.getElapsedTime() < 2.5) {
        cardRef.current.rotation.y = THREE.MathUtils.lerp(
          cardRef.current.rotation.y,
          Math.PI * 0.15,
          0.1
        );
      }
      return;
    }
    
    // Subtle rotation effect when not being flipped - reduce on mobile
    if (!flipped && Math.abs(cardRef.current.rotation.y - Math.PI * 0.15) < 0.1) {
      // Add very subtle auto-rotation when card is at rest position
      const rotationSpeed = isMobileViewport ? 0.0003 : 0.0005;
      cardRef.current.rotation.y += rotationSpeed;
    } else if (flipped && Math.abs(cardRef.current.rotation.y - Math.PI) < 0.1) {
      // Add very subtle auto-rotation when card is flipped
      const rotationSpeed = isMobileViewport ? 0.0003 : 0.0005;
      cardRef.current.rotation.y -= rotationSpeed;
    }
    
    // Reduce wobble effect on mobile
    const wobbleAmount = isMobileViewport ? 0.01 : 0.02;
    if (!flipped) {
      cardRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * wobbleAmount;
    } else {
      cardRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * -wobbleAmount;
    }
  });
  
  return (
    <group 
      ref={cardRef}
      onClick={toggleFlip}
      position={[0, 0, 0]}
    >
      {/* Front of card */}
      <group position={[0, 0, cardDepth / 2]}>
        {/* Main card body */}
        <RoundedBox args={[cardWidth, cardHeight, 0.01]} radius={0.04} smoothness={8}>
          <meshPhysicalMaterial 
            color="#0f172a" 
            metalness={0.7}
            roughness={0.2}
            clearcoat={0.4}
            clearcoatRoughness={0.2}
            reflectivity={0.5}
            envMapIntensity={1.5}
          />
        </RoundedBox>
        
        {/* Card edge glow */}
        <mesh position={[0, 0, -0.005]}>
          <RoundedBox args={[cardWidth + 0.05, cardHeight + 0.05, 0.001]} radius={0.05} smoothness={8}>
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
          </RoundedBox>
        </mesh>
        
        {/* Reflective metallic accent on top right */}
        <mesh position={[cardWidth/2 - 0.3, cardHeight/2 - 0.2, 0.01]} rotation={[0, 0, Math.PI/4]}>
          <planeGeometry args={[0.4, 0.05, 4, 1]} />
          <meshPhysicalMaterial 
            color="#c4b5fd" 
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1.0}
          />
        </mesh>
        
        {/* Reflective metallic accent on bottom left */}
        <mesh position={[-cardWidth/2 + 0.3, -cardHeight/2 + 0.2, 0.01]} rotation={[0, 0, Math.PI/4]}>
          <planeGeometry args={[0.4, 0.05]} />
          <meshPhysicalMaterial 
            color="#c4b5fd" 
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1.0}
          />
        </mesh>
        
        {/* Monogram/Logo */}
        <group position={[0, 0.4, 0.02]}>
          <Circle args={[0.25, 32]}>
            <meshPhysicalMaterial 
              color="#a78bfa" 
              metalness={0.9}
              roughness={0.1}
              clearcoat={0.8}
              reflectivity={0.8}
            />
          </Circle>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            AB
          </Text>
        </group>
        
        {/* Front content */}
        <Text
          position={[0, 0.1, 0.01]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Animesh Bhattacharjee
        </Text>
        
        <Text
          position={[0, -0.05, 0.01]}
          fontSize={0.08}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Full Stack Developer
        </Text>
        
        {/* Decorative line - gradient effect similar to simple version */}
        <mesh position={[0, -0.15, 0.01]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.5, 0.005]} />
          <meshPhysicalMaterial 
            color="#a78bfa" 
            transparent 
            opacity={0.8}
            metalness={0.9}
            roughness={0.1}
            clearcoat={0.8}
          />
        </mesh>
        
        <Text
          position={[0, -0.25, 0.01]}
          fontSize={0.05}
          color="#d1d5db"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          React • TypeScript • Node.js • Flask
        </Text>
        
        <Text
          position={[0, -0.35, 0.01]}
          fontSize={0.05}
          color="#d1d5db"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          banimesh2002@gmail.com
        </Text>
        
        <Text
          position={[0, -0.45, 0.01]}
          fontSize={0.05}
          color="#d1d5db"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          linkedin.com/in/animesh-bhattacharjee-jhalok
        </Text>
        
        {/* Small reflective spheres in corners */}
        <mesh position={[cardWidth/2 - 0.15, cardHeight/2 - 0.15, 0.03]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshPhysicalMaterial 
            color="#c4b5fd" 
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            reflectivity={1.0}
            envMapIntensity={2.0}
          />
        </mesh>
        
        <mesh position={[-cardWidth/2 + 0.15, cardHeight/2 - 0.15, 0.03]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshPhysicalMaterial 
            color="#c4b5fd" 
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            reflectivity={1.0}
            envMapIntensity={2.0}
          />
        </mesh>
        
        <mesh position={[cardWidth/2 - 0.15, -cardHeight/2 + 0.15, 0.03]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshPhysicalMaterial 
            color="#c4b5fd" 
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            reflectivity={1.0}
            envMapIntensity={2.0}
          />
        </mesh>
        
        <mesh position={[-cardWidth/2 + 0.15, -cardHeight/2 + 0.15, 0.03]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshPhysicalMaterial 
            color="#c4b5fd" 
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            reflectivity={1.0}
            envMapIntensity={2.0}
          />
        </mesh>
      </group>
      
      {/* Back of card */}
      <group position={[0, 0, -cardDepth / 2]} rotation={[0, Math.PI, 0]}>
        {/* Main card body */}
        <RoundedBox args={[cardWidth, cardHeight, 0.01]} radius={0.04} smoothness={8}>
          <meshPhysicalMaterial 
            color="#0f172a" 
            metalness={0.4}
            roughness={0.4}
            clearcoat={0.2} // Further reduced clearcoat to minimize flickering
            clearcoatRoughness={0.6} // Increased roughness to reduce flickering
            reflectivity={0.1} // Further reduced reflectivity
          />
        </RoundedBox>
        
        {/* Card edge glow - further reduced opacity and made solid to prevent flickering */}
        <mesh position={[0, 0, -0.005]}>
          <RoundedBox args={[cardWidth + 0.05, cardHeight + 0.05, 0.001]} radius={0.05} smoothness={8}>
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.15} />
          </RoundedBox>
        </mesh>
        
        {/* Back content */}
        <Text
          position={[0, 0.5, 0.01]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Connect With Me
        </Text>
        
        {/* Decorative line - gradient effect similar to simple version */}
        <mesh position={[0, 0.4, 0.01]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.5, 0.005, 4, 1]} />
          <meshPhysicalMaterial 
            color="#a78bfa" 
            transparent 
            opacity={0.8}
            metalness={0.7}
            roughness={0.3}
            clearcoat={0.5}
          />
        </mesh>
        
        {/* Social media icons - improved layout to prevent overlapping */}
        <SocialIcon 
          Icon={Github} 
          position={[-0.8, 0.2, 0.1]} 
          url="https://github.com/animesh6096" 
        />
        
        <SocialIcon 
          Icon={Linkedin} 
          position={[-0.4, 0.2, 0.1]} 
          url="https://www.linkedin.com/in/animesh-bhattacharjee-jhalok/" 
        />
        
        <SocialIcon 
          Icon={Facebook} 
          position={[0, 0.2, 0.1]} 
          url="https://www.facebook.com/" 
        />
        
        {/* Social media icons - second row */}
        <SocialIcon 
          Icon={Mail} 
          position={[0.4, 0.2, 0.1]} 
          url="mailto:banimesh2002@gmail.com" 
        />
        
        <SocialIcon 
          Icon={Phone} 
          position={[0.8, 0.2, 0.1]} 
          url="tel:+1234567890" 
        />
        
        <Text
          position={[0, -0.2, 0.01]}
          fontSize={0.07}
          color="#d1d5db"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Tap to flip
        </Text>
      </group>
    </group>
  );
}

// Background floating elements
function FloatingElements() {
  const count = 20; // Number of floating elements
  const elements = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 12, // Wider spread
        (Math.random() - 0.5) * 12, // Wider spread
        (Math.random() - 0.5) * 6 - 3 // Deeper spread
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.15 + Math.random() * 0.4, // Larger elements
      speed: 0.2 + Math.random() * 0.5,
      type: Math.floor(Math.random() * 3) // Randomly select geometry type
    }));
  }, []);

  const elementsRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    elementsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      // Gentle floating motion
      mesh.position.y += Math.sin(t * elements[i].speed) * 0.001;
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
    });
  });

  // Use higher quality geometries to prevent pixelation
  return (
    <>
      {elements.map((props, i) => (
        <mesh
          key={i}
          ref={el => elementsRef.current[i] = el}
          position={props.position as [number, number, number]}
          rotation={props.rotation as [number, number, number]}
          scale={props.scale}
        >
          {props.type === 0 ? (
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} /> // Added segments for smoother edges
          ) : props.type === 1 ? (
            <sphereGeometry args={[0.5, 16, 16]} /> // Increased segments for smoother spheres
          ) : (
            <icosahedronGeometry args={[0.5, 1]} /> // Using icosahedron instead of tetrahedron for smoother look
          )}
          <meshPhysicalMaterial 
            color={i % 2 === 0 ? "#a78bfa" : "#8b5cf6"} 
            transparent 
            opacity={0.25}
            roughness={0.4}
            metalness={0.2}
            wireframe={i % 4 === 0}
            flatShading={false} // Smooth shading
          />
        </mesh>
      ))}
    </>
  );
}

// Scene setup with lighting
function Scene() {
  const [flipped, setFlipped] = useState(false);
  
  const toggleFlip = () => {
    setFlipped(!flipped);
  };
  
  return (
    <>
      {/* Environment map for reflections */}
      <Environment preset="city" />
      
      {/* Base ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Key light - positioned to create reflections */}
      <spotLight 
        position={[3, 3, 5]} 
        angle={0.3} 
        penumbra={0.8} 
        intensity={1.2} 
        color="#ffffff" 
        castShadow 
      />
      
      {/* Fill light */}
      <pointLight position={[-5, -2, 5]} intensity={0.3} color="#a78bfa" />
      
      {/* Rim light */}
      <pointLight position={[0, 0, -5]} intensity={0.1} color="#ffffff" />
      
      {/* Moving light to create dynamic reflections */}
      <MovingLight />
      
      {/* Add floating background elements */}
      <FloatingElements />
      
      {/* Add OrbitControls for mouse interaction */}
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={4.5}
        maxDistance={7}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        autoRotate={false}
      />
      
      <Card flipped={flipped} toggleFlip={toggleFlip} />
    </>
  );
}

// Moving light component to create dynamic reflections
function MovingLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    
    // Create circular motion
    const t = clock.getElapsedTime();
    lightRef.current.position.x = Math.sin(t * 0.3) * 5;
    lightRef.current.position.z = Math.cos(t * 0.3) * 5;
    lightRef.current.position.y = Math.sin(t * 0.2) * 2 + 3;
  });
  
  return (
    <pointLight
      ref={lightRef}
      position={[0, 3, 5]}
      intensity={0.6}
      color="#ffffff"
      distance={15}
    />
  );
}

// Simple 2D fallback card component
function SimpleBusinessCard() {
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-8 border-2 border-purple-500/30 rounded-xl m-1">
        {/* Monogram/Logo */}
        <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
          <span className="text-white text-xl font-bold">AB</span>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Animesh Bhattacharjee</h2>
          <p className="text-purple-300">Full Stack Developer</p>
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-6"></div>
        
        <div className="text-gray-300 text-sm text-center mb-6">
          <p>React • TypeScript • Node.js • Flask</p>
          <p className="mt-2">banimesh2002@gmail.com</p>
          <p>linkedin.com/in/animesh-bhattacharjee-jhalok</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/animesh6096" target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-500/20 rounded-full hover:bg-purple-500/40 transition-all transform hover:scale-110">
            <Github className="w-5 h-5 text-purple-300" />
          </a>
          <a href="https://www.linkedin.com/in/animesh-bhattacharjee-jhalok/" target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-500/20 rounded-full hover:bg-purple-500/40 transition-all transform hover:scale-110">
            <Linkedin className="w-5 h-5 text-purple-300" />
          </a>
          <a href="mailto:banimesh2002@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-500/20 rounded-full hover:bg-purple-500/40 transition-all transform hover:scale-110">
            <Mail className="w-5 h-5 text-purple-300" />
          </a>
          <a href="tel:+1234567890" target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-500/20 rounded-full hover:bg-purple-500/40 transition-all transform hover:scale-110">
            <Phone className="w-5 h-5 text-purple-300" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BusinessCard() {
  console.log('BusinessCard component rendering');
  const [hasError, setHasError] = useState(false);
  const [use3D, setUse3D] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Add a useEffect to log when the component mounts and check for mobile
  useEffect(() => {
    console.log('BusinessCard component mounted');
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Log the current URL
    console.log('Current URL:', window.location.href);
    
    return () => {
      console.log('BusinessCard component unmounted');
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Error boundary for Three.js
  const handleError = (error: Error) => {
    console.error('Three.js error:', error);
    setHasError(true);
  };
  
  return (
    <>
      <Navigation />
      {/* Reduce background visibility by adding an overlay */}
      <div className="fixed inset-0 bg-black/70 z-[-40]"></div>
      <Background3D />
      
      <div className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 max-w-7xl relative z-10">
        <div className="mb-8 sm:mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-4 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
            Virtual Business Card
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mb-6 sm:mb-8">
            Interactive 3D representation of my business card. Drag to rotate, click to flip.
          </p>
          
          <div className="flex justify-center mb-6 sm:mb-8">
            <button 
              onClick={() => setUse3D(true)} 
              className={`px-4 py-2 rounded-l-lg ${use3D ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'} relative z-20`}
            >
              3D Version
            </button>
            <button 
              onClick={() => setUse3D(false)} 
              className={`px-4 py-2 rounded-r-lg ${!use3D ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'} relative z-20`}
            >
              Simple Version
            </button>
          </div>
        </div>
        
        {use3D ? (
          <div className="w-full h-[60vh] sm:h-[70vh] rounded-xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
            {hasError ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="text-red-400 text-xl mb-4">
                  There was an error loading the 3D business card.
                </div>
                <button 
                  onClick={() => setHasError(false)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <ErrorBoundary onError={handleError} fallback={<SimpleBusinessCard />}>
                <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
                  <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 6 : 5]} />
                  <Scene />
                </Canvas>
              </ErrorBoundary>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center py-12 rounded-xl backdrop-blur-sm border border-purple-500/20">
            <SimpleBusinessCard />
          </div>
        )}
        
        <div className="mt-8 p-6 bg-black/30 rounded-xl backdrop-blur-sm border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">Instructions</h2>
          <ul className="text-gray-300 space-y-2">
            <li>• <span className="font-semibold">Drag</span> to rotate the card in 3D space</li>
            <li>• <span className="font-semibold">Click</span> on the card to flip it</li>
            <li>• <span className="font-semibold">Scroll</span> to zoom in and out (limited range)</li>
            <li>• <span className="font-semibold">Double-click</span> to reset the view</li>
          </ul>
        </div>
      </div>
    </>
  );
} 