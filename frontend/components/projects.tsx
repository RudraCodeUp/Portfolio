"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team functionality.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Firebase", "Tailwind CSS", "React Query"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "3D Portfolio Visualizer",
    description: "An interactive 3D visualization tool for showcasing portfolio projects in an immersive environment.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Three.js", "React Three Fiber", "GSAP", "TypeScript"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "AI Content Generator",
    description: "A web application that uses AI to generate various types of content based on user prompts.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "OpenAI API", "Express", "MongoDB"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Real-time Chat Application",
    description:
      "A real-time messaging platform with features like user authentication, group chats, and file sharing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
    liveLink: "#",
    githubLink: "#",
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
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
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border border-border group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  </a>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="rounded-full bg-background/80">
                      <Github className="w-4 h-4 mr-2" /> Code
                    </Button>
                  </a>
                </div>
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

