"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "Building Immersive 3D Experiences with Three.js and React",
    excerpt:
      "Learn how to create stunning 3D visualizations for your web applications using Three.js and React Three Fiber.",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Your Name",
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt:
      "Explore upcoming trends and technologies that will shape the future of web development in the coming year.",
    date: "June 22, 2023",
    readTime: "6 min read",
    author: "Your Name",
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
  },
  {
    id: 3,
    title: "Optimizing React Performance: Advanced Techniques",
    excerpt:
      "Discover advanced strategies to improve the performance of your React applications for better user experience.",
    date: "July 10, 2023",
    readTime: "10 min read",
    author: "Your Name",
    image: "/placeholder.svg?height=400&width=600",
    category: "React",
  },
]

export default function BlogPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="blog" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Latest Articles</h2>
            <div className="w-20 h-1 bg-primary mb-4"></div>
            <p className="text-muted-foreground max-w-2xl">
              Thoughts, insights, and tutorials on web development and design.
            </p>
          </div>
          <Button className="mt-6 md:mt-0" variant="outline">
            View All Posts <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <a href="#">{post.title}</a>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTime}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <a href="#" className="text-primary text-sm font-medium hover:underline">
                      Read More
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

