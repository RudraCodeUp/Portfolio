"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code2, Database, Globe, Layers, Palette, Server } from "lucide-react"

const skills = [
  {
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces with modern frameworks",
    icon: <Code2 className="w-10 h-10" />,
    technologies: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    description: "Building robust server-side applications and APIs",
    icon: <Server className="w-10 h-10" />,
    technologies: ["Node.js", "Express", "Python", "Django", "RESTful APIs", "GraphQL"],
  },
  {
    title: "Database Management",
    description: "Designing and optimizing database structures",
    icon: <Database className="w-10 h-10" />,
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user experiences",
    icon: <Palette className="w-10 h-10" />,
    technologies: ["Figma", "Adobe XD", "Responsive Design", "User Testing"],
  },
  {
    title: "DevOps",
    description: "Streamlining development and deployment processes",
    icon: <Layers className="w-10 h-10" />,
    technologies: ["Docker", "CI/CD", "AWS", "Vercel", "Netlify", "Git"],
  },
  {
    title: "3D & Animation",
    description: "Creating immersive 3D experiences for the web",
    icon: <Globe className="w-10 h-10" />,
    technologies: ["Three.js", "WebGL", "GSAP", "Framer Motion", "CSS Animations"],
  },
]

export default function Skills() {
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

  return (
    <section id="skills" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="text-primary mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

