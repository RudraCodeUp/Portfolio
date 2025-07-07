"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Award, ExternalLink } from "lucide-react"
import Image from "next/image"

// Define types for the gallery items
interface GalleryItem {
  title: string;
  description: string;
  image: string;
  date: string;
}

// Gallery items data
const galleryItems: GalleryItem[] = [
  {
    title: "Award Ceremony",
    description: "Received the Outstanding Developer Award at the annual tech conference.",
    image: "/placeholder.svg?height=600&width=800", // Replace with your actual image
    date: "January 2023",
  },
  {
    title: "Conference Presentation",
    description: "Presented my research on modern web architecture at DevCon 2023.",
    image: "/placeholder.svg?height=600&width=800", // Replace with your actual image
    date: "March 2023",
  },
  {
    title: "Team Hackathon",
    description: "Led our team to first place in the 48-hour coding challenge.",
    image: "/placeholder.svg?height=600&width=800", // Replace with your actual image
    date: "May 2023",
  },
  {
    title: "Certification Achievement",
    description: "Completed the Advanced Full Stack Development certification program.",
    image: "/placeholder.svg?height=600&width=800", // Replace with your actual image
    date: "July 2023",
  },
  {
    title: "Community Workshop",
    description: "Organized and led a workshop teaching coding to underrepresented groups.",
    image: "/placeholder.svg?height=600&width=800", // Replace with your actual image
    date: "September 2023",
  },
  {
    title: "Company Retreat",
    description: "Team building and strategy session at our annual company gathering.",
    image: "/placeholder.svg?height=600&width=800", // Replace with your actual image
    date: "November 2023",
  },
]

// Card component with typed props
interface AchievementCardProps {
  item: GalleryItem;
  index: number;
}

// Card component with advanced hover effects
const AchievementCard = ({ item, index }: AchievementCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position values for hover effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Smoothed spring physics for the hover effect
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })
  
  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])
  const brightness = useTransform(mouseY, [-100, 100], [1.2, 0.8])
  
  // Handle mouse move on card with proper event typing
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set(e.clientX - centerX)
      y.set(e.clientY - centerY)
    }
  }
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="h-full p-2 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          filter: `brightness(${brightness})`,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          z: 20,
          scale: 1.08,
          transition: { duration: 0.2 }
        }}
      >
        <div className="bg-black rounded-xl overflow-hidden h-full border border-primary/30 shadow-lg shadow-primary/5
                        relative flex flex-col transform-gpu">
          {/* Glowing border effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-r from-primary/40 via-purple-500/40 to-blue-500/40"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ filter: "blur(8px)" }}
          />
          
          {/* Image container with perspective effect */}
          <div className="relative overflow-hidden aspect-video">
            <motion.div
              className="w-full h-full"
              whileHover={{
                scale: 1.15,
                transition: { duration: 0.4 }
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Date overlay */}
            <div className="absolute top-0 right-0 m-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {item.date}
            </div>
            
            {/* Hover overlay with zoom effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end justify-center p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <ExternalLink className="text-white h-8 w-8 mx-auto mb-2" />
                <p className="text-white text-sm">View Details</p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-5 flex-grow flex flex-col">
            <div className="flex items-start gap-2 mb-2">
              <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-gray-300 text-sm flex-grow">{item.description}</p>
            
            {/* Floating particles effect on hover */}
            <motion.div
              className="absolute -inset-2 pointer-events-none"
              initial="hidden"
              whileHover="visible"
            >
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary/30"
                  style={{
                    width: (2 + i % 3) + "px",
                    height: (2 + i % 3) + "px",
                    left: (i * 10) + "%",
                    top: "50%"
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 0 },
                    visible: { 
                      opacity: [0, 1, 0],
                      y: [0, -(20 + i * 5)],
                      x: [0, (i % 2 === 0 ? 10 : -10)]
                    }
                  }}
                  transition={{
                    duration: 1 + (i * 0.2),
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AchievementsGallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Achievements & Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of memorable moments and milestones from my professional journey.
            </p>
            
            {/* Animated underline */}
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mt-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 120 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
          
          {/* Background decorative elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-40 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-20 h-20 rounded-full bg-primary/30 blur-xl" />
            <div className="absolute top-10 right-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-2xl" />
          </div>
        </div>

        {/* Masonry-style layout */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Dynamic background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
          </div>
          
          {/* Achievement cards */}
          {galleryItems.map((item, index) => (
            <AchievementCard key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}