"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              Hello! I'm a passionate full-stack developer with expertise in building modern web applications. I
              specialize in creating responsive, user-friendly interfaces with React and developing robust backend
              systems.
            </p>
            <p>
              With a strong foundation in computer science and years of hands-on experience, I enjoy tackling complex
              problems and turning ideas into reality through clean, efficient code. I'm constantly learning new
              technologies and methodologies to stay at the forefront of web development.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              enjoying outdoor activities to maintain a healthy work-life balance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

