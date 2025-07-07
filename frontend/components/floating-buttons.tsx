"use client"

import React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, FileText, Code } from "lucide-react"

type SocialButtonProps = {
  icon: React.ReactNode
  href: string
  label: string
  color: string
  initialPosition: { x: string | number, y: string | number }
  movePath: { x: Array<string | number>, y: Array<string | number> }
}

const SocialButton = ({ icon, href, label, color, initialPosition, movePath }: SocialButtonProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} rounded-full p-4 shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer pointer-events-auto`}
      style={{ position: 'absolute', left: initialPosition.x, top: initialPosition.y }}
      animate={{ 
        x: movePath.x,
        y: movePath.y,
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        repeatType: "loop", 
        ease: "linear"
      }}
      whileHover={{ scale: 1.2 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  )
}

export default function FloatingButtons() {
  // Link to your GitHub profile
  const profileUrl = "https://github.com/RudraCodeUp";
  // Add your LinkedIn URL
  const linkedInUrl = "https://www.linkedin.com/in/rudra-maria-327713233/";
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* LinkedIn Button */}
      <SocialButton 
        icon={<Linkedin className="w-8 h-8 text-white" />} 
        href={linkedInUrl} 
        label="LinkedIn profile"
        color="bg-[#0077B5]"
        initialPosition={{ x: '10%', y: '20%' }}
        movePath={{ 
          x: ['10%', '25%', '40%', '60%', '30%', '10%'], 
          y: ['20%', '30%', '15%', '25%', '10%', '20%'] 
        }}
      />
      
      {/* GitHub Button */}
      <SocialButton 
        icon={<Github className="w-8 h-8 text-white" />} 
        href={profileUrl} 
        label="GitHub profile"
        color="bg-[#171515]"
        initialPosition={{ x: '70%', y: '15%' }}
        movePath={{ 
          x: ['70%', '50%', '65%', '80%', '60%', '70%'], 
          y: ['15%', '25%', '40%', '20%', '30%', '15%'] 
        }}
      />
      
      {/* Resume Button */}
      <SocialButton 
        icon={<FileText className="w-8 h-8 text-white" />} 
        href={profileUrl} 
        label="Resume"
        color="bg-primary"
        initialPosition={{ x: '15%', y: '65%' }}
        movePath={{ 
          x: ['15%', '35%', '20%', '45%', '30%', '15%'], 
          y: ['65%', '55%', '70%', '50%', '60%', '65%'] 
        }}
      />
      
      {/* LeetCode Button */}
      <SocialButton 
        icon={<Code className="w-8 h-8 text-white" />} 
        href={profileUrl} 
        label="LeetCode profile"
        color="bg-[#F89F1B]"
        initialPosition={{ x: '75%', y: '70%' }}
        movePath={{ 
          x: ['75%', '60%', '80%', '55%', '65%', '75%'], 
          y: ['70%', '60%', '50%', '65%', '75%', '70%'] 
        }}
      />
    </div>
  )
}