"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "SheWell – AI-Powered Women’s Health & Wellness Platform",
    description:
      "SheWell – AI-Powered Women’s Health & Wellness Platform SheWell is a cross-platform women’s health and wellness solution designed with compassion and technology. With both a mobile app (React Native) and a web portal, SheWell offers AI-powered support for menstrual health, pregnancy, mental well-being, emergency care, and more — all while protecting privacy and supporting accessibility.",
    image: "/shewell-hero.png",
    tags: ["React", "MongoDB", "Redux", "Express", "Node.js", "Tailwind CSS"],
    liveLink: "https://she-well-ocyv.vercel.app/",
    githubLink: "https://github.com/RudraCodeUp",
  },
  {
    title: "DigiVote India – Blockchain-Based Voting Platform",
    description: "DigiVote India is a secure and transparent online voting platform leveraging blockchain technology. It ensures fair, tamper-proof elections with decentralized governance, reducing electoral fraud and increasing voter accessibility.",
    image: "/digi-vote.png",
    tags: ["Next.js", "Tailwind CSS", "React Query", "Solidity", "Ethereum", "IPFS", "Hardhat", "Ethers.js", "Node.js"],
    liveLink: "https://www.youtube.com/watch?v=rd5GJ9MC1yU",
    githubLink: "#",
  },
  {
    title: "Real-time-location-tracking",
    description: "A real-time location tracking application that provides users with live updates on their friends' locations.",
    image: "/real-time.png",
    tags: ["Socket.io", "Node.js", "Express", "MongoDB", "React", "Tailwind CSS", "Geolocation API", "Leaflet"],
    liveLink: "https://real-time-location-tracking-gv9o.onrender.com/",
    githubLink: "https://github.com/RudraCodeUp/Real-time-location-tracking",
  },
  {
    title: "Nep_Saarthi_Chitkara_University",
    description: "A comprehensive platform for Chitkara University students, offering features like updates on National Educational policy, event updates, and student resources.",
    image: "/nep-hero.png",
    tags: ["React", "OpenAI API", "Express", "MongoDB"],
    liveLink: "https://nep2020-saarthis-chitkara-university-oil7vhrwd.vercel.app/",
    githubLink: "https://github.com/RudraCodeUp/Nep_Saarthi_Chitkara_University",
  },
  {
    title: "CraveCart-Food ordering Website",
    description:
      "A complete food ordering system built with Express.js and EJS templates. This application allows users to browse restaurants, filter food items, place orders, and provides a full administrative interface for managing restaurants, food items, users, and orders.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
    liveLink: "Not Deployed",
    githubLink: "https://github.com/RudraCodeUp/CraveCart-backend",
  },
  {
    title: "Weather Dashboard",
    description: "A weather application that provides current conditions and forecasts for locations worldwide.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Weather API", "Chart.js", "Geolocation API"],
    liveLink: "#",
    githubLink: "#",
  },
]

export default function Projects() {
  const [filter, setFilter] = useState("All")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      y: 60,
      opacity: 0,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  // Get unique tags from all projects
  const allTags = ["All", ...new Set(projects.flatMap((project) => project.tags))]

  // Filter projects based on selected tag
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.tags.includes(filter))

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allTags.map((tag, index) => (
              <Button
                key={index}
                variant={filter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: "1000px" }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                rotateY: hoveredIndex === index ? 2 : 0,
                transition: { duration: 0.3 }
              }}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all border border-border group relative"
              style={{ 
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative overflow-hidden h-48">
                <motion.img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="sm" variant="secondary" className="rounded-full shadow-lg">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  </motion.a>
                  <motion.a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="sm" variant="outline" className="rounded-full bg-background/90 shadow-lg">
                      <Github className="w-4 h-4 mr-2" /> Code
                    </Button>
                  </motion.a>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

