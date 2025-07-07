"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three";
import FloatingButtons from "./floating-buttons" // Keep the original floating buttons

// Create multiple floating geometric shapes for a more unique look
function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null)
  const geometries = useRef<THREE.Mesh[]>([])
  
  // Generate shapes with different geometries
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      
      // Animate each shape individually
      geometries.current.forEach((mesh, i) => {
        if (!mesh) return;
        const t = clock.getElapsedTime() * 0.2 + i * 0.2
        mesh.position.y = Math.sin(t) * 0.5
        mesh.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1)
        mesh.rotation.z += 0.005 * (i % 3 === 0 ? 1 : -1)
      })
    }
  })
  
  // Different shapes with different colors
  const shapes = [
    // Main center shape (octahedron)
    { 
      geometry: new THREE.OctahedronGeometry(1.5, 0), 
      position: [0, 0, 0], 
      color: "#8352FD",
      wireframe: true,
      scale: 1
    },
    // Surrounding smaller shapes
    { 
      geometry: new THREE.TetrahedronGeometry(0.5), 
      position: [3, 1, 2], 
      color: "#FE6B8B", 
      wireframe: false,
      scale: 1
    },
    { 
      geometry: new THREE.BoxGeometry(0.6, 0.6, 0.6), 
      position: [-3, -1, -2], 
      color: "#FF8E53", 
      wireframe: false,
      scale: 1
    },
    { 
      geometry: new THREE.DodecahedronGeometry(0.5), 
      position: [-2, 2, -1], 
      color: "#4CC9F0", 
      wireframe: false,
      scale: 1
    },
    { 
      geometry: new THREE.TorusGeometry(0.3, 0.1, 16, 32), 
      position: [2, -2, 1], 
      color: "#F72585", 
      wireframe: false,
      scale: 1.2
    },
    { 
      geometry: new THREE.IcosahedronGeometry(0.4), 
      position: [3, -1, -3], 
      color: "#4895EF", 
      wireframe: false,
      scale: 1
    },
    { 
      geometry: new THREE.ConeGeometry(0.3, 0.7, 16), 
      position: [-3, 1, 3], 
      color: "#B5179E", 
      wireframe: false,
      scale: 1
    },
  ]
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <mesh
          key={index}
          ref={el => { if (el) geometries.current[index] = el }}
          position={shape.position as [number, number, number]}
          scale={shape.scale}
        >
          <primitive object={shape.geometry} attach="geometry" />
          <meshStandardMaterial 
            color={shape.color} 
            wireframe={shape.wireframe}
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Particle field for added depth */}
      <Points count={1000} />
    </group>
  )
}

// Add particle field in the background
function Points({ count = 1000 }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Create particles
  const particlesPosition = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 15
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 15
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 15
  }
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#ffffff" 
        transparent 
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

// Typing animation component
function TypingAnimation() {
  const phrases = [
    "Full Stack Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "Problem Solver"
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        const timeoutId = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100); // Typing speed
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
        const timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 1500); // Pause at the end of typing
        return () => clearTimeout(timeoutId);
      }
    } else {
      if (displayText.length > 0) {
        const timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, 50); // Deleting speed (faster than typing)
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(true);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      }
    }
  }, [displayText, isTyping, currentPhraseIndex, phrases]);
  
  return (
    <h2 className="text-2xl md:text-3xl text-muted-foreground h-10 md:h-12">
      <span>{displayText}</span>
      <span className="inline-block w-0.5 h-6 md:h-8 bg-primary animate-blink ml-1 align-middle"></span>
    </h2>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <spotLight position={[-10, -10, -5]} intensity={0.5} />
          <FloatingGeometry />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Floating Social Buttons - keep original from sides */}
      <FloatingButtons />

      {/* Main Content - Centered */}
      <div className="z-10 px-6 md:px-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-2">Hi, I'm</span>
            <span className="text-primary">Rudra Maria</span>
          </motion.h1>
          
          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="my-8"
          >
            <TypingAnimation />
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-4 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}

