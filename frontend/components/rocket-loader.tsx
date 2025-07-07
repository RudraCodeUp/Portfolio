"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function RocketLoader() {
  // Only show content on the client side
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
    
    // Animation duration
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  // Return nothing during server-side rendering
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Fixed star background */}
          <div className="absolute inset-0">
            {/* Pre-defined stars with fixed positions */}
            {[10, 20, 15, 45, 60, 75, 90, 25, 55, 70, 85, 30, 40, 50, 65, 80, 95, 5, 35, 72].map((x, i) => (
              [8, 15, 22, 30, 38, 45, 52, 60, 68, 75, 82, 90, 18, 25, 32, 42, 58, 65, 78, 85].map((y, j) => (
                <div 
                  key={`star-${i}-${j}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: (((i + j) % 3) + 1) + "px",
                    height: (((i + j) % 3) + 1) + "px",
                    left: `${x + (i % 5)}%`,
                    top: `${y + (j % 5)}%`,
                    opacity: ((i + j) % 7) / 10 + 0.3
                  }}
                />
              ))
            )).flat()}
          </div>
          
          {/* Rocket - INCREASED SIZE */}
          <motion.div
            className="relative z-10"
            initial={{ y: "100vh" }}
            animate={{ y: "-110vh" }}
            transition={{ 
              duration: 2.5,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.5
            }}
          >
            <div className="relative">
              {/* BIGGER Rocket body - increased from 100x200 to 150x300 */}
              <div className="rocket">
                <svg width="150" height="300" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Rocket components */}
                  <motion.path 
                    d="M50 0L70 60H30L50 0Z" 
                    fill="#8352FD"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.rect 
                    x="30" 
                    y="60" 
                    width="40" 
                    height="80" 
                    fill="#F72585"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                  
                  <motion.circle 
                    cx="50" 
                    cy="90" 
                    r="10" 
                    fill="#4CC9F0"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  />
                  
                  <motion.path 
                    d="M30 140L10 170V140H30Z" 
                    fill="#8352FD"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  />
                  
                  <motion.path 
                    d="M70 140L90 170V140H70Z" 
                    fill="#8352FD"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  />
                  
                  <motion.rect 
                    x="30" 
                    y="140" 
                    width="40" 
                    height="10" 
                    fill="#FF8E53"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  />
                </svg>
                
                {/* ENHANCED FLAMES - larger and more dynamic */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  {/* Main flame */}
                  <motion.div
                    className="relative"
                    animate={{ 
                      scaleY: [1, 1.3, 1, 1.2, 1.4, 1.1, 1],
                      scaleX: [1, 1.1, 0.9, 1.2, 1, 1.15, 0.95]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    {/* Increased flame size from 60x80 to 90x120 */}
                    <svg width="90" height="120" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
                      {/* Outer flame */}
                      <path 
                        d="M10 0H50L40 50L30 30L20 50L10 0Z" 
                        fill="#FF8E53" 
                        fillOpacity="0.8"
                      />
                      
                      {/* Inner flame */}
                      <path 
                        d="M20 0H40L35 40L30 25L25 40L20 0Z" 
                        fill="#FFF" 
                        fillOpacity="0.9"
                      />
                    </svg>

                    {/* Additional flame effects */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-40">
                      {/* Fire particle effects */}
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={`fire-particle-${i}`}
                          className={`absolute rounded-full bg-gradient-to-t ${
                            i % 2 === 0 ? 'from-orange-500 to-yellow-300' : 'from-red-500 to-orange-300'
                          }`}
                          style={{
                            width: (8 + i * 2) + 'px',
                            height: (12 + i * 3) + 'px',
                            left: `calc(50% + ${(i % 3 - 1) * 15}px)`,
                            bottom: '0px',
                            filter: 'blur(2px)'
                          }}
                          animate={{
                            y: [0, -(20 + i * 10)],
                            opacity: [0.8, 0],
                            scale: [1, 0.5]
                          }}
                          transition={{
                            duration: 0.8 + (i * 0.1),
                            repeat: Infinity,
                            repeatDelay: 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Flame glow effect */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-orange-500 rounded-full opacity-30 blur-xl" />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Your Name/Logo */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1.2, 1.2, 1.5],
              y: [0, 0, -50, -100]
            }}
            transition={{ 
              duration: 2.5,
              times: [0, 0.2, 0.8, 1],
              delay: 0.7
            }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-2">
              <span className="text-primary">Rudra</span> Maria
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-80">
              Full Stack Developer
            </p>
          </motion.div>
          
          {/* Enhanced smoke/clouds */}
          <div className="absolute bottom-0 left-0 right-0">
            {/* Glow effect at the bottom */}
            <div className="h-32 bg-gradient-to-t from-orange-900/40 via-gray-900/20 to-transparent" />
            
            <div className="relative h-20">
              {/* Static smoke clouds with predefined positions */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={`smoke-${i}`}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: (60 + i * 10) + "px",
                    height: (50 + i * 10) + "px",
                    left: `${(i * 15) % 100}%`,
                    bottom: "-10px",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 0.4, 0],
                    scale: [0.5, 1.5, 2],
                    y: [0, -40 - i * 5],
                    x: [(i % 2 === 0 ? -30 : 30), (i % 2 === 0 ? -50 : 50)]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}